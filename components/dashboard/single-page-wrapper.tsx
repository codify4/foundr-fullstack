import { getSocialLinksByPageId } from '@/actions/socials-actions'
import { getProjectsByPageId } from '@/actions/project-actions'
import { getGithubCalendar, getPage } from '@/actions/page-actions'
import { SinglePageCreator } from './single-page-creator'
import { redirect } from 'next/navigation'
import { SelectGithubCalendar, SelectProject, SelectSocial } from '@/db/schemas/page-schema'
import { auth } from '@/auth'

export default async function SinglePageWrapper() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/signin')
  }

  const pageInfo = await getPage(session.user.id)
  if (pageInfo === null) {
    return <div>Page not found</div>
  }

  if (!pageInfo) {
    redirect('/signin')
  }

  const socials: SelectSocial[] = await getSocialLinksByPageId(pageInfo.id)
  const projects: SelectProject[] = await getProjectsByPageId(pageInfo.id)
  const githubCalendar: SelectGithubCalendar = await getGithubCalendar(pageInfo.id)

  return (
    <SinglePageCreator 
      initialSocials={socials} 
      initialProjects={projects} 
      initialPageInfo={pageInfo}
      initialGithubCalendar={githubCalendar}
    />
  )
}