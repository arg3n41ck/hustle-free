import React from 'react'
import Tournamentrules from '../../../components/pages/Event/TournamentRules/TournamentRules'
import styled from 'styled-components'
import AuthAthleteToEventAllAccordions from '../../../components/AuthAthleteToEventAccordions/AuthAthleteToEventAllAccordions'
import $api from '../../../services/axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function TournamentRules({ event, rules }) {
  return (
    <TournamentRulesContainer>
      <Tournamentrules event={event} rules={rules[0]} />
      <AuthAthleteToEventAllAccordions event={event} />
    </TournamentRulesContainer>
  )
}

export default TournamentRules

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data: event } = await $api.get(`/events/events/${query.id}/`)
  const { data: rules } = await $api.get(`/events/rules/?event=${query.id}`)

  return {
    props: {
      event,
      rules,
      ...(await serverSideTranslations(locale, [
        'header',
        'common',
        'eventDetail',
        'lkTm',
        'footer',
      ])),
    }, // will be passed to the page component as props
  }
}

const TournamentRulesContainer = styled.div`
  margin-top: 64px;
  width: 100%;
  display: grid;
  grid-template-columns: 8fr 2.5fr;
  grid-gap: 32px;
`
