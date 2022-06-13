import React from "react"
import CommunitiesAthletesPage from "../../components/pages/Communites/CommunitiesAthletesPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Athletes() {
  return (
    <div>
      <CommunitiesAthletesPage />
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "communities"])),
  },
})


export default Athletes
