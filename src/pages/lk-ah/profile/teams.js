import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import MyTeams from "../../../components/pages/LkAh/Tabs/Profile/MyTeams"
import { lkAhTabs } from "../../../components/pages/LkAh/Tabs/tabConstants"

function Teams() {
  return (
    <LkLayout tabs={lkAhTabs}>
      <MyTeams />
    </LkLayout>
  )
}

export default Teams
