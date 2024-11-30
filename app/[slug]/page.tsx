import { Github, Twitter, Linkedin, Instagram, Facebook, LinkIcon, DollarSign } from 'lucide-react'
import { getPageBySlug } from '@/actions/page-actions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { getProjectByPageSlug } from '@/actions/project-actions'
import { getSocialLinkByPageSlug } from '@/actions/socials-actions'
import { Suspense } from 'react'
import Image from 'next/image'

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
}

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SlugPage slug={params.slug} />
    </Suspense>
  );
}

async function SlugPage({ slug }: { slug: string }) {
  const pageInfo = await getPageBySlug(slug);
  const projects = await getProjectByPageSlug(slug);
  const socials = await getSocialLinkByPageSlug(slug);

  if (!pageInfo) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1>Page not found</h1>
        <Link href="/dashboard" className='underline text-primary'>Go back to dashboard</Link>
      </div>
    );
  }

  return (
    <Card className="min-h-screen bg-background py-8 px-4">
      <div className="w-11/12 lg:w-2/5 mx-auto">
        <CardContent className="bg-white dark:bg-neutral-900 text-black dark:text-white rounded-xl border overflow-hidden">
          <div className="py-5">
            <Image 
              src={pageInfo.avatar} 
              alt={pageInfo.name}
              width={150} 
              height={150} 
              className="rounded-full mx-auto"
            />
            <div className="text-center mb-8">
              <CardTitle className="text-2xl font-bold mb-2">{pageInfo.name}</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">{pageInfo.bio}</p>
            </div>

            {/* Socials */}
            {socials && socials.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Connect with me</h2>
                <div className="flex flex-wrap gap-4">
                  {socials.map((social, index) => {
                    const Icon = socialIcons[social.type.toLowerCase() as keyof typeof socialIcons]
                    return (
                      <Link
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                        <span>{social.type}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">My Projects</h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <a
                      key={index}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-lg border hover:border-gray-400 dark:hover:border-gray-600"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {project.oneLiner}
                          </p>
                        </div>
                        {project.mrr && (
                          <div className="flex items-center text-green-600">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>{project.mrr}</span>
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}