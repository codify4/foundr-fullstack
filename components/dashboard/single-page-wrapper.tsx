import { getSocialLinksByPageId } from '@/actions/socials-actions'
import { getProjectsByPageId } from '@/actions/project-actions'
import { getPageById, getPageIdForUser } from '@/actions/page-actions'
import { SinglePageCreator } from './single-page-creator'
import { redirect } from 'next/navigation'
import { SelectPage, SelectProject, SelectSocial } from '@/db/schemas/page-schema'

export default async function SinglePageWrapper() {
  const pageId = await getPageIdForUser()
  if(!pageId) {
    redirect('/signin')
  }
  
  const pageInfo: SelectPage = await getPageById(pageId)
  const socials: SelectSocial[] = await getSocialLinksByPageId(pageId)
  const projects: SelectProject[] = await getProjectsByPageId(pageId)

  return (
    <SinglePageCreator 
      initialSocials={socials} 
      initialProjects={projects} 
      initialPageInfo={pageInfo}
    />
  )
}