import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Autocomplete, Box, LinearProgress, TextField } from "@mui/material"
import { FieldArray, Form, Formik, getIn } from "formik"
import * as yup from "yup"
import { AuthButton } from "../Authorization/Authorization"
import { makeStyles } from "@mui/styles"
import {
  changeFormatDataThunk,
  saveUserItem,
} from "../../../redux/components/user"
import { useDispatch, useSelector } from "react-redux"
import { theme } from "../../../styles/theme"
import { camelizeKeys, decamelizeKeys } from "humps"

import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { DeleteWrapper } from "./Career"
import $api from "../../../services/axios"

const useStyles = makeStyles(() => ({
  noBorder: {
    border: "none",
  },
}))

const validationSchema = yup.object().shape({
  certifications: yup.array().of(
    yup.object({
      image: yup
        .mixed()
        .test("FILE_SIZE", "Файл должен быть не больше 10мб", (value) => {
          if (!value) return true
          if (typeof value !== "string") {
            return !!value && (value.size / 1024 / 1024).toFixed(2) <= 10
          }
          return true
        }),
      nameOfCertificate: yup
        .string()
        .test(
          "",
          "Заполните поле",
          (value) => !!(value || " ").replace(/\s/g, "")
        )
        .max(70, "Название должно быть не длиннее 70 символов")
        .required("Заполните поле"),
      link: yup.string().url(),
      description: yup.string(),
      skills: yup.array().min(1).required("Заполните поле"),
    })
  ),
})

