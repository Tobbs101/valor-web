import { StaticImageData } from "next/image";

export type LinkProp = {
  id: number;
  route?: string;
  routes?: {
    id: number;
    route: string;
    label: string;
    icon?: any;
  }[];
  label: string;
  className?: string;
};

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: StaticImageData;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}
