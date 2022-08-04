import React, { useEffect, useState } from 'react'
import LkLayout from '../../../../../../components/layouts/LkLayout'
import { lkOgTabs } from '../../../../../../components/pages/LkOg/Tabs/tabConstants'
import EventsCreateLayout from '../../../../../../components/layouts/EventsCreateLayout'
import EventRules from '../../../../../../components/pages/LkOg/Tabs/Events/EventRules'
import { useRouter } from 'next/router'
import { getEventDefaultValues } from './location'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const emptyInitialValues = {
  rules: '',
}

function Rules() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [rulesId, setRulesId] = useState(null)
  const [eventDefaultValues, setEventDefaultValues] = useState(emptyInitialValues)
  useEffect(() => {
    eventId &&
      getEventDefaultValues(`/events/rules/?event=${eventId}`).then((data) => {
        const currentRules = !!data?.length && data.find(({ event }) => event == eventId)
        if (currentRules) {
          const { id, event, ...rest } = currentRules
          setRulesId(id)
          !!data?.length && setEventDefaultValues(rest || emptyInitialValues)
        }
      })
  }, [eventId])
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {/*<RouterLoader open={!eventDefaultValues} />*/}
        <EventRules defaultValues={eventDefaultValues} eventId={eventId} rulesId={rulesId} />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Rules

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