const Certificates = ({ user }) => {
  const classes = useStyles()
  const [certifications, setCertifications] = useState(null)
  const [deleteIds, setDeleteIds] = useState([])
  const skillsRedux = useSelector((state) => state.skills)
  const [checker, setChecker] = useState(true)
  const formRef = React.useRef()
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (user.certifications.length) {
      setCertifications(
        user.certifications.map((item) => ({ ...item, skill: "", progress: 0 }))
      )
      formRef.current.setFieldValue(
        `certifications`,
        user.certifications.map((item) => ({ ...item, skill: "", progress: 0 }))
      )
    } else {
      const newEntity = [
        {
          nameOfCertificate: "",
          link: "",
          description: "",
          image: null,
          skills: [],
          user: user.id,
          skill: "",
          progress: 0,
        },
      ]
      setCertifications(newEntity)
      formRef.current.setFieldValue(`certifications`, newEntity)
    }
  }, [user])

  const checkerHandler = () => {
    if (
      JSON.stringify(
        certifications?.map((item) => ({ ...item, progress: 0 }))
      ) !==
      JSON.stringify(
        formRef.current?.values.certifications.map((item) => ({
          ...item,
          progress: 0,
        }))
      )
    ) {
      setChecker(false)
    } else {
      setChecker(true)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
    }
  }

  const disableKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault()
    }
  }

  const handleSubmit = async (_values) => {
    if (!checker) {
      toast.info("Идет обработка данных пользователя...")
      for (let certificateId of deleteIds) {
        await $api.delete(`/accounts/certificates/${certificateId}/`)
      }
      const certifications = []
      for (let item of _values) {
        let image = null
        if (item.image) {
          image =
            typeof item.image === "string"
              ? item.image
              : `${process.env.NEXT_PUBLIC_API_MEDIA_URL}media/certificates/${item.image.name}`
        }
        const newUser = {
          ...item,
          image: item.image,
        }
        if (typeof newUser.image === "string") delete newUser.image
        if (!newUser.image) {
          newUser.image = ""
        }
        const {
          payload: { data },
        } = await dispatch(
          changeFormatDataThunk({
            itemData: newUser,
            path: "accounts/certificates/",
            showPopup: false,
          })
        )
        certifications.push({ ...data, image })
      }
      dispatch(
        saveUserItem({
          userItem: "certifications",
          value: camelizeKeys(certifications),
        })
      )
      toast.success("Изменения в данных пользователя прошли успешно!")
      router.push("/profile")
    }
  }

  const searchHandler = (e, value, index) => {
    const element = formRef.current.values.certifications[index].skills
    const item = skillsRedux.skills.find((item) => item.title === value)
    if (item?.id) {
      const newArr = [...element, item.id]
      formRef.current.setFieldValue(`certifications[${index}].skills`, newArr)
      formRef.current.setFieldValue(`certifications[${index}].skill`, "")
    }
  }

  const deleteHandler = (id, index) => {
    const element = formRef.current.values.certifications[index].skills
    const indexOfElement = element.indexOf(id)
    if (indexOfElement !== -1) {
      const newArr = [...element]
      newArr.splice(indexOfElement, 1)
      formRef.current.setFieldValue(`certifications[${index}].skills`, newArr)
    }
  }

  const fieldValuesHandler = (key, value) => {
    formRef.current.setFieldValue(key, value)
  }

  return (
    <Formik
      onKeyDown={disableKeyDown}
      innerRef={formRef}
      onSubmit={(values) => {
        const certifications = values.certifications.map((item) => {
          delete item.skill
          delete item.progress
          return item
        })
        const newValues = certifications.map((item) => {
          const { image, ...rst } = item
          const newObj = decamelizeKeys(rst)
          return { ...newObj, image }
        })
        console.log("newValues", newValues)
        handleSubmit(newValues).then((res) => res)
      }}
      initialValues={{
        certifications: user.certifications.length
          ? user.certifications.map((item) => ({
              ...item,
              skill: "",
              progress: 0,
            }))
          : [
              {
                nameOfCertificate: "",
                link: "",
                description: "",
                image: null,
                skills: [],
                user: user.id,
                skill: "",
                progress: 0,
              },
            ],
      }}
      validationSchema={validationSchema}
    >
      {({ values, touched, errors, handleChange, setFieldValue }) => (
        <Form noValidate autoComplete="off">
          <Wrapper>
            <Title>Сертификаты</Title>
            <Line />
            <FieldArray name="certifications">
              {({ push, remove }) => {
                checkerHandler()
                return (
                  <>
                    {values.certifications.map((e, index) => {
                      const description = `certifications[${index}].description`,
                        touchedDescription = getIn(touched, description),
                        errorDescription = getIn(errors, description),
                        image = `certifications[${index}].image`,
                        touchedImage = getIn(touched, image),
                        errorImage = getIn(errors, image),
                        link = `certifications[${index}].link`,
                        touchedLink = getIn(touched, link),
                        errorLink = getIn(errors, link),
                        nameOfCertificate = `certifications[${index}].nameOfCertificate`,
                        touchedNameOfCertificate = getIn(
                          touched,
                          nameOfCertificate
                        ),
                        errorNameOfCertificate = getIn(
                          errors,
                          nameOfCertificate
                        ),
                        skills = `certifications[${index}].skills`,
                        touchedSkills = getIn(touched, skills),
                        errorSkills = getIn(errors, skills),
                        skill = `certifications[${index}].skill`,
                        progress = `certifications[${index}].progress`

                      return (
                        <Box sx={{ padding: "32px" }}>
                          <div className="auth-wrapper__input">
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p className="auth-title__input">
                                Название сертификата №{index + 1}
                              </p>
                              {index !== 0 && (
                                <DeleteWrapper
                                  onClick={() => {
                                    if (e.id)
                                      setDeleteIds((prev) => [...prev, e.id])
                                    remove(index)
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 15L10 12"
                                      stroke="#EB5757"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M14 15L14 12"
                                      stroke="#EB5757"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z"
                                      stroke="#EB5757"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059"
                                      stroke="#EB5757"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>

                                  <span style={{ marginLeft: 11 }}>
                                    Удалить
                                  </span>
                                </DeleteWrapper>
                              )}
                            </Box>
                            <TextField
                              value={e.nameOfCertificate}
                              sx={{ width: "100%" }}
                              name={nameOfCertificate}
                              onChange={handleChange}
                              id="outlined-basic"
                              placeholder="Название сертификата"
                              variant="outlined"
                              error={
                                !!(
                                  touchedNameOfCertificate &&
                                  errorNameOfCertificate
                                )
                              }
                              helperText={
                                touchedNameOfCertificate &&
                                errorNameOfCertificate
                              }
                            />
                          </div>

                          <div className="auth-wrapper__input">
                            <p className="auth-title__input">Ссылка</p>
                            <TextField
                              value={e.link}
                              sx={{ width: "100%" }}
                              name={link}
                              onChange={handleChange}
                              id="outlined-basic"
                              placeholder="Ссылка"
                              variant="outlined"
                              error={!!(touchedLink && errorLink)}
                            />
                          </div>

                          <Box>
                            <p className="auth-title__input">Добавьте навыки</p>
                            <AddSkillsWrapper
                              error={!!(touchedSkills && errorSkills)}
                              opened={
                                !!skillsRedux?.skills?.filter((item) =>
                                  e.skills.includes(item.id)
                                ).length
                              }
                            >
                              <CountHint>
                                {e.skills ? e.skills.length : 0}/500
                              </CountHint>
                              <Skills>
                                {skillsRedux.skills
                                  .filter((item) => e.skills.includes(item.id))
                                  .map((item) => (
                                    <Skill key={item.id}>
                                      {item.title}
                                      <Box
                                        onClick={() =>
                                          deleteHandler(item.id, index)
                                        }
                                        sx={{
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                          marginLeft: 1.3,
                                        }}
                                      >
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
                                            r="9"
                                            fill="white"
                                          />
                                          <path
                                            d="M16 8L8 16"
                                            stroke="#828282"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M8 8L16 16"
                                            stroke="#828282"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </Box>
                                    </Skill>
                                  ))}
                              </Skills>
                              <Autocomplete
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    width: 0,
                                  },
                                }}
                                id="blur-on-select"
                                blurOnSelect
                                onKeyDown={handleKeyDown}
                                noOptionsText={"Ничего не найдено"}
                                onChange={(e, value) =>
                                  searchHandler(e, value, index)
                                }
                                name={skill}
                                value={e.skill}
                                fullWidth
                                options={skillsRedux.skills
                                  .filter((item) => !e.skills.includes(item.id))
                                  .map((option) => option.title)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    onChange={(e) =>
                                      setFieldValue(
                                        `certifications[${index}].skill`,
                                        e.target.value
                                      )
                                    }
                                    value={e.skill}
                                    placeholder="Добавьте навык"
                                    InputProps={{
                                      ...params.InputProps,
                                      classes: {
                                        notchedOutline: classes.noBorder,
                                      },
                                      style: {
                                        padding: 0,
                                      },
                                    }}
                                  />
                                )}
                              />
                            </AddSkillsWrapper>

                            <Box sx={{ marginTop: 2.4 }}>
                              <p className="auth-title__input">Сертификат</p>
                              <FileUploadLabel
                                htmlFor={"file-input"}
                                error={!!(touchedImage && errorImage)}
                              >
                                <CustomInput
                                  id={"file-input"}
                                  type={"file"}
                                  onChange={(e) => {
                                    const file = e.target.files[0]
                                    setFieldValue(
                                      `certifications[${index}].image`,
                                      file
                                    )
                                    setFieldValue(
                                      `certifications[${index}].filename`,
                                      file.name
                                    )
                                    setFieldValue(progress, 100)
                                  }}
                                  name={image}
                                />
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                >
                                  <UploadText>
                                    Загрузите файл простым переносом или по
                                    кнопке ниже
                                  </UploadText>
                                  <UploadBtn>
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6 8.6665L10 8.6665"
                                        stroke="#27AE60"
                                        strokeLinecap="round"
                                      />
                                      <path
                                        d="M6 6L8.66667 6"
                                        stroke="#27AE60"
                                        strokeLinecap="round"
                                      />
                                      <path
                                        d="M6 11.3335L8.66667 11.3335"
                                        stroke="#27AE60"
                                        strokeLinecap="round"
                                      />
                                      <path
                                        d="M12.6673 8.66667V9.33333C12.6673 10.8878 12.6673 11.6651 12.3862 12.2679C12.0882 12.9071 11.5744 13.4208 10.9352 13.7189C10.3324 14 9.55515 14 8.00065 14V14C6.44615 14 5.6689 14 5.06613 13.7189C4.4269 13.4208 3.91314 12.9071 3.61506 12.2679C3.33398 11.6651 3.33398 10.8878 3.33398 9.33333V6C3.33398 5.07003 3.33398 4.60504 3.43621 4.22354C3.71361 3.18827 4.52225 2.37962 5.55753 2.10222C5.93903 2 6.40401 2 7.33398 2V2"
                                        stroke="#27AE60"
                                      />
                                      <path
                                        d="M12 2L12 6"
                                        stroke="#27AE60"
                                        strokeLinecap="round"
                                      />
                                      <path
                                        d="M14 4L10 4"
                                        stroke="#27AE60"
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                    <span>Загрузить</span>
                                  </UploadBtn>
                                </Box>
                                {!!errorImage && (
                                  <Box sx={{ color: "#EB5757", marginTop: 1 }}>
                                    Файл должен быть не больше 10мб
                                  </Box>
                                )}
                              </FileUploadLabel>
                              {!!e.image && (
                                <File
                                  progress={e.image ? 100 : e.progress}
                                  setFieldValue={fieldValuesHandler}
                                  name={progress}
                                  imageName={image}
                                  image={e.image}
                                  value={e.progress}
                                  title={
                                    typeof e.image === "string"
                                      ? e.filename
                                      : e.image.name
                                  }
                                />
                              )}
                            </Box>

                            <Box sx={{ marginTop: 2.4 }}>
                              <p className="auth-title__input">Описание</p>
                              <TextareaWrapper>
                                <CountHint>
                                  {!!e.description ? e.description.length : 0}
                                  /500
                                </CountHint>
                                <TextareaS
                                  value={e.description}
                                  name={description}
                                  onChange={handleChange}
                                  rows={4}
                                  placeholder={"Описание"}
                                  maxLength={500}
                                  error={
                                    !!(touchedDescription && errorDescription)
                                  }
                                />
                              </TextareaWrapper>
                            </Box>
                          </Box>
                        </Box>
                      )
                    })}
                    <AddBtnWrapper>
                      <AddBtn
                        onClick={() =>
                          push({
                            nameOfCertificate: "",
                            link: "",
                            description: "",
                            image: null,
                            skills: [],
                            user: user.id,
                            skill: "",
                          })
                        }
                        type={"button"}
                      >
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5 6L12.5 18"
                            stroke="#27AE60"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M18.5 12L6.5 12"
                            stroke="#27AE60"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        {"Добавить сертификат"}
                      </AddBtn>
                    </AddBtnWrapper>
                  </>
                )
              }}
            </FieldArray>
          </Wrapper>
          <AuthButton
            style={{ marginBottom: 70 }}
            active={!checker}
            disabled={checker}
            type="submit"
          >
            Сохранить
          </AuthButton>
        </Form>
      )}
    </Formik>
  )
}

