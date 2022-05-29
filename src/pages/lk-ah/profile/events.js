import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import MyEvents from "../../../components/pages/LkAh/Tabs/Profile/MyEvents"
import { lkAhTabs } from "../../../components/pages/LkAh/Tabs/tabConstants"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Events() {
  return (
    <LkLayout tabs={lkAhTabs}>
      <MyEvents />
    </LkLayout>
  )
}

export default Events

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "lkAh"])),
  },
})
