import React, { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import styled from "styled-components"
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import InputMask from "react-input-mask"
import { motion } from "framer-motion"
import { AuthButton } from "../../Authorization/Authorization"
import { format } from "date-fns"
import { getCookie } from "../../../../services/JWTService"
import { MobileDatePicker } from "@mui/lab"
import { ru } from "date-fns/locale"
import { styled as styl } from "@mui/material/styles"
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import { PasswordIcon } from "../../../../pages/reset-password"

const StyledFormControlLabel = styl((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    ".MuiFormControlLabel-label": checked && {
      color: theme.palette.primary.main,
    },
  })
)

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup()

  let checked = false

  if (radioGroup) {
    checked = radioGroup.value === props.value
  }

  return <StyledFormControlLabel checked={checked} {...props} />
}

const validationSchema = yup.object({
  lastName: yup
    .string()
    .test(
      "lastName",
      "Заполните поле",
      (value) => !!(value || " ").replace(/\s/g, "")
    )
    .required("Заполните поле"),
  firstName: yup
    .string()
    .test(
      "firstName",
      "Заполните поле",
      (value) => !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле"),
  password: yup
    .string()
    .matches(
      /(?=.*[0-9])(?=.*[A-Z]){8,}/gi,
      "Пароль должен состоять из [A-z] [0-9] и не быть слишком простым..."
    )
    .required("Заполните поле"),
  phone: yup
    .string()
    .test("phone", "phone min.", (value) => {
      if (typeof value === "undefined") return true
      return value?.replace(/[^0-9]/g, "")?.length >= 11
    })
    .required("Заполните поле"),
})

const OrganizerPersonalData = ({ data, setData, setView }) => {
  const [showPassword, setShowPassword] = useState(false)
  const formik = useFormik({
    initialValues: {
      lastName: !!data?.last_name ? data.last_name : "",
      firstName: !!data?.first_name ? data.first_name : "",
      birthDate: !!data?.date_birthday ? data.date_birthday : null,
      phone: !!data?.phone_number ? data.phone_number : "",
      password: !!data?.password ? data.password : "",
      gender: !!data?.gender ? data.gender : "",
      position: !!data?.position ? data.position : "",
      email: !!data?.email ? data.email : unescape(getCookie("email")) || "",
    },
    onSubmit: async (values) => {
      if (
        formik.values.firstName &&
        !Boolean(formik.errors.firstName) &&
        formik.values.lastName &&
        !Boolean(formik.errors.lastName) &&
        formik.values.phone &&
        !Boolean(formik.errors.phone) &&
        formik.values.password &&
        !Boolean(formik.errors.password)
      ) {
        const data = {
          date_birthday:
            !!values.birthDate &&
            format(new Date(values.birthDate), "yyyy-MM-dd"),
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: `+${values.phone.replace(/[^0-9]/g, "")}`,
          gender: values.gender,
          position: values.position,
          password: values.password,
          email: values.email,
        }
        if (data.phone_number === "+") delete data.phone_number

        for (let key in data) {
          if (!data[key]) delete data[key]
        }

        setData(data)
        setView("legalInfo")
      }
    },
    validationSchema,
  })

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridColumnGap: 24,
        }}
      >
        <div className="auth-wrapper__input">
          <p className="auth-title__input">Фамилия</p>
          <TextField
            sx={{ width: "100%" }}
            name="lastName"
            value={formik.values.lastName}
            onChange={(e) =>
              formik.setFieldValue(
                "lastName",
                e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
              )
            }
            id="outlined-basic"
            placeholder="Фамилия"
            variant="outlined"
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
        <div className="auth-wrapper__input">
          <p className="auth-title__input">Имя</p>
          <TextField
            sx={{ width: "100%" }}
            name="firstName"
            value={formik.values.firstName}
            onChange={(e) =>
              formik.setFieldValue(
                "firstName",
                e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
              )
            }
            id="outlined-basic"
            placeholder="Имя"
            variant="outlined"
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </div>
      </Box>
      <Box
        sx={{
          "& .MuiFormControl-root": {
            display: "flex",
          },
        }}
        className="auth-wrapper__input"
      >
        <p className="auth-title__input">
          День рождения{" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            toolbarTitle={"Выбрать дату"}
            cancelText={"Отмена"}
            value={formik.values.birthDate}
            onChange={(value) => formik.setFieldValue("birthDate", value)}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "ДД/ММ/ГГГГ",
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ marginBottom: 4, marginTop: 4 }}>
        <p className="auth-title__input">
          Пол <span style={{ color: "#828282" }}>(не обязательно)</span>{" "}
        </p>
        <RadioGroup
          value={formik.values.gender}
          name="gender"
          onChange={formik.handleChange}
        >
          <div>
            <MyFormControlLabel
              value="female"
              label={<Typography sx={{ color: "#F2F2F2" }}>Женский</Typography>}
              control={
                <Radio
                  sx={{
                    "&.MuiRadio-root": {
                      color: "#6D4EEA",
                    },
                  }}
                />
              }
            />
            <MyFormControlLabel
              value="male"
              label={<Typography sx={{ color: "#F2F2F2" }}>Мужской</Typography>}
              control={
                <Radio
                  sx={{
                    "&.MuiRadio-root": {
                      color: "#6D4EEA",
                    },
                  }}
                />
              }
            />
          </div>
        </RadioGroup>
      </Box>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">Контакты</p>
        <InputMask
          mask="+7 (999) 999 99 99"
          name={"phone"}
          value={formik.values.phone}
          onChange={formik.handleChange}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              sx={{ width: "100%" }}
              id="outlined-basic"
              variant="outlined"
              placeholder={"+7 (7"}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              InputProps={{
                endAdornment: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7071 13.7071L20.3552 16.3552C20.7113 16.7113 20.7113 17.2887 20.3552 17.6448C18.43 19.57 15.3821 19.7866 13.204 18.153L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L5.84701 10.796C4.21341 8.61788 4.43001 5.56999 6.35523 3.64477C6.71133 3.28867 7.28867 3.28867 7.64477 3.64477L10.2929 6.29289C10.6834 6.68342 10.6834 7.31658 10.2929 7.70711L9.27175 8.72825C9.10946 8.89054 9.06923 9.13846 9.17187 9.34373C10.3585 11.7171 12.2829 13.6415 14.6563 14.8281C14.8615 14.9308 15.1095 14.8905 15.2717 14.7283L16.2929 13.7071C16.6834 13.3166 17.3166 13.3166 17.7071 13.7071Z"
                      stroke="#828282"
                      strokeWidth="2"
                    />
                  </svg>
                ),
              }}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          )}
        </InputMask>
      </div>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">Электронный адрес</p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.email}
          name="email"
          onChange={formik.handleChange}
          id="outlined-basic"
          disabled
          placeholder="Электронный адрес"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="6"
                  width="16"
                  height="12"
                  rx="2"
                  stroke="#828282"
                  strokeWidth="1.5"
                />
                <path
                  d="M4 9L11.1056 12.5528C11.6686 12.8343 12.3314 12.8343 12.8944 12.5528L20 9"
                  stroke="#828282"
                  strokeWidth="1.5"
                />
              </svg>
            ),
          }}
        />
      </div>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Позиция/ должность{" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.position}
          name="position"
          onChange={formik.handleChange}
          id="outlined-basic"
          placeholder="Позиция/ должность"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471"
                  stroke="#828282"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="#828282"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ),
          }}
        />
      </div>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">Пароль</p>
        <FormControl sx={{ width: "100%", marginBottom: 7 }} variant="outlined">
          <OutlinedInput
            placeholder="Пароль"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <PasswordIcon show={showPassword} />
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.password && <Error>{formik.errors.password}</Error>}
        </FormControl>
      </div>

      <AuthButton
        active={
          formik.values.firstName &&
          !Boolean(formik.errors.firstName) &&
          formik.values.lastName &&
          !Boolean(formik.errors.lastName) &&
          formik.values.phone &&
          !Boolean(formik.errors.phone) &&
          formik.values.password &&
          !Boolean(formik.errors.password)
        }
        type="submit"
      >
        Дальше
      </AuthButton>
    </Form>
  )
}

const Form = styled(motion.form)``

const Error = styled.p`
  color: #d32f2f;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
  margin-right: 14px;
  margin-bottom: 0;
  margin-left: 14px;
`

export default OrganizerPersonalData
