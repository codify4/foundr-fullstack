export interface Project {
    name: string;
    url: string;
    oneLiner: string;
    mrr: string;
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