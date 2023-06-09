import React from 'react'
import EdMainLayout from '../../../../../components/pages/Event/EDMainLayout'
import MatDetails from '../../../../../components/pages/Event/Brackets/MatDetails/MatDetails'
import $api from '../../../../../services/axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ScoreboardLayout from '../../../../../components/pages/Event/Brackets/Scoreboard/ScoreboardLayout'

export default function MatDetailsPage({ event }) {
  return (
    <EdMainLayout event={event}>
      <ScoreboardLayout>
        <MatDetails />
      </ScoreboardLayout>
    </EdMainLayout>
  )
}

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: {
      event: data,
      ...(await serverSideTranslations(locale, [
        'header',
        'common',
        'eventDetail',
        'lkTm',
        'lkOg',
        'footer',
      ])),
    }, // will be passed to the page component as props
  }
}
