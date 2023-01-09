import React from 'react'
import $api from '../../../../services/axios'
import Statistic from '../../../../components/pages/LkTm/Tabs/Statistics/Statistic/Statistic'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function StatisticPage({ statistic }) {
  const { query } = useRouter()

  return statistic && <Statistic statistic={statistic[0]?.event} isPublic teamId={query.id} />
}

export default StatisticPage

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/events/team_statistic/${query.statId}/`)
  return {
    props: {
      statistic: data || null,
      ...(await serverSideTranslations(locale, ['header', 'common', 'lkTm', 'lkAh', 'footer'])),
    },
  }
}
