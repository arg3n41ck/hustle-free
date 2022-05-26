import React, { useCallback, useMemo } from "react"
import { Autocomplete, TextField } from "@mui/material"
import useQuery from "../../../../hooks/useQuery"
import { useSelector } from "react-redux"
import { selectCountriesAndCities } from "../../../../redux/components/countriesAndCities"
import { useRouter } from "next/router"
import styled from "styled-components"
import { useTranslation } from "next-i18next"

const encDecACOptions = [
  { name: "По убыванию", value: "increase" },
  { name: "По возрастанию", value: "decrease" },
]
const genderACOptions = [
  { name: "Мужской", value: "male" },
  { name: "Женский", value: "female" },
]

function Autocompletes({ levelOptions }) {
  const query = useQuery()
  const [countries] = useSelector(selectCountriesAndCities)
  const { push: routerPush } = useRouter()
  const { t: tCommon } = useTranslation("common")
  const {
    query: {
      id: eventId,
      level: levelQValue,
      gender: genderQValue,
      weight: weightQValue,
      age: ageQValue,
    },
  } = useRouter()

  const handleFilter = useCallback(
    (name, value) => {
      value ? query.set(name, value) : query.delete(name)
      routerPush(`/events/${eventId}/categories/?${query}`)
    },
    [query]
  )

  const levelACValue = levelOptions?.length
    ? levelOptions?.find((type) => type === levelQValue)
    : null

  const genderACValue = useMemo(
    () => genderACOptions.find((type) => type.value === genderQValue),
    [genderQValue]
  )
  const weightACValue = useMemo(
    () => encDecACOptions.find((type) => type.value === weightQValue),
    [weightQValue]
  )
  const ageACValue = useMemo(
    () => encDecACOptions.find((type) => type.value === ageQValue),
    [ageQValue]
  )

  return (
    <ACWrapper>
      {!!countries?.length && (
        <Autocomplete
          noOptionsText={"Ничего не найдено"}
          onChange={(e, value) => handleFilter("level", value)}
          options={levelOptions}
          getOptionLabel={(option) => option}
          value={levelACValue}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              placeholder="Уровень"
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
        />
      )}
      <Autocomplete
        noOptionsText={"Ничего не найдено"}
        onChange={(e, value) => handleFilter("gender", value?.value || null)}
        options={genderACOptions}
        getOptionLabel={(option) => option.name}
        value={genderACValue}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder={tCommon('form.fieldsNames.gender.label')}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
      <Autocomplete
        noOptionsText={"Ничего не найдено"}
        onChange={(e, value) => handleFilter("weight", value?.value || null)}
        options={encDecACOptions}
        getOptionLabel={(option) => option.name}
        value={weightACValue}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder="Вес"
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
      <Autocomplete
        noOptionsText={"Ничего не найдено"}
        onChange={(e, value) => handleFilter("age", value?.value || null)}
        options={encDecACOptions}
        getOptionLabel={(option) => option.name}
        value={ageACValue}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder="Возраст"
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
    </ACWrapper>
  )
}

export default Autocompletes

const ACWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 32px;
`
