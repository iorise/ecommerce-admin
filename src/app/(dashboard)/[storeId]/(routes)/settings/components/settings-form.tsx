"use client";

import * as React from "react";
import { Store } from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1).max(16),
});

type SettingFormValues = z.infer<typeof formSchema>;

export function SettingsForm({ initialData }: SettingsFormProps) {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your preferences" />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Icons.trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="ml-auto"
            size="sm"
            type="submit"
          >
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
}
