import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { lkTmTabs } from "../../../components/pages/LkTm/Tabs/tabConstants"
import Statistics from "../../../components/pages/LkTm/Tabs/Statistics/Statistics"

function StatisticsPage() {
  return (
    <LkLayout tabs={lkTmTabs}>
      <Statistics />
    </LkLayout>
  )
}

export default StatisticsPage
