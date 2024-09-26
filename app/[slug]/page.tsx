import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Github, Twitter, Linkedin, Instagram, Facebook, LinkIcon, DollarSign } from 'lucide-react'
import { getPageWithRelations } from '@/actions/page-actions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SelectSocial, SelectProject } from '@/db/schemas/page-schema'
import Link from 'next/link'

const socialIcons: { [key: string]: React.ComponentType } = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
}

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const pageData = await getPageWithRelations(params.slug)

  if (!pageData) {
    notFound()
  }

  const { name, image, bio, socials, projects } = pageData

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mb-4">
            <Image
              src={'/favicon.ico'}
              alt={`${name}'s avatar`}
              width={130}
              height={130}
              className="rounded-full mx-auto"
            />
          </div>
          <CardTitle className="text-3xl font-bold">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground whitespace-pre-wrap mb-6">{bio}</p>
          
          <div className="flex justify-center items-center space-x-4 mb-8">
            {socials.map((social: SelectSocial) => {
              const IconComponent = socialIcons[social.type as keyof typeof socialIcons]
              return IconComponent ? (
                <Link
                  key={social.id}
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
            {projects.map((project: SelectProject) => (
              <div key={project.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.oneLiner}</p>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" asChild>
                        <a 
                          href={project.url || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <LinkIcon className="h-4 w-4 mr-2" />
                          View Project
                        </a>
                      </Button>
                      <div className="flex items-center text-green-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>{project.mrr}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}