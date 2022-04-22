import React from "react"
import LkLayout from "../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../components/layouts/EventsCreateLayout"
import EventForm from "../../../../../components/pages/LkOg/Tabs/Events/EventForm"

function Index() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventForm />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Index
