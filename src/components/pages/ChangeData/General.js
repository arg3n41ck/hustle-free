import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useFormik } from "formik"
import * as yup from "yup"
import { Box, TextField } from "@mui/material"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { MobileDatePicker } from "@mui/lab"
import InputMask from "react-input-mask"
import { AuthButton } from "../Authorization/Authorization"
import { useDispatch } from "react-redux"
import {
  checkProgress,
  saveUser,
  saveUserThunk,
} from "../../../redux/components/user"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { theme } from "../../../styles/theme"
import Password from "./Password"
import { decamelizeKeys } from "humps"
import { toast } from "react-toastify"

const validationSchema = yup.object({
  lastName: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required("Заполните поле"),
  firstName: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required("Заполните поле"),
  birthDate: yup
    .string()
    .test(
      "birthDate",
      "Укажите действительную дату",
      (value) => new Date(value) < new Date()
    )
    .required("Заполните поле"),
  phoneNumber: yup
    .string()
    .test("FILE_SIZE", "Введите правильный формат номера.", (value) => {
      if (typeof value === "undefined") return true
      return value?.replace(/[^0-9]/g, "")?.length >= 11
    }),
  facebook: yup.string().nullable().url(),
  linkedin: yup.string().nullable().url(),
  instagram: yup.string().nullable().url(),
  vk: yup.string().nullable().url(),
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
const General = ({ user, onTabs }) => {
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState(null)

  const formik = useFormik({
    initialValues: { ...user },
    onSubmit: async (values) => {
      if (formik.dirty) {
        const { careers, educations, certifications, avatar, ...rst } = values
        for (let key in rst) {
          if (rst[key] === null) {
            delete rst[key]
          }
        }
        const newRst = decamelizeKeys(rst)
        const checkerPhoneNumber =
          rst.phoneNumber === "+" ? "" : rst.phoneNumber.replace(/[^0-9]/g, "")

        const newUser = {
          ...newRst,
          avatar,
          phone_number: checkerPhoneNumber ? `+${checkerPhoneNumber}` : "",
          skills: newRst.skills.map((skill) => skill.id),
        }

        if (typeof newUser.avatar === "string" || !newUser.avatar)
          delete newUser.avatar
        const res = await dispatch(
          saveUserThunk({
            user: newUser,
          })
        )
        dispatch(
          saveUser({
            ...values,
            avatar: res.payload.data.avatar,
            phoneNumber: rst.phoneNumber,
          })
        )
        formik.setFieldValue("avatar", res.payload.data.avatar)
        formik.setFieldValue("phoneNumber", rst.phoneNumber)
        onTabs("career")
      }
    },
    validationSchema,
  })

  const uploadImageToClient = (event) => {
    if (event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <Box
      component={"form"}
      sx={{
        marginBottom: 6.1,
      }}
      onSubmit={formik.handleSubmit}
    >
      <Wrapper>
        <Title style={{ padding: 32 }}>Основные данные</Title>
        <Line />
        <Content>
          <Title>Личные данные</Title>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridColumnGap: 24,
              marginTop: 2.4,
            }}
          >
            <div className="auth-wrapper__input">
              <p className="auth-title__input">Фамилия</p>
              <TextField
                defaultValue={formik.values.lastName}
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

          {/* <Box
            sx={{
              "& .MuiFormControl-root": {
                display: "flex",
              },
            }}
            className="auth-wrapper__input"
          >
            <p className="auth-title__input">День рождения</p>
            <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                toolbarTitle={"Выбрать дату"}
                cancelText={"Отмена"}
                value={formik.values.birthDate}
                onChange={(value) =>
                  formik.setFieldValue(
                    "birthDate",
                    format(new Date(value), "yyyy-MM-dd")
                  )
                }
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={
                      formik.touched.birthDate &&
                      Boolean(formik.errors.birthDate)
                    }
                    inputProps={{
                      ...params.inputProps,
                    }}
                    helperText={
                      formik.touched.birthDate && formik.errors.birthDate
                    }
                  />
                )}
              />
            </LocalizationProvider>{" "}
          </Box> */}

          <div className="auth-wrapper__input">
            <p className="auth-title__input">Контакты</p>
            <InputMask
              name={"phoneNumber"}
              onChange={formik.handleChange}
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
                  error={Boolean(formik.errors.phoneNumber)}
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
                />
              )}
            </InputMask>
          </div>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">Электронный адрес</p>
            <TextField
              disabled
              sx={{ width: "100%", background: "#F2F2F2" }}
              value={formik.values.email}
              id="outlined-basic"
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

          <Box marginBottom={2.4}>
            <Password />
          </Box>

          <Title style={{ marginBottom: 24 }}>Соц. сети</Title>
          <div className="auth-wrapper__input">
            <p className="auth-title__input">
              Facebook <Optional>(Необязательно)</Optional>
            </p>
            <TextField
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              value={formik.values.facebook}
              name="facebook"
              id="outlined-basic"
              placeholder="ссылка"
              variant="outlined"
              error={formik.touched.facebook && Boolean(formik.errors.facebook)}
            />
          </div>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">
              Linkedin <Optional>(Необязательно)</Optional>
            </p>
            <TextField
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              value={formik.values.linkedin}
              name="linkedin"
              id="outlined-basic"
              placeholder="ссылка"
              variant="outlined"
              error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
            />
          </div>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">
              Instagram <Optional>(Необязательно)</Optional>
            </p>
            <TextField
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              value={formik.values.instagram}
              name="instagram"
              id="outlined-basic"
              placeholder="ссылка"
              variant="outlined"
              error={
                formik.touched.instagram && Boolean(formik.errors.instagram)
              }
            />
          </div>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">
              VK <Optional>(Необязательно)</Optional>
            </p>
            <TextField
              sx={{ width: "100%" }}
              onChange={formik.handleChange}
              value={formik.values.vk}
              name="vk"
              id="outlined-basic"
              placeholder="ссылка"
              variant="outlined"
              error={formik.touched.vk && Boolean(formik.errors.vk)}
            />
          </div>
          <LogoFieldWrapper
            error={!!(formik.touched.avatar && Boolean(formik.errors.avatar))}
          >
            <Title>Фотография профиля</Title>
            <Description>
              Фотография показывается, например, рядом с вашими профилем{" "}
            </Description>

            <AvatarWrapper>
              <FileUploadLabel
                htmlFor={"user-logo"}
                hasAvatar={formik.values.avatar}
              >
                <input
                  id="user-logo"
                  name={"avatar"}
                  accept="image/png"
                  onChange={(e) => {
                    uploadImageToClient(e)
                    const file = e.target.files[0]
                    formik.setFieldValue("avatar", file)
                  }}
                  type="file"
                />
                <AvatarInfo>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.6035 17.5H34.6465V12.0056H40V9.07531H34.6465V3.75H31.6035V9.07531H26.25V12.0056H31.6035V17.5Z"
                      fill="#27AE60"
                    />
                    <path
                      d="M32.0832 24.7028V19.5H35V30.625C35 33.0371 33.0371 35 30.625 35H4.375C2.22248 35 0.437393 33.4339 0.0771713 31.3834C0.0130844 31.217 0.00427246 31.0405 0.0248337 30.8656C0.0228398 30.8297 0.0178063 30.7947 0.0127882 30.7598C0.00638189 30.7152 0 30.6708 0 30.625V13.125C0 10.7129 1.96293 8.75 4.375 8.75H24.25V11.6668H4.375C3.57151 11.6668 2.91676 12.3215 2.91676 13.125V27.6193L8.39993 22.1362C9.39594 21.1385 11.0192 21.1385 12.0166 22.1362L13.8543 23.9736L20.7959 17.0319C21.792 16.0343 23.415 16.0343 24.4126 17.0319L32.0832 24.7028Z"
                      fill="#27AE60"
                    />
                    <path
                      d="M10.2082 16.0418C10.2082 17.6525 8.90247 18.9582 7.29176 18.9582C5.68077 18.9582 4.375 17.6525 4.375 16.0418C4.375 14.4308 5.68077 13.125 7.29176 13.125C8.90247 13.125 10.2082 14.4308 10.2082 16.0418Z"
                      fill="#27AE60"
                    />
                  </svg>
                  {!!formik.values.avatar && (
                    <AvatarText>Изменить фотографию</AvatarText>
                  )}
                </AvatarInfo>
                {!!formik.values.avatar && (
                  <ImageS
                    src={
                      typeof formik.values.avatar === "string"
                        ? formik.values.avatar
                        : imageUrl
                    }
                  />
                )}
              </FileUploadLabel>

              <div>
                <Description style={{ margin: 0 }}>
                  Рекомендуем использовать изображение размером не менее 600х600
                  пикселей в формате PNG.
                </Description>

                <Description
                  style={{
                    margin: 0,
                    color:
                      formik.touched.avatar && Boolean(formik.errors.avatar)
                        ? "#EB5757"
                        : "#828282",
                  }}
                >
                  Размер файла – не более 4 МБ.
                </Description>
              </div>
            </AvatarWrapper>
          </LogoFieldWrapper>
        </Content>
      </Wrapper>
      <AuthButton
        active={formik.dirty}
        disabled={!formik.dirty}
        onClick={() => {
          const firstError = Object.keys(formik.errors || {})[0]
          if (firstError)
            toast.error(`Упс... какое-то поле неправильно заполнено.`, {
              autoClose: 4000,
            })
        }}
        type="submit"
      >
        Сохранить
      </AuthButton>
    </Box>
  )
}

