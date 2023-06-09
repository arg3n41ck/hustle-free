import React from 'react'
import EdMainLayout from '../../../../components/pages/Event/EDMainLayout'
import $api from '../../../../services/axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BracketsWrapper from '../../../../components/pages/Event/Brackets/BracketsWrapper/BracketsWrapper'
import CurrentFightings from '../../../../components/pages/Event/Brackets/CurrentFightings/CurrentFightings'
import ScoreboardLayout from '../../../../components/pages/Event/Brackets/Scoreboard/ScoreboardLayout'

function Brackets({ event }) {
  return (
    <EdMainLayout event={event}>
      <ScoreboardLayout>
        <BracketsWrapper>
          <CurrentFightings />
        </BracketsWrapper>
      </ScoreboardLayout>
    </EdMainLayout>
  )
}

export default Brackets

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
