import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { lkTmTabs } from "../../../components/pages/LkTm/Tabs/tabConstants"
import Athletes from "../../../components/pages/LkTm/Tabs/Athletes/Athletes"

function AthletesPage() {
  return (
    <LkLayout tabs={lkTmTabs}>
      <Athletes />
    </LkLayout>
  )
}

export default AthletesPage
