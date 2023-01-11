import React from 'react'
import styled from 'styled-components'
import Athlete from '../../ui/Ahtletes/Athlete'
import { theme } from '../../../styles/theme'

function CommunitesAthletesList({ data }) {
  return (
    <CommunitesAthletesListItems>
      {!!data?.length &&
        data.map((item) => {
          const { id, user, teams, statistic } = item
          return (
            <Athlete
              key={`communities-${id}-${user?.id}`}
              athleteId={id}
              team={teams[0]}
              user={user}
              statistic={statistic}
            ></Athlete>
          )
        })}
    </CommunitesAthletesListItems>
  )
}

export default CommunitesAthletesList

const CommunitesAthletesListItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 32px;

  ${theme.mqMax('lg')} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
  }

  ${theme.mqMax('md')} {
    grid-template-columns: 1fr;
  }
`
