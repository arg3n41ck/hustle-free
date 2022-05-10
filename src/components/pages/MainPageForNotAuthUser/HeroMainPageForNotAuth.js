import React from "react"
import styled from "styled-components"
import TwoDude from "../../../assets/png/twoDutes.png"
import Link from "next/link"
import { useSelector } from "react-redux"

function HeroMainPageForNotAuth() {
  const user = useSelector((state) => state.user.user)
  return (
    <HeroWrapper>
      <HeroInfo>
        <HeroInfoHeading>
          Упростите <br /> управление турнирами
        </HeroInfoHeading>
        <HeroInfoDescription>
          Самый лучший способ принимать участие, организовывать и следить за
          соревнованиями
        </HeroInfoDescription>
        <HeroInfoButtons>
          <Link href={"/events/"} passHref>
            <a>
              <HeroInfoButtonForViewEvents>
                Смотреть турниры
              </HeroInfoButtonForViewEvents>
            </a>
          </Link>
          {(!user || user.role === "organizer") && (
            <Link
              href={!user ? "/#user-roles" : "/lk-og/profile/events/edit"}
            >
              <a>
                <HeroInfoButtonForCreateEvents>
                  Создать турнир
                </HeroInfoButtonForCreateEvents>
              </a>
            </Link>
          )}
        </HeroInfoButtons>
      </HeroInfo>
      <HeroBackgroundImage twoDude={TwoDude} />
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
`

const HeroBackgroundImage = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  z-index: 1;

  background: no-repeat
      linear-gradient(0deg, rgba(98, 89, 232, 0.1), rgba(98, 89, 232, 0.3)),
    url(${({ twoDude }) => twoDude.src}) center / cover;
  background-blend-mode: multiply, normal;
`

const HeroInfo = styled.div`
  max-width: 769px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`

const HeroInfoButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-gap: 32px;
`

const HeroInfoButtonForViewEvents = styled.button`
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  padding: 0 24px;
  max-width: 240px;
  width: 100%;
  color: #ffffff;
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
  font-style: normal;
  height: 64px;
  font-weight: 600;
  font-size: 20px;
  line-height: 48px;
  color: #6d4eea;
  padding: 0 24px;
`

const HeroInfoHeading = styled.h3`
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: #f2f2f2;
  margin-bottom: 32px;
`

export default HeroMainPageForNotAuth
