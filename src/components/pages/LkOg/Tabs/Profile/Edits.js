import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import styled from "styled-components"
import { Box, TextField } from "@mui/material"
import { ru } from "date-fns/locale"
import { DatePicker, LocalizationProvider, MobileDatePicker } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import Radio from "../../../../ui/Radio"
import InputMask from "react-input-mask"
import CustomButton from "../../../../ui/CustomButton"

import CalendarIcon from "../../../../../public/svg/calendar-edit-profile.svg"
import PhoneIcon from "../../../../../public/svg/profile-phone.svg"
import EmailIcon from "../../../../../public/svg/profile-email-edit.svg"
import SelectUI from "../../../../ui/Selects/Select"
import $api from "../../../../../services/axios"
import { saveUser } from "../../../../../redux/components/user"

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите поле почты корректно")
    .required("Заполните поле почты"),
  firstName: yup.string().required("Обязательное поле"),
  lastName: yup.string().required("Обязательное поле"),
  phoneNumber: yup.string().min(12).required("Обязательное поле"),
  gender: yup.string(),
  dateBirthday: yup.mixed().nullable(),
  country: yup.string().required("Обязательное поле"),
  city: yup.string().required("Обязательное поле"),
  nameOrganization: yup.string().nullable().required("Обязательное поле"),
  address: yup.string().nullable(),
})
const Edits = ({ onView }) => {
  const { user, locations } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [currentCities, setCurrentCities] = useState([])
  const formik = useFormik({
    initialValues: user.user,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const currentCountry = locations.countries.find(
            (country) => country.name === values.country
          ),
          currentCity = currentCountry.cityCountry.find(
            (country) => country.name === values.city
          ),
          newValues = {
            ...values,
            country: currentCountry.id,
            city: currentCity.id,
          }
        const { data } = await $api.put(`/accounts/users/me/`, newValues)
        dispatch(saveUser({ ...newValues, ...data }))
        onView("general")
      } catch (e) {
        throw e
      }
    },
  })

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
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
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
          <p className="auth-title__input">День рождения</p>
          <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
            <DatePicker
              components={{
                OpenPickerIcon: CalendarIcon,
              }}
              toolbarTitle={"Выбрать дату"}
              cancelText={"Отмена"}
              value={formik.values.dateBirthday}
              onChange={(value) => formik.setFieldValue("dateBirthday", value)}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={
                    Boolean(formik.touched.dateBirthday) &&
                    formik.errors.dateBirthday
                  }
                  helperText={
                    formik.touched.dateBirthday && formik.errors.dateBirthday
                  }
                  inputProps={{
                    ...params.inputProps,
                    placeholder: "ДД/ММ/ГГГГ",
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">Пол (не обязательно)</p>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <RadioWrapper>
              <Radio
                text={"Женский"}
                checked={formik.values?.gender === "female"}
                onChange={() => formik.setFieldValue("gender", "female")}
              />
            </RadioWrapper>
            <RadioWrapper>
              <Radio
                text={"Мужской"}
                checked={formik.values?.gender === "male"}
                onChange={() => formik.setFieldValue("gender", "male")}
              />
            </RadioWrapper>
          </Box>
        </div>

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
                placeholder={"+7 (7"}
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
          <p className="auth-title__input">Электронный адрес</p>
          <TextField
            sx={{ width: "100%" }}
            name="email"
            value={formik.values.email}
            onChange={(e) => {}}
            id="outlined-basic"
            placeholder="Электронный адрес"
            variant="outlined"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              endAdornment: <EmailIcon />,
            }}
          />
        </div>

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
          <p className="auth-title__input">Город</p>
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
              {!!formik.values.city ? formik.values.city : "Город"}
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
          <p className="auth-title__input">
            Фактический Адрес (не обязательно)
          </p>
          <TextField
            sx={{ width: "100%" }}
            name="address"
            onChange={formik.handleChange}
            id="outlined-basic"
            value={formik.values.address}
            placeholder="Фактический Адрес"
            variant="outlined"
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </div>
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
const RadioWrapper = styled.div`
  display: flex;
  margin-right: 32px;
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
