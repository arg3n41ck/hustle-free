import React, { useEffect, useState } from "react"
import EDContentFilter from "../EDContentFilter"
import { Field } from "../../LkOg/Tabs/Events/EventDefaults"
import { Autocomplete } from "@mui/lab"
import { TextField } from "@mui/material"
import { Fields } from "../Results/Participants"
import { useSelector } from "react-redux"
import { selectCountriesAndCities } from "../../../../redux/components/countriesAndCities"
import $api from "../../../../services/axios"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

const Filters = ({ levels, onFilter }) => {
  const [weights, setWeights] = useState([])
  const [countries] = useSelector(selectCountriesAndCities)
  const [teams, setTeams] = useState([])
  const { t: tCommon } = useTranslation("common")
  const router = useRouter()

  useEffect(async () => {
    const { data } = await $api.get(`events/event_teams/`)
    const { data: weightData } = await $api.get(
      `/events/events/${router.query.id}/weight_ranges/`
    )
    setWeights(weightData)
    setTeams(data)
  }, [])

  return (
    <>
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

          <Field>
            <p className="auth-title__input">Уровень</p>
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
                    name: "level",
                    value,
                  },
                })
              }
              options={levels.map((option) => option.name)}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} fullWidth placeholder="Уровень" />
              )}
            />
          </Field>

          <Field>
            <p className="auth-title__input">{tCommon('form.fieldsNames.gender.label')}</p>
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
                    name: "gender",
                    value,
                  },
                })
              }
              options={["Мужчина", "Женщина"].map((option) => option)}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} fullWidth placeholder={tCommon('form.fieldsNames.gender.label')} />
              )}
            />
          </Field>

          <Field>
            <p className="auth-title__input">Вес</p>
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
                    name: "weight",
                    value,
                  },
                })
              }
              options={weights.map((option) => option)}
              getOptionLabel={(option) =>
                `${option.fromWeight} - ${option.toWeight}`
              }
              fullWidth
              renderInput={(params) => (
                <TextField {...params} fullWidth placeholder="Вес" />
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
        </Fields>
      </EDContentFilter>
    </>
  )
}

export default Filters
