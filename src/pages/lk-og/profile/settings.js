import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../components/pages/LkOg/Tabs/tabConstants"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Settings() {
  return <LkLayout tabs={lkOgTabs}>settings</LkLayout>
}

export default Settings

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})
