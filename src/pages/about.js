import React from "react"
import { Container } from "../components/ui/Wrappers/Container"
import { MainPageWrapper } from "../components/pages/MainPage/MainPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

const About = () => {
  const { t: tCommon } = useTranslation("common")

  return (
    <Container>
      <MainPageWrapper>{tCommon("more")}</MainPageWrapper>
    </Container>
  )
}

export default About

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})
