import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { fetchBracketsByParams } from '../../../../../../redux/components/eventBrackets'
import EventsCreateLayout from '../../../../../../components/layouts/EventsCreateLayout'
import LkLayout from '../../../../../../components/layouts/LkLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { lkOgTabs } from '../../../../../../components/pages/LkOg/Tabs/tabConstants'
import EventsBrackets from '../../../../../../components/pages/LkOg/Tabs/Events/Brackets/EventsBrackets'

function Brackets() {
  const {
    query: { id: eventId },
  } = useRouter()

  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(fetchBracketsByParams({ event: eventId }))
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventsBrackets eventId={eventId} />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Brackets

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
