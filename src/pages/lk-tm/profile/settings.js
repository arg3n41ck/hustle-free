import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { lkTmTabs } from "../../../components/pages/LkTm/Tabs/tabConstants"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Settings() {
  return (
    <LkLayout tabs={lkTmTabs}>
      settings
    </LkLayout>
  )
}

export default Settings

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})
