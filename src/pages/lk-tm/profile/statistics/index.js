import React from 'react'
import LkLayout from '../../../../components/layouts/LkLayout'
import { lkTmTabs } from '../../../../components/pages/LkTm/Tabs/tabConstants'
import Statistics from '../../../../components/pages/LkTm/Tabs/Statistics/Statistics'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function StatisticsPage() {
  return (
    <LkLayout tabs={lkTmTabs}>
      <Statistics />
    </LkLayout>
  )
}

export default StatisticsPage

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'common', 'lkAh', 'lkTm', 'footer'])),
  },
})
