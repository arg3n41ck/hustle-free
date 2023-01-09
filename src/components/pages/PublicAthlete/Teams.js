import React from 'react'
import { PubAthTitles } from './PublicAthlete'
import styled from 'styled-components'
import { Avatar, useMediaQuery } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { theme } from '../../../styles/theme'

function Teams({ teams }) {
  if (!teams?.length) return null
  const { push: routerPush } = useRouter()
  const md = useMediaQuery('(max-width: 768px)')
  const avaSize = md ? { width: 80, height: 80 } : { width: 104, height: 104 }
  const { t: tLkAh } = useTranslation('lkAh')

  return (
    <TeamsWrapper>
      <PubAthTitles>{tLkAh('teams')}</PubAthTitles>

      <ul>
        {!!teams?.length ? (
          teams.map(({ user: { avatar }, name, id, athletes }, i) => (
            <li key={`ATH-Teams-${i}`} onClick={() => routerPush(`/team/${id}`)}>
              <Avatar src={avatar} alt={`${avatar}`} sx={avaSize} />
              <TeamDetails>
                <p>{name}</p>
                <span>{athletes?.length} Athletes</span>
              </TeamDetails>
            </li>
          ))
        ) : (
          <li>
            <p>Этот атлет не участвует ни в одной команде</p>
          </li>
        )}
      </ul>
    </TeamsWrapper>
  )
}

export default Teams

const TeamsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
  padding: 32px;
  background: #141519;
  border-radius: 8px;

  ${theme.mqMax('xl')} {
    padding: 16px;
  }

  ul {
    display: flex;
    grid-row-gap: 24px;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      grid-gap: 16px;
      cursor: pointer;

      ${theme.mqMax('md')} {
        flex-direction: row;
      }
    }
  }
`

const TeamDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${theme.mqMax('md')} {
    align-items: flex-start;
  }

  p {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #f2f2f2;
  }

  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
  }
`
