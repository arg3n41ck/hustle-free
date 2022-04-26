import React from "react"
import LkLayout from "../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../components/layouts/EventsCreateLayout"
import EventRules from "../../../../../components/pages/LkOg/Tabs/Events/EventRules"

function Rules() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventRules />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Rules
