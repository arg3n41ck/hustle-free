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
import { motion } from "framer-motion"
import { AuthButton } from "../../Authorization/Authorization"
import $api from "../../../../services/axios"
import { useDispatch } from "react-redux"
import { fetchUser } from "../../../../redux/components/user"
import { getCookie, setCookie } from "../../../../services/JWTService"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { PasswordIcon } from "../../../../pages/reset-password"

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
  password: yup
    .string()
    .matches(
      /(?=.*[0-9])(?=.*[A-Z]){8,}/gi,
      "Пароль должен состоять из [A-z] [0-9] и не быть слишком простым..."
    )
    .required("Заполните поле"),
})

const InputPersonalData = () => {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      email: getCookie("email") || "",
      password: "",
    },
    onSubmit: async (values) => {
      if (
        formik.values.firstName &&
        !Boolean(formik.errors.firstName) &&
        formik.values.lastName &&
        !Boolean(formik.errors.lastName) &&
        formik.values.password &&
        !Boolean(formik.errors.password)
      ) {
        toast.info("Ожидайте ответа от сервера")
        try {
          try {
            const { data: _data } = $api.post("/accounts/athlete/", {
              first_name: values.firstName,
              last_name: values.lastName,
              password: values.password,
            })
            setCookie("token", _data.access, 999)
            setCookie("refresh", _data.refresh, 999999)
            toast.success("Вы успешно активировали свои учетные данные!")
            dispatch(fetchUser())
            router.push("/login")
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
              disabled
              id="outlined-basic"
              placeholder="Электронный адрес"
              name="email"
              variant="outlined"
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
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
                      <PasswordIcon show={showPassword} />
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
