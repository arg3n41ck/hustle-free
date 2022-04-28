import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import ProfileAh from "../../../components/pages/LkAh/Tabs/Profile/Profile"
import { lkAhTabs } from "../../../components/pages/LkAh/Tabs/tabConstants"

const OgProfile = () => {
  return (
    <LkLayout tabs={lkAhTabs}>
      <ProfileAh />
    </LkLayout>
  )
}

export default OgProfile
