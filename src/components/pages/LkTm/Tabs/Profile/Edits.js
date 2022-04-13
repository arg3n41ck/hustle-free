import React, { useEffect, useState } from "react"
import { Formik, Form, FieldArray, getIn, useFormik } from "formik"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import $api from "../../../../../services/axios"
import { saveUser } from "../../../../../redux/components/user"
import styled from "styled-components"
import { Box, TextField } from "@mui/material"
import SelectUI from "../../../../ui/Selects/Select"
import InputMask from "react-input-mask"
import PhoneIcon from "../../../../../public/svg/phone-icon.svg"
import EmailIcon from "../../../../../public/svg/profile-email-edit.svg"

const validationSchema = yup.object().shape({
  careers: yup.array().of(yup.object({})),
})
const Edits = ({ onView }) => {
  const { user, locations } = useSelector((state) => state)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: user.user,
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values)
        // const currentCountry = locations.countries.find(
        //     (country) => country.name === values.country
        //   ),
        //   currentCity = currentCountry.cityCountry.find(
        //     (country) => country.name === values.city
        //   ),
        //   newValues = {
        //     ...values,
        //     country: currentCountry.id,
        //     city: currentCity.id,
        //   }
        // const { data } = await $api.put(`/organizer/profile/edit/`, newValues)
        // dispatch(saveUser({ ...newValues, ...data }))
        // onView("general")
      } catch (e) {
        throw e
      }
    },
  })
  const [currentCities, setCurrentCities] = useState([])

  const changeCurrentCities = (changeCountry) => {
    const findObj = locations.countries.find(
      (country) => country.name === changeCountry
    )
    if (findObj) setCurrentCities(findObj.cityCountry)
  }

  useEffect(() => {
    if (typeof formik.values.country === "number") {
      const currentCountry = locations.countries.find(
        (country) => country.id === formik.values.country
      )
      const currentCity = currentCountry.cityCountry.find(
        (city) => city.id === formik.values.city
      )
      setCurrentCities(currentCountry.cityCountry)
      formik.setFieldValue("country", currentCountry.name)
      formik.setFieldValue("city", currentCity.name)
    }
  }, [])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Header>
        <Title>Редактирование профиля</Title>
      </Header>
      <Content>
        <div className="auth-wrapper__input">
          <p className="auth-title__input">Название организации</p>
          <TextField
            sx={{ width: "100%" }}
            name="nameOrganization"
            onChange={formik.handleChange}
            id="outlined-basic"
            value={formik.values.nameOrganization}
            placeholder="Название организации"
            variant="outlined"
            error={
              formik.touched.nameOrganization &&
              Boolean(formik.errors.nameOrganization)
            }
            helperText={
              formik.touched.nameOrganization && formik.errors.nameOrganization
            }
          />
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">Страна</p>
          <SelectUI
            error={!!(formik.touched.country && formik.errors.country)}
            onChange={(e) => {
              formik.setFieldValue("city", "")
              changeCurrentCities(e.target.value)
              formik.setFieldValue("country", e.target.value)
            }}
            value={formik.values.country}
            name={"country"}
          >
            <option
              style={{ color: "#BDBDBD" }}
              disabled
              selected
              value={formik.values.country ?? ""}
            >
              {!!formik.values.country ? formik.values.country : "Страна"}
            </option>
            {locations.countries
              .filter((country) => country.name !== formik.values.country)
              .map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
          </SelectUI>
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">Город/Область</p>
          <SelectUI
            error={!!(formik.touched.city && formik.errors.city)}
            onChange={formik.handleChange}
            value={formik.values.city}
            name={"city"}
          >
            <option
              style={{ color: "#BDBDBD" }}
              disabled
              selected
              value={formik.values.city ?? ""}
            >
              {!!formik.values.city ? formik.values.city : "Город/Область"}
            </option>
            {currentCities
              .filter((city) => city.name !== formik.values.city)
              .map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
          </SelectUI>
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">Веб-сайт</p>
          <TextField
            sx={{ width: "100%" }}
            name="webSite"
            onChange={formik.handleChange}
            id="outlined-basic"
            value={formik.values.webSite}
            placeholder="Веб-сайт"
            variant="outlined"
            error={formik.touched.webSite && Boolean(formik.errors.webSite)}
            helperText={formik.touched.webSite && formik.errors.webSite}
          />
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">ФИО главного тренер</p>
          <TextField
            sx={{ width: "100%" }}
            name="fullNameCoach"
            onChange={formik.handleChange}
            id="outlined-basic"
            value={formik.values.fullNameCoach}
            placeholder="ФИО"
            variant="outlined"
            error={
              formik.touched.fullNameCoach &&
              Boolean(formik.errors.fullNameCoach)
            }
            helperText={
              formik.touched.fullNameCoach && formik.errors.fullNameCoach
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
            <p className="auth-title__input">Номер телефона</p>
            <InputMask
              name={"phoneNumber"}
              onChange={(e) =>
                formik.setFieldValue(
                  "phoneNumber",
                  `+${e.target.value.replace(/\D/gi, "")}`
                )
              }
              value={`${formik.values.phoneNumber}`.replace(/\D/gi, "")}
              mask="+7(999) 999 99 99"
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  variant="outlined"
                  placeholder={"Контакты"}
                  error={
                    Boolean(formik.touched.phoneNumber) &&
                    formik.errors.phoneNumber
                  }
                  InputProps={{
                    endAdornment: <PhoneIcon />,
                  }}
                />
              )}
            </InputMask>
          </div>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">Электронная почта тренера</p>
            <TextField
              sx={{ width: "100%" }}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              id="outlined-basic"
              placeholder="Электронная почта"
              variant="outlined"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                endAdornment: <EmailIcon />,
              }}
            />
          </div>
        </Box>


      </Content>
    </form>
  )
}

const Header = styled.div`
  padding: 32px;
  border-bottom: 1px solid #333333;
`
const Title = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  color: #f2f2f2;
`
const Content = styled.div`
  padding: 32px;
`
const Footer = styled.div`
  border-top: 1px solid #333333;
  padding: 32px;
  display: flex;
  justify-content: flex-end;
`
const ButtonWrapper = styled.div`
  max-width: 256px;
  width: 100%;
  &:first-child {
    margin-right: 32px;
  }
`

export default Edits
