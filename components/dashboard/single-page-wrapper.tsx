import { getSocialLinksByPageId } from '@/actions/socials-actions'
import { getProjectsByPageId } from '@/actions/project-actions'
import { getPageIdForUser } from '@/actions/page-actions'
import { SinglePageCreator } from './single-page-creator'
import { redirect } from 'next/navigation'
import { Project, Social } from '@/types/page-types'

export default async function SinglePageCreatorWrapper() {
  const pageId = await getPageIdForUser()
  if(!pageId) {
    redirect('/signin')
  }
  
  const socials: Social[] = await getSocialLinksByPageId(pageId)
  const projects: Project[] = await getProjectsByPageId(pageId)

  return <SinglePageCreator initialSocials={socials} initialProjects={projects} />
}