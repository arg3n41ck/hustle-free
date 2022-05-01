import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { lkAhTabs } from "../../../components/pages/LkAh/Tabs/tabConstants"
import SettingsProfile from "../../../components/pages/LkAh/Tabs/Profile/Settings"

function Settings() {
  return (
    <LkLayout tabs={lkAhTabs}>
      <SettingsProfile />
    </LkLayout>
  )
}

export default Settings
