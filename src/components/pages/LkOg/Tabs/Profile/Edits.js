import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import styled from "styled-components"
import { Box, TextField } from "@mui/material"
import { ru } from "date-fns/locale"
import { LocalizationProvider, MobileDatePicker } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import Radio from "../../../../ui/Radio"
import InputMask from "react-input-mask"
import CustomButton from "../../../../ui/CustomButton"
import Link from "next/link"
import PhoneIcon from "../../../../../assets/svg/profile-phone.svg"
import EmailIcon from "../../../../../assets/svg/profile-email-edit.svg"
import SelectUI from "../../../../ui/Selects/Select"
import { fetchUser } from "../../../../../redux/components/user"
import { format } from "date-fns"
import { useRouter } from "next/router"
import { formDataHttp } from "../../../../../helpers/formDataHttp"
import Image from "next/image"
import UploadIcon from "../../../../../assets/svg/upload-profile-icon.svg"
import {
  Gallery,
  GalleryBlock,
  GalleryInput,
  GalleryLabel,
  GrayText,
  ImageWrapper,
  UploadIconWrapper,
} from "../../../LkTm/Tabs/Profile/Edits"
import { useTranslation } from "next-i18next"

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите поле почты корректно")
    .required("Заполните поле почты"),
  firstName: yup.string().required("Обязательное поле"),
  lastName: yup.string().required("Обязательное поле"),
  phoneNumber: yup.string().min(12).required("Обязательное поле"),
  gender: yup.mixed(),
  dateBirthday: yup.mixed().nullable(),
  country: yup.string().required("Обязательное поле"),
  city: yup.string().required("Обязательное поле"),
  nameOrganization: yup.string().nullable().required("Обязательное поле"),
  factAddress: yup.string().nullable(),
  address: yup.string().nullable(),
  avatar: yup
    .mixed()
    .test("FILE_SIZE", "Размер файла должен быть – не более 4 МБ.", (value) => {
      if (!value) return true
      if (typeof value !== "string") {
        return !!value && (value.size / 1024 / 1024).toFixed(2) <= 4
      }
      return true
    }),
})

