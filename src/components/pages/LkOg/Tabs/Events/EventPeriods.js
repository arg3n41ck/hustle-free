import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import {
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
} from "@mui/material"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { fetchSportTypes } from "../../../../../redux/components/sportTypes"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { ru } from "date-fns/locale"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { MobileDatePicker } from "@mui/lab"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventDefaults"
import { formDataHttp } from "../../../../../helpers/formDataHttp"
import { format } from "date-fns"

const emptyInitialValues = {
  maxParticipantCount: "",
  earlyRegStart: null,
  earlyRegEnd: null,
  standartRegStart: null,
  standartRegEnd: null,
  lateRegStart: null,
  lateRegEnd: null,
  earlyRegActive: false,
  lateRegActive: false,
}

function EventPeriods({ defaultValues = emptyInitialValues, eventId }) {
  const { touched, errors, values, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: defaultValues,
      validationSchema,
      onSubmit: async (values) => {
        await formDataHttp(
          {
            ...values,
            earlyRegStart: format(values.earlyRegStart, "yyyy-MM-dd"),
            earlyRegEnd: format(values.earlyRegEnd, "yyyy-MM-dd"),
            standartRegStart: format(values.standartRegStart, "yyyy-MM-dd"),
            standartRegEnd: format(values.standartRegEnd, "yyyy-MM-dd"),
            lateRegStart: format(values.lateRegStart, "yyyy-MM-dd"),
            lateRegEnd: format(values.lateRegEnd, "yyyy-MM-dd"),
            allFieldsFilled: true,
          },
          `organizer/events/${eventId}/registration/`,
          "put"
        )
        routerPush(`/lk-og/profile/events/edit/${eventId}/description`)
      },
    })

  const { push: routerPush } = useRouter()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <p className="auth-title__input">Максимальное количество регистрации</p>
        <TextField
          name="maxParticipantCount"
          placeholder="Название турнира"
          variant="outlined"
          fullWidth
          type="number"
          error={
            touched.maxParticipantCount && Boolean(errors.maxParticipantCount)
          }
          helperText={touched.maxParticipantCount && errors.maxParticipantCount}
          onChange={handleChange}
          value={values.maxParticipantCount}
        />
      </Field>
      <FormHR />
      <FormSubTitle>Ранняя регистрация</FormSubTitle>
      <div>
        <Field>
          <FormControl
            error={touched.earlyRegActive && Boolean(errors.earlyRegActive)}
            variant="standard"
          >
            <FormControlLabel
              name="earlyRegActive"
              onChange={handleChange}
              checked={values.earlyRegActive}
              control={<Checkbox />}
              label="Да"
            />
            <FormHelperText>
              {touched.earlyRegActive && errors.earlyRegActive}
            </FormHelperText>
          </FormControl>
        </Field>

        <Collapse in={values.earlyRegActive}>
          <FieldsColumn>
            <Field style={{ marginTop: 24 }}>
              <p className="auth-title__input">
                Дата начала ранней регистрации
              </p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  toolbarTitle={"Дата начала ранней регистрации"}
                  cancelText={"Отмена"}
                  value={values.earlyRegStart}
                  onChange={(value) => setFieldValue("earlyRegStart", value)}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={
                        touched.earlyRegStart && Boolean(errors.earlyRegStart)
                      }
                      helperText={touched.earlyRegStart && errors.earlyRegStart}
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
              <p className="auth-title__input">
                Дата окончания ранней регистрации
              </p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  toolbarTitle={"Дата окончания ранней регистрации"}
                  cancelText={"Отмена"}
                  value={values.earlyRegEnd}
                  onChange={(value) => setFieldValue("earlyRegEnd", value)}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={touched.earlyRegEnd && Boolean(errors.earlyRegEnd)}
                      helperText={touched.earlyRegEnd && errors.earlyRegEnd}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "ДД/ММ/ГГГГ",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <ExtraInfo>
                Даты ранней регистрации должна быть раньше даты начала
                стандартной регистрации
              </ExtraInfo>
            </Field>
          </FieldsColumn>
        </Collapse>
      </div>

      <FormHR />

      <FormSubTitle>Стандартная регистрация</FormSubTitle>

      <Field>
        <p className="auth-title__input">Дата начала стандартной регистрации</p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            toolbarTitle={"Дата начала стандартной регистрации"}
            cancelText={"Отмена"}
            value={values.standartRegStart}
            onChange={(value) => setFieldValue("standartRegStart", value)}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={
                  touched.standartRegStart && Boolean(errors.standartRegStart)
                }
                helperText={touched.standartRegStart && errors.standartRegStart}
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
        <p className="auth-title__input">
          Дата окончания стандартной регистрации
        </p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            toolbarTitle={"Дата окончания стандартной регистрации"}
            cancelText={"Отмена"}
            value={values.standartRegEnd}
            onChange={(value) => setFieldValue("standartRegEnd", value)}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={touched.standartRegEnd && Boolean(errors.standartRegEnd)}
                helperText={touched.standartRegEnd && errors.standartRegEnd}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "ДД/ММ/ГГГГ",
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Field>

      <FormHR />

      <FormSubTitle>Поздняя регистрация</FormSubTitle>
      <div>
        <Field>
          <FormControl
            error={touched.lateRegActive && Boolean(errors.lateRegActive)}
            variant="standard"
          >
            <FormControlLabel
              name="lateRegActive"
              checked={values.lateRegActive}
              onChange={handleChange}
              control={<Checkbox />}
              label="Да"
            />
            <FormHelperText>
              {touched.lateRegActive && errors.lateRegActive}
            </FormHelperText>
          </FormControl>
        </Field>

        <Collapse in={values.lateRegActive}>
          <FieldsColumn>
            <Field style={{ marginTop: 24 }}>
              <p className="auth-title__input">
                Дата начала поздней регистрации
              </p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  toolbarTitle={"Дата начала поздней регистрации"}
                  cancelText={"Отмена"}
                  value={values.lateRegStart}
                  onChange={(value) => setFieldValue("lateRegStart", value)}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={
                        touched.lateRegStart && Boolean(errors.lateRegStart)
                      }
                      helperText={touched.lateRegStart && errors.lateRegStart}
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
              <p className="auth-title__input">
                Дата окончания поздней регистрации
              </p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  toolbarTitle={"Дата окончания поздней регистрации"}
                  cancelText={"Отмена"}
                  value={values.lateRegEnd}
                  onChange={(value) => setFieldValue("lateRegEnd", value)}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={touched.lateRegEnd && Boolean(errors.lateRegEnd)}
                      helperText={touched.lateRegEnd && errors.lateRegEnd}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "ДД/ММ/ГГГГ",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <ExtraInfo>
                Даты поздней регистрации должна быть посднее даты окончания
                стандартной регистрации
              </ExtraInfo>
            </Field>
          </FieldsColumn>
        </Collapse>
      </div>

      <FormHR />

      <EventFormFooter>
        <Cancel onClick={() => routerPush("/lk-og/profile/events")}>
          Отмена
        </Cancel>
        <Submit type="submit">Далее</Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventPeriods

