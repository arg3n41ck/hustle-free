import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { FormControl, FormHelperText, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventForm"
import {
  fetchCountries,
  selectCountriesAndCities,
} from "../../../../../redux/components/countriesAndCities"
import styled from "styled-components"
import { Autocomplete } from "@mui/material"
import { LocationIcon } from "../../../Events/EventsCatalog/EventsFilter"
import MapField from "../../../../ui/Map/Field"

const emptyInitialValues = {
  placeName: "",
  address: "",
  country: null,
  city: null,
  lat: "",
  long: "",
  weighingPlace: "",
}

function EventFormLocation() {
  const {
    touched,
    errors,
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: emptyInitialValues,
    validationSchema,
    onSubmit: async (values) => {
      alert(`${JSON.stringify(values, null, 2)}`)
    },
  })

  const { push: routerPush } = useRouter()

  const [countries, cities] = useSelector(selectCountriesAndCities)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <p className="auth-title__input">Название турнира</p>
        <TextField
          name="placeName"
          placeholder="Название турнира"
          variant="outlined"
          fullWidth
          error={touched.placeName && Boolean(errors.placeName)}
          helperText={touched.placeName && errors.placeName}
          onChange={handleChange}
          value={values.placeName}
        />
      </Field>

      <FieldsRow>
        <Field>
          <p className="auth-title__input">Страна</p>
          {!!countries?.length && (
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(_, value) => setFieldValue("country", value.id)}
              options={countries.map((option) => option)}
              getOptionLabel={(option) => option.name}
              fullWidth
              value={countries.find(({ id }) => id === values.country) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Страна"
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <LocationIcon />,
                  }}
                />
              )}
            />
          )}
        </Field>

        <Field>
          <p className="auth-title__input">Город</p>
          {!!cities?.length && (
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(_, value) => setFieldValue("city", value.id)}
              options={cities.map((option) => option)}
              getOptionLabel={(option) => option.name}
              fullWidth
              value={cities.find(({ id }) => id === values.city) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Город"
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <LocationIcon />,
                  }}
                />
              )}
            />
          )}
        </Field>
      </FieldsRow>

      <Field>
        <p className="auth-title__input">Адрес проведения турниры</p>
        <TextField
          name="address"
          placeholder="Адрес проведения турниры"
          variant="outlined"
          fullWidth
          error={touched.address && Boolean(errors.address)}
          helperText={touched.address && errors.address}
          onChange={handleChange}
          value={values.address}
        />
      </Field>

      <FormControl
        error={
          (touched.lat && Boolean(errors.lat)) ||
          (touched.long && Boolean(errors.long))
        }
        variant="standard"
      >
        <Field>
          <p className="auth-title__input">Карта локации адреса турнира</p>
          <MapField
            onPoint={({ lat, lng }) => {
              setFieldValue("lat", `${lat}`)
              setFieldValue("long", `${lng}`)
            }}
          />
        </Field>
        <FormHelperText>
          {(touched.lat && errors.lat) || (touched.long && errors.long)}
        </FormHelperText>
      </FormControl>

      <Field>
        <p className="auth-title__input">Адрес взвешивания</p>
        <TextField
          name="weighingPlace"
          placeholder="Адрес взвешивания"
          variant="outlined"
          fullWidth
          error={touched.weighingPlace && Boolean(errors.weighingPlace)}
          helperText={touched.weighingPlace && errors.weighingPlace}
          onChange={handleChange}
          value={values.weighingPlace}
        />
      </Field>

      <EventFormFooter>
        <Cancel onClick={() => routerPush("/lk-og/profile/events")}>
          Отмена
        </Cancel>
        <Submit disabled={!isValid} type="submit">
          Далее
        </Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventFormLocation

export const FieldsRow = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 24px;
`

const validationSchema = yup.object({
  placeName: yup.string().required("Обязательное поле").nullable(),
  address: yup.string().required("Обязательное поле").nullable(),
  country: yup.number().required("Обязательное поле").nullable(),
  city: yup.number().required("Обязательное поле").nullable(),
  lat: yup.string().required("Обязательное поле").nullable(),
  long: yup.string().required("Обязательное поле").nullable(),
  weighingPlace: yup.string().required("Обязательное поле").nullable(),
})
