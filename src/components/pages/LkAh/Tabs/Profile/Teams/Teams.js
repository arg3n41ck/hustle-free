import React from 'react'
import styled from 'styled-components'
import { Avatar, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { theme } from '../../../../../../styles/theme'

function Teams({ athleteTeams, column }) {
  const { push: routerPush } = useRouter()
  const xl = useMediaQuery('(max-width:1200px)')

  return (
    <>
      <TeamsWrapper>
        {!!athleteTeams?.length &&
          athleteTeams.map(({ id, team }) => (
            <TeamsContainer key={id} column={column}>
              <Avatar
                alt={`${team?.user?.avatar || ''}`}
                src={team?.user?.avatar}
                sx={xl ? { width: 80, height: 80 } : { width: 104, height: 104 }}
              />
              <Texts>
                <TeamsHeadingText onClick={() => routerPush(`/team/${team?.id}`)}>
                  {team?.name}
                </TeamsHeadingText>
                <p>8287 wins / 8294 losses</p>
                <p>{team?.teamMembersCount || 0} Athletes</p>
              </Texts>
            </TeamsContainer>
          ))}
      </TeamsWrapper>
    </>
  )
}

export default Teams

const TeamsWrapper = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;

  ${theme.mqMax('md')} {
    justify-content: flex-start;
  }
`

const TeamsContainer = styled.div`
  margin: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 16px;

  ${theme.mqMax('xl')} {
    flex-direction: row;
    margin: 16px;
  }
`

const TeamsHeadingText = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
  cursor: pointer;
  text-align: center;
  margin-bottom: 8px;

  ${theme.mqMax('xl')} {
    text-align: start;
  }

  &:hover {
    text-decoration: underline;
  }
`

const Texts = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
    text-align: center;

    ${theme.mqMax('xl')} {
      text-align: start;
    }
  }
`
