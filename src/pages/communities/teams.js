import React from "react"
import CommunitesPage from "../../components/pages/Communites/CommunitesTeamsPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Teams() {
  return (
    <div>
      <CommunitesPage />
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "header",
      "common",
      "communities",
      "footer",
    ])),
  },
})

export default Teams
