import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { fetchSportTypes } from "../../../../../redux/components/sportTypes"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventDefaults"
import { TextField } from "@mui/material"
import { FieldsRow } from "./EventLocation"
import { FormHR, FormSubTitle } from "./EventPeriods"
import InputMask from "react-input-mask"
import PhoneIcon from "../../../../../public/svg/profile-phone.svg"

const emptyInitialValues = {
  nameOrganization: "",
  firstName: "",
  lastName: "",
  phoneNumber1: "",
  phoneNumber2: "",
  phoneNumber3: "",
  phoneNumber4: "",
  telegram: "",
  instagram: "",
  youtube: "",
  tiktok: "",
  facebook: "",
  linkedin: "",
  twitter: "",
  vk: "",
  email: "",
  webSite: "",
}

function EventContacts() {
  const {
    touched,
    errors,
    values,
    setFieldValue,
    handleChange,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: emptyInitialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
    },
  })

  const { push: routerPush } = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <FormSubTitle>Организатор</FormSubTitle>
      <Field>
        <p className="auth-title__input">Название организации</p>
        <TextField
          name="nameOrganization"
          placeholder="Название организации"
          variant="outlined"
          fullWidth
          error={touched.nameOrganization && Boolean(errors.nameOrganization)}
          helperText={touched.nameOrganization && errors.nameOrganization}
          onChange={handleChange}
          value={values.nameOrganization}
        />
      </Field>

      <FieldsRow>
        <Field>
          <p className="auth-title__input">Фамилия</p>
          <TextField
            name="lastName"
            placeholder="Фамилия"
            variant="outlined"
            fullWidth
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            onChange={handleChange}
            value={values.lastName}
          />
        </Field>
        <Field>
          <p className="auth-title__input">Имя</p>
          <TextField
            name="firstName"
            placeholder="Имя"
            variant="outlined"
            fullWidth
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            onChange={handleChange}
            value={values.firstName}
          />
        </Field>
      </FieldsRow>

      <Field>
        <p className="auth-title__input">Электронный адрес</p>
        <TextField
          name="email"
          placeholder="Электронный адрес"
          variant="outlined"
          fullWidth
          type="email"
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          onChange={handleChange}
          value={values.email}
        />
      </Field>

      <Field>
        <p className="auth-title__input">Номер телефона</p>
        <InputMask
          name={"phoneNumber1"}
          onChange={(e) =>
            setFieldValue(
              "phoneNumber1",
              `+${e.target.value.replace(/\D/gi, "")}`
            )
          }
          value={`${values.phoneNumber1}`.replace(/\D/gi, "")}
          mask="+7(999) 999 99 99"
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              sx={{ width: "100%" }}
              id="outlined-basic"
              variant="outlined"
              placeholder={"+7 (7"}
              error={Boolean(touched.phoneNumber1) && errors.phoneNumber1}
              InputProps={{
                endAdornment: <PhoneIcon />,
              }}
            />
          )}
        </InputMask>
      </Field>

      <FormHR />

      <FormSubTitle>Соц. сети</FormSubTitle>

      <Field>
        <p className="auth-title__input">
          Facebook <span>(Необязательно)</span>
        </p>
        <TextField
          name="facebook"
          placeholder="ссылка"
          variant="outlined"
          fullWidth
          type="facebook"
          error={touched.facebook && Boolean(errors.facebook)}
          helperText={touched.facebook && errors.facebook}
          onChange={handleChange}
          value={values.facebook}
        />
      </Field>

      <Field>
        <p className="auth-title__input">
          Linkedin <span>(Необязательно)</span>
        </p>
        <TextField
          name="linkedin"
          placeholder="ссылка"
          variant="outlined"
          fullWidth
          type="linkedin"
          error={touched.linkedin && Boolean(errors.linkedin)}
          helperText={touched.linkedin && errors.linkedin}
          onChange={handleChange}
          value={values.linkedin}
        />
      </Field>

      <Field>
        <p className="auth-title__input">
          Instagram <span>(Необязательно)</span>
        </p>
        <TextField
          name="instagram"
          placeholder="ссылка"
          variant="outlined"
          fullWidth
          type="instagram"
          error={touched.instagram && Boolean(errors.instagram)}
          helperText={touched.instagram && errors.instagram}
          onChange={handleChange}
          value={values.instagram}
        />
      </Field>

      <Field>
        <p className="auth-title__input">
          VK <span>(Необязательно)</span>
        </p>
        <TextField
          name="vk"
          placeholder="ссылка"
          variant="outlined"
          fullWidth
          type="vk"
          error={touched.vk && Boolean(errors.vk)}
          helperText={touched.vk && errors.vk}
          onChange={handleChange}
          value={values.vk}
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

export default EventContacts

const validationSchema = yup.object({
  rules: yup.string().required("Обязательное поле!"),
})
