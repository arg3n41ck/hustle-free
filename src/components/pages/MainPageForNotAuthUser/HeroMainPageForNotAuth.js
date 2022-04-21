import React from "react"
import styled from "styled-components"
import twoDude from "../../../public/jpg/twodude.jpg"
import Image from "next/image"

function HeroMainPageForNotAuth() {
  return (
    <HeroWrapper>
      {/* <Image src={twoDude} /> */}
      <HeroInfo>
        <HeroInfoHeading>
          Упростите <br /> управление турнирами
        </HeroInfoHeading>
        <HeroInfoDescription>
          Самый лучший способ принимать участие, организовывать и следить за
          соревнованиями
        </HeroInfoDescription>
        <HeroInfoButtons>
          <HeroInfoButtonForViewEvents>
            Смотреть турниры
          </HeroInfoButtonForViewEvents>
          <HeroInfoButtonForCreateEvents>
            Создать турнир
          </HeroInfoButtonForCreateEvents>
        </HeroInfoButtons>
      </HeroInfo>
      <HeroBackgroundImage />
    </HeroWrapper>
  )
}

const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
`

const HeroInfo = styled.div`
  max-width: 769px;
  display: flex;
  flex-direction: column;
  align-items:center;
`

const HeroInfoButtons = styled.div`
  max-width: 481px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeroInfoButtonForViewEvents = styled.button`
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  padding: 0px 24px;
  max-width: 240px;
  width: 100%;
  color: #ffffff;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  height: 64px;
  font-size: 20px;
  line-height: 48px;
`

const HeroInfoButtonForCreateEvents = styled.button`
  border: 1px solid #6d4eea;
  box-sizing: border-box;
  border-radius: 16px;
  max-width: 215px;
  width: 100%;
  font-family: "Inter";
  font-style: normal;
  height: 64px;
  font-weight: 600;
  font-size: 20px;
  line-height: 48px;
  color: #6d4eea;
  padding: 0px 24px;
`

const HeroInfoHeading = styled.h3`
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-size: 56px;
  line-height: 64px;
  color: #f2f2f2;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 16px;
`

const HeroInfoDescription = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: #f2f2f2;
  margin-bottom: 32px;
`

const HeroBackgroundImage = styled.div`
  background-image: url(${twoDude});
  position: absolute;
  background-repeat: no-repeat;
  z-index: 1;
  width: 100%;
  height: 1000px;
`

export default HeroMainPageForNotAuth
