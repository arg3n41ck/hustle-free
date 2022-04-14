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
import EmailIcon from "../../../../../public/svg/email-profile.svg"
import CustomButton from "../../../../ui/CustomButton"
import { objToFormData } from "../../../../../helpers/formData"
import axios from "axios"
import { getCookie } from "../../../../../services/JWTService"

const me = {
  id: 1,
  email: "admin@qwe.qwe",
  first_name: "Azamat",
  last_name: "Askarov",
  phone_number: "+73422343243",
  gender: "male",
  date_birthday: "2021-03-12",
  age: 1,
  role: "team",
  country: 1,
  city: 1,
  avatar: null,
  name_organization: null,
  address: null,
}

const profile = {
  id: 1,
  user: {
    id: 1,
    full_name: "Азамат Аскаров",
    country: 1,
    city: 1,
    email: "admin@qwe.qwe",
    avatar: null,
    phone_number: "+73422343243",
  },
  web_site: "http://asdf.ru",
  full_name_coach: "asdf",
  phone_coach: "+996555555555",
  email_coach: "lev@lev.lev",
  sports: [1],
  description: "fasd",
}

const validationSchema = yup.object({})
const Edits = ({ onView }) => {
  const {
    user,
    countries: {
      countries: { data: countries },
    },
    sportTypes: {
      sportTypes: { data: sportTypes },
    },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: user.user,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { country, city, avatar, ...rstValues } = values,
          currentCountry = countries.find(
            (countryItem) => countryItem.name === country
          ),
          currentCity = currentCountry.cityCountry.find(
            (cityItem) => cityItem.name === city
          )
        // const newValues = {
        //   ...rstValues,
        //   user: { country, city, avatar },
        // }
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}teams/profile/edit/`,
          objToFormData({
            ...rstValues,
            sports: currentSportTypes.map((CSportItem) => CSportItem.id),
            user: { country: currentCountry.id, city: currentCity.id, avatar },
          }),
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
              "Content-type":
                "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
            },
          }
        )

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
        onView("general")
      } catch (e) {
        throw e
      }
    },
  })
  const [currentCities, setCurrentCities] = useState([])
  const [currentSportTypes, setCurrentSportTypes] = useState([])

  const changeCurrentCities = (changeCountry) => {
    const findObj = countries.find((country) => country.name === changeCountry)
    if (findObj) setCurrentCities(findObj.cityCountry)
  }

  useEffect(() => {
    if (typeof formik.values.country === "number") {
      const currentCountry = countries.find(
        (country) => country.id === formik.values.country
      )
      const currentCity = currentCountry.cityCountry.find(
        (city) => city.id === formik.values.city
      )
      setCurrentCities(currentCountry.cityCountry)
      formik.setFieldValue("country", currentCountry.name)
      formik.setFieldValue("city", currentCity.name)
    }

    const newSportTypes = []
    formik.values.sports.map((sportId) => {
      const obj = sportTypes.find((sportType) => sportType.id === sportId)
      newSportTypes.push(obj)
    })
    setCurrentSportTypes(newSportTypes)
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
            {countries
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

        <div className="auth-wrapper__input">
          <p className="auth-title__input">Вид спорта</p>
          <SelectUI
            error={!!(formik.touched.sports && formik.errors.sports)}
            onChange={(e) => {
              if (e.target.value) {
                const obj = sportTypes.find(
                  (sportType) => sportType.name === e.target.value
                )
                setCurrentSportTypes((prev) => [...prev, obj])
              }
            }}
          >
            <option style={{ color: "#BDBDBD" }} selected value={""}>
              Вид спорта
            </option>
            {sportTypes
              .filter(
                (sportType) =>
                  !currentSportTypes.some(
                    (CSportType) => CSportType.id === sportType.id
                  )
              )
              .map((sportType) => (
                <option key={sportType.id} value={sportType.name}>
                  {sportType.name}
                </option>
              ))}
          </SelectUI>
        </div>

        {currentSportTypes.map((CSportType) => CSportType.name)}
      </Content>
      <Footer>
        <ButtonWrapper onClick={() => onView("general")}>
          <CustomButton type={"button"} typeButton={"secondary"}>
            Отмена
          </CustomButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <CustomButton type={"submit"} typeButton={"primary"}>
            Сохранить
          </CustomButton>
        </ButtonWrapper>
      </Footer>
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
