import React from "react"
import LkLayout from "../../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsCreateLayout from "../../../../../components/layouts/EventsCreateLayout"
import EventDefaults from "../../../../../components/pages/LkOg/Tabs/Events/EventDefaults"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Index() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventDefaults />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Index

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "lkOg"])),
  },
})
