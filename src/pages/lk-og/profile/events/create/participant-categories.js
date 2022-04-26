import React from "react"
import LkLayout from "../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../components/layouts/EventsCreateLayout"
import EventParticipantCategories from "../../../../../components/pages/LkOg/Tabs/Events/EventParticipantCategories"

function ParticipantCategories() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventParticipantCategories />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default ParticipantCategories
