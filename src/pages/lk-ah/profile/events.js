import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import MyEvents from "../../../components/pages/LkAh/Tabs/Profile/MyEvents"
import { lkAhTabs } from "../../../components/pages/LkAh/Tabs/tabConstants"

function Events() {
  return (
    <LkLayout tabs={lkAhTabs}>
      <MyEvents />
    </LkLayout>
  )
}

export default Events
