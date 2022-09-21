import React from 'react'
import styled from 'styled-components'
import AuthAthleteToEventAllAccordions from '../../../components/AuthAthleteToEventAccordions/AuthAthleteToEventAllAccordions'
import AuthorizationAthleteToEvent from '../../../components/pages/Authorization/AuthorizationAthleteToEvent'
import $api from '../../../services/axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function Registration({ data }) {
  return (
    <RegistrationContainer>
      <AuthorizationAthleteToEvent event={data} />
      <ContainerAccordions>
        <AuthAthleteToEventAllAccordions event={data} />
      </ContainerAccordions>
    </RegistrationContainer>
  )
}

export default Registration

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)

  return {
    props: {
      data,
      query,
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
const ContainerAccordions = styled.div`
  @media screen and (max-width: 992px) {
    display: none;
  }
`

const RegistrationContainer = styled.div`
  margin-top: 64px;
  width: 100%;
  display: grid;
  grid-template-columns: 8fr 2.5fr;
  grid-gap: 32px;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
    margin: 0;
  }
`
