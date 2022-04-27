import React from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventCredits from "../../../../../../components/pages/LkOg/Tabs/Events/EventCredits"

function Credits() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventCredits />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Credits
