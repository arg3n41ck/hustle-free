import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../styles/theme'
import Image from 'next/image'

function HeroMainPageForNotAuth() {
  const user = useSelector((state) => state.user.user)
  const { t: tMainPageFotNotAuthUser } = useTranslation('mainPageForNotAuthUser')

  return (
    <HeroWrapper>
      <HeroInfo>
        <HeroInfoHeading>
          {tMainPageFotNotAuthUser('mainPage.hero.simplify')} <br />{' '}
          {tMainPageFotNotAuthUser('mainPage.hero.tournamentManagement')}
        </HeroInfoHeading>
        <HeroInfoDescription>
          {tMainPageFotNotAuthUser('mainPage.hero.bestParticipate')}
        </HeroInfoDescription>
        <HeroInfoButtons>
          <Link href={'/events/'} passHref>
            <a>
              <HeroInfoButtonForViewEvents>
                {tMainPageFotNotAuthUser('mainPage.hero.viewEvents')}
              </HeroInfoButtonForViewEvents>
            </a>
          </Link>
          {(!user || user.role === 'organizer') && (
            <Link href={!user ? '/#user-roles' : '/lk-og/profile/events/edit'}>
              <a>
                <HeroInfoButtonForCreateEvents>
                  {tMainPageFotNotAuthUser('mainPage.hero.viewEvent')}
                </HeroInfoButtonForCreateEvents>
              </a>
            </Link>
          )}
        </HeroInfoButtons>
      </HeroInfo>
      <Browser>
        <Image src='/assets/png/browser.png' width={739} height={500} objectFit={'cover'} />
      </Browser>
      <HeroBackgroundImage />
      <MainMobBg />
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

  ${theme.mqMax('md')} {
    padding-top: 65px;
  }
`

const MainMobBg = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
  z-index: 1;
  display: none;

  background: url('/assets/png/mobile_main_bg.png') center / cover;

  ${theme.mqMax('md')} {
    display: block;
  }
`

const HeroBackgroundImage = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  z-index: 1;

  background: no-repeat linear-gradient(0deg, rgba(98, 89, 232, 0.1), rgba(98, 89, 232, 0.3)),
    url('/assets/png/twoDutes.png') center / cover;
  background-blend-mode: multiply, normal;

  ${theme.mqMax('md')} {
    display: none;
  }
`

const Browser = styled.div`
  width: 100%;
  display: none;
  margin-top: 48px;
  z-index: 2;
  ${theme.mqMax('md')} {
    display: flex;
  }
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
  grid-gap: 32px;

  ${theme.mqMax('md')} {
    flex-direction: column;
    grid-gap: 16px;
  }
`

const HeroInfoButtonForViewEvents = styled.button`
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  padding: 15px 24px;
  max-width: 240px;
  width: 100%;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;

  ${theme.mqMax('md')} {
    font-size: 18px;
    padding: 10px 20px;
  }
`

const HeroInfoButtonForCreateEvents = styled.button`
  border: 1px solid #6d4eea;
  box-sizing: border-box;
  border-radius: 16px;
  max-width: 215px;
  width: 100%;

  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #6d4eea;
  padding: 15px 24px;
  ${theme.mqMax('md')} {
    font-size: 18px;
    padding: 10px 20px;
  }
`

const HeroInfoHeading = styled.h3`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 56px;
  color: #f2f2f2;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 16px;

  ${theme.mqMax('md')} {
    font-size: 30px;
  }
`

const HeroInfoDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  color: #f2f2f2;
  margin-bottom: 32px;

  ${theme.mqMax('md')} {
    font-size: 16px;
  }
`

export default HeroMainPageForNotAuth
