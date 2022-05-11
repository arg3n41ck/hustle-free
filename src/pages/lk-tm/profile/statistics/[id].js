import React from "react"
import LkLayout from "../../../../components/layouts/LkLayout"
import { lkTmTabs } from "../../../../components/pages/LkTm/Tabs/tabConstants"
import $api from "../../../../services/axios"
import Statistic from "../../../../components/pages/LkTm/Tabs/Statistics/Statistic/Statistic"

function StatisticPage({ statistic }) {
  return (
    <LkLayout tabs={lkTmTabs}>
      {statistic && <Statistic statistic={statistic[0]?.event} />}
    </LkLayout>
  )
}

export default StatisticPage

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/teams/team_statistic/${query.id}/`)
  return {
    props: {
      statistic: data || null,
    },
  }
}
