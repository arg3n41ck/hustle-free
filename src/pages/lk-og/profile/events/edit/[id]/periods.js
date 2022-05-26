import React, { useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventPeriods from "../../../../../../components/pages/LkOg/Tabs/Events/EventPeriods"
import { useRouter } from "next/router"
import { getEventDefaultValues } from "./location"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Periods() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(null)
  useEffect(() => {
    eventId &&
      getEventDefaultValues(`/organizer/events/${eventId}/registration/`).then(
        (data) => {
          setEventDefaultValues(data)
        }
      )
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {/*<RouterLoader open={!eventDefaultValues} />*/}
        {eventDefaultValues && (
          <EventPeriods defaultValues={eventDefaultValues} eventId={eventId} />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Periods

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}
