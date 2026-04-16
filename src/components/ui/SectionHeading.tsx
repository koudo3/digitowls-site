interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      {label && <p className="text-secondary text-sm uppercase tracking-[0.2em] mb-2">{label}</p>}
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{title}</h2>
      {description && <p className="text-white/70 max-w-2xl mx-auto">{description}</p>}
    </div>
  );
}
