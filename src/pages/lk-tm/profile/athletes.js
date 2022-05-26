import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { lkTmTabs } from "../../../components/pages/LkTm/Tabs/tabConstants"
import Athletes from "../../../components/pages/LkTm/Tabs/Athletes/Athletes"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function AthletesPage() {
  return (
    <LkLayout tabs={lkTmTabs}>
      <Athletes />
    </LkLayout>
  )
}

export default AthletesPage

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})
