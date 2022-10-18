import React from 'react'
import LkDefaultHeader from '../../../../ui/LKui/LKDefaultHeader'
import { TitleHeader } from '../../../../ui/LKui/HeaderContent'
import HorizontalTabsBorder from '../../../../ui/tabs/HorizontalTabsBorder'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAthleteStories, storiesSelector } from '../../../../../redux/components/stories'
import FilterMyStories from './Stories/FilterMyStories'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

function MyStories({ onToggleSidebar }) {
  const [view, setView] = React.useState('all') // all | wins | draws | defeats
  const dispatch = useDispatch()
  const {
    user: { user },
  } = useSelector((state) => state)
  const [athleteStories] = useSelector(storiesSelector)
  const { t: tLkAh } = useTranslation('lkAh')

  const tabs = [
    {
      id: 1,
      name: tLkAh('myHistory.tabs.all'),
      value: 'all',
    },
    {
      id: 2,
      name: tLkAh('myHistory.tabs.wins'),
      value: 'wins',
    },
    {
      id: 3,
      name: tLkAh('myHistory.tabs.draws'),
      value: 'draws',
    },
    {
      id: 4,
      name: tLkAh('myHistory.tabs.defeats'),
      value: 'defeats',
    },
  ]

  React.useEffect(() => {
    user && dispatch(fetchAthleteStories({ period: 'all', athlete: user?.athleteId }))
  }, [])

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>{tLkAh('myHistory.myHistory')}</TitleHeader>
      </LkDefaultHeader>
      <HorizontalTabsBorder
        arrayTab={tabs}
        valueTab={view}
        onChangeHandler={(value) => setView(value)}
        height={'96px'}
      >
        <MyStoriesWrapper>
          {!!athleteStories?.length &&
            athleteStories.map((item) => <FilterMyStories data={item} />)}
        </MyStoriesWrapper>
      </HorizontalTabsBorder>
    </div>
  )
}

export default MyStories

const MyStoriesWrapper = styled.div`
  min-height: 200px;
`
