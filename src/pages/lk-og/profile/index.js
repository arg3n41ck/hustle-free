import React from "react"
import { lkOgTabs } from "../../../components/pages/LkOg/Tabs/tabConstants"
import ProfileOg from "../../../components/pages/LkOg/Tabs/Profile/Profile"
import LkLayout from "../../../components/layouts/LkLayout"

const OgProfile = () => {
  return (
    <LkLayout tabs={lkOgTabs}>
      <ProfileOg />
    </LkLayout>
  )
}

export default OgProfile
