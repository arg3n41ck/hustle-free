import { useMediaQuery } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../../../../styles/theme'
import { PlaceIcon } from '../../../../LkAh/Tabs/Profile/Stories/FilterMyStories'
import StoryCollapse from '../../../../LkAh/Tabs/Profile/Stories/StoryCollapse'

export default function RowDetails({ participants }) {
  const md = useMediaQuery('(max-width: 756px)')

  return (
    <ListWrapper>
      {!!participants?.length ? (
        participants.map(({ athleteName, place, fightsHistory }, index) => (
          <Wrapper>
            <AthleteWrapper key={`statistic-athlete-${index}`}>
              <PlaceIcon place={place || 0} size={md ? 48 : 104} />
              <AthleteName>{athleteName}</AthleteName>
            </AthleteWrapper>
            {!!fightsHistory.length && <StoryCollapse fightsHistory={fightsHistory} />}
          </Wrapper>
        ))
      ) : (
        <p>Нет участников</p>
      )}
    </ListWrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #333;
`

const AthleteWrapper = styled.div`
  display: grid;
  grid-template: 1fr / 105px auto;
  grid-gap: 16px;
  align-items: center;
  justify-items: flex-start;

  ${theme.mqMax('md')} {
    grid-template: 1fr / 48px auto;
  }
`

const AthleteName = styled.p`
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
  text-transform: uppercase;
  color: #f2f2f2;

  ${theme.mqMax('md')} {
    font-size: 20px;
    line-height: 32px;
  }
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 32px;

  padding: 32px;
  border-top: 1px solid #333;

  ${theme.mqMax('xl')} {
    padding: 20px;
    grid-gap: 20px;
  }

  ${theme.mqMax('md')} {
    padding: 16px;
    grid-gap: 16px;
  }
`
