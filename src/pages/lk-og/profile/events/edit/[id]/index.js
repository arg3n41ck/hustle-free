import React, { useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventDefaults from "../../../../../../components/pages/LkOg/Tabs/Events/EventDefaults"
import { useRouter } from "next/router"
import { getEventDefaultValues } from "./location"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Index() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(null)
  useEffect(() => {
    eventId &&
      getEventDefaultValues(`/organizer/events/${eventId}/`).then((data) => {
        setEventDefaultValues(data)
      })
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {eventDefaultValues && (
          <EventDefaults
            defaultValues={{
              name: eventDefaultValues?.name,
              typeSport: eventDefaultValues?.typeSport,
              dateStart: eventDefaultValues?.dateStart,
              dateEnd: eventDefaultValues?.dateEnd,
              timezone: eventDefaultValues?.timezone,
              formatEvent: eventDefaultValues?.formatEvent,
              statusPublish: eventDefaultValues?.statusPublish,
            }}
            eventId={eventId}
          />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Index

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "lkOg"])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}
