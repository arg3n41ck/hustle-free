import React, { useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventPeriods from "../../../../../../components/pages/LkOg/Tabs/Events/EventPeriods"
import { useRouter } from "next/router"
import { getEventDefaultValues } from "./location"
import RouterLoader from "../../../../../../components/ui/RouterLoader"

function Periods() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(null)
  useEffect(() => {
    eventId &&
      getEventDefaultValues(`/organizer/events/${eventId}/registration/`).then(
        setEventDefaultValues
      )
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <RouterLoader open={!eventDefaultValues} />
        {eventDefaultValues && (
          <EventPeriods defaultValues={eventDefaultValues} eventId={eventId} />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Periods
