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
  MenuItem,
} from "@mui/material"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import InputMask from "react-input-mask"
import { motion } from "framer-motion"
import { AuthButton } from "../../Authorization/Authorization"
import $api from "../../../../services/axios"
import { format } from "date-fns"
import { useDispatch, useSelector } from "react-redux"
import { saveUserItem } from "../../../../redux/components/user"
import { setCookie } from "../../../../services/JWTService"
import { MobileDatePicker } from "@mui/lab"
import { ru } from "date-fns/locale"
import { toast } from "react-toastify"

import PropTypes from "prop-types"
import { styled as styl } from "@mui/material/styles"
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import { useRouter } from "next/router"
import { selectCountries } from "../../../../redux/components/countriesAndCities"

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
  nameOrganizer: yup
    .string()
    .test(
      "nameOrganizer",
      "Заполните поле",
      (value) => !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле"),
  country: yup
    .string()
    .test(
      "country",
      "Заполните поле",
      (value) => value !== "default" && !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле"),
  city: yup
    .string()
    .test(
      "city",
      "Заполните поле",
      (value) => value !== "default" && !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле"),
})

const OrganizerLegalData = ({ dataPersonal, data }) => {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  // const { cities, countries } = useSelector((state) => state.auth)
  // console.log("cities", cities)
  const [countries] = useSelector(selectCountries)

  // console.log("countries", countries)

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      nameOrganizer: !!data?.name_organization ? data.name_organization : "",
      country: !!data?.country ? data.country : 1,
      city: !!data?.city ? data.city : 1,
      actualAddress: !!data?.actual_address ? data.actual_address : "",
      legalName: !!data?.legal_name ? data.legal_name : "",
      legalAddress: !!data?.legal_address ? data.legal_address : "",
      bin: !!data?.bin ? data.bin : "",
      number: !!data?.number ? data.number : "",
      swift: !!data?.swift ? data.swift : "",
      bankName: !!data?.bank_name ? data.bank_name : "",
    },
    onSubmit: async (values) => {
      if (
        formik.values.nameOrganizer &&
        !Boolean(formik.errors.nameOrganizer) &&
        formik.values.country &&
        !Boolean(formik.errors.country) &&
        formik.values.city &&
        !Boolean(formik.errors.city)
      ) {
        toast.info("Ожидайте ответа от сервера")
        try {
          const data = {
            ...dataPersonal,
            name_organization: values.nameOrganizer,
            country: values.country,
            city: values.city,
            actual_address: values.actualAddress,
            legal_name: values.legalName,
            legal_address: values.legalAddress,
            bin: values.bin,
            number: values.number,
            swift: values.swift,
            bank_name: values.bankName,
            email: values.email,
          }
          if (data.phone_number === "+") delete data.phone_number

          for (let key in data) {
            if (!data[key]) delete data[key]
          }

          //   for (let key in data) {
          // setData((prev) =>
          //   !!prev?.length ? [...prev, { key: data[key] }] : data
          // )
          //   }

          //   setView("legalInfo")
          //   await $api.post("/accounts/auth/users/activation/", data)
          //   toast.success("Вы успешно активировали свои учетные данные!")
          dispatch(
            saveUserItem({ userItem: "password", value: values.password })
          )
          try {
            const { data: _data } = await $api.post(
              "/accounts/auth/jwt/create/",
              data
            )
            setCookie("token", _data.access, 999)
            setCookie("refresh", _data.refresh, 999999)
            router.push("/login")
          } catch (e) {}
        } catch (e) {}
      }
    },
    validationSchema,
  })

  console.log(formik.errors)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">Название организации</p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.nameOrganizer}
          name="nameOrganizer"
          onChange={formik.handleChange}
          id="outlined-basic"
          placeholder="Название организации"
          variant="outlined"
          error={
            formik.touched.nameOrganizer && Boolean(formik.errors.nameOrganizer)
          }
          helperText={
            formik.touched.nameOrganizer && formik.errors.nameOrganizer
          }
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">Страна</p>
        <TextField
          id="outlined-select-currency"
          select
          sx={{ width: "100%", color: "white" }}
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        >
          <MenuItem value="default">Страна</MenuItem>
          <MenuItem value="athlete">Атлет</MenuItem>
          <MenuItem value="organizer">Организатор</MenuItem>
          <MenuItem value="team">Команда</MenuItem>
        </TextField>
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">Город</p>
        <TextField
          id="outlined-select-currency"
          select
          sx={{
            width: "100%",
            color: "white"
          }}
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        >
          <MenuItem value="default">Город</MenuItem>
          <MenuItem value="athlete">Атлет</MenuItem>
          <MenuItem value="organizer">Организатор</MenuItem>
          <MenuItem value="team">Команда</MenuItem>
        </TextField>
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Фактические адрес{" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.actualAddress}
          name="actualAddress"
          onChange={formik.handleChange}
          id="outlined-basic"
          placeholder="Фактические адрес"
          variant="outlined"
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Юридическое название{" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.legalName}
          name="legalName"
          onChange={formik.handleChange}
          id="outlined-basic"
          placeholder="Юридическое название"
          variant="outlined"
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Юридический адрес{" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%", marginBottom: 3 }}
          value={formik.values.legalAddress}
          name="legalAddress"
          onChange={formik.handleChange}
          id="outlined-basic"
          placeholder="Юридический адрес"
          variant="outlined"
        />
      </div>

      <h3 className="auth-title">Реквизиты</h3>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          БИН <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.bin}
          name="bin"
          onChange={formik.handleChange}
          id="outlined-basic"
          placeholder="БИН"
          variant="outlined"
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Номер счета (IBAN){" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.number}
          name="number"
          onChange={formik.handleChange}
          id="outlined-basic"
          placeholder="Номер счета"
          variant="outlined"
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          SWIFT <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.swift}
          name="swift"
          onChange={formik.handleChange}
          id="outlined-basic"
          placeholder="SWIFT"
          variant="outlined"
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Название банка{" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%", marginBottom: 5 }}
          value={formik.values.bankName}
          name="bankName"
          onChange={formik.handleChange}
          id="outlined-basic"
          placeholder="Название банка"
          variant="outlined"
        />
      </div>

      <AuthButton
        active={
          formik.values.nameOrganizer &&
          !Boolean(formik.errors.nameOrganizer) &&
          formik.values.country &&
          !Boolean(formik.errors.country) &&
          formik.values.city &&
          !Boolean(formik.errors.city)
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

export default OrganizerLegalData
