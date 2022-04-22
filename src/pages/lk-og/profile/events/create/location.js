import React from "react"
import LkLayout from "../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../components/layouts/EventsCreateLayout"
import EventFormLocation from "../../../../../components/pages/LkOg/Tabs/Events/EventFormLocation"

function Location() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventFormLocation />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Location
