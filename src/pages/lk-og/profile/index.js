import React from "react"
import { lkOgTabs } from "../../../components/pages/LkOg/Tabs/tabConstants"
import ProfileOg from "../../../components/pages/LkOg/Tabs/Profile/Profile"
import LkLayout from "../../../components/layouts/LkLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const OgProfile = () => {
  return (
    <LkLayout tabs={lkOgTabs}>
      <ProfileOg />
    </LkLayout>
  )
}

export default OgProfile

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})
