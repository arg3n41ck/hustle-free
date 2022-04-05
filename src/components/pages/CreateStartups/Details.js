import React, { useEffect, useRef, useState } from "react"
import { FieldArray, Form, Formik, getIn } from "formik"
import styled from "styled-components"
import * as yup from "yup"
import { Avatar, Box, Checkbox, TextField } from "@mui/material"
import StatusUserSelect from "../../ui/tabs/StatusUserSelect"
import { motion } from "framer-motion"
import $api from "../../../services/axios"
import { AuthButton } from "../Authorization/Authorization"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { ru } from "date-fns/locale"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { MobileDatePicker } from "@mui/lab"
import { format } from "date-fns"
import { AddBtn } from "../ChangeData/Career"
import { useDispatch, useSelector } from "react-redux"
import {
  changeFormatDataThunk,
  changeStartupItemThunk,
} from "../../../redux/components/startups"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { camelizeKeys } from "humps"
import InputMask from "react-input-mask"

const variants = {
  open: { display: "flex" },
  closed: { display: "none" },
}

const validationSchema = yup.object().shape({
  numberOfTeam: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required(),
  teamMembers: yup
    .array()
    .of(yup.object({}))
    .test({
      test: function (value) {
        return this.parent.numberOfTeam >= value.length
      },
    }),
  phoneNumber: yup.array().of(
    yup.object({
      phoneNumber: yup.string().min(12),
    })
  ),
  businessPrograms: yup.array().of(
    yup.object({
      title: yup.string(),
      dataOfStart: yup.mixed().test({
        test: function (value) {
          return !(
            new Date(this.parent.dataOfEnd).getTime() <
            new Date(value).getTime()
          )
        },
      }),
      dataOfEnd: yup.mixed().test({
        test: function (value) {
          return !(
            new Date(this.parent.dataOfStart).getTime() >
            new Date(value).getTime()
          )
        },
      }),
      link: yup.string().url(),
    })
  ),
  legalEntitiesChecker: yup.boolean(),
  companyName: yup.string().when("legalEntitiesChecker", {
    is: (legalEntitiesChecker) => legalEntitiesChecker,
    then: yup
      .string()
      .test(
        "",
        "Заполните поле",
        (value) => !!(value || " ").replace(/\s/g, "")
      )
      .required(),
  }),
  innBin: yup.string().when("legalEntitiesChecker", {
    is: (legalEntitiesChecker) => legalEntitiesChecker,
    then: yup.string().required(),
  }),
  galleries: yup.array().of(
    yup
      .mixed()
      .test(
        "FILE_SIZE",
        "Размер файла должен быть – не более 4 МБ.",
        (value) => {
          if (!value) return false
          if (!value.id) {
            return !!value && (value.size / 1024 / 1024).toFixed(2) <= 4
          }
          return true
        }
      )
  ),
  media: yup.array().of(
    yup.object({
      title: yup.string(),
      link: yup.string().url(),
    })
  ),
})

