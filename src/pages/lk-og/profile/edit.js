import React from 'react'
import { lkOgTabs } from '../../../components/pages/LkOg/Tabs/tabConstants'
import LkLayout from '../../../components/layouts/LkLayout'
import Edits from '../../../components/pages/LkOg/Tabs/Profile/Edits'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const OgProfile = () => {
  return (
    <LkLayout tabs={lkOgTabs}>
      <Edits />
    </LkLayout>
  )
}

export default OgProfile

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'common', 'lkOg', 'footer'])),
  },
})
