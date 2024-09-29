import Image from 'next/image'
import { Github, Twitter, Linkedin, Instagram, Facebook, LinkIcon, DollarSign } from 'lucide-react'
import { getPageBySlug } from '@/actions/page-actions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SelectPage } from '@/db/schemas/page-schema'
import Link from 'next/link'
import { getProjectByPageSlug } from '@/actions/project-actions'
import { getSocialLinkByPageSlug } from '@/actions/socials-actions'
import { Project, Social } from '@/types/page-types'

const socialIcons: { [key: string]: React.ComponentType } = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
}

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const pageInfo: SelectPage = await getPageBySlug(params.slug);
  const projects: Project[] = await getProjectByPageSlug(params.slug);
  const socials: Social[] = await getSocialLinkByPageSlug(params.slug);

  if (!pageInfo && !projects && !socials) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1>Page not found</h1>
        <Link href="/dashboard" className='underline text-primary'>Go back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mb-4">
            <Image
              src={'/favicon.ico'}
              alt={`${pageInfo.name}'s avatar`}
              width={130}
              height={130}
              className="rounded-full mx-auto"
            />
          </div>
          <CardTitle className="text-3xl font-bold">{pageInfo.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground whitespace-pre-wrap mb-6">{pageInfo.bio}</p>
          
          <div className="flex justify-center items-center space-x-4 mb-8">
            {socials?.map((social) => {
              const IconComponent = socialIcons[social.type as keyof typeof socialIcons]
              return IconComponent ? (
                <Link
                  key={social.link}
                  href={social.link || '#'}
                  target="_blank"
                  className="text-primary hover:text-primary transition-colors"
                >
                  <IconComponent />
                </Link>
              ) : null
            })}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="space-y-6">
            {projects?.map((project) => (
              <Card key={project.name}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{project.oneLiner}</p>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" asChild>
                      <Link 
                        href={project.url || '#'} 
                        target="_blank" 
                        className="flex items-center"
                      >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        View Project
                      </Link>
                    </Button>
                    <div className="flex items-center text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{project.mrr}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}