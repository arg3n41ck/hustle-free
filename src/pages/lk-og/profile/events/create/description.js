import React from "react"
import LkLayout from "../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../components/layouts/EventsCreateLayout"
import EventDescription from "../../../../../components/pages/LkOg/Tabs/Events/EventDescription"

function Description() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventDescription />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Description
