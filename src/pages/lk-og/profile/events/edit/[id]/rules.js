import React, { useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventRules from "../../../../../../components/pages/LkOg/Tabs/Events/EventRules"
import { useRouter } from "next/router"
import { getEventDefaultValues } from "./location"
import RouterLoader from "../../../../../../components/ui/RouterLoader"

function Rules() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(null)
  useEffect(() => {
    eventId &&
      getEventDefaultValues(`/organizer/events/${eventId}/description/`).then(
        (data) => setEventDefaultValues({ eventRules: data.eventRules })
      )
  }, [eventId])
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <RouterLoader open={!eventDefaultValues} />
        {eventDefaultValues && (
          <EventRules defaultValues={eventDefaultValues} eventId={eventId} />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Rules
