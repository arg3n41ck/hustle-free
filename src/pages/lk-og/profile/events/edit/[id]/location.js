import React, { useEffect, useState } from 'react'
import LkLayout from '../../../../../../components/layouts/LkLayout'
import { lkOgTabs } from '../../../../../../components/pages/LkOg/Tabs/tabConstants'
import EventsCreateLayout from '../../../../../../components/layouts/EventsCreateLayout'
import EventLocation from '../../../../../../components/pages/LkOg/Tabs/Events/EventLocation'
import $api from '../../../../../../services/axios'
import { useRouter } from 'next/router'
import { camelizeKeys } from 'humps'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getEventDefaultValues = async (href) => {
  try {
    const { data } = await $api.get(href)
    return camelizeKeys(data)
  } catch (e) {
    console.log(e)
  }
}

const emptyInitialValues = {
  placeName: '',
  address: '',
  country: null,
  city: null,
  lat: null,
  long: null,
  weighingPlace: null,
}

function Location() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(emptyInitialValues)
  const [locationId, setLocationId] = useState(null)
  useEffect(async () => {
    eventId &&
      getEventDefaultValues(`/events/event_locations/?event=${eventId}`).then((data) => {
        const currentLocation = !!data?.length && data.find(({ event }) => event == eventId)
        if (currentLocation) {
          const { id, event, ...rest } = currentLocation
          setLocationId(id)
          !!data?.length && setEventDefaultValues(rest || emptyInitialValues)
        }
      })
  }, [eventId])
  console.log(eventDefaultValues)

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {/*{!eventDefaultValues && <RouterLoader open={!eventDefaultValues} />}{" "}*/}

        <EventLocation
          defaultValues={eventDefaultValues}
          eventId={eventId}
          locationId={locationId}
        />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Location

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'common', 'lkOg', 'footer'])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}
