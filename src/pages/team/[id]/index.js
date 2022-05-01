import React, { useMemo } from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { useRouter } from "next/router"
import { teamProfileTabs } from "../../../components/pages/Team/tabConstants"
import TeamInfo from "../../../components/pages/Team/TeamProfile"

function TeamProfile( ) {
  const {
    query: { id: teamId },
  } = useRouter()
  const tabs = useMemo(() => {
    return teamProfileTabs(teamId)
  }, [teamId])

  return (
    <LkLayout tabs={tabs}>
      <TeamInfo teamId={teamId} />
    </LkLayout>
  )
}

export default TeamProfile
