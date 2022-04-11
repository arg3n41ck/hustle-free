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
} from "@mui/material"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import InputMask from "react-input-mask"
import { motion } from "framer-motion"
import { AuthButton } from "../Authorization/Authorization"
import $api from "../../../services/axios"
import { format } from "date-fns"
import { useDispatch } from "react-redux"
import { saveUserItem } from "../../../redux/components/user"
import { setCookie } from "../../../services/JWTService"
import { MobileDatePicker } from "@mui/lab"
import { ru } from "date-fns/locale"
import { toast } from "react-toastify"

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
      (value) => !!(value || " ").replace(/\s/g, "")
    )
    .required("Заполните поле"),
  email: yup
    .string()
    .test(
      "email",
      "Заполните поле",
      (value) => !!(value || " ").replace(/\s/g, "")
    )
    .required("Заполните поле"),
  password: yup
    .string()
    .matches(
      /(?=.*[0-9])(?=.*[A-Z]){8,}/gi,
      "Пароль должен состоять из [A-z] [0-9] и не быть слишком простым..."
    )
    .required("Заполните поле"),
})

const InputPersonalData = ({ onView, query }) => {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [tok, setTok] = useState(null)
  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (
        formik.values.firstName &&
        !Boolean(formik.errors.firstName) &&
        formik.values.lastName &&
        !Boolean(formik.errors.lastName) &&
        formik.values.email &&
        !Boolean(formik.errors.email) &&
        formik.values.password &&
        !Boolean(formik.errors.password)
      ) {
        toast.info("Ожидайте ответа от сервера")
        try {
          const { uid, token } = query
          const data = {
            // ...values,
            // email: values.email,
            // first_name: values.firstName,
            // last_name: values.lastName,
            uid,
            token,
          }
          try {
            const { data: _data } = await $api
              .post("/accounts/auth/users/activation/", { uid, token })
              .then(({ data }) => {
                setTok(data)
              })
            toast.success("Вы успешно активировали свои учетные данные!")
            dispatch(
              saveUserItem({ userItem: "password", value: values.password })
            )
            const { data: _data2 } = await $api.post(
              "/accounts/athlete/",
              {
                first_name: values.firstName,
                last_name: values.lastName,
                password: values.password,
              },
              {
                headers: {
                  Authorization: `Token ${_data?.access}`,
                },
              }
            )
            console.log("_data",_data)
            console.log("_data2",_data2)
            setCookie("token", _data.access, 999)
            setCookie("refresh", _data.refresh, 999999)
            onView("skills")
          } catch (e) {}
        } catch (e) {}
      }
    },
    validationSchema,
  })

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Form
      animate={{ translateX: ["20%", "0%"] }}
      transition={{ duration: 0.5 }}
      onSubmit={formik.handleSubmit}
    >
      <Box
        sx={{
          marginBottom: " 14vh !important",
        }}
        className="auth-container"
      >
        <div className="auth-wrapper">
          <h3 className="auth-title">Регистрация</h3>
          <p className="auth-description">
            Создайте аккаунт, чтобы пользоваться сервисами и было проще.
          </p>
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
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
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
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </div>
          </Box>
          <div className="auth-wrapper__input">
            <p className="auth-title__input">Электронный адрес</p>
            <TextField
              sx={{ width: "100%" }}
              value={formik.values.email}
              id="outlined-basic"
              placeholder="Электронный адрес"
              name="email"
              variant="outlined"
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
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
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="auth-wrapper__input">
            <p className="auth-title__input">Пароль</p>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <OutlinedInput
                placeholder="Пароль"
                name="password"
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
                      {showPassword ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.9202 12.7988C15.9725 12.5407 16 12.2736 16 12C16 9.79086 14.2091 8 12 8C11.7264 8 11.4593 8.02746 11.2012 8.07977L12.3421 9.22069C13.615 9.37575 14.6243 10.385 14.7793 11.6579L15.9202 12.7988ZM9.54012 10.6614C9.32325 11.059 9.2 11.5151 9.2 12C9.2 13.5464 10.4536 14.8 12 14.8C12.4849 14.8 12.941 14.6768 13.3386 14.4599L14.212 15.3332C13.5784 15.7545 12.8179 16 12 16C9.79086 16 8 14.2091 8 12C8 11.1821 8.24547 10.4216 8.66676 9.78799L9.54012 10.6614Z"
                            fill="#333333"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.9202 12.7988C15.9725 12.5407 16 12.2736 16 12C16 9.79086 14.2091 8 12 8C11.7264 8 11.4593 8.02746 11.2012 8.07977L12.3421 9.22069C13.615 9.37575 14.6243 10.385 14.7793 11.6579L15.9202 12.7988ZM9.54012 10.6614C9.32325 11.059 9.2 11.5151 9.2 12C9.2 13.5464 10.4536 14.8 12 14.8C12.4849 14.8 12.941 14.6768 13.3386 14.4599L14.212 15.3332C13.5784 15.7545 12.8179 16 12 16C9.79086 16 8 14.2091 8 12C8 11.1821 8.24547 10.4216 8.66676 9.78799L9.54012 10.6614Z"
                            fill="#333333"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.2268 17.3482L15.3455 16.4669C14.2994 17.032 13.1681 17.4 11.9999 17.4C10.3573 17.4 8.78766 16.6725 7.42544 15.6924C6.06796 14.7157 4.96717 13.5246 4.27501 12.6843C4.06993 12.4353 3.95894 12.2981 3.89048 12.1833C3.8374 12.0943 3.82964 12.0508 3.82964 12C3.82964 11.9493 3.8374 11.9057 3.89048 11.8167C3.95894 11.702 4.06993 11.5648 4.27501 11.3158C4.9435 10.5041 5.99317 9.36534 7.28712 8.40856L6.42991 7.55135C5.09508 8.56386 4.02745 9.72884 3.34875 10.5529L3.28522 10.6297C2.9596 11.0225 2.62964 11.4206 2.62964 12C2.62964 12.5794 2.9596 12.9775 3.28522 13.3704L3.34875 13.4472C4.07669 14.331 5.25205 15.607 6.72462 16.6665C8.19246 17.7225 10.0068 18.6 11.9999 18.6C13.5417 18.6 14.9766 18.0749 16.2268 17.3482ZM9.11292 5.99173C10.014 5.62814 10.9837 5.40002 11.9999 5.40002C13.993 5.40002 15.8074 6.27752 17.2752 7.33357C18.7478 8.39302 19.9231 9.66906 20.6511 10.5529L20.7146 10.6297C21.0402 11.0225 21.3702 11.4206 21.3702 12C21.3702 12.5794 21.0402 12.9775 20.7146 13.3704L20.6511 13.4472C20.1694 14.032 19.4918 14.7886 18.6617 15.5406L17.8121 14.6909C18.6046 13.9781 19.2578 13.2513 19.7248 12.6843C19.9299 12.4353 20.0409 12.2981 20.1093 12.1833C20.1624 12.0943 20.1702 12.0508 20.1702 12C20.1702 11.9493 20.1624 11.9057 20.1093 11.8167C20.0409 11.702 19.9299 11.5648 19.7248 11.3158C19.0327 10.4754 17.9319 9.28431 16.5744 8.30766C15.2122 7.3276 13.6425 6.60002 11.9999 6.60002C11.3343 6.60002 10.6807 6.71949 10.048 6.9268L9.11292 5.99173Z"
                            fill="#828282"
                          />
                          <path
                            d="M5 2L21 18"
                            stroke="#333333"
                            strokeWidth="1.2"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="3.25"
                            fill="#828282"
                            stroke="#828282"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z"
                            stroke="#828282"
                            strokeWidth="1.5"
                          />
                        </svg>
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && (
                <Error>{formik.errors.password}</Error>
              )}
            </FormControl>
          </div>

          <AuthButton
            active={
              formik.values.firstName &&
              !Boolean(formik.errors.firstName) &&
              formik.values.lastName &&
              !Boolean(formik.errors.lastName) &&
              formik.values.birthDate &&
              !Boolean(formik.errors.birthDate) &&
              formik.values.password &&
              !Boolean(formik.errors.password)
            }
            type="submit"
          >
            Дальше
          </AuthButton>
        </div>
      </Box>
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

export default InputPersonalData
