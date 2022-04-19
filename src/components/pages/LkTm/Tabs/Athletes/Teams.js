import React from "react"
import styled from "styled-components"
import { Avatar } from "@mui/material"

const Teams = ({ teams }) => {
  if (!teams) return null
  return (
    <List>
      {teams.results.map((team) => (
        <TeamItem teamItem={team} />
      ))}
    </List>
  )
}
const List = styled.ul`
  margin: 32px;
  display: grid;
  grid-template: 100px / repeat(3, 1fr);
  grid-gap: 16px;
`
export default Teams

const TeamItem = ({ teamItem }) => {
  const { user } = teamItem?.athlete
  return (
    <Item>
      <Avatar
        alt={`${user?.firstName} ${user?.lastName}`}
        src={user?.avatar}
        sx={{ width: "100%", height: "100%" }}
      />
      <div>
        <ItemTitle>
          {user?.firstName} {user?.lastName}
        </ItemTitle>
        <ItemDescription>{user?.country}</ItemDescription>
      </div>
    </Item>
  )
}
const Item = styled.li`
  background: #1b1c22;
  border: 1px solid #333333;
  border-radius: 16px;
  width: 100%;
  padding: 24px;
  display: grid;
  grid-template: 48px / 48px 1fr;
  grid-gap: 16px;
`
const ItemTitle = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
  white-space: nowrap;
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #bdbdbd;
`
