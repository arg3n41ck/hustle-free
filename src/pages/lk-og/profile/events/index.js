import React from "react"
import LkLayout from "../../../../components/layouts/LkLayout"
import { lkOgTabs } from "../../../../components/pages/LkOg/Tabs/tabConstants"
import EventsContent from "../../../../components/pages/LkOg/Tabs/Events/Events/Events"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Index() {
  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsContent />
    </LkLayout>
  )
}

export default Index

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "lkOg"])),
  },
})
