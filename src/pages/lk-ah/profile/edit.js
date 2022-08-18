import React, { useEffect } from 'react'
import LkLayout from '../../../components/layouts/LkLayout'
import Edits from '../../../components/pages/LkAh/Tabs/Profile/Edits'
import { lkAhTabs } from '../../../components/pages/LkAh/Tabs/tabConstants'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../../redux/components/user'

const OgProfile = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  
  return (
    <LkLayout tabs={lkAhTabs}>
      <Edits />
    </LkLayout>
  )
}

export default OgProfile

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'common', 'lkAh', 'footer'])),
  },
})
