import React from 'react'
import EdMainLayout from '../../../../components/pages/Event/EDMainLayout'
import $api from '../../../../services/axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import EventBrackets from '../../../../components/pages/Event/Brackets/EventBrackets'
import styled from 'styled-components'
import BracketsWrapper from '../../../../components/pages/Event/Brackets/BracketsWrapper/BracketsWrapper'

function Brackets({ event }) {
  return (
    <EdMainLayout event={event}>
      <BracketsWrapper>
        <EventBrackets />
      </BracketsWrapper>
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

const TabsInnerWrapper = styled.div`
  padding: 48px 0 0 0;
`
