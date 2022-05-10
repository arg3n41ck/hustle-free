import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Box, TextField } from "@mui/material"
import SearchIcon from "../../../../assets/svg/search-icon.svg"
import useDebounce from "../../../../hooks/useDebounce"
import $api from "../../../../services/axios"
import { useRouter } from "next/router"
import TeamItem from "./TeamItem"

const Teams = () => {
  const router = useRouter()
  const [teams, setTeams] = useState(null)
  const [search, setSearch] = useState("")
  const searchValue = useDebounce(search, 500)

  useEffect(async () => {
    const { data } = await $api.get(`events/event_teams/`, {
      params: {
        event_id: router.query.id,
        search: searchValue,
      },
    })
    setTeams(data)
  }, [searchValue])

  if (!teams) return null

  return (
    <>
      <TitleBlock sx={{ margin: "32px 0 16px 0" }} component={"h4"}>
        Поиск
      </TitleBlock>
      <Field>
        <TextField
          sx={{
            "& fieldset": {
              borderRadius: "16px 0 0 16px !important",
            },
          }}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          placeholder={"Поиск"}
        />
        <SearchButton>
          <SearchIcon />
          <span>Найти</span>
        </SearchButton>
      </Field>
      <TitleBlock sx={{ margin: "32px 0" }} component={"h4"}>
        Все команды
      </TitleBlock>
      <List>
        {teams.map((team, i) => (
          <TeamItem team={team} key={team.id} index={i + 1} />
        ))}
      </List>
    </>
  )
}

const TitleBlock = styled(Box)`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`
const Field = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`
const SearchButton = styled.button`
  display: flex;
  align-items: center;
  grid-column-gap: 11px;

  padding: 0 24px 0 20px;
  height: 64px;
  background: #333333;
  border-radius: 0 16px 16px 0;

  span {
    font-weight: 600;
    font-size: 20px;
    line-height: 48px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
  }
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
`

export default Teams
