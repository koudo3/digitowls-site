export interface Service {
  id: string;
  icon: string;
  image: string;
}

export interface TeamMember {
  id: string;
  image: string;
}

export interface Project {
  id: string;
  image: string;
  category: string;
  tags: string[];
}

export interface Client {
  name: string;
  logo: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  locale: string;
}
