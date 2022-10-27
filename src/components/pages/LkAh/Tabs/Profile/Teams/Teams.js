import React from 'react'
import styled from 'styled-components'
import { Avatar, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { theme } from '../../../../../../styles/theme'

const getStatus = (status) => {
  switch (status) {
    case 'in_panding':
      return 'На модерации'
    case 'approved':
      return 'Участник'
    default:
      return ''
  }
}

function Teams({ athleteTeams, column, setOpenTeamsModal }) {
  const { push: routerPush } = useRouter()
  const xl = useMediaQuery('(max-width:1200px)')

  return (
    <>
      <TeamsWrapper>
        {!!athleteTeams?.length &&
          athleteTeams.map(({ id, team, status }) => (
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
                {/* <p>8287 wins / 8294 losses</p> */}
                <p>{team?.teamMembersCount || 0} Athletes</p>
                <p style={{ color: 'rgba(130, 130, 130, .5)' }}>{getStatus(status)}</p>
              </Texts>
            </TeamsContainer>
          ))}
        <JoinToTeamOuterWrapper>
          <JoinToTeam onClick={() => setOpenTeamsModal(true)}>
            <Plus />
            <p>Вступить в команду</p>
          </JoinToTeam>
        </JoinToTeamOuterWrapper>
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

  ${theme.mqMax('xl')} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  ${theme.mqMax('md')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${theme.mqMax('sm')} {
    grid-template-columns: 1fr;
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

const JoinToTeamOuterWrapper = styled.div`
  width: fit-content;
  padding: 32px;

  ${theme.mqMax('xl')} {
    padding: 16px;
  }

  ${theme.mqMax('sm')} {
    width: 100%;
  }
`

const JoinToTeam = styled.button`
  height: 205px;
  border: 1px dashed #828282;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-gap: 10px;
  padding: 16px;

  ${theme.mqMax('xl')} {
    height: unset;
    flex-direction: row;
  }

  ${theme.mqMax('sm')} {
    width: 100%;
  }

  p {
    font-weight: 400;
    font-size: 18px;
    color: #bdbdbd;
    text-align: start;
  }
`

const Plus = (props) => (
  <svg
    {...props}
    width='80'
    height='80'
    viewBox='0 0 80 80'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M40 20L40 60' stroke='#6D4EEA' stroke-width='4' stroke-linecap='round' />
    <path d='M60 40L20 40' stroke='#6D4EEA' stroke-width='4' stroke-linecap='round' />
  </svg>
)
