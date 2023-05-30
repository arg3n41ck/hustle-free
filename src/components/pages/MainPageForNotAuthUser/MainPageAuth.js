import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { localStorageSetItem } from '../../../helpers/helpers'
import { useDispatch } from 'react-redux'
import { exitUser } from '../../../redux/components/user'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../styles/theme'

function MainPageAuth() {
  const router = useRouter()
  const { t: tMainPageFotNotAuthUser } = useTranslation('mainPageForNotAuthUser')
  const dispatch = useDispatch()
  const handleClick = (role) => {
    localStorageSetItem('role', role)
    router.push('/registration')
  }

  const { current: array } = useRef([
    {
      id: 1,
      value: 'athlete',
      heading: tMainPageFotNotAuthUser('mainPage.auth.forAthletes'),
      description: tMainPageFotNotAuthUser('mainPage.auth.forAthletesDesc'),
      icon: athIcon,
    },
    {
      id: 2,
      value: 'organizer',
      heading: tMainPageFotNotAuthUser('mainPage.auth.forOrganizers'),
      description: tMainPageFotNotAuthUser('mainPage.auth.forOrganizersDesc'),
      icon: orgIcon,
    },
    {
      id: 3,
      value: 'team',
      heading: tMainPageFotNotAuthUser('mainPage.auth.forTeams'),
      description: tMainPageFotNotAuthUser('mainPage.auth.forTeamsDesc'),
      icon: teamIcon,
    },
  ])

  useEffect(() => {
    dispatch(exitUser())
  }, [])

  return (
    <MainWrapper>
      <ContainerCards>
        {array
          .filter(({ id }) => id)
          .map((item) => (
            <Card key={item.id}>
              {item.icon}
              <Texts>
                <CardTextHeading>{item.heading}</CardTextHeading>
                <CardTextDesc>{item.description}</CardTextDesc>
              </Texts>
              <CardButton onClick={() => handleClick(item.value)}>
                {tMainPageFotNotAuthUser('mainPage.auth.signUp')}
              </CardButton>
            </Card>
          ))}
      </ContainerCards>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  width: 100%;
  ${theme.mqMax('md')} {
    overflow: auto;
  }
`

const ContainerCards = styled.div`
  display: flex;
  grid-gap: 32px;
  flex-wrap: wrap;
  align-items: center;
  justify-items: center;
  justify-content: center;

  ${theme.mqMax('md')} {
    grid-gap: 16px;
  }
`

const Card = styled.div`
  max-width: 448px;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template: 128px auto 48px / 1fr;
  grid-row-gap: 24px;
  justify-items: center;

  padding: 32px;
  border-radius: 16px;
  background: #1b1c22;

  ${theme.mqMin('xl')} {
    & svg {
      width: 128px;
      height: 128px;
    }
  }

  ${theme.mqMax('xl')} {
    grid-template: 72px auto 48px / 1fr;
    grid-row-gap: 16px;
  }
`

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
`

const CardTextHeading = styled.h3`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: #f2f2f2;
  text-align: center;
  text-transform: uppercase;

  ${theme.mqMax('md')} {
    font-size: 20px;
  }
`

const CardTextDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-size: 21px;
  color: #f2f2f2;
  text-align: center;
  text-transform: lowercase;

  ${theme.mqMax('md')} {
    font-size: 14px;
    color: #737373;
  }
`

const CardButton = styled.button`
  background: rgba(109, 78, 234, 0.07);
  border-radius: 8px;
  width: 100%;
  color: #6d4eea;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 48px;
`

export default MainPageAuth

const orgIcon = (
  <svg width='72' height='72' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g opacity='0.7' clipPath='url(#clip0_5273_39638)'>
      <circle cx='36' cy='36' r='36' fill='#6D4EEA' fillOpacity='0.1' />
      <path
        d='M47.4767 48.6081C48.3059 48.4353 48.7997 47.5676 48.3877 46.8275C47.4793 45.196 46.0483 43.7623 44.2176 42.6698C41.8599 41.2627 38.9712 40.5 35.9994 40.5C33.0275 40.5 30.1388 41.2627 27.7811 42.6698C25.9504 43.7623 24.5194 45.196 23.611 46.8275C23.199 47.5675 23.6928 48.4353 24.522 48.6081C32.0923 50.1857 39.9064 50.1857 47.4767 48.6081Z'
        fill='#6D4EEA'
      />
      <path
        d='M43.4993 30C43.4993 34.1421 40.1415 37.5 35.9993 37.5C31.8572 37.5 28.4993 34.1421 28.4993 30C28.4993 25.8579 31.8572 22.5 35.9993 22.5C40.1415 22.5 43.4993 25.8579 43.4993 30Z'
        fill='#6D4EEA'
      />
    </g>
    <defs>
      <clipPath id='clip0_5273_39638'>
        <rect width='72' height='72' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

const teamIcon = (
  <svg width='72' height='72' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g opacity='0.7' clipPath='url(#clip0_5274_39974)'>
      <circle cx='36' cy='36' r='36' fill='#6D4EEA' fillOpacity='0.1' />
      <path
        d='M49.75 44.75C49.75 45.0815 49.6183 45.3994 49.3839 45.6339C49.1495 45.8683 48.8315 46 48.5 46H33.5C33.1685 46 32.8505 45.8683 32.6161 45.6339C32.3817 45.3994 32.25 45.0815 32.25 44.75C32.25 42.7609 33.0402 40.8532 34.4467 39.4467C35.8532 38.0402 37.7609 37.25 39.75 37.25H42.25C44.2391 37.25 46.1468 38.0402 47.5533 39.4467C48.9598 40.8532 49.75 42.7609 49.75 44.75ZM41 26C40.0111 26 39.0444 26.2932 38.2222 26.8427C37.3999 27.3921 36.759 28.173 36.3806 29.0866C36.0022 30.0002 35.9032 31.0055 36.0961 31.9754C36.289 32.9453 36.7652 33.8363 37.4645 34.5355C38.1637 35.2348 39.0547 35.711 40.0246 35.9039C40.9945 36.0968 41.9998 35.9978 42.9134 35.6194C43.8271 35.241 44.608 34.6001 45.1574 33.7778C45.7068 32.9556 46 31.9889 46 31C46 29.6739 45.4732 28.4021 44.5355 27.4645C43.5979 26.5268 42.3261 26 41 26ZM29.75 26C28.7611 26 27.7944 26.2932 26.9722 26.8427C26.1499 27.3921 25.509 28.173 25.1306 29.0866C24.7522 30.0002 24.6531 31.0055 24.8461 31.9754C25.039 32.9453 25.5152 33.8363 26.2145 34.5355C26.9137 35.2348 27.8046 35.711 28.7746 35.9039C29.7445 36.0968 30.7498 35.9978 31.6634 35.6194C32.5771 35.241 33.3579 34.6001 33.9074 33.7778C34.4568 32.9556 34.75 31.9889 34.75 31C34.75 29.6739 34.2232 28.4021 33.2855 27.4645C32.3479 26.5268 31.0761 26 29.75 26ZM29.75 44.75C29.7481 43.437 30.0068 42.1367 30.5111 40.9244C31.0153 39.7121 31.7551 38.6119 32.6875 37.6875C31.9244 37.3994 31.1157 37.2512 30.3 37.25H29.2C27.3578 37.2533 25.5919 37.9866 24.2893 39.2892C22.9866 40.5919 22.2533 42.3577 22.25 44.2V44.75C22.25 45.0815 22.3817 45.3994 22.6161 45.6339C22.8505 45.8683 23.1685 46 23.5 46H29.975C29.8295 45.5991 29.7534 45.1764 29.75 44.75Z'
        fill='#6D4EEA'
      />
    </g>
    <defs>
      <clipPath id='clip0_5274_39974'>
        <rect width='72' height='72' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

const athIcon = (
  <svg width='72' height='72' viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g opacity='0.7' clipPath='url(#clip0_5274_39918)'>
      <circle cx='36' cy='36' r='36' fill='#6D4EEA' fillOpacity='0.1' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M24 31.6569C24 30.8394 24 30.4306 24.1522 30.0631C24.3045 29.6955 24.5935 29.4065 25.1716 28.8284L25.1716 28.8284L27.3284 26.6716C27.9065 26.0935 28.1955 25.8045 28.5631 25.6522C28.9306 25.5 29.3394 25.5 30.1569 25.5H41.8431C42.6606 25.5 43.0694 25.5 43.4369 25.6522C43.8045 25.8045 44.0935 26.0935 44.6716 26.6716L46.8284 28.8284C47.4065 29.4065 47.6955 29.6955 47.8478 30.0631C48 30.4306 48 30.8394 48 31.6569V33.5H24V31.6569ZM40.9998 35.5H48V44C48 45.8856 48 46.8284 47.4142 47.4142C46.8284 48 45.8856 48 44 48H28C26.1144 48 25.1716 48 24.5858 47.4142C24 46.8284 24 45.8856 24 44V35.5H30.9998V41.5C30.9998 42.6472 30.9998 43.2208 31.1481 43.5291C31.4793 44.2173 32.2747 44.5468 32.9956 44.2944C33.3185 44.1813 33.7241 43.7757 34.5353 42.9645L34.5353 42.9644C34.911 42.5887 35.0989 42.4009 35.2986 42.2953C35.7373 42.0633 36.2622 42.0633 36.7009 42.2953C36.9006 42.4009 37.0885 42.5888 37.4642 42.9645C38.2754 43.7757 38.681 44.1813 39.0039 44.2944C39.7248 44.5468 40.5202 44.2173 40.8514 43.5291C40.9998 43.2208 40.9998 42.6472 40.9998 41.5V35.5Z'
        fill='#6D4EEA'
      />
    </g>
    <defs>
      <clipPath id='clip0_5274_39918'>
        <rect width='72' height='72' fill='white' />
      </clipPath>
    </defs>
  </svg>
)
