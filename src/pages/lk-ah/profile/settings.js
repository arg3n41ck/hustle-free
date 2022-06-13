import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { lkAhTabs } from "../../../components/pages/LkAh/Tabs/tabConstants"
import SettingsProfile from "../../../components/pages/LkAh/Tabs/Profile/Settings"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Settings() {
  return (
    <LkLayout tabs={lkAhTabs}>
      <SettingsProfile />
    </LkLayout>
  )
}

export default Settings

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "footer"])),
  },
})
