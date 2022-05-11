import React, { useMemo } from "react"
import LkLayout from "../../../../components/layouts/LkLayout"
import { teamProfileTabs } from "../../../../components/pages/Team/tabConstants"
import { useRouter } from "next/router"
import Statistics from "../../../../components/pages/Team/Statistics"

function StatisticsPage() {
  const {
    query: { id: teamId },
  } = useRouter()
  const tabs = useMemo(() => {
    return teamProfileTabs(teamId)
  }, [teamId])

  return (
    <LkLayout tabs={tabs}>
      <Statistics />
    </LkLayout>
  )
}

export default StatisticsPage
