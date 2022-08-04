import React, { useEffect, useState } from 'react'
import LkLayout from '../../../../../../components/layouts/LkLayout'
import { lkOgTabs } from '../../../../../../components/pages/LkOg/Tabs/tabConstants'
import EventsCreateLayout from '../../../../../../components/layouts/EventsCreateLayout'
import EventPeriods from '../../../../../../components/pages/LkOg/Tabs/Events/EventPeriods'
import { useRouter } from 'next/router'
import { getEventDefaultValues } from './location'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const emptyInitialValues = {
  maxParticipantCount: '',
  earlyRegStart: null,
  earlyRegEnd: null,
  standartRegStart: null,
  standartRegEnd: null,
  lateRegStart: null,
  lateRegEnd: null,
  earlyRegActive: false,
  lateRegActive: false,
}

function Periods() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [periodsId, setPeriodsId] = useState(null)
  const [eventDefaultValues, setEventDefaultValues] = useState(emptyInitialValues)
  useEffect(() => {
    eventId &&
      getEventDefaultValues(`/events/event_registr_periods/?event=${eventId}`).then((data) => {
        const currentPeriods = !!data?.length && data.find(({ event }) => event == eventId)
        if (currentPeriods) {
          const { id, event, ...rest } = currentPeriods
          setPeriodsId(id)
          !!data?.length && setEventDefaultValues(rest || emptyInitialValues)
        }
      })
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {/*<RouterLoader open={!eventDefaultValues} />*/}
        <EventPeriods defaultValues={eventDefaultValues} eventId={eventId} periodsId={periodsId} />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Periods

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