const Wrapper = styled.div`
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  border-radius: 16px;
  max-width: 832px;
  margin-bottom: 32px;

  ${theme.mqMax("xl")} {
    max-width: none;
  }
`
const Title = styled.h3`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
  padding: 32px;
`
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d8d8d8;
`
const CountHint = styled.p`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #bdbdbd;
`
const AddSkillsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: ${(p) => (p.opened ? "20px" : "0")};
  background: #ffffff;
  border: 1.5px solid ${(p) => (p.error ? "#EB5757" : "#e0e0e0")};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 20px;
  position: relative;
`
const Skills = styled.ul`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 16px;
`
const Skill = styled.li`
  display: inline-flex;
  padding: 8px 12px;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  background: #f4f4f4;
`
const FileUploadLabel = styled.label`
  display: inline-block;
  cursor: pointer;
  border: 2px dashed ${(p) => (p.error ? "#EB5757" : "#27ae60")};
  border-radius: 8px;
  width: 100%;
  height: 150px;
  position: relative;
`
const UploadText = styled.p`
  font-family: Inter, sans-serif;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #828282;
  max-width: 306px;
  margin-bottom: 16px;
  pointer-events: none;
`
const UploadBtn = styled.button`
  background: rgba(39, 174, 96, 0.1);
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: #27ae60;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 6px;
  }

  pointer-events: none;
`
const TextareaWrapper = styled.div`
  position: relative;
`
const TextareaS = styled.textarea`
  background: #ffffff;
  border: 1.5px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  height: 187px;
  padding: 20px;
  font-family: Inter, sans-serif;
  font-size: 18px;
  line-height: 24px;

  &::placeholder {
    color: #bdbdbd;
  }
`
const AddBtnWrapper = styled.div`
  border-top: 1px solid #d8d8d8;
  padding: 32px;
`
const AddBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: rgba(111, 207, 151, 0.1);
  border-radius: 12px;
  padding: 20px 0;
  text-align: center;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #27ae60;
