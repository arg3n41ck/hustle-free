import React, { useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventLocation from "../../../../../../components/pages/LkOg/Tabs/Events/EventLocation"
import $api from "../../../../../../services/axios"
import { useRouter } from "next/router"
import { camelizeKeys } from "humps"

export const getEventDefaultValues = async (href) => {
  try {
    const { data } = await $api.get(href)
    return camelizeKeys(data)
  } catch (e) {
    console.log(e)
  }
}

function Location() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(null)
  useEffect(() => {
    eventId &&
      getEventDefaultValues(`/organizer/events/${eventId}/location/`).then(
        setEventDefaultValues
      )
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {/*{!eventDefaultValues && <RouterLoader open={!eventDefaultValues} />}{" "}*/}
        {eventDefaultValues && (
          <EventLocation defaultValues={eventDefaultValues} eventId={eventId} />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Location
