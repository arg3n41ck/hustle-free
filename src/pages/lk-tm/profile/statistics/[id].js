import React from 'react'
import $api from '../../../../services/axios'
import Statistic from '../../../../components/pages/LkTm/Tabs/Statistics/Statistic/Statistic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function StatisticPage({ statistic }) {
  return statistic && <Statistic statistic={statistic[0]?.event} />
}

export default StatisticPage

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/events/team_statistic/${query.id}/`)
  return {
    props: {
      statistic: data || null,
      ...(await serverSideTranslations(locale, ['header', 'common', 'lkAh', 'lkTm', 'footer'])),
    },
  }
}
