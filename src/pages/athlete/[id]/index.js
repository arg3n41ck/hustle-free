import React from 'react'
import $api from '../../../services/axios'
import PublicAthlete from '../../../components/pages/PublicAthlete/PublicAthlete'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function Athlete({ athlete }) {
  return <PublicAthlete athleteData={athlete} />
}

export default Athlete

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/athletes/${query.id}/`)

  return {
    props: {
      athlete: data || null,
      ...(await serverSideTranslations(locale, ['header', 'common', 'lkAh', 'footer', 'lkTm'])),
    },
  }
}
