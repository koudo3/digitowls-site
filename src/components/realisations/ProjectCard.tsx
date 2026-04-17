import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  type?: string;
  date?: string;
}

export default function ProjectCard({ title, description, image, tags, type, date }: ProjectCardProps) {
  return (
    <AnimatedSection>
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-secondary/50 transition-colors">
        <Image src={image} alt={title} width={400} height={250} className="w-full h-48 object-cover" />
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            {type && <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded font-bold">{type}</span>}
            {date && <span className="text-xs text-white/40">{date}</span>}
          </div>
          <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
          <p className="text-white/60 text-sm mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