`
const CustomInput = styled.input`
  border: ${(p) => (p.error ? "1px solid red" : "1px solid #000")};
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`
export default Certificates

const File = ({ progress, setFieldValue, name, imageName, image, title }) => {
  const [progressState, setProgressState] = useState(progress)

  useEffect(() => {
    setProgressState(progress)
  }, [progress])

  useEffect(() => {
    const timer = setInterval(() => {
      if (progressState < 90 && progressState >= 100) {
        setProgressState((prev) => prev + 4)
      }
      setFieldValue(`${name}`, progressState)
    }, 2000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const deleteFileHandler = () => {
    setFieldValue(`${imageName}`, null)
  }

  return (
    <FileWrapper>
      <Box sx={{ marginRight: 1 }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
            stroke="#333333"
            strokeWidth="2"
          />
          <path
            d="M9 13L15 13"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 17L13 17"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
            stroke="#333333"
            strokeWidth="2"
          />
        </svg>
      </Box>
      <FileContent>
        <FileTitle>{title}</FileTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              sx={{ height: 9, borderRadius: 30, background: "#e0e0e0" }}
              variant="determinate"
              value={+progressState}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FileInfo>
            {typeof image !== "string" &&
              `Размер файла ${(image.size / 1024 / 1024).toFixed(2)}мб`}
          </FileInfo>
          <FileInfo style={{ marginRight: 10 }}>
            Загрузка {`${Math.round(+progressState)}%`}
          </FileInfo>
        </Box>
      </FileContent>
      <Box onClick={deleteFileHandler} sx={{ cursor: "pointer" }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="#333333"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#333333"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </FileWrapper>
  )
}
const FileWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`
const FileContent = styled.div`
  flex-grow: 1;
`
const FileTitle = styled.h4`
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
`
const FileInfo = styled.p`
  font-family: Inter, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #828282;
`
