import React from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import MyStories from "../../../components/pages/LkAh/Tabs/Profile/MyStories"
import { lkAhTabs } from "../../../components/pages/LkAh/Tabs/tabConstants"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Stories() {
  return (
    <LkLayout tabs={lkAhTabs}>
      <MyStories />
    </LkLayout>
  )
}

export default Stories

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "lkAh"])),
  },
})
