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
      <ResultsChart wins={statistics?.winsCount || 0} defeats={statistics?.defeats || 0} />
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
