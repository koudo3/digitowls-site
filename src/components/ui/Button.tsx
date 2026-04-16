import Link from "next/link";

type Variant = "primary" | "secondary" | "outline";

interface ButtonProps {
  href?: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variants: Record<Variant, string> = {
  primary: "bg-accent text-primary font-bold hover:bg-accent/90",
  secondary: "bg-secondary text-white font-bold hover:bg-secondary/90",
  outline: "border border-white/30 text-white hover:bg-white/10",
};

export default function Button({ href, variant = "primary", children, className = "", type = "button", onClick }: ButtonProps) {
  const classes = `inline-block px-6 py-3 rounded-lg text-sm transition-colors ${variants[variant]} ${className}`;
  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button type={type} onClick={onClick} className={classes}>{children}</button>;
}