const DetailsCreateStartup = ({
  initialValues,
  onChangeStartup,
  idStartup,
}) => {
  const formRef = React.useRef()
  const [addUserStatus, setAddUserStatus] = useState("A")
  const [searchUser, setSearchUser] = useState("")
  const [currentUsers, setCurrentUsers] = useState([])
  const [contactsIds, setContactsIds] = useState([])
  const [businessModelsIds, setBusinessModelsIds] = useState([])
  const [mediasIds, setMediasIds] = useState([])
  const [isOpenUsersPopper, setIsOpenUsersPopper] = useState(false)
  const resultsRef = useRef()
  const dispatch = useDispatch()
  const router = useRouter()
  const currentUser = useSelector((state) => state.user.user)

  const currentUserHandler = (newUser) => {
    const filteredUsersState = currentUsers?.length
      ? [...currentUsers.filter(({ id }) => id !== newUser.id), newUser]
      : [newUser]
    setCurrentUsers(filteredUsersState)
  }

  const addUserToTeamMembers = () => {
    if (!!currentUsers.length) {
      const currentUsersResult = currentUsers.map((user) => ({
        statusInTeam: addUserStatus,
        user: {
          ...user,
          // numberOfTeam: formRef.current.values.numberOfTeam,
        },
      }))
      formRef.current.setFieldValue("teamMembers", [
        ...formRef.current.values.teamMembers,
        ...currentUsersResult,
      ])
      setCurrentUsers([])
    }
  }

  const deleteUserFromMembers = async (id) => {
    const newArr = formRef.current?.values.teamMembers,
      indexElement = newArr.findIndex((item) => item.id === id)
    formRef.current.setFieldValue("teamMembers", [
      ...newArr.slice(0, indexElement),
      ...newArr.slice(indexElement + 1),
    ])

    await $api.delete(`/startup/team_members/${id}/`)
  }

  const deleteImage = async (value) => {
    if (value?.name) {
      const oldArr = formRef.current?.values.galleries
      const indexElement = oldArr.findIndex((item) => item.name === value.name)
      const newArr = [
        ...oldArr.slice(0, indexElement),
        ...oldArr.slice(indexElement + 1),
      ]
      formRef.current.setFieldValue("galleries", newArr)
    } else {
      const oldArr = formRef.current?.values.galleries
      const indexElement = oldArr.findIndex((item) => item.id === value.id)
      const newArr = [
        ...oldArr.slice(0, indexElement),
        ...oldArr.slice(indexElement + 1),
      ]
      formRef.current.setFieldValue("galleries", newArr)
      await $api.delete(`/startup/galleries/${value.id}/`)
    }
  }

  const toggleUsersPopperHandler = (valueBoolean) => {
    setIsOpenUsersPopper(valueBoolean)
  }

  const disableKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault()
    }
  }

  useEffect(() => {
    return () => {
      if (formRef.current) {
        onChangeStartup(formRef.current?.values)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("click", (event) => {
      const { current: wrap } = resultsRef
      if (wrap && !wrap.contains(event.target)) {
        setIsOpenUsersPopper(false)
      }
    })

    return window.removeEventListener("click", (event) => {
      const { current: wrap } = resultsRef
      if (wrap && !wrap.contains(event.target)) {
        setIsOpenUsersPopper(false)
      }
    })
  }, [])

  useEffect(() => {
    formRef.current?.setValues(initialValues)
  }, [initialValues])

  return (
    <Formik
      onKeyDown={disableKeyDown}
      innerRef={formRef}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)
        toast.info("Ожидайте ответа от сервера")
        if (idStartup) {
          await $api.patch(`/startup/startups/${idStartup}/`, {
            numberOfTeam: values.numberOfTeam,
          })

          const newTeamMembers = values.teamMembers
            .filter((teamMember) => !teamMember?.accept)
            .map((teamMember) => ({
              startup: +idStartup,
              user: teamMember?.user?.id,
              statusInTeam: teamMember?.statusInTeam,
              accept: true,
            }))
          const oldTeamMembers = values.teamMembers
            .filter((teamMember) => teamMember?.accept)
            .map((teamMember) => ({ ...teamMember, user: teamMember.user.id }))

          const newTeamMembersRes = []
          try {
            for (let item of newTeamMembers) {
              const teamMember = await $api.post(`/startup/team_members/`, item)
              newTeamMembersRes.push(teamMember.data)
            }
            for (let item of oldTeamMembers) {
              await $api.patch(`/startup/team_members/${item.id}/`, item)
            }
          } catch (e) {
            console.log(e)
          }
          formRef.current.setFieldValue("teamMembers", [
            ...values.teamMembers,
            ...newTeamMembersRes,
          ])

          const newPhoneNumbers = values.phoneNumber.map((phone) => ({
            ...phone,
            phoneNumber: `+${phone.phoneNumber.replace(/\D/gi, "")}`,
          }))
          await dispatch(
            changeStartupItemThunk({
              pathItem: "phonenumbers",
              values: newPhoneNumbers,
            })
          )

          for (let contactsId of contactsIds) {
            await $api.delete(`/startup/phonenumbers/${contactsId}/`)
          }

          const newBusinessProgram = values.businessPrograms
            .filter((businessProgram) => !!businessProgram.title)
            .map((businessProgram) => ({
              id: businessProgram?.id,
              title: businessProgram.title,
              link: businessProgram.link,
              dataOfStart: businessProgram.dataOfStart,
              dataOfEnd: businessProgram.dataOfEnd,
              startup: idStartup,
            }))
          const businessProgramsRes = await dispatch(
            changeStartupItemThunk({
              pathItem: "business_programs",
              values: newBusinessProgram,
            })
          )
          formRef.current.setFieldValue(
            "businessPrograms",
            businessProgramsRes.payload
          )

          for (let businessModelsId of businessModelsIds) {
            await $api.delete(`/startup/business_programs/${businessModelsId}/`)
          }

          if (values.legalEntitiesChecker) {
            try {
              let leData
              if (!!values.legalEntities?.id) {
                const { data } = await $api.put(
                  `/startup/legal_entities/${values.legalEntities?.id}/`,
                  {
                    companyName: values.companyName,
                    innBin: values.innBin,
                  }
                )
                leData = data
              } else {
                const { data } = await $api.post("/startup/legal_entities/", {
                  legalEntity: true,
                  companyName: values.companyName,
                  innBin: values.innBin,
                  startup: idStartup,
                })
                await $api.patch(`/startup/startups/${idStartup}/`, {
                  legalEntities: data.id,
                })
                leData = data
              }
              formRef.current.setFieldValue("innBin", leData.innBin)
              formRef.current.setFieldValue("legalEntities", leData.id)
              formRef.current.setFieldValue("companyName", leData.companyName)
            } catch (e) {}
          } else if (
            !values.legalEntitiesChecker &&
            !!values.legalEntities?.id
          ) {
            await $api.delete(
              `/startup/legal_entities/${values.legalEntities?.id}/`
            )
            formRef.current.setFieldValue("innBin", "")
            formRef.current.setFieldValue("legalEntities", null)
            formRef.current.setFieldValue("companyName", "")
          }

          const newMedias = values.media
            .filter((media) => !!media.title)
            .map((media) => ({
              startup: idStartup,
              title: media.title,
              link: media.link,
              id: media.id,
            }))
          const mediaRes = await dispatch(
            changeStartupItemThunk({
              pathItem: "media",
              values: newMedias,
            })
          )
          formRef.current.setFieldValue("media", mediaRes.payload)

          for (let mediasId of mediasIds) {
            await $api.delete(`/startup/media/${mediasId}/`)
          }

          const newGalleries = values.galleries.map((file) => {
            if (file?.name) {
              return {
                image: file,
                startup: idStartup,
              }
            }
          })

          for (const item of newGalleries) {
            await dispatch(
              changeFormatDataThunk({
                path: "startup/galleries/",
                itemData: item,
              })
            )
          }

          onChangeStartup(formRef.current?.values)
          toast.success("Изменения в учетной записи прошли успешно!")
          setSubmitting(false)
          await router.push(`/profile/startups/${idStartup}`)
        }
      }}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        setFieldValue,
        dirty,
      }) => {
        return (
          <Form style={{ marginBottom: 160 }}>
            <Wrapper>
              <Header>
                <Title>Детали стартапа</Title>
              </Header>
              <Content>
                <Title style={{ fontWeight: 600, marginBottom: 24 }}>
                  Команда
                </Title>

                <div className="auth-wrapper__input">
                  <p className="auth-title__input">Количество</p>
                  <TextField
                    error={!!(touched.numberOfTeam && errors.numberOfTeam)}
                    onChange={handleChange}
                    value={values.numberOfTeam}
                    fullWidth
                    name={"numberOfTeam"}
                  />
                </div>

                <Box>
                  <Title style={{ fontWeight: 600, marginBottom: 16 }}>
                    Участники{" "}
                    <Box component={"span"} sx={{ color: "#27AE60" }}>
                      JAS
                    </Box>
                  </Title>

                  <TeamMembersAdd ref={resultsRef}>
                    <Box
                      sx={{
                        position: "relative",
                        display: "grid",
                        gridTemplate: "1fr / 1fr 200px",
                      }}
                    >
                      <UsersSearchWrapper
                        animate={isOpenUsersPopper ? "open" : "closed"}
                        variants={variants}
                        acitve={!!isOpenUsersPopper}
                        onClick={() => toggleUsersPopperHandler(false)}
                      >
                        <UsersSearch
                          searchValue={searchUser}
                          onCurrentUser={currentUserHandler}
                          allTeamMembersId={
                            !!formRef.current && [
                              currentUser.id,
                              formRef.current?.values?.owner,
                              ...formRef.current.values.teamMembers.map(
                                ({ user }) => user.id
                              ),
                            ]
                          }
                        />
                      </UsersSearchWrapper>
                      <TextField
                        // disabled={currentUser}
                        error={!!(touched.teamMembers && errors.teamMembers)}
                        autoComplete={"off"}
                        onFocus={() => toggleUsersPopperHandler(true)}
                        placeholder={!currentUsers.length ? "ФИО" : null}
                        onChange={(e) => setSearchUser(e.target.value)}
                        value={searchUser}
                        fullWidth
                        sx={{
                          maxWidth: "100%",
                          border: "1.5px solid #e5e5e5",
                          borderRadius: "8px 0 0 8px",
                          "& .MuiOutlinedInput-root": {
                            width: "100%",
                            overflow: "auto",
                            borderTopRightRadius: 0,
                            gridGap: "5px",
                            borderBottomRightRadius: 0,

                            "& > fieldset": {
                              borderWidth: 0,
                              display: "none",
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: currentUsers.length
                            ? currentUsers.map((user) => (
                                <CurrentUserInfo
                                  key={`CurrentUserInfo_${user.id}`}
                                >
                                  <p>{`${user.firstName} ${user.lastName}`}</p>
                                  <Box
                                    onClick={() =>
                                      setCurrentUsers((s) =>
                                        s.filter(({ id }) => id !== user.id)
                                      )
                                    }
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      margin: "0 5px",
                                      cursor: "pointer",
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
                                </CurrentUserInfo>
                              ))
                            : null,
                        }}
                      />
                      <StatusUserSelectWrapper>
                        <StatusUserSelect
                          state={addUserStatus}
                          setState={setAddUserStatus}
                          type={"base"}
                        />
                      </StatusUserSelectWrapper>
                    </Box>
                    <AddUserButton
                      onClick={addUserToTeamMembers}
                      active={
                        currentUsers.length &&
                        !values.teamMembers?.find((item) =>
                          currentUsers.some(
                            (user) => item?.user?.id === user?.id
                          )
                        )
                      }
                      type={"button"}
                    >
                      Добавить
                    </AddUserButton>
                  </TeamMembersAdd>
                </Box>
                {!!values?.teamMembers.filter(
                  (member) => member?.user?.firstName && member?.user?.lastName
                ).length && (
                  <TeamMembersWrapper>
                    {values.teamMembers
                      .filter(
                        (member) =>
                          member?.user?.firstName && member?.user?.lastName
                      )
                      .map((member, i) => (
                        <TeamMembersItem>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              sx={{ width: 56, height: 56, marginRight: 2 }}
                              // alt={member.user.title}
                              src={member.user?.avatar}
                              placeholder={"blur"}
                            />
                            <UserItemTexts>
                              <UserItemInfo>
                                {member.user?.firstName} {member.user?.lastName}
                              </UserItemInfo>
                              <UserItemProfession>
                                {!!member.user?.careers &&
                                  !!member.user.careers.length &&
                                  member.user.careers[0].position}
                              </UserItemProfession>
                            </UserItemTexts>
                          </Box>
                          <StatusUserSelect
                            state={member.statusInTeam}
                            setState={(value) =>
                              setFieldValue(
                                `teamMembers[${i}].statusInTeam`,
                                value
                              )
                            }
                            id={member.id}
                            onDelete={deleteUserFromMembers}
                          />
                        </TeamMembersItem>
                      ))}
                  </TeamMembersWrapper>
                )}
                {!!touched.teamMembers && errors.teamMembers && (
                  <ErrorMessageSecond>
                    Добавлено больше сотрудников, чем указано...
                  </ErrorMessageSecond>
                )}

                <Title
                  style={{ fontWeight: 600, marginBottom: 24, marginTop: 40 }}
                >
                  Контакты
                </Title>
                <FieldArray name={"phoneNumber"}>
                  {({ push, remove }) => {
                    return (
                      <>
                        {!!values?.phoneNumber &&
                          values.phoneNumber.map((ph, index) => {
                            const phoneNumber = `phoneNumber[${index}].phoneNumber`,
                              touchedPhoneNumber = getIn(touched, phoneNumber),
                              errorPhoneNumber = getIn(errors, phoneNumber)

                            return (
                              <div className="auth-wrapper__input">
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="auth-title__input">
                                    Номер №{index + 1}
                                  </p>
                                  {index !== 0 && (
                                    <DeleteWrapper
                                      onClick={() => {
                                        if (ph.id) {
                                          setContactsIds((prev) => [
                                            ...prev,
                                            ph.id,
                                          ])
                                        }
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
                                <InputMask
                                  name={phoneNumber}
                                  onChange={(e) =>
                                    setFieldValue(
                                      phoneNumber,
                                      `+${e.target.value.replace(/\D/gi, "")}`
                                    )
                                  }
                                  value={`${
                                    values.phoneNumber[`${index}`].phoneNumber
                                  }`.replace(/\D/gi, "")}
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
                                        !!(
                                          touchedPhoneNumber && errorPhoneNumber
                                        )
                                      }
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
                            )
                          })}
                        <AddBtn
                          onClick={() =>
                            push({
                              phoneNumber: "",
                              startup: idStartup,
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
                          {" Добавить"}
                        </AddBtn>
                      </>
                    )
                  }}
                </FieldArray>
                <Title
                  style={{ fontWeight: 600, marginBottom: 24, marginTop: 40 }}
                >
                  Бизнес программы, награды
                </Title>
                <FieldArray name={"businessPrograms"}>
                  {({ push, remove }) => {
                    return (
                      <>
                        {values.businessPrograms.map((bp, index) => {
                          const title = `businessPrograms[${index}].title`,
                            touchedTitle = getIn(touched, title),
                            errorTitle = getIn(errors, title),
                            dataOfStart = `businessPrograms[${index}].dataOfStart`,
                            touchedDataOfStart = getIn(touched, dataOfStart),
                            errorDataOfStart = getIn(errors, dataOfStart),
                            dataOfEnd = `businessPrograms[${index}].dataOfEnd`,
                            touchedDataOfEnd = getIn(touched, dataOfEnd),
                            errorDataOfEnd = getIn(errors, dataOfEnd),
                            link = `businessPrograms[${index}].link`,
                            touchedLink = getIn(touched, link),
                            errorLink = getIn(errors, link)

                          return (
                            <>
                              <div className="auth-wrapper__input">
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <p className="auth-title__input">
                                    Название №{index + 1}
                                  </p>
                                  {index !== 0 && (
                                    <DeleteWrapper
                                      onClick={() => {
                                        if (bp.id) {
                                          setBusinessModelsIds((prev) => [
                                            ...prev,
                                            bp.id,
                                          ])
                                        }
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
                                  error={!!(touchedTitle && errorTitle)}
                                  value={bp.title}
                                  placeholder={"Введите полное название"}
                                  onChange={handleChange}
                                  name={title}
                                  fullWidth
                                />
                              </div>

                              <p className="auth-title__input">
                                Даты прохождения
                              </p>
                              <Box sx={{ display: "flex" }}>
                                <Box
                                  sx={{
                                    "& .MuiFormControl-root": {
                                      display: "flex",
                                      marginRight: 1.5,
                                    },
                                  }}
                                  className="auth-wrapper__input"
                                >
                                  <LocalizationProvider
                                    locale={ru}
                                    dateAdapter={AdapterDateFns}
                                  >
                                    <MobileDatePicker
                                      toolbarTitle={"Выбрать дату"}
                                      cancelText={"Отмена"}
                                      value={bp.dataOfStart}
                                      onChange={(value) =>
                                        setFieldValue(
                                          `businessPrograms[${index}].dataOfStart`,
                                          format(new Date(value), "yyyy-MM-dd")
                                        )
                                      }
                                      inputFormat="dd/MM/yyyy"
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          error={
                                            !!(
                                              touchedDataOfStart &&
                                              errorDataOfStart
                                            )
                                          }
                                          inputProps={{
                                            ...params.inputProps,
                                            placeholder: bp.dataOfStart
                                              ? "ДД/ММ/ГГГГ"
                                              : "Введите дату начала",
                                          }}
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </Box>

                                <Box
                                  sx={{
                                    "& .MuiFormControl-root": {
                                      display: "flex",
                                      marginLeft: 1.5,
                                    },
                                  }}
                                  className="auth-wrapper__input"
                                >
                                  <LocalizationProvider
                                    locale={ru}
                                    dateAdapter={AdapterDateFns}
                                  >
                                    <MobileDatePicker
                                      toolbarTitle={"Выбрать дату"}
                                      cancelText={"Отмена"}
                                      value={bp.dataOfEnd}
                                      onChange={(value) =>
                                        setFieldValue(
                                          `businessPrograms[${index}].dataOfEnd`,
                                          format(new Date(value), "yyyy-MM-dd")
                                        )
                                      }
                                      inputFormat="dd/MM/yyyy"
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          error={
                                            !!(
                                              touchedDataOfEnd && errorDataOfEnd
                                            )
                                          }
                                          inputProps={{
                                            ...params.inputProps,
                                            placeholder: bp.dataOfEnd
                                              ? "ДД/ММ/ГГГГ"
                                              : "Введите дату окончания",
                                          }}
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                </Box>
                              </Box>

                              {!!(touchedDataOfEnd && errorDataOfEnd) &&
                                !!(touchedDataOfStart && errorDataOfStart) && (
                                  <ErrorMessage>Неверная дата</ErrorMessage>
                                )}

                              <div className="auth-wrapper__input">
                                <p className="auth-title__input">Ссылка</p>
                                <TextField
                                  error={!!(touchedLink && errorLink)}
                                  value={bp.link}
                                  onChange={handleChange}
                                  placeholder={"Введите ссылку"}
                                  name={link}
                                  fullWidth
                                />
                              </div>
                            </>
                          )
                        })}
                        <AddBtn
                          onClick={() =>
                            push({
                              title: "",
                              dataOfStart: null,
                              dataOfEnd: null,
                              link: "",
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
                          {" Добавить"}
                        </AddBtn>
                      </>
                    )
                  }}
                </FieldArray>

                <Box>
                  <Title
                    style={{ fontWeight: 600, marginBottom: 24, marginTop: 40 }}
                  >
                    Являетесь ли вы юридическим лицом
                  </Title>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      component={"label"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "24px 0",
                        cursor: "pointer",
                      }}
                    >
                      <Checkbox
                        checked={values.legalEntitiesChecker}
                        onChange={(e) =>
                          setFieldValue(
                            "legalEntitiesChecker",
                            e.target.checked
                          )
                        }
                        sx={{
                          color: "#27AE60",
                          borderRadius: 2,
                          width: 16,
                          height: 16,
                          marginRight: 0.8,
                          "&.Mui-checked": {
                            color: "primary",
                          },
                        }}
                      />
                      <p>Да</p>
                    </Box>

                    <Box
                      component={"label"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "24px 0",
                        cursor: "pointer",
                        marginLeft: 2.4,
                      }}
                    >
                      <Checkbox
                        checked={!values.legalEntitiesChecker}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFieldValue("companyName", "")
                            setFieldValue("innBin", "")
                          }
                          setFieldValue(
                            "legalEntitiesChecker",
                            !e.target.checked
                          )
                        }}
                        sx={{
                          color: "#27AE60",
                          borderRadius: 2,
                          width: 16,
                          height: 16,
                          marginRight: 0.8,
                          "&.Mui-checked": {
                            color: "primary",
                          },
                        }}
                      />
                      <p>Нет</p>
                    </Box>
                  </Box>

                  {formRef.current?.values.legalEntitiesChecker && (
                    <>
                      <div className="auth-wrapper__input">
                        <p className="auth-title__input">Название компании</p>
                        <TextField
                          error={!!(touched.companyName && errors.companyName)}
                          placeholder={"Введите полное название"}
                          onChange={handleChange}
                          value={values.companyName}
                          fullWidth
                          name={"companyName"}
                        />
                      </div>

                      <div className="auth-wrapper__input">
                        <p className="auth-title__input">ИИН/БИН</p>
                        <TextField
                          error={!!(touched.innBin && errors.innBin)}
                          placeholder={"Введите полное название"}
                          onChange={(e) =>
                            setFieldValue(
                              "innBin",
                              e.target.value.replace(/\D/gi, "")
                            )
                          }
                          value={values.innBin}
                          fullWidth
                          name={"innBin"}
                        />
                      </div>
                    </>
                  )}

                  <Title
                    id={"media"}
                    style={{ fontWeight: 600, marginBottom: 24, marginTop: 40 }}
                  >
                    СМИ о вас
                  </Title>
                  <FieldArray id={"media"} name={"media"}>
                    {({ push, remove }) => {
                      return (
                        <>
                          {values.media.map((m, index) => {
                            const title = `media[${index}].title`,
                              touchedTitle = getIn(touched, title),
                              errorTitle = getIn(errors, title),
                              link = `media[${index}].link`,
                              touchedLink = getIn(touched, link),
                              errorLink = getIn(errors, link)

                            return (
                              <>
                                <div className="auth-wrapper__input">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <p className="auth-title__input">
                                      Название №{index + 1}
                                    </p>
                                    {index !== 0 && (
                                      <DeleteWrapper
                                        onClick={() => {
                                          if (m.id) {
                                            setMediasIds((prev) => [
                                              ...prev,
                                              m.id,
                                            ])
                                          }
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
                                    error={!!(touchedTitle && errorTitle)}
                                    value={m.title}
                                    placeholder={"Введите полное название"}
                                    onChange={handleChange}
                                    name={title}
                                    fullWidth
                                  />
                                </div>

                                <div className="auth-wrapper__input">
                                  <p className="auth-title__input">Ссылка</p>
                                  <TextField
                                    error={!!(touchedLink && errorLink)}
                                    value={m.link}
                                    onChange={handleChange}
                                    placeholder={"Введите ссылку"}
                                    name={link}
                                    fullWidth
                                  />
                                </div>
                              </>
                            )
                          })}
                          <AddBtn
                            onClick={() =>
                              push({
                                title: "",
                                link: "",
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
                            {" Добавить"}
                          </AddBtn>
                        </>
                      )
                    }}
                  </FieldArray>

                  <Box>
                    <Title
                      style={{
                        fontWeight: 600,
                        marginBottom: 24,
                        marginTop: 40,
                      }}
                    >
                      Галерея
                    </Title>

                    <FileUploadLabel>
                      <CustomInput
                        type={"file"}
                        multiple
                        onChange={(e) => {
                          const files = [...e.target.files]
                          setFieldValue(`galleries`, [
                            ...values.galleries,
                            ...files,
                          ])
                        }}
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
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            marginBottom: 1.2,
                            marginTop: 2.2,
                          }}
                        >
                          <svg
                            width="73"
                            height="72"
                            viewBox="0 0 73 72"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M68.5 60.8889V11.1111C68.5 7.2 65.3 4 61.3889 4H11.6111C7.7 4 4.5 7.2 4.5 11.1111V60.8889C4.5 64.8 7.7 68 11.6111 68H61.3889C65.3 68 68.5 64.8 68.5 60.8889ZM24.0556 41.3333L32.9444 52.0356L45.3889 36L61.3889 57.3333H11.6111L24.0556 41.3333Z"
                              fill="#BDBDBD"
                            />
                          </svg>
                        </Box>
                        <UploadText>
                          Перетащите изображения или <span>загрузите</span>
                        </UploadText>
                        <UploadDescription>
                          Поддерживаемые форматы: PNG, TIFF, JPG
                        </UploadDescription>
                      </Box>
                    </FileUploadLabel>
                    <FieldArray name={"galleries"}>
                      {() => (
                        <ImagesList>
                          {values.galleries.map((image, index) => {
                            const imageIndex = `galleries[${index}]`,
                              touchedImage = getIn(touched, imageIndex),
                              errorImage = getIn(errors, imageIndex)

                            return (
                              <WrapperImage
                                key={`{values.galleries.map_${
                                  image.name + index
                                }`}
                                error={!!(touchedImage && errorImage)}
                                src={
                                  image?.name
                                    ? URL.createObjectURL(image)
                                    : `${image.image}?tr=w-148h-148`
                                }
                              >
                                <DeleteImageWrapper
                                  onClick={() => deleteImage(image)}
                                >
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929L7.58579 9L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L9 7.58579L12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289C14.0976 4.68342 14.0976 5.31658 13.7071 5.70711L10.4142 9L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L9 10.4142L5.70711 13.7071C5.31658 14.0976 4.68342 14.0976 4.29289 13.7071Z"
                                      fill="#333333"
                                    />
                                  </svg>
                                </DeleteImageWrapper>
                              </WrapperImage>
                            )
                          })}
                        </ImagesList>
                      )}
                    </FieldArray>
                  </Box>
                </Box>
              </Content>
            </Wrapper>
            <AuthButton
              style={{ marginTop: 32 }}
              disabled={!dirty || isSubmitting}
              onClick={() => {
                const firstError = Object.keys(errors || {})[0]
                if (firstError)
                  toast.error(`Упс... какое-то поле неправильно заполнено.`, {
                    autoClose: 4000,
                  })
              }}
              active={dirty}
              type="submit"
            >
              Завершить
            </AuthButton>
          </Form>
        )
      }}
    </Formik>
  )
}

const Wrapper = styled.div`
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 16px;
`
const Header = styled.div`
  padding: 30px;
  border-bottom: 1px solid #e5e5e5;
`
const Title = styled.h3`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 20px;
  color: #333333;
`
const Content = styled.div`
  padding: 30px;
`
const UsersSearchWrapper = styled(motion.div)`
  width: 100%;
  height: 530px;
  position: absolute;
  bottom: -540px;
  overflow-y: scroll;
  background: #fff;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  pointer-events: ${(p) => (!p.active ? "all" : "none")};
  z-index: 999;
`
const TeamMembersAdd = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: calc(100% - 214px) 190px;
  grid-gap: 24px;
`
const AddUserButton = styled.button`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  border-radius: 12px;
  padding: 15px 32px;
  color: #${(p) => (p.active ? "fff" : "828282")};
  background: #${(p) => (p.active ? "27AE60" : "F2F2F2")};
`
const StatusUserSelectWrapper = styled.div`
  border: 1.5px solid #e5e5e5;
  border-left: none;
  display: flex;
  border-radius: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`
const CurrentUserInfo = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #333333;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;

  & > p {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
  }
`
const TeamMembersWrapper = styled.div`
  border: 1.5px solid #e5e5e5;
  width: 100%;
  max-height: 550px;
  overflow-y: scroll;
  padding: 15px;
  border-radius: 8px;
  margin-top: 16px;
  display: grid;
  grid-row-gap: 40px;
`
const TeamMembersItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  //margin-bottom: 20px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }
`
const DeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    color: #eb5757;
  }
`
const FileUploadLabel = styled.label`
  display: inline-block;
  cursor: pointer;
  border: 2px dashed #bdbdbd;
  border-radius: 8px;
  width: 100%;
  position: relative;

  input[type="file"] {
    opacity: 0;
    position: absolute;
    z-index: 4;
    height: 100%;
    width: 100%;
  }
  span {
    color: #27ae60;
  }
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
  margin-top: 8px;
`
const UploadDescription = styled.p`
  color: #bdbdbd;
  margin-bottom: 18px;
`

const CustomInput = styled.input`
  border: ${(p) => (p.error ? "1px solid red" : "1px solid #000")};
`
const ImagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`
const WrapperImage = styled.div`
  position: relative;
  width: 148px;
  height: 148px;
  background: no-repeat url(${(p) => p.src}) center/cover;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px 10px;

  &:after {
    content: "Размер более 4 МБ";
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    font-family: Inter, sans-serif;
    font-size: 14px;
    line-height: 20px;
    border-radius: 8px;
    color: #fff;
    background: rgba(156, 0, 0, 0.75);
    display: ${({ error }) => (error ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
`
const DeleteImageWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 3;
  img {
    background-color: #fff;
    border-radius: 50%;
  }
  span {
    border: 3px solid #fff;
  }
`
const ErrorMessage = styled.p`
  color: #eb5757;
  margin-top: -5px;
  margin-bottom: 24px;
`
const ErrorMessageSecond = styled.p`
  color: #eb5757;
  margin-top: 5px;
`

export default DetailsCreateStartup

const UsersSearch = ({ searchValue, onCurrentUser, allTeamMembersId }) => {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    const { data } = await $api.get("/accounts/team_users/")
    setUsers(camelizeKeys(data.results))
  }, [])

  if (!users.length) return null

  return (
    <>
      {users
        .filter((user) => user.firstName && user.lastName)
        .filter((user) => {
          return !allTeamMembersId.includes(user.id)
        })
        .filter((user) => {
          if (!searchValue.length) return user
          return (
            `${user.firstName?.toLowerCase()} ${user.lastName?.toLowerCase()}`.indexOf(
              searchValue.toLowerCase()
            ) > -1
          )
        })
        .map((user) => (
          <div onClick={() => onCurrentUser(user)}>
            <UsersItemSearch user={user} key={user.id} />
          </div>
        ))}
    </>
  )
}

const UsersItemSearch = ({ user }) => {
  return (
    <UserItem>
      <Avatar
        sx={{ width: 44, height: 44, marginRight: 2 }}
        alt={user.title}
        src={user.avatar}
        placeholder={"blur"}
      />
      <UserItemTexts>
        <UserItemInfo>
          {user.firstName} {user.lastName}
        </UserItemInfo>
        <UserItemProfession>{user.careers[0]?.position}</UserItemProfession>
      </UserItemTexts>
    </UserItem>
  )
}
const UserItem = styled.div`
  width: 100%;
  padding: 2px;
  margin: 2px 0;
  cursor: pointer;
  border: 1.5px solid #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  &:hover {
    border: 1.5px solid #27ae60;
  }
`
const UserItemTexts = styled.div``
const UserItemInfo = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 32px;
  color: #333333;
`
const UserItemProfession = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
`
