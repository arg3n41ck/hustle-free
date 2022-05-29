import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import ProfileAh from "../../../components/pages/LkAh/Tabs/Profile/Profile"
import { lkAhTabs } from "../../../components/pages/LkAh/Tabs/tabConstants"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const OgProfile = () => {
  return (
    <LkLayout tabs={lkAhTabs}>
      <ProfileAh />
    </LkLayout>
  )
}

export default OgProfile

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "lkAh"])),
  },
})
