export interface Project {
    name: string;
    link: string;
    description: string;
    revenue: number;
}
  
export interface Social {
    platform: string;
    url: string;
}
  
export type Page = {
    slug: string;
    name: string;
    image: string;
    bio: string;
    projects: Project[];
    socials: Social[];
}