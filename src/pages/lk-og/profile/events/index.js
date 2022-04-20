import React from "react"
import LkLayout from "../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsContent from "../../../../components/pages/LkOg/Tabs/Events/Events"

function Index() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsContent />
    </LkLayout>
  )
}

export default Index
