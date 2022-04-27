import React, { useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventDescription from "../../../../../../components/pages/LkOg/Tabs/Events/EventDescription"
import { useRouter } from "next/router"
import { getEventDefaultValues } from "./location"
import RouterLoader from "../../../../../../components/ui/RouterLoader"

function Description() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(null)
  useEffect(() => {
    if (eventId) {
      getEventDefaultValues(`/organizer/events/${eventId}/`).then((data) => {
        setEventDefaultValues({
          image: data.image,
          description: data.description.description,
        })
      })
    }
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {/*<RouterLoader open={!eventDefaultValues} />*/}
        {eventDefaultValues && (
          <EventDescription
            defaultValues={eventDefaultValues}
            eventId={eventId}
          />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Description
