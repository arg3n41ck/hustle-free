import React from "react"
import InputPersonalData from "../../components/pages/LkAh/AthleteActivation/InputPersonalData"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function athlete() {
  return <InputPersonalData />
}

export default athlete

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})

