import React, { useCallback, useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventParticipantCategories from "../../../../../../components/pages/LkOg/Tabs/Events/EventParticipantCategories"
import { useRouter } from "next/router"
import { getEventDefaultValues } from "./location"

function ParticipantCategories() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [manualEventPC, setManualEventPC] = useState(null)

  const refreshPC = useCallback(async () => {
    await getEventDefaultValues(
      `/organizer/events/${eventId}/manual_participants_category/`
    ).then(setManualEventPC)
  }, [eventId])

  useEffect(() => {
    eventId && refreshPC()
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {manualEventPC && (
          <EventParticipantCategories
            refreshPC={refreshPC}
            manualEventPC={manualEventPC}
            eventId={eventId}
          />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default ParticipantCategories
