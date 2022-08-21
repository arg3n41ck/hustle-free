import React, { useEffect, useState } from 'react'
import LkLayout from '../../../../../../components/layouts/LkLayout'
import { lkOgTabs } from '../../../../../../components/pages/LkOg/Tabs/tabConstants'
import EventsCreateLayout from '../../../../../../components/layouts/EventsCreateLayout'
import EventDescription from '../../../../../../components/pages/LkOg/Tabs/Events/EventDescription'
import { useRouter } from 'next/router'
import { getEventDefaultValues } from './location'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const emptyInitialValues = {
  description: '',
  banner: null,
  descriptionExtra: '',
}

function Description() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(emptyInitialValues)
  const [descriptionId, setDescriptionId] = useState(null)
  useEffect(() => {
    if (eventId) {
      getEventDefaultValues(`/events/event_descriptions/?event=${eventId}`).then((data) => {
        const currentPeriods = !!data?.length && data.find(({ event }) => event == eventId)
        if (currentPeriods) {
          const { id, event, ...rest } = currentPeriods
          setDescriptionId(id)
          !!data?.length && setEventDefaultValues(rest || emptyInitialValues)
        }
      })
    }
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {/*<RouterLoader open={!eventDefaultValues} />*/}
        <EventDescription
          defaultValues={eventDefaultValues}
          eventId={eventId}
          descriptionId={descriptionId}
        />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Description

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'common', 'lkOg', 'footer'])),
  },
})
