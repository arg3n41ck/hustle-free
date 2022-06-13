import React from "react"
import TeamTabs from "../../components/pages/LkTm/ActivationTeam/TeamTabs"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function team() {
  return <TeamTabs />
}

export default team

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "auth"])),
  },
})

