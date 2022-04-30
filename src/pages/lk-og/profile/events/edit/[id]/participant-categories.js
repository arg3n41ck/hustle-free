import React, { useCallback, useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventParticipantCategories from "../../../../../../components/pages/LkOg/Tabs/Events/EventParticipantCategories"
import { useRouter } from "next/router"
import { getEventDefaultValues } from "./location"
import $api from "../../../../../../services/axios"
export const getSportTypeByEvent = async (eventId) => {
  const { data } = await $api.get(`/organizer/events/${eventId}/`)
  return data
}
function ParticipantCategories() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [manualEventPC, setManualEventPC] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [sportType, setSportType] = useState(null)

  const refreshPC = useCallback(async () => {
    await getEventDefaultValues(
      `organizer/events/${eventId}/participants_category/`
    ).then((data) => {
      setSelectedRows(data)
    })
  }, [eventId])

  useEffect(async () => {
    if (eventId) {
      await refreshPC()
      getSportTypeByEvent(eventId).then((data) => setSportType(data.typeSport))
      getEventDefaultValues(
        `/organizer/events/${eventId}/manual_participants_category/`
      ).then((data) => {
        setManualEventPC(data)
      })
    }
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {manualEventPC && (
          <EventParticipantCategories
            refreshPC={refreshPC}
            manualEventPC={manualEventPC}
            sportType={sportType}
            eventId={eventId}
            selectedRows={selectedRows}
          />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default ParticipantCategories
