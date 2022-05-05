import React, { useEffect, useState } from "react"
import EDContentFilter from "../EDContentFilter"
import { Field } from "../../LkOg/Tabs/Events/EventDefaults"
import { Autocomplete } from "@mui/lab"
import { TextField } from "@mui/material"
import { TitleBlock } from "./Participants"
import styled from "styled-components"
import $api from "../../../../services/axios"
import { useSelector } from "react-redux"
import { selectCountriesAndCities } from "../../../../redux/components/countriesAndCities"
import { useRouter } from "next/router"

const Filter = ({ onFilter }) => {
  const [teams, setTeams] = useState([])
  const [categories, setCategories] = useState([])
  const [countries] = useSelector(selectCountriesAndCities)
  const router = useRouter()

  useEffect(async () => {
    const { data } = await $api.get(`/events/event_teams/`)
    const { data: categoriesData } = await $api.get(
      `/events/events/${router.query.id}/categories/`
    )
    setCategories(categoriesData)
    setTeams(data)
  }, [])

  return (
    <>
      <TitleBlock sx={{ margin: "32px 0 -16px 0" }} component={"h4"}>
        Поиск
      </TitleBlock>
      <EDContentFilter
        onSearch={(value) =>
          onFilter({
            target: {
              name: "search",
              value: value || "",
            },
          })
        }
      >
        <Fields>
          <Field>
            <p className="auth-title__input">Категории</p>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "20px 68px 20px 20px",
                },
                "& .MuiAutocomplete-endAdornment": {
                  right: "20px !important",
                },
              }}
              noOptionsText={"Ничего не найдено"}
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: "id",
                    value: value?.id || "",
                  },
                })
              }
              options={categories.map((option) => option)}
              getOptionLabel={(option) => option.eventParticipantsCategory.name}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} fullWidth placeholder="Категории" />
              )}
            />
          </Field>

          <Field>
            <p className="auth-title__input">Страна</p>
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: "countryId",
                    value:
                      countries.find((country) => country.name === value)?.id ||
                      "",
                  },
                })
              }
              options={countries.map((option) => option.name)}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} fullWidth placeholder="Страна" />
              )}
            />
          </Field>

          <Field>
            <p className="auth-title__input">Команда</p>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "20px 68px 20px 20px",
                },
                "& .MuiAutocomplete-endAdornment": {
                  right: "20px !important",
                },
              }}
              noOptionsText={"Ничего не найдено"}
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: "teamId",
                    value: value?.id || "",
                  },
                })
              }
              options={teams.map((option) => option.team)}
              getOptionLabel={(option) => option.name}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} fullWidth placeholder="Команда" />
              )}
            />
          </Field>
        </Fields>
      </EDContentFilter>
    </>
  )
}

export const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 32px;
`

export default Filter
