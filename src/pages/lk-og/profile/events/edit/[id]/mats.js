import React from 'react'
import LkLayout from '../../../../../../components/layouts/LkLayout'
import { lkOgTabs } from '../../../../../../components/pages/LkOg/Tabs/tabConstants'
import EventsCreateLayout from '../../../../../../components/layouts/EventsCreateLayout'
import { useRouter } from 'next/router'
import $api from '../../../../../../services/axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import DaysAndMats from '../../../../../../components/pages/LkOg/Tabs/Events/DaysAndMats/DaysAndMats'

export const getSportTypeByEvent = async (eventId) => {
  const { data } = await $api.get(`/events/events/${eventId}/`)
  return data
}
function ParticipantCategories() {
  const {
    query: { id: eventId },
  } = useRouter()

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <DaysAndMats />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default ParticipantCategories

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
