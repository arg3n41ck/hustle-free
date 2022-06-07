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
import Link from "next/link"
import { toast } from "react-toastify"
import { useTranslation } from "next-i18next"

const emptyInitialValues = {
  name: "",
  typeSport: null,
  dateStart: null,
  dateEnd: null,
  timezone: null,
  formatEvent: null,
  statusPublish: "draft",
}

function EventDefaults({ defaultValues = emptyInitialValues, eventId }) {
  const { t: tLkOg } = useTranslation("lkOg")

  const validationSchema = yup.object({
    name: yup.string().required(tLkOg("validation.required")).nullable(),
    typeSport: yup.number().required(tLkOg("validation.required")).nullable(),
    dateStart: yup
      .date()
      .nullable()
      .required(tLkOg("validation.fillInTheField"))
      .test({
        message: tLkOg("validation.requiredStandartPeriodRegistration"),
        test: function (value) {
          return (
            this.parent.dateEnd &&
            new Date(this.parent.dateEnd).getTime() > new Date(value).getTime()
          )
        },
      })
      .test({
        message: tLkOg("validation.validDate"),
        test: function (value) {
          return new Date().getTime() < new Date(value).getTime()
        },
      }),
    dateEnd: yup.date().nullable().required(tLkOg("validation.fillInTheField")),
    timezone: yup.string().required(tLkOg("validation.required")).nullable(),
    formatEvent: yup.string().required(tLkOg("validation.required")).nullable(),
  })

  const { push: routerPush } = useRouter()
  const { touched, errors, values, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: defaultValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          const { data } = await formDataHttp(
            {
              ...values,
              allFieldsFilled: true,
              dateStart: new Date(values.dateStart).toISOString(),
              dateEnd: new Date(values.dateEnd).toISOString(),
            },
            `organizer/events/${eventId ? eventId + "/" : ""}`,
            eventId ? "put" : "post"
          )
          routerPush(`/lk-og/profile/events/edit/${data.id}/location`)
        } catch ({ response: { data } }) {
          if (data["Wrong date"]) {
            toast.error("Указаны неправильные даты!")
          }
        }
      },
    })
  const [sportTypes] = useSelector(selectSportTypes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <p className="auth-title__input">
          {tLkOg("editEvent.generalInformation.nameEvent")}
        </p>
        <TextField
          name="name"
          placeholder={tLkOg("editEvent.generalInformation.nameEvent")}
          variant="outlined"
          fullWidth
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          onChange={handleChange}
          value={values.name}
        />
      </Field>

      <Field>
        <p className="auth-title__input">
          {tLkOg("editEvent.generalInformation.typeSport")}
        </p>
        {!!sportTypes?.length && (
          <Autocomplete
            noOptionsText={tLkOg("editEvent.generalInformation.nothingFound")}
            onChange={(_, value) => setFieldValue("typeSport", value.id)}
            options={sportTypes.map((option) => option)}
            getOptionLabel={(option) => option.name}
            fullWidth
            value={sportTypes.find(({ id }) => id === values.typeSport)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder={tLkOg("editEvent.generalInformation.typeSport")}
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
        <p className="auth-title__input">
          {tLkOg("editEvent.generalInformation.tournamentStartDate")}
        </p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            toolbarTitle={tLkOg(
              "editEvent.generalInformation.tournamentStartDate"
            )}
            cancelText={tLkOg("editEvent.cancel")}
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
                  placeholder: tLkOg("editEvent.registrationPeriods.ddMmYy"),
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Field>

      <Field>
        <p className="auth-title__input">
          {tLkOg("editEvent.generalInformation.tournamentEndDate")}
        </p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            toolbarTitle={tLkOg(
              "editEvent.generalInformation.tournamentEndDate"
            )}
            cancelText={tLkOg("editEvent.cancel")}
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
                  placeholder: tLkOg("editEvent.registrationPeriods.ddMmYy"),
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Field>

      <Field>
        <p className="auth-title__input">
          {tLkOg("editEvent.generalInformation.timezone")}
        </p>
        <Autocomplete
          noOptionsText={tLkOg("editEvent.generalInformation.nothingFound")}
          onChange={(_, value) => value && setFieldValue("timezone", value.tz)}
          options={asiaTimezone.map((option) => option)}
          getOptionLabel={(option) => `${option.country} ${option.tz}`}
          fullWidth
          value={asiaTimezone.find(({ tz }) => tz === values.timezone)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={touched.timezone && Boolean(errors.timezone)}
              helperText={touched.timezone && errors.timezone}
              placeholder={`(GMT+0600) ${tLkOg(
                "registrationPeriods.theLocalTime"
              )}`}
              InputProps={{
                ...params.InputProps,
                startAdornment: <ClockIcon />,
              }}
            />
          )}
        />
      </Field>
      <Field>
        <p className="auth-title__input">
          {tLkOg("editEvent.generalInformation.format")}
        </p>
        <FormControl
          error={touched.formatEvent && Boolean(errors.formatEvent)}
          variant="standard"
        >
          <RadioGroup
            row
            name="formatEvent"
            value={values.formatEvent}
            onChange={handleChange}
          >
            <FormControlLabel
              value="olympic"
              control={<Radio />}
              label={tLkOg("editEvent.generalInformation.olympic")}
            />
            <FormControlLabel
              value="circular"
              control={<Radio />}
              label={tLkOg("editEvent.generalInformation.circular")}
            />
          </RadioGroup>
          <FormHelperText>
            {touched.formatEvent && errors.formatEvent}
          </FormHelperText>
        </FormControl>
      </Field>

      <EventFormFooter>
        <Link href="/lk-og/profile/events">
          <Cancel>{tLkOg("editEvent.cancel")}</Cancel>
        </Link>
        <Submit type="submit">{tLkOg("editEvent.further")}</Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventDefaults

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

export const Cancel = styled.a`
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
