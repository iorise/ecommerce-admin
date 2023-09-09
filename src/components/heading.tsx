interface HeadingProps {
  title: string;
  description: string;
}

export function Heading({ title, description }: HeadingProps) {
  return (
    <div className="grid gap-2">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm md:text-lg text-muted-foreground">{description}</p>
    </div>
  );
}
