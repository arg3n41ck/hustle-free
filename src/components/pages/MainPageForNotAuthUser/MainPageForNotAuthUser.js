import React, { useEffect } from 'react'
import { Container } from '../../ui/Wrappers/Container'
import EventsSlider from '../Events/EventsSlider'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents, selectEvents } from '../../../redux/components/events'
import Events from '../../ui/Events'
import HeroMainPageForNotAuth from './HeroMainPageForNotAuth'
import MainPageAuth from './MainPageAuth'
import { MainPageWrapper } from '../MainPage/MainPage'
import { fetchUser, selectIsUserAuth } from '../../../redux/components/user'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../styles/theme'

const MainPageForNotAuthUser = () => {
  const [, events] = useSelector(selectEvents)
  const dispatch = useDispatch()
  const { t: tMainPageFotNotAuthUser } = useTranslation('mainPageForNotAuthUser')
  const [userAuthenticated] = useSelector(selectIsUserAuth)
  const { push: routerPush } = useRouter()
  const user = useSelector((state) => state.user)
  let array = [...events]

  useEffect(() => {
    if (!user.user) dispatch(fetchUser())
    dispatch(fetchEvents({ status_publish: 'published' }))
  }, [])

  return (
    <>
      <Container>
        <MainPageForNotAuthUserWrapper>
          <HeroMainPageForNotAuth />
          {!userAuthenticated && (
            <MainPageWrapper id='user-roles'>
              <MainPageTitle className='type-main'>
                {tMainPageFotNotAuthUser('mainPage.forWhom')}
              </MainPageTitle>
              <MainPageAuth />
            </MainPageWrapper>
          )}
          <MainPageWrapper>
            <MainPageTitle>{tMainPageFotNotAuthUser('mainPage.popular')}</MainPageTitle>
            <EventsSlider events={events} />
            <MainPageContainerButtonAndTitle>
              <MainPageTitle>
                {tMainPageFotNotAuthUser('mainPage.upcomingTournaments')}
              </MainPageTitle>
              <MainPageButton onClick={() => routerPush('/events')}>
                {tMainPageFotNotAuthUser('mainPage.viewAll')}
              </MainPageButton>
            </MainPageContainerButtonAndTitle>
            <Events data={array.slice(0, 3)} />
          </MainPageWrapper>
        </MainPageForNotAuthUserWrapper>
      </Container>
    </>
  )
}

export default MainPageForNotAuthUser

const MainPageForNotAuthUserWrapper = styled.div`
  display: grid;
  grid-template: calc(100vh - 76px) auto / 1fr;
  grid-row-gap: 80px;

  ${theme.mqMax('md')} {
    display: grid;
    grid-template: auto auto / 1fr;
  }
`

const MainPageTitle = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #ffffff;

  &.type-main {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: 56px;
    line-height: 64px;
    text-align: center;
    text-transform: uppercase;
  }

  ${theme.mqMax('md')} {
    font-size: 20px !important;
    line-height: 32px !important;
  }
`

const MainPageButton = styled.button`
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 8px;
  max-width: 152px;
  width: 100%;
  height: 40px;
  padding: 0 20px;
`
const MainPageContainerButtonAndTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
