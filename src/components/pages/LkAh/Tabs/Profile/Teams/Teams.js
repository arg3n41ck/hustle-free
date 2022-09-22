import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { theme } from '../../../../../../styles/theme'
import TeamsModalTemplate from './TeamsModalTemplate'

function Teams({ athleteTeams, column }) {
  const { push: routerPush } = useRouter()
  const [open, setOpen] = useState(false)
  const xl = useMediaQuery('(max-width:1200px)')

  return (
    <>
      <TeamsWrapper>
        {!!athleteTeams?.length &&
          athleteTeams.map((data) => (
            <TeamsContainer key={data?.id} column={column}>
              <Avatar
                alt={`${data?.user?.avatar || ''}`}
                src={data?.user?.avatar}
                sx={xl ? { width: 80, height: 80 } : { width: 104, height: 104 }}
              />
              <Texts>
                <TeamsHeadingText onClick={() => routerPush(`/team/${data?.id}`)}>
                  {data?.name}
                </TeamsHeadingText>
                <p>8287 wins / 8294 losses</p>
                <p>{data?.teamMembersCount || 0} Athletes</p>
              </Texts>
            </TeamsContainer>
          ))}
        <JoinToTeam onClick={() => setOpen(true)}>
          <Plus />
          <p>Вступить в команду</p>
        </JoinToTeam>
      </TeamsWrapper>
      <TeamsModalTemplate open={open} onClose={() => setOpen(false)} />
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

const JoinToTeam = styled.button`
  height: 205px;

  border: 1px dashed #828282;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;

  margin: 32px;
  padding: 16px;

  ${theme.mqMax('sm')} {
    height: 148px;
    margin: 16px;
    width: 100%;
  }

  ${theme.mqMax('xl')} {
    margin: 16px;
  }

  p {
    font-weight: 400;
    font-size: 18px;
    color: #bdbdbd;
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
