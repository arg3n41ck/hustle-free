import React from "react"
import { Container } from "../components/ui/Wrappers/Container"
import { MainPageWrapper } from "../components/pages/MainPage/MainPage"
import CommunitesMainPage from "../components/pages/Communites/CommunitesMainPage"

const About = () => {
  return (
    <Container>
      <MainPageWrapper>
        <CommunitesMainPage />
      </MainPageWrapper>
    </Container>
  )
}

export default About
