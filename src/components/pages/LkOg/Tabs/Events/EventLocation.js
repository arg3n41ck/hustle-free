import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { FormControl, FormHelperText, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventDefaults"
import {
  fetchCountries,
  selectCountriesAndCities,
} from "../../../../../redux/components/countriesAndCities"
import styled from "styled-components"
import { Autocomplete } from "@mui/material"
import { LocationIcon } from "../../../Events/EventsCatalog/EventsFilter"
import { formDataHttp } from "../../../../../helpers/formDataHttp"
import dynamic from "next/dynamic"
const MapFiledLeafLet = dynamic(
  () => import("../../../../ui/Map/FieldLeaflet"),
  {
    ssr: false,
  }
)
import { useTranslation } from "next-i18next"

const emptyInitialValues = {
  placeName: null,
  address: null,
  country: null,
  city: null,
  lat: null,
  long: null,
  weighingPlace: null,
}

function EventLocation({ defaultValues = emptyInitialValues, eventId }) {
  const { t: tLkOg } = useTranslation("lkOg")

  const validationSchema = yup.object({
    placeName: yup.string().required(tLkOg("validation.required")).nullable(),
    address: yup.string().required(tLkOg("validation.required")).nullable(),
    country: yup.number().required(tLkOg("validation.required")).nullable(),
    city: yup.number().required(tLkOg("validation.required")).nullable(),
    lat: yup.string().required(tLkOg("validation.required")).nullable(),
    long: yup.string().required(tLkOg("validation.required")).nullable(),
    weighingPlace: yup
      .string()
      .required(tLkOg("validation.required"))
      .nullable(),
  })

  const { touched, errors, values, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: defaultValues,
      validationSchema,
      onSubmit: async (values) => {
        await formDataHttp(
          {
            ...values,
            allFieldsFilled: true,
          },
          `organizer/events/${eventId}/location/`,
          "put"
        )
        routerPush(`/lk-og/profile/events/edit/${eventId}/periods`)
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
        <p className="auth-title__input">
          {tLkOg("location.arenaBuildingName")}
        </p>
        <TextField
          name="placeName"
          placeholder={tLkOg("location.arenaBuildingName")}
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
          <p className="auth-title__input">{tLkOg("location.country")}</p>
          {!!countries?.length && (
            <Autocomplete
              noOptionsText={tLkOg("editEvent.generalInformation.nothingFound")}
              onChange={(_, value) => {
                setFieldValue("country", value.id)
                setFieldValue("city", null)
              }}
              options={countries.map((option) => option)}
              getOptionLabel={(option) => option.name}
              fullWidth
              value={countries.find(({ id }) => id === values.country) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder={tLkOg("location.country")}
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
          <p className="auth-title__input">{tLkOg("location.city")}</p>
          {!!cities?.length && (
            <Autocomplete
              noOptionsText={tLkOg("editEvent.generalInformation.nothingFound")}
              onChange={(_, value) => setFieldValue("city", value.id)}
              options={
                countries
                  ?.find(({ id }) => values.country === id)
                  ?.cityCountry?.map((option) => option) || []
              }
              getOptionLabel={(option) => option.name}
              fullWidth
              value={cities.find(({ id }) => id === values.city) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder={tLkOg("location.city")}
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
        <p className="auth-title__input">
          {tLkOg("location.addressOfTheTournament")}
        </p>
        <TextField
          name="address"
          placeholder={tLkOg("location.addressOfTheTournament")}
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
          <p className="auth-title__input">
            {tLkOg("location.tournamentAddressLocationMap")}
          </p>
          <MapWrapper style={{ height: 300 }}>
            <MapFiledLeafLet
              onPoint={({ lat, lng }) => {
                setFieldValue("lat", `${lat}`)
                setFieldValue("long", `${lng}`)
              }}
              defaultPoints={
                eventId
                  ? { lat: +defaultValues.lat, lng: +defaultValues.long }
                  : null
              }
            />
          </MapWrapper>
        </Field>
        <FormHelperText>
          {(touched.lat && errors.lat) || (touched.long && errors.long)}
        </FormHelperText>
      </FormControl>

      <Field>
        <p className="auth-title__input">{tLkOg("location.weighingAddress")}</p>
        <TextField
          name="weighingPlace"
          placeholder={tLkOg("location.weighingAddress")}
          variant="outlined"
          fullWidth
          error={touched.weighingPlace && Boolean(errors.weighingPlace)}
          helperText={touched.weighingPlace && errors.weighingPlace}
          onChange={handleChange}
          value={values.weighingPlace}
        />
      </Field>

      <EventFormFooter>
        <Cancel onClick={() => routerPush("/lk-og/profile/events")} type='button'>
          {tLkOg("editEvent.cancel")}
        </Cancel>
        <Submit type="submit">{tLkOg("editEvent.further")}</Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventLocation

export const FieldsRow = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 24px;
`
export const MapWrapper = styled.div``
