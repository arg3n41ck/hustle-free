import React from "react"
import { PubAthTitles } from "./PublicAthlete"
import styled from "styled-components"
import { Avatar } from "@mui/material"

function Teams({ teams }) {
  if (!teams?.length) return null

  return (
    <TeamsWrapper>
      <PubAthTitles>Команды</PubAthTitles>

      <ul>
        {teams.map(({ user: { avatar, fullName } }, i) => (
          <li key={`ATH-Teams-${i}`}>
            <Avatar
              src={`https://api.dev.hustlefree.pro${avatar}`}
              alt={`${avatar}`}
              sx={{ width: 64, height: 64 }}
            />
            <p>{fullName}</p>
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
