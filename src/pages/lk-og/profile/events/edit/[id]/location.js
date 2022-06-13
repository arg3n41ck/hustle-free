import React, { useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventLocation from "../../../../../../components/pages/LkOg/Tabs/Events/EventLocation"
import $api from "../../../../../../services/axios"
import { useRouter } from "next/router"
import { camelizeKeys } from "humps"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

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
  useEffect(async () => {
    eventId &&
      getEventDefaultValues(`/organizer/events/${eventId}/location/`).then(
        (data) => {
          setEventDefaultValues(data)
        }
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "lkOg", "footer"])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}
