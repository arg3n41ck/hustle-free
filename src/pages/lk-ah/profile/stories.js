import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import MyStories from "../../../components/pages/LkAh/Tabs/Profile/MyStories"
import { lkAhTabs } from "../../../components/pages/LkAh/Tabs/tabConstants"

function Stories() {
  return (
    <LkLayout tabs={lkAhTabs}>
      <MyStories />
    </LkLayout>
  )
}

export default Stories
