import React, { useMemo } from "react"
import LkLayout from "../../../../components/layouts/LkLayout"
import $api from "../../../../services/axios"
import Statistic from "../../../../components/pages/LkTm/Tabs/Statistics/Statistic/Statistic"
import { useRouter } from "next/router"
import { teamProfileTabs } from "../../../../components/pages/Team/tabConstants"

function StatisticPage({ statistic }) {
  const { query } = useRouter()
  const tabs = useMemo(() => {
    return teamProfileTabs(query.id)
  }, [query.id])

  return (
    <LkLayout tabs={tabs}>
      {statistic && (
        <Statistic statistic={statistic[0]?.event} isPublic teamId={query.id} />
      )}
    </LkLayout>
  )
}

export default StatisticPage

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/teams/team_statistic/${query.statId}/`)
  return {
    props: {
      statistic: data || null,
    },
  }
}
