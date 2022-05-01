import React, { useEffect, useState } from "react"
import { Formik, Form, FieldArray, getIn, useFormik } from "formik"
import * as yup from "yup"
import InputMask from "react-input-mask"
import { useDispatch, useSelector } from "react-redux"
import { formDataHttp } from "../../../../../helpers/formDataHttp"
import { fetchUser, saveUser } from "../../../../../redux/components/user"
import styled from "styled-components"
import { Box, Checkbox, TextField } from "@mui/material"
import SelectUI from "../../../../ui/Selects/Select"
import CustomButton from "../../../../ui/CustomButton"
import $api from "../../../../../services/axios"
import Image from "next/image"
import { decamelizeKeys } from "humps"

import PhoneIcon from "../../../../../public/svg/phone-icon.svg"
import EmailIcon from "../../../../../public/svg/email-profile.svg"
import UploadIcon from "../../../../../public/svg/upload-profile-icon.svg"
import { selectCountriesAndCities } from "../../../../../redux/components/countriesAndCities"

const Edits = ({ onView }) => {
  const {
    user,
    sportTypes: {
      sportTypes: { data: sportTypes },
    },
  } = useSelector((state) => state)
  const [countries] = useSelector(selectCountriesAndCities)
  const dispatch = useDispatch()
  const [currentSportTypes, setCurrentSportTypes] = useState([])
  const validationSchema = yup.object({
    nameOrganization: yup.string().nullable().required("Обязательное поле"),
    country: yup.mixed().required("Обязательное поле"),
    city: yup.mixed().required("Обязательное поле"),
    webSite: yup.string().url().required("Обязательное поле"),
    fullNameCoach: yup.string().required("Обязательное поле"),
    phoneCoach: yup.string().min(12).required("Обязательное поле"),
    emailCoach: yup
      .string()
      .email("Введите верно")
      .required("Обязательное поле"),
    sports: yup.array().test({
      message: "Обязательное поле",
      test: () => !!currentSportTypes.length,
    }),
    avatar: yup
      .mixed()
      .test(
        "FILE_SIZE",
        "Размер файла должен быть – не более 4 МБ.",
        (value) => {
          if (!value) return true
          if (typeof value !== "string") {
            return !!value && (value.size / 1024 / 1024).toFixed(2) <= 4
          }
          return true
        }
      ),
  })
  const formik = useFormik({
    initialValues: user.user,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { country, avatar, city, ...rstValues } = values,
          currentCountry = countries.find(
            (countryItem) => countryItem.name === country
          ),
          currentCity = currentCountry?.cityCountry.find(
            (cityItem) => cityItem.name === city
          )
        const newValues = {
          ...decamelizeKeys({
            ...rstValues,
            sports: currentSportTypes.map((CSportItem) => CSportItem.id),
            country: currentCountry.id,
            city: currentCity.id,
          }),
          avatar,
        }
        if (typeof newValues.avatar === "string") delete newValues.avatar
        const { data } = await formDataHttp(newValues, "teams/profile/edit/")
        dispatch(saveUser({ ...values, ...data }))
        dispatch(fetchUser())
        onView("general")
      } catch (e) {
        throw e
      }
    },
  })
  const [currentCities, setCurrentCities] = useState([])

  const changeCurrentCities = (changeCountry) => {
    const findObj = countries.find((country) => country.name === changeCountry)
    if (findObj) setCurrentCities(findObj.cityCountry)
  }

  useEffect(() => {
    if (typeof formik.values.country === "number") {
      const currentCountry = countries.find(
        (country) => country.id === formik.values.country
      )
      const currentCity = currentCountry?.cityCountry.find(
        (city) => city.id === formik.values.city
      )
      setCurrentCities(currentCountry.cityCountry)
      formik.setFieldValue("country", currentCountry.name)
      formik.setFieldValue("city", currentCity.name)
    }

    const newSportTypes = []
    formik.values?.sports?.map((sportId) => {
      const obj = sportTypes.find((sportType) => sportType.id === sportId)
      newSportTypes.push(obj)
    })
    setCurrentSportTypes(newSportTypes)
  }, [])

  const deleteSport = (value) => {
    const index = currentSportTypes.findIndex(
      (CSportItem) => CSportItem.id === value.id
    )
    setCurrentSportTypes((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ])
  }

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
              name={"phoneCoach"}
              onChange={(e) =>
                formik.setFieldValue(
                  "phoneCoach",
                  `+${e.target.value.replace(/\D/gi, "")}`
                )
              }
              error={
                Boolean(formik.touched.phoneCoach) && formik.errors.phoneCoach
              }
              value={`${formik.values.phoneCoach}`.replace(/\D/gi, "")}
              mask="+7(999) 999 99 99"
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  variant="outlined"
                  placeholder={"Контакты"}
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
              name="emailCoach"
              value={formik.values.emailCoach}
              onChange={formik.handleChange}
              id="outlined-basic"
              placeholder="Электронная почта"
              variant="outlined"
              error={
                formik.touched.emailCoach && Boolean(formik.errors.emailCoach)
              }
              helperText={formik.touched.emailCoach && formik.errors.emailCoach}
              InputProps={{
                endAdornment: <EmailIcon />,
              }}
            />
          </div>
        </Box>

        <div style={{ marginBottom: 16 }} className="auth-wrapper__input">
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

        {currentSportTypes.map((CSportType) => (
          <SportItem>
            <Checkbox
              defaultChecked
              onChange={() => deleteSport(CSportType)}
              sx={{
                padding: 0,
                "& .MuiSvgIcon-root": {
                  color: "#6D4EEA",
                },
              }}
            />
            <p>{CSportType?.name}</p>
          </SportItem>
        ))}

        <div className="auth-wrapper__input" style={{ marginTop: 32 }}>
          <p className="auth-title__input">Электронная почта тренера</p>
          <Textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            rows={4}
            placeholder={"Описание"}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
          />
        </div>

        <Gallery>
          <Title>Фотография профиля</Title>
          <GrayText style={{ marginTop: 4 }}>
            Фотография показывается, например, рядом с вашими профилем
          </GrayText>
          <GalleryBlock>
            <GalleryLabel
              error={formik.touched.avatar && Boolean(formik.errors.avatar)}
            >
              {!!formik.values.avatar ? (
                <ImageWrapper>
                  <Image
                    src={
                      typeof formik.values.avatar === "string"
                        ? formik.values.avatar
                        : URL.createObjectURL(formik.values.avatar)
                    }
                    width={128}
                    height={128}
                    objectFit={"cover"}
                  />
                </ImageWrapper>
              ) : (
                <UploadIconWrapper>
                  <UploadIcon />
                </UploadIconWrapper>
              )}

              <GalleryInput
                name="avatar"
                type={"file"}
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue("avatar", e.target.files[0])
                }
              />
            </GalleryLabel>
            <GrayText>
              Рекомендуем использовать изображение размером не менее 600х600
              пикселей в формате PNG. Размер файла – не более 4 МБ.
            </GrayText>
          </GalleryBlock>
        </Gallery>
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
  font-size: 24px;
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
const SportItem = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  p {
    margin-left: 16px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #f2f2f2;
  }
`
const Textarea = styled.textarea`
  background: #1b1c22;
  box-sizing: border-box;
  padding: 20px;
  border: 1.5px solid #333333;
  border-radius: 16px;
  height: 160px;
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`
const GrayText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #bdbdbd;
`
const WhiteText = styled(GrayText)`
  color: #f2f2f2;
`
const Gallery = styled.div`
  padding-bottom: 32px;
  border-bottom: 1px solid #333333;
`
const GalleryBlock = styled.div`
  display: flex;
  margin-top: 24px;
`
const GalleryLabel = styled.div`
  min-width: 128px;
  margin-right: 24px;
  height: 128px;
  background: #1b1c22;
  border: 2px dashed ${(p) => (p.error ? "##EB5757" : "#6d4eea")};
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`
const GalleryInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`
const UploadIconWrapper = styled.div`
  position: absolute;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const ImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

export default Edits