const Wrapper = styled.div`
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  border-radius: 16px;
  margin-bottom: 32px;
`
const Title = styled.h3`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
  ${theme.mqMax("lg")} {
  }
`
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d8d8d8;
`
const Content = styled.div`
  padding: 32px;
`
const Optional = styled.span`
  color: #d8d8d8;
`
export const Description = styled.p`
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  margin-bottom: 16px;
`
const LogoFieldWrapper = styled.div`
  margin: 32px 0 0;
  padding: ${({ error }) => (error ? "5px" : "0")};
  border: ${({ error }) => (error ? "1px" : "0")} solid #eb5757;
  border-radius: 8px;
`
const AvatarWrapper = styled.div`
  display: flex;
  ${theme.mqMax("md")} {
    flex-direction: column-reverse;
    align-items: center;
  }
`
const FileUploadLabel = styled.label`
  position: relative;
  display: inline-block;
  cursor: pointer;
  border: ${(p) => (p.hasAvatar ? "none" : "2px dashed #27ae60")};
  border-radius: 8px;
  width: 100%;
  max-width: 200px;
  height: 200px;
  margin-right: 24px;
  overflow: hidden;
  ${theme.mqMax("md")} {
    margin-top: 30px;
  }
  div {
    display: ${(p) => (p.hasAvatar ? "none" : "flex")};
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    div {
      display: flex;
      background: ${(p) =>
        p.hasAvatar
          ? "rgba(0, 0, 0, .3)"
          : "linear-gradient(0deg, #f1fbf5, #f1fbf5), #ffffff"};
    }
    div {
      svg * {
        fill: ${(p) => (!p.hasAvatar ? "#27AE60" : "#fff")};
      }
    }
  }
  input[type="file"] {
    opacity: 0;
    z-index: 4;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`
const AvatarInfo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`
const ImageS = styled.img`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`
const AvatarText = styled.p`
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
`
export default General
