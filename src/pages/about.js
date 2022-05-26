import React  from "react"
import { Container } from "../components/ui/Wrappers/Container"
import { MainPageWrapper } from "../components/pages/MainPage/MainPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const About = () => {

  return (
    <Container>
      <MainPageWrapper>
        Подробнее
      </MainPageWrapper>
    </Container>
  )
}

export default About

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})

