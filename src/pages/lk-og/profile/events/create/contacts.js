import React from "react"
import LkLayout from "../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventCreate from "../../../../../components/pages/LkOg/Tabs/Events/EventCreate"
import EventsCreateLayout from "../../../../../components/layouts/EventsCreateLayout"

function Contacts() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventCreate />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Contacts
