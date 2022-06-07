import React, { useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventRules from "../../../../../../components/pages/LkOg/Tabs/Events/EventRules"
import { useRouter } from "next/router"
import { getEventDefaultValues } from "./location"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Rules() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(null)
  useEffect(() => {
    eventId &&
      getEventDefaultValues(`/organizer/events/${eventId}/rules/`).then(
        (data) => {
          setEventDefaultValues({ rules: data.rules })
        }
      )
  }, [eventId])
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {/*<RouterLoader open={!eventDefaultValues} />*/}
        {eventDefaultValues && (
          <EventRules defaultValues={eventDefaultValues} eventId={eventId} />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Rules

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
