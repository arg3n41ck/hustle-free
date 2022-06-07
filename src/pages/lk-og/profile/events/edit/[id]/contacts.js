import React, { useEffect, useState } from "react"
import LkLayout from "../../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../../components/layouts/EventsCreateLayout"
import EventContacts from "../../../../../../components/pages/LkOg/Tabs/Events/EventContacts"
import { useRouter } from "next/router"
import { getEventDefaultValues } from "./location"
import { useSelector } from "react-redux"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Contacts() {
  const user = useSelector((state) => state.user.user)
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
          <EventContacts
            defaultValue={{
              ...eventDefaultValues,
              ...user,
              phoneNumber1: user.phoneNumber,
            }}
            eventId={eventId}
          />
        )}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Contacts

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
