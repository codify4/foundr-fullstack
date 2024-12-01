// Prevent caching of this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { Github, Twitter, Linkedin, Instagram, Facebook, LinkIcon, DollarSign } from 'lucide-react'
import { getPageBySlug } from '@/actions/page-actions'
import { getProjectByPageSlug } from '@/actions/project-actions'
import { getSocialLinkByPageSlug } from '@/actions/socials-actions'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="w-11/12 lg:w-[1024px] mx-auto">
        <div className="bg-white dark:bg-neutral-900 text-black dark:text-white rounded-2xl border shadow-lg backdrop-blur-sm p-8 md:p-12">
          <div className="text-center mb-12">
            {pageInfo.avatar && (
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <Image 
                    src={pageInfo.avatar} 
                    alt={pageInfo.name}
                    width={160} 
                    height={160}
                    className="rounded-full relative ring-4 ring-white dark:ring-neutral-900"
                  />
                </div>
              </div>
            )}
            <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-pink-500 to-purple-500 inline-block text-transparent bg-clip-text">
              {pageInfo.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {pageInfo.bio}
            </p>
          </div>

          {/* Socials */}
          {socials && socials.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Connect with me</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {socials.map((social, index) => {
                  const Icon = socialIcons[social.type.toLowerCase() as keyof typeof socialIcons]
                  return (
                    <Link
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 border border-transparent hover:border-gray-200 dark:hover:border-neutral-700 transition-all duration-200 group"
                    >
                      {Icon && <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />}
                      <span className="font-medium">{social.type.charAt(0).toUpperCase() + social.type.slice(1)}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">My Projects</h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <Link
                    key={index}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-xl border hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md bg-gray-50 dark:bg-neutral-800/50 group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold group-hover:text-pink-500 transition-colors duration-200">
                          {project.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                          {project.oneLiner}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                        {project.mrr && (
                          <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-medium">{project.mrr}/mo</span>
                          </div>
                        )}
                        <LinkIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}