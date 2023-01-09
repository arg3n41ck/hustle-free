import { useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import LkLayout from '../../../layouts/LkLayout'
import { teamProfileTabs } from '../tabConstants'
import DesktopHeader from './DesktopHeader'
import MobileTeamNavigation from './MobileTeamNavigation'

export default function PublicTeamWrapper({ children }) {
  const {
    query: { id: teamId },
  } = useRouter()
  const md = useMediaQuery('(max-width: 756px)')
  const tabs = useMemo(() => {
    return teamProfileTabs(teamId)
  }, [teamId])

  return md ? (
    <MobileTeamNavigation>{children}</MobileTeamNavigation>
  ) : (
    <LkLayout tabs={tabs} mediaTurning={md}>
      {!md && <DesktopHeader />}
      {children}
    </LkLayout>
  )
}
