import React from "react"
import OrganizerTabs from "../../components/pages/LkOg/OrganizerActivation/OrganizerTabs"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Organizer() {
  return <OrganizerTabs />
}

export default Organizer

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})

