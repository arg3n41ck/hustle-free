import React from 'react'
import LkLayout from '../../../../components/layouts/LkLayout'
import { lkTmTabs } from '../../../../components/pages/LkTm/Tabs/tabConstants'
import $api from '../../../../services/axios'
import Statistic from '../../../../components/pages/LkTm/Tabs/Statistics/Statistic/Statistic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function StatisticPage({ statistic }) {
  return (
    <LkLayout tabs={lkTmTabs}>
      {statistic && <Statistic statistic={statistic[0]?.event} />}
    </LkLayout>
  )
}

export default StatisticPage

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/events/team_statistic/${query.id}/`)
  return {
    props: {
      statistic: data || null,
      ...(await serverSideTranslations(locale, ['header', 'common', 'lkTm', 'footer'])),
    },
  }
}
