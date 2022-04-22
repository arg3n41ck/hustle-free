import React from "react"
import LkLayout from "../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../components/layouts/EventsCreateLayout"
import EventPeriods from "../../../../../components/pages/LkOg/Tabs/Events/EventPeriods"

function Periods() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventPeriods />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Periods
