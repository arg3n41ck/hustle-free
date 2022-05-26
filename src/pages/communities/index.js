import React from "react"
import { Container } from "../../components/ui/Wrappers/Container"
import { MainPageWrapper } from "../../components/pages/MainPage/MainPage"
import CommunitesMainPage from "../../components/pages/Communites/CommunitesMainPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const About = () => {
  return (
    <Container>
      <MainPageWrapper>
        <CommunitesMainPage />
      </MainPageWrapper>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})

export default About
