import React from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventContacts from "../../../../../../components/pages/LkOg/Tabs/Events/EventContacts"

function Contacts() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventContacts />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Contacts
