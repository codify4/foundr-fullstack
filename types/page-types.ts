export interface Project {
    name: string;
    url: string;
    oneLiner: string;
    mrr: string;
}

export type SocialTypes = 'github' | 'twitter' | 'linkedin' | 'instagram' | 'facebook' | null;
export type FeedbackTypes = 'feature' | 'improvement' | 'bug';

export interface Social {
    type: string;
    link: string;
}
  
export type Page = {
    slug: string;
    name: string;
    bio: string;
    projects: Project[];
    socials: Social[];
}