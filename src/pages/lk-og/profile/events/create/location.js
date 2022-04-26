import React from "react"
import LkLayout from "../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../components/layouts/EventsCreateLayout"
import EventLocation from "../../../../../components/pages/LkOg/Tabs/Events/EventLocation"

function Location() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventLocation />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Location
