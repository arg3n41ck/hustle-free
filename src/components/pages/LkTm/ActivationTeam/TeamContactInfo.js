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
  MenuItem,
} from "@mui/material"
import InputMask from "react-input-mask"
import { motion } from "framer-motion"
import { AuthButton } from "../../Authorization/Authorization"
import { useSelector } from "react-redux"
import { getCookie } from "../../../../services/JWTService"
import { selectCountriesAndCities } from "../../../../redux/components/countriesAndCities"

const regMatch =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/

const validationSchema = yup.object({
  full_name: yup
    .string()
    .test(
      "full_name",
      "Заполните поле",
      (value) => !!(value || " ").replace(/\s/g, "")
    )
    .required("Заполните поле")
    .nullable(),
  country: yup
    .string()
    .test(
      "country",
      "Заполните поле",
      (value) => !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле")
    .nullable(),

  city: yup
    .string()
    .test(
      "city",
      "Заполните поле",
      (value) => !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле")
    .nullable(),
  web_site: yup
    .string()
    .matches(regMatch, "Веб-сайт должен быть действительным URL")
    .required("Заполните поле")
    .nullable(),
  full_name_coach: yup
    .string()
    .test(
      "full_name_coach",
      "Заполните поле",
      (value) => !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле")
    .nullable(),
  email_coach: yup
    .string()
    .test(
      "email_coach",
      "Заполните поле",
      (value) => !!(value || "").replace(/\s/g, "")
    )
    .email("Неверный адрес электронной почты")
    .required("Заполните поле")
    .nullable(),
  password: yup
    .string()
    .matches(
      /(?=.*[0-9])(?=.*[A-Z]){8,}/gi,
      "Пароль должен состоять из [A-z] [0-9] и не быть слишком простым..."
    )
    .required("Заполните поле")
    .nullable(),
  phone_coach: yup
    .string()
    .test("phone_coach", "phone min.", (value) => {
      if (typeof value === "undefined") return true
      return value?.replace(/[^0-9]/g, "")?.length >= 11
    })
    .required("Заполните поле")
    .nullable(),
})

const TeamContactInfo = ({ data, setData, setView }) => {
  const [countries] = useSelector(selectCountriesAndCities)
  const [cities, setCities] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const formik = useFormik({
    initialValues: {
      full_name: !!data?.full_name ? data.full_name : "",
      country: !!data?.country ? data.country : null,
      city: !!data?.city ? data.city : null,
      web_site: !!data?.web_site ? data.web_site : "",
      full_name_coach: !!data?.full_name_coach ? data.full_name_coach : "",
      phone_coach: !!data?.phone_coach ? data.phone_coach : "",
      email_coach: !!data?.email_coach
        ? data.email_coach
        : (getCookie("email") && unescape(getCookie("email"))) || "",
      password: !!data?.password ? data.password : "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        full_name: values.full_name,
        country: values.country,
        city: values.city,
        web_site: values.web_site,
        full_name_coach: values.full_name_coach,
        email_coach: values.email_coach,
        phone_coach: `+${values.phone_coach.replace(/[^0-9]/g, "")}`,
        password: values.password,
      }
      if (data.phone_number === "+") delete data.phone_number

      for (let key in data) {
        if (!data[key]) delete data[key]
      }

      setData(data)
      setView("info")
    },
  })

  const handleClickCities = (item) => {
    setCities(item)
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">Название команды</p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.full_name}
          name="full_name"
          onChange={formik.handleChange}
          placeholder="Название команды"
          variant="outlined"
          error={formik.touched.full_name && Boolean(formik.errors.full_name)}
          helperText={formik.touched.full_name && formik.errors.full_name}
        />
      </div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridColumnGap: 24,
        }}
      >
        <div className="auth-wrapper__input">
          <p className="auth-title__input">Страна</p>
          <TextField
            select
            sx={{ width: "100%", color: "white" }}
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          >
            {!!countries &&
              countries.map((item) => (
                <MenuItem
                  onClick={() => handleClickCities(item)}
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </MenuItem>
              ))}
          </TextField>
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">Город/Область</p>
          <TextField
            select
            sx={{
              width: "100%",
              color: "white",
            }}
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          >
            {!!cities
              ? cities.cityCountry.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              : !!countries &&
                countries.map(
                  ({ cityCountry }) =>
                    !!cityCountry &&
                    cityCountry.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))
                )}
          </TextField>
        </div>
      </Box>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">Веб-сайт</p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.web_site}
          name="web_site"
          onChange={formik.handleChange}
          placeholder="Веб-сайт"
          variant="outlined"
          error={formik.touched.web_site && Boolean(formik.errors.web_site)}
          helperText={formik.touched.web_site && formik.errors.web_site}
        />
      </div>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">ФИО главного тренера</p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.full_name_coach}
          name="full_name_coach"
          onChange={formik.handleChange}
          placeholder="ФИО"
          variant="outlined"
          error={
            formik.touched.full_name_coach &&
            Boolean(formik.errors.full_name_coach)
          }
          helperText={
            formik.touched.full_name_coach && formik.errors.full_name_coach
          }
        />
      </div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridColumnGap: 24,
        }}
      >
        <div className="auth-wrapper__input">
          <p className="auth-title__input">Контакты главного тренера</p>
          <InputMask
            mask="+7 (999) 999 99 99"
            name={"phone_coach"}
            value={formik.values.phone_coach}
            onChange={formik.handleChange}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                sx={{ width: "100%" }}
                variant="outlined"
                placeholder={"Контакты"}
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
                error={
                  formik.touched.phone_coach &&
                  Boolean(formik.errors.phone_coach)
                }
                helperText={
                  formik.touched.phone_coach && formik.errors.phone_coach
                }
              />
            )}
          </InputMask>
        </div>
        <div className="auth-wrapper__input">
          <p className="auth-title__input">Электронная почта тренера</p>
          <TextField
            sx={{ width: "100%" }}
            value={formik.values.email_coach}
            name="email_coach"
            onChange={formik.handleChange}
            placeholder="Электронная почта"
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
            error={
              formik.touched.email_coach && Boolean(formik.errors.email_coach)
            }
            helperText={formik.touched.email_coach && formik.errors.email_coach}
          />
        </div>
      </Box>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">Пароль</p>
        <FormControl sx={{ width: "100%", marginBottom: 7 }} variant="outlined">
          <OutlinedInput
            placeholder="Пароль"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
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
                      <path d="M5 2L21 18" stroke="#333333" strokeWidth="1.2" />
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
          {formik.touched.password && <Error>{formik.errors.password}</Error>}
        </FormControl>
      </div>

      <AuthButton
        disabled={!formik.isValid}
        active={formik.isValid}
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
  margin: 3px 14px 0;
`

export default TeamContactInfo
