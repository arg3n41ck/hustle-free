import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import HorizontalTabsBorder from '../../ui/tabs/HorizontalTabsBorder'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { organizersSelector } from '../../../redux/components/organizers'
import { selectAthletes } from '../../../redux/components/athletes'
import { useSelector } from 'react-redux'
import { teamsSelector } from '../../../redux/components/teams'

const CommunitiesHead = () => {
  const { t: tCommunities } = useTranslation('communities')
  const router = useRouter()
  const [view, setView] = useState(router.pathname)
  const [, , countTeams] = useSelector(teamsSelector)
  const [, , countAthletes] = useSelector(selectAthletes)
  const [, countOrganizers] = useSelector(organizersSelector)

  const tabs = [
    {
      id: 1,
      value: '/communities/athletes',
      name: `${tCommunities('communities.athletes')} (${countAthletes})`,
    },
    {
      id: 2,
      value: '/communities/teams',
      name: `${tCommunities('communities.teams')} (${countTeams})`,
    },
    {
      id: 3,
      value: '/communities/organizers',
      name: `${tCommunities('communities.organizers')} (${countOrganizers})`,
    },
  ]

  useEffect(() => {
    router.push(view)
  }, [view])

  return (
    <Wrapper>
      <HorizontalTabsBorder
        arrayTab={tabs}
        valueTab={view}
        onChangeHandler={setView}
        height={'96px'}
      />
    </Wrapper>
  )
}

export default CommunitiesHead

const Wrapper = styled.div`
  margin: 0 0 32px 0;
`
