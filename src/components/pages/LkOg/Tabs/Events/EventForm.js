import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchSportTypes,
  selectSportTypes,
} from "../../../../../redux/components/sportTypes"
import { BoxIcon } from "../../../Events/EventsCatalog/EventsFilter"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { ru } from "date-fns/locale"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { MobileDatePicker } from "@mui/lab"
import { asiaTimezone } from "../../../../../services/asia-timezone"
import { useRouter } from "next/router"
import { formDataHttp } from "../../../../../helpers/formDataHttp"

const emptyInitialValues = {
  name: "",
  typeSport: null,
  dateStart: null,
  dateEnd: null,
  timezone: null,
  formatEvent: null,
  statusPublish: "draft",
}

function EventForm() {
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
      const { data } = await formDataHttp(
        {
          ...values,
          allFieldsFilled: true,
          dateStart: new Date(values.dateStart).toISOString(),
          dateEnd: new Date(values.dateEnd).toISOString(),
        },
        "organizer/events/",
        "post"
      )
      console.log(data)
    },
  })

  const { push: routerPush } = useRouter()

  const [sportTypes] = useSelector(selectSportTypes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])


  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <p className="auth-title__input">Название турнира</p>
        <TextField
          name="name"
          placeholder="Название турнира"
          variant="outlined"
          fullWidth
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          onChange={handleChange}
          value={values.name}
        />
      </Field>

      <Field>
        <p className="auth-title__input">Вид спорта</p>
        {!!sportTypes?.length && (
          <Autocomplete
            noOptionsText={"Ничего не найдено"}
            onChange={(_, value) => setFieldValue("typeSport", value.id)}
            options={sportTypes.map((option) => option)}
            getOptionLabel={(option) => option.name}
            fullWidth
            value={sportTypes.find(({ id }) => id === values.typeSport) || null}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder="Вид спорта"
                error={touched.typeSport && Boolean(errors.typeSport)}
                helperText={touched.typeSport && errors.typeSport}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <BoxIcon />,
                }}
              />
            )}
          />
        )}
      </Field>

      <Field>
        <p className="auth-title__input">Дата начала турнира</p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            toolbarTitle={"Дата начала турнира"}
            cancelText={"Отмена"}
            value={values.dateStart}
            onChange={(value) => setFieldValue("dateStart", value)}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={touched.dateStart && Boolean(errors.dateStart)}
                helperText={touched.dateStart && errors.dateStart}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "ДД/ММ/ГГГГ",
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Field>

      <Field>
        <p className="auth-title__input">Дата окончания турнира</p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            toolbarTitle={"Дата начала турнира"}
            cancelText={"Отмена"}
            value={values.dateEnd}
            onChange={(value) => setFieldValue("dateEnd", value)}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={touched.dateEnd && Boolean(errors.dateEnd)}
                helperText={touched.dateEnd && errors.dateEnd}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "ДД/ММ/ГГГГ",
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Field>

      <Field>
        <p className="auth-title__input">Вид спорта</p>
        <Autocomplete
          noOptionsText={"Ничего не найдено"}
          onChange={(_, value) => value && setFieldValue("timezone", value.tz)}
          options={asiaTimezone.map((option) => option)}
          getOptionLabel={(option) => `${option.country} ${option.tz}`}
          fullWidth
          // value={values.timezone}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={touched.timezone && Boolean(errors.timezone)}
              helperText={touched.timezone && errors.timezone}
              placeholder="(GMT+0600) Местное время"
              InputProps={{
                ...params.InputProps,
                startAdornment: <ClockIcon />,
              }}
            />
          )}
        />
      </Field>

      <FormControl
        error={touched.formatEvent && Boolean(errors.formatEvent)}
        variant="standard"
      >
        <RadioGroup row name="formatEvent" onChange={handleChange}>
          <FormControlLabel
            value="olympic"
            control={<Radio />}
            label="Олимпийский"
          />
          <FormControlLabel
            value="circular"
            control={<Radio />}
            label="Круговой"
          />
        </RadioGroup>
        <FormHelperText>
          {touched.formatEvent && errors.formatEvent}
        </FormHelperText>
      </FormControl>

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

export default EventForm

const validationSchema = yup.object({
  name: yup.string().required("Обязательное поле").nullable(),
  typeSport: yup.number().required("Обязательное поле").nullable(),
  dateStart: yup.string().required("Обязательное поле").nullable(),
  dateEnd: yup.string().required("Обязательное поле").nullable(),
  timezone: yup.string().required("Обязательное поле").nullable(),
  formatEvent: yup.string().required("Обязательное поле").nullable(),
})

export const Form = styled.form`
  height: max-content;
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
`

export const Field = styled.div`
  width: 100%;
`

export const EventFormFooter = styled.div`
  width: 100%;
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-column-gap: 16px;
  padding: 32px 0;
`

export const Submit = styled.button`
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  padding: 8px 24px;
`

export const Cancel = styled.button`
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #828282;
  border-radius: 16px;
  padding: 8px 24px;
`

export const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" stroke="#828282" strokeWidth="2" />
    <path
      d="M16.5 13C17.0523 13 17.5 12.5523 17.5 12C17.5 11.4477 17.0523 11 16.5 11V13ZM13 8.5C13 7.94772 12.5523 7.5 12 7.5C11.4477 7.5 11 7.94772 11 8.5H13ZM16.5 11H12.25V13H16.5V11ZM13 11.75V8.5H11V11.75H13ZM12.25 11C12.6642 11 13 11.3358 13 11.75H11C11 12.4404 11.5596 13 12.25 13V11Z"
      fill="#828282"
    />
  </svg>
)
