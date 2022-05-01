import React from "react"
import EDContentFilter from "../EDContentFilter"
import { Field } from "../../LkOg/Tabs/Events/EventDefaults"
import { Autocomplete } from "@mui/lab"
import { TextField } from "@mui/material"
import { TitleBlock } from "./Participants"
import styled from "styled-components"

const Filter = ({ onFilter }) => {
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
              onChange={(_, value) => console.log("typeSport", value)}
              options={[].map((option) => option)}
              // getOptionLabel={(option) => option.name}
              fullWidth
              // value={sportTypes.find(({ id }) => id === values.typeSport) || null}
              renderInput={(params) => (
                <TextField {...params} fullWidth placeholder="Категории" />
              )}
            />
          </Field>
          <Field>
            <p className="auth-title__input">Страна</p>
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
              onChange={(_, value) => console.log("typeSport", value)}
              options={[].map((option) => option)}
              // getOptionLabel={(option) => option.name}
              fullWidth
              // value={sportTypes.find(({ id }) => id === values.typeSport) || null}
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
              onChange={(_, value) => console.log("typeSport", value)}
              options={[].map((option) => option)}
              // getOptionLabel={(option) => option.name}
              fullWidth
              // value={sportTypes.find(({ id }) => id === values.typeSport) || null}
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
