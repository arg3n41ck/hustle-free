import React from 'react'
import { PubAthTitles } from './PublicAthlete'
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router"

function Teams({ teams }) {
  if (!teams?.length) return null
  const {push: routerPush} = useRouter()
  const { t: tLkAh } = useTranslation('lkAh')

  return (
    <TeamsWrapper>
      <PubAthTitles>{tLkAh('teams')}</PubAthTitles>

      <ul>
        {teams.map(({ user: { avatar }, fullNameCoach, id }, i) => (
          <li key={`ATH-Teams-${i}`} onClick={() => routerPush(`/team/${id}`)}>
            <Avatar
              src={avatar}
              alt={`${avatar}`}
              sx={{ width: 64, height: 64 }}
            />
            <p>{fullNameCoach}</p>
          </li>
        ))}
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
  border-bottom: 1px solid #333;

  ul {
    li {
      display: flex;
      align-items: center;
      grid-column-gap: 16px;
      cursor: pointer;

      p {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #f2f2f2;
      }
    }
  }
`