const validationSchema = yup.object({
  maxParticipantCount: yup.number().required("Обязательное поле"),
  earlyRegActive: yup.boolean(),
  lateRegActive: yup.boolean(),
  earlyRegStart: yup
    .date()
    .nullable()
    .test({
      message:
        "Дата начала ранней регистрации не должна быть позднее даты окончания ранней рег.",
      test: function (value) {
        return this.parent.earlyRegActive
          ? this.parent.earlyRegEnd &&
              new Date(this.parent.earlyRegEnd).getTime() >
                new Date(value).getTime()
          : true
      },
    })
    .test({
      message:
        "Дата начала ранней регистрации не должна быть позднее даты стандартной рег.",
      test: function (value) {
        return this.parent.earlyRegActive
          ? this.parent.standartRegStart &&
              new Date(this.parent.standartRegStart).getTime() >
                new Date(value).getTime()
          : true
      },
    }),
  earlyRegEnd: yup
    .date()
    .nullable()
    .test({
      message: "Заполните поле",
      test: function (value) {
        return this.parent.earlyRegActive ? value : true
      },
    })
    .test({
      message:
        "Дата окончания ранней регистрации не должна быть позднее даты стандартной рег.",
      test: function (value) {
        return this.parent.earlyRegActive
          ? this.parent.standartRegStart &&
              new Date(this.parent.standartRegStart).getTime() >
                new Date(value).getTime()
          : true
      },
    }),
  standartRegStart: yup
    .date()
    .nullable()
    .required("Заполните поле")
    .test({
      message:
        "Дата начала стандартной регистрации не должна быть позднее даты окончания стандартной рег.",
      test: function (value) {
        return (
          this.parent.standartRegEnd &&
          new Date(this.parent.standartRegEnd).getTime() >
            new Date(value).getTime()
        )
      },
    })
    .test({
      message: "Укажите действительную дату",
      test: function (value) {
        return new Date().getTime() < new Date(value).getTime()
      },
    }),
  standartRegEnd: yup.date().nullable().required("Заполните поле"),

  lateRegStart: yup
    .date()
    .nullable()
    .test({
      message:
        "Дата начала поздней регистрации не должна быть раньше даты стандартной рег.",
      test: function (value) {
        return this.parent.lateRegActive
          ? this.parent.standartRegEnd &&
              new Date(this.parent.standartRegEnd).getTime() <
                new Date(value).getTime()
          : true
      },
    })
    .test({
      message:
        "Дата начала поздней регистрации не должна быть позднее даты окончания поздней рег.",
      test: function (value) {
        return this.parent.lateRegActive
          ? this.parent.lateRegEnd &&
              new Date(this.parent.lateRegEnd).getTime() >
                new Date(value).getTime()
          : true
      },
    }),
  lateRegEnd: yup
    .date()
    .nullable()
    .test({
      message: "Заполните поле",
      test: function (value) {
        return this.parent.lateRegActive ? value : true
      },
    }),
})

export const FormSubTitle = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`

export const FormHR = styled.div`
  width: 100%;
  border-bottom: 1px solid #333;
  margin: 8px 0;
`

export const ExtraInfo = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  margin-top: 24px;
`

export const FieldsColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
`
