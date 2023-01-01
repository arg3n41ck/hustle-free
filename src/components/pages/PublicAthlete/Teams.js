import React from 'react'
import { PubAthTitles } from './PublicAthlete'
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

function Teams({ teams }) {
  if (!teams?.length) return null
  const { push: routerPush } = useRouter()
  const { t: tLkAh } = useTranslation('lkAh')

  return (
    <TeamsWrapper>
      <PubAthTitles>{tLkAh('teams')}</PubAthTitles>

      <ul>
        {!!teams?.length ? (
          teams.map(({ user: { avatar }, name, id, athletes }, i) => (
            <li key={`ATH-Teams-${i}`} onClick={() => routerPush(`/team/${id}`)}>
              <Avatar src={avatar} alt={`${avatar}`} sx={{ width: 104, height: 104 }} />
              <p>{name}</p>
              <span>{athletes?.length} Athletes</span>
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
  border-bottom: 1px solid #333;

  ul {
    display: flex;
    grid-row-gap: 24px;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      grid-column-gap: 16px;
      cursor: pointer;

      p {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        margin: 16px 0 8px;
        color: #f2f2f2;
      }

      span {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #828282;
      }
    }
  }
`
