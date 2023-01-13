import React from 'react'
import LkDefaultHeader from '../../../../ui/LKui/LKDefaultHeader'
import { TitleHeader } from '../../../../ui/LKui/HeaderContent'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAthleteStatistics,
  fetchAthleteStories,
  storiesSelector,
} from '../../../../../redux/components/stories'
import FilterMyStories from './Stories/FilterMyStories'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import ResultsChart from './Stories/ResultsChart'
import { theme } from '../../../../../styles/theme'

function MyStories({ onToggleSidebar }) {
  const dispatch = useDispatch()
  const {
    user: { user },
  } = useSelector((state) => state)
  const [athleteStories] = useSelector(storiesSelector)
  const { statistics } = useSelector((state) => state?.stories?.statistics)
  const { t: tLkAh } = useTranslation('lkAh')

  React.useEffect(() => {
    if (user?.athleteId) {
      dispatch(fetchAthleteStories({ athleteId: user?.athleteId }))
      dispatch(fetchAthleteStatistics({ athleteId: user?.athleteId }))
    }
  }, [user])

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>{tLkAh('myHistory.myHistory')}</TitleHeader>
      </LkDefaultHeader>
      <ResultStatsWrapper>
        <ResultsChart wins={statistics?.winsCount || 0} defeats={statistics?.loses || 0} />
        <Legends>
          <li>
            <span>{statistics?.winsCount || 0} </span>побед
          </li>
          <li>
            <span>{statistics?.loses || 0} </span>поражений
          </li>
        </Legends>
      </ResultStatsWrapper>
      <MyStoriesWrapper>
        {!!athleteStories?.length && athleteStories.map((item) => <FilterMyStories data={item} />)}
      </MyStoriesWrapper>
    </div>
  )
}

export default MyStories

const MyStoriesWrapper = styled.div`
  min-height: 200px;
`

const ResultStatsWrapper = styled.div`
  display: grid;
  grid-template: 1fr / min-content 1fr;
  gap: 20px;
  padding: 32px;
  border-bottom: 1px solid #333;

  @media screen and (max-width: 576px) {
    grid-template: 143px min-content / 1fr;
  }

  ${theme.mqMax('md')} {
    padding: 16px;
  }
`

const Legends = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;

  li {
    font-size: 32px;
    line-height: 150%;
    display: grid;
    grid-template: 1fr/ 32px auto;
    grid-gap: 10;

    @media screen and (max-width: 576px) {
      display: flex;
      justify-content: center;
      grid-gap: 10px;
      font-size: 24px;
      text-align: center;
    }

    & span {
      justify-self: center;
      font-weight: 700;
    }
  }

  li:first-child {
    & span {
      color: #27ae60;
    }
  }
  li:nth-child(2) {
    & span {
      color: #eb5757;
    }
  }
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
