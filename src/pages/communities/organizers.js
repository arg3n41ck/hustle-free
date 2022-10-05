import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import CommunitiesOrganizersPage from '../../components/pages/Communites/CommunitiesOrganizersPage'

const organizers = () => {
  return (
    <div>
      <CommunitiesOrganizersPage />
    </div>
  )
}

export default organizers

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'header',
      'common',
      'communities',
      'footer',
      'events',
    ])),
  },
})