const Edits = () => {
  const {
    user,
    countries: {
      countries: { data: countries },
    },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { push: routerPush } = useRouter()
  const [currentCities, setCurrentCities] = useState([])
  const { t: tCommon } = useTranslation("common")
  const formik = useFormik({
    initialValues: user.user && {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: null,
      dateBirthday: null,
      age: null,
      role: "",
      country: null,
      city: null,
      avatar: null,
      nameOrganization: "",
      address: null,
      factAddress: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const currentCountry = countries.find(
            (country) => country.name === values.country
          ),
          currentCity = currentCountry.cityCountry.find(
            (country) => country.name === values.city
          ),
          newValues = {
            ...values,
            dateBirthday:
              values.dateBirthday &&
              format(new Date(values.dateBirthday), "yyyy-MM-dd"),
            country: currentCountry.id,
            city: currentCity.id,
          }
        typeof values.avatar === "string" && delete newValues.avatar
        await formDataHttp(newValues, "organizer/profile/edit/", "patch")
        dispatch(fetchUser())
        routerPush("/lk-og/profile")
      } catch (e) {
        throw e
      }
    },
  })

  useEffect(() => {
    formik.setValues(user.user)
  }, [user.user])

  const changeCurrentCities = (changeCountry) => {
    const findObj = countries.find((country) => country.name === changeCountry)
    if (findObj) setCurrentCities(findObj.cityCountry)
  }

  useEffect(() => {
    if (typeof +formik.values?.country === "number" && countries.length) {
      const currentCountry = countries.find(
        (country) => country.id === formik.values?.country
      )
      const currentCity = currentCountry?.cityCountry.find(
        (city) => city.id === formik.values?.city
      )

      if (currentCountry && currentCity) {
        setCurrentCities(currentCountry?.cityCountry)
        formik.setFieldValue("country", currentCountry.name)
        formik.setFieldValue("city", currentCity.name)
      }
    }
  }, [formik.values?.country, formik.values?.city])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Header>
        <Title>{tCommon("form.titles.profileEdit")}</Title>
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
            <p className="auth-title__input">
              {tCommon("form.fieldsNames.lastName")}
            </p>
            <TextField
              sx={{ width: "100%" }}
              name="lastName"
              value={formik.values?.lastName}
              onChange={(e) =>
                formik.setFieldValue(
                  "lastName",
                  e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                )
              }
              placeholder={tCommon("form.fieldsNames.lastName")}
              variant="outlined"
              error={
                formik.touched?.lastName && Boolean(formik.errors?.lastName)
              }
              helperText={formik.touched?.lastName && formik.errors?.lastName}
            />
          </div>
          <div className="auth-wrapper__input">
            <p className="auth-title__input">
              {tCommon("form.fieldsNames.firstName")}
            </p>
            <TextField
              sx={{ width: "100%" }}
              name="firstName"
              value={formik.values?.firstName}
              onChange={(e) =>
                formik.setFieldValue(
                  "firstName",
                  e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                )
              }
              placeholder={tCommon("form.fieldsNames.firstName")}
              variant="outlined"
              error={
                formik.touched?.firstName && Boolean(formik.errors?.firstName)
              }
              helperText={formik.touched?.firstName && formik.errors?.firstName}
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
            {tCommon("form.fieldsNames.birthDate")}
          </p>
          <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              toolbarTitle={"Выбрать дату"}
              cancelText={"Отмена"}
              value={formik?.values?.dateBirthday || ""}
              onChange={(value) => formik.setFieldValue("dateBirthday", value)}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={
                    Boolean(formik.touched?.dateBirthday) &&
                    formik.errors?.dateBirthday
                  }
                  helperText={
                    formik.touched?.dateBirthday && formik.errors?.dateBirthday
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
          <p className="auth-title__input">
            {tCommon("form.fieldsNames.gender.label")} (
            {tCommon("form.fieldsNames.notNecessary")})
          </p>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <RadioWrapper>
              <Radio
                text={tCommon("form.fieldsNames.gender.female")}
                checked={formik.values?.gender === "female"}
                onChange={() => formik.setFieldValue("gender", "female")}
              />
            </RadioWrapper>
            <RadioWrapper>
              <Radio
                text={tCommon("form.fieldsNames.gender.male")}
                checked={formik.values?.gender === "male"}
                onChange={() => formik.setFieldValue("gender", "male")}
              />
            </RadioWrapper>
          </Box>
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">
            {tCommon("form.fieldsNames.phoneNumber")}
          </p>
          <InputMask
            name={"phoneNumber"}
            onChange={(e) =>
              formik.setFieldValue(
                "phoneNumber",
                `+${e.target.value.replace(/\D/gi, "")}`
              )
            }
            value={`${formik.values?.phoneNumber}`.replace(/\D/gi, "")}
            mask="+7(999) 999 99 99"
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                sx={{ width: "100%" }}
                variant="outlined"
                placeholder={"+7 (999) 999 99 99"}
                error={
                  Boolean(formik.touched?.phoneNumber) &&
                  formik.errors?.phoneNumber
                }
                InputProps={{
                  endAdornment: <PhoneIcon />,
                }}
              />
            )}
          </InputMask>
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">
            {tCommon("form.fieldsNames.email")}
          </p>
          <TextField
            sx={{ width: "100%" }}
            name="email"
            value={formik.values?.email}
            onChange={() => {}}
            placeholder={tCommon("form.fieldsNames.email")}
            variant="outlined"
            error={formik.touched?.email && Boolean(formik.errors?.email)}
            helperText={formik.touched?.email && formik.errors?.email}
            InputProps={{
              endAdornment: <EmailIcon />,
            }}
          />
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">
            {tCommon("form.fieldsNames.organizationName")}
          </p>
          <TextField
            sx={{ width: "100%" }}
            name="nameOrganization"
            onChange={formik.handleChange}
            value={formik.values?.nameOrganization}
            placeholder={tCommon("form.fieldsNames.organizationName")}
            variant="outlined"
            error={
              formik.touched?.nameOrganization &&
              Boolean(formik.errors?.nameOrganization)
            }
            helperText={
              formik.touched?.nameOrganization &&
              formik.errors?.nameOrganization
            }
          />
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">
            {tCommon("form.fieldsNames.country")}
          </p>
          <SelectUI
            error={!!(formik.touched?.country && formik.errors?.country)}
            onChange={(e) => {
              formik.setFieldValue("city", "")
              changeCurrentCities(e.target.value)
              formik.setFieldValue("country", e.target.value)
            }}
            value={formik.values?.country}
            name={"country"}
          >
            <option
              style={{ color: "#BDBDBD" }}
              disabled
              selected
              value={formik.values?.country ?? ""}
            >
              {!!formik.values?.country
                ? formik.values?.country
                : tCommon("form.fieldsNames.country")}
            </option>
            {countries
              .filter((country) => country.name !== formik.values?.country)
              .map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
          </SelectUI>
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">
            {tCommon("form.fieldsNames.city")}
          </p>
          <SelectUI
            error={!!(formik.touched?.city && formik.errors?.city)}
            onChange={formik.handleChange}
            value={formik.values?.city}
            name={"city"}
          >
            <option
              style={{ color: "#BDBDBD" }}
              disabled
              selected
              value={formik.values?.city ?? ""}
            >
              {!!formik.values?.city ? formik.values?.city : "Город"}
            </option>
            {currentCities
              .filter((city) => city.name !== formik.values?.city)
              .map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
          </SelectUI>
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">
            {tCommon("form.fieldsNames.actualAddress")} (
            {tCommon("form.fieldsNames.notNecessary")})
          </p>
          <TextField
            sx={{ width: "100%" }}
            name="factAddress"
            onChange={formik.handleChange}
            value={formik.values?.factAddress}
            placeholder={tCommon("form.fieldsNames.actualAddress")}
            variant="outlined"
            error={
              formik.touched?.factAddress && Boolean(formik.errors?.factAddress)
            }
            helperText={
              formik.touched?.factAddress && formik.errors?.factAddress
            }
          />
        </div>

        <Gallery>
          <Title>{tCommon("form.fieldsNames.profileAvatar.label")}</Title>
          <GrayText style={{ marginTop: 4 }}>
            {tCommon("form.fieldsNames.profileAvatar.description")}
          </GrayText>
          <GalleryBlock>
            <GalleryLabel
              error={formik.touched.avatar && Boolean(formik.errors.avatar)}
            >
              {!!formik?.values?.avatar ? (
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
              {tCommon("form.fieldsNames.profileAvatar.rules4mb")}
            </GrayText>
          </GalleryBlock>
        </Gallery>
        <div
          className="auth-wrapper__independent"
          style={{ margin: "0 0 32px" }}
        >
          <Link href={"/auth/auth-reset-password"}>
            <a>
              <p className="auth-link">
                {tCommon("form.fieldsNames.changePassword")}
              </p>
            </a>
          </Link>
        </div>
        <div className="auth-wrapper__independent border-top">
          {tCommon("form.fieldsNames.deleteProfile.extra")}{" "}
          <Link href={`/auth/delete/${user.id}`}>
            <a>
              <span className="auth-link">
                {tCommon("form.fieldsNames.deleteProfile.label")}
              </span>
            </a>
          </Link>
        </div>
      </Content>
      <Footer>
        <Link href={"/lk-og/profile/"} passHref>
          <ButtonWrapper>
            <CustomButton type={"button"} typeButton={"secondary"}>
              {tCommon("form.fieldsNames.cancel")}
            </CustomButton>
          </ButtonWrapper>
        </Link>

        <ButtonWrapper>
          <CustomButton type={"submit"} typeButton={"primary"}>
            {tCommon("form.fieldsNames.save")}
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
  grid-column-gap: 32px;
`
const ButtonWrapper = styled.div`
  max-width: 256px;
  width: 100%;
`
export default Edits
