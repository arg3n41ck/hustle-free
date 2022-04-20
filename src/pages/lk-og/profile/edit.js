import React from "react"
import { lkOgTabs } from "../../../components/pages/LkOg/Tabs/tabConstants"
import LkLayout from "../../../components/layouts/LkLayout"
import Edits from "../../../components/pages/LkOg/Tabs/Profile/Edits"

const OgProfile = () => {
  return (
    <LkLayout tabs={lkOgTabs}>
      <Edits />
    </LkLayout>
  )
}

export default OgProfile
