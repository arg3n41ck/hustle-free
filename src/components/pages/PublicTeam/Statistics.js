import React from 'react'
import { useRouter } from 'next/router'
import Events from '../LkTm/Tabs/Statistics/Events'
import Awards from '../LkTm/Tabs/Statistics/Awards'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { theme } from '../../../styles/theme'

const Statistics = () => {
  const {
    query: { id: teamId },
  } = useRouter()
  const team = useSelector((state) => state.teams.team.team)

  return (
    <Wrapper>
      {team && (
        <Medals>
          <Awards places={team?.places} />
        </Medals>
      )}
      {teamId && <Events teamId={teamId} isPublic />}
    </Wrapper>
  )
}

export default Statistics

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 32px;

  ${theme.mqMax('xl')} {
    padding: 16px 0 0;
  }
`

const Medals = styled.div`
  padding: 0 32px;

  ${theme.mqMax('md')} {
    padding: 0;
  }
`
