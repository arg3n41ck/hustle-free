import React from "react"

import { lkTmTabs } from "../../../components/pages/LkTm/Tabs/tabConstants"
import ProfileTm from "../../../components/pages/LkTm/Tabs/Profile/Profile"
import LkLayout from "../../../components/layouts/LkLayout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const TmProfile = () => {
  return (
    <LkLayout tabs={lkTmTabs}>
      <ProfileTm />
    </LkLayout>
  )
}

export default TmProfile

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "lkTm"])),
  },
})
