import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import Edits from "../../../components/pages/LkAh/Tabs/Profile/Edits"
import { lkAhTabs } from "../../../components/pages/LkAh/Tabs/tabConstants"

const OgProfile = () => {
  return (
    <LkLayout tabs={lkAhTabs}>
      <Edits />
    </LkLayout>
  )
}

export default OgProfile
