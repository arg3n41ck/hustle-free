import React from "react"
import EDContentFilter from "../EDContentFilter"
import { Field } from "../../LkOg/Tabs/Events/EventDefaults"
import { Autocomplete } from "@mui/lab"
import { TextField } from "@mui/material"
import { Fields } from "../Results/Participants"
import { useSelector } from "react-redux"
import { selectCountriesAndCities } from "../../../../redux/components/countriesAndCities"

const Filters = ({ levels, onFilter, filter }) => {
  const [countries] = useSelector(selectCountriesAndCities)

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
              // onChange={(_, value) => setFieldValue("typeSport", value.id)}
              options={[].map((option) => option)}
              // getOptionLabel={(option) => option.name}
              fullWidth
              // value={sportTypes.find(({ id }) => id === values.typeSport) || null}
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
            <p className="auth-title__input">Пол</p>
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
                <TextField {...params} fullWidth placeholder="Пол" />
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
              options={Array.from(Array(130).keys())
                .slice(20)
                .map((option) => option)}
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
