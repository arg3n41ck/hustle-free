import React, { useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventContacts from "../../../../../../components/pages/LkOg/Tabs/Events/EventContacts"
import { useRouter } from "next/router"
import { getEventDefaultValues } from "./location"

function Contacts() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(null)
  useEffect(() => {
    if (eventId) {
      getEventDefaultValues(`/organizer/events/${eventId}/contact/`).then(
        (data) => {
          setEventDefaultValues(data)
        }
      )
    }
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {eventDefaultValues && (
          <EventContacts defaultValue={eventDefaultValues} eventId={eventId} />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Contacts
