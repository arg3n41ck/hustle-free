import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { Box, Checkbox, TextField, MenuItem } from "@mui/material"
import { motion } from "framer-motion"
import styled from "styled-components"
import { AuthButton } from "../../components/pages/Authorization/Authorization"
import AuthInfo from "../../components/ui/modals/AuthInfo"
import Link from "next/link"
import $api from "../../services/axios"

const variants = {
  open: { opacity: 1, transaction: 5 },
  closed: { opacity: 0, transaction: 5 },
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите поле почты корректно")
    .required("Заполните поле почты"),
  role: yup.string().required("Заполните поле почты"),
})

const Index = () => {
  const [agreement, setAgreement] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toggleInfoModal, setToggleInfoModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [registrationInfoModal, setRegistationInfoModal] = useState(null)
  const formik = useFormik({
    initialValues: {
      email: "",
      role: "",
    },
    onSubmit: async (values) => {
      setLoading(true)
      if (agreement && formik.values.email && !Boolean(formik.errors.email)) {
        try {
          await $api
            .post("/accounts/auth/users/", { ...values })
            .then(({ data }) => {
              setRegistationInfoModal(data)
            })
          setToggleInfoModal(true)
        } catch (e) {
          setErrorMessage(
            "Пользователь с таким адресом электронной почты уже существует."
          )
        }
        setLoading(false)
      }
    },
    validationSchema,
  })

  useEffect(() => {
    setErrorMessage(null)
  }, [formik.values.email])

  return (
    <>
      <TextPrev>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12L4.29289 11.2929L3.58579 12L4.29289 12.7071L5 12ZM17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11V13ZM8.29289 7.29289L4.29289 11.2929L5.70711 12.7071L9.70711 8.70711L8.29289 7.29289ZM4.29289 12.7071L8.29289 16.7071L9.70711 15.2929L5.70711 11.2929L4.29289 12.7071ZM5 13H17V11H5V13Z"
            fill="#828282"
          />
        </svg>
      </TextPrev>
      {!registrationInfoModal ? (
        <Form
          animate={{ translateX: ["20%", "0%"] }}
          transition={{ duration: 0.5 }}
          onSubmit={formik.handleSubmit}
        >
          <div className="auth-container">
            <ModalWrapperAnimate
              animate={toggleInfoModal ? "open" : "closed"}
              variants={variants}
            >
              {toggleInfoModal && (
                <AuthInfo
                  title="Отлично"
                  text={`на ваш электронный адрес ${formik.values.email} отправлено сообщение со ссылкой для подтверждения!`}
                  toggleShow={setToggleInfoModal}
                />
              )}
            </ModalWrapperAnimate>
            <div className="auth-wrapper">
              <div className="auth-title">Регистрация</div>
              <p className="auth-description">
                Создайте аккаунт, чтобы пользоваться сервисами и было проще.
              </p>
              <div className="auth-wrapper__input">
                <p className="auth-title__input">Электронный адрес</p>
                <TextField
                  sx={{ width: "100%", marginBottom: 3 }}
                  name="email"
                  onChange={formik.handleChange}
                  id="outlined-basic"
                  // label="Электронный адрес"
                  placeholder="Электронный адрес"
                  variant="outlined"
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
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
                <div>
                  <p className="auth-title__input">Ваша роль</p>
                  <TextField
                    id="outlined-select-currency"
                    select
                    sx={{ width: "100%", color: "white" }}
                    name="role"
                    placeholder="asdasdasd"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    // error={touched.cities && errors.cities}
                  >
                    <MenuItem value="athlete">Атлет</MenuItem>
                    <MenuItem value="organizer">Организатор</MenuItem>
                    <MenuItem value="team">Команда</MenuItem>
                  </TextField>
                </div>
              </div>
              <ErrorMessage>{!!errorMessage && errorMessage}</ErrorMessage>
              <AuthButton
                active={
                  formik.values.email &&
                  !Boolean(formik.errors.email) &&
                  formik.values.role &&
                  !Boolean(formik.errors.role) &&
                  agreement &&
                  !errorMessage
                }
                disabled={
                  !formik.values.email ||
                  Boolean(formik.errors.email) ||
                  !formik.values.role ||
                  Boolean(formik.errors.role) ||
                  !agreement ||
                  loading ||
                  errorMessage
                }
                type="submit"
              >
                Отправить
              </AuthButton>
              <Box sx={{ display: "flex", marginTop: 2.4 }}>
                <Checkbox
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                  sx={{
                    paddingTop: 1.6,
                    color: "#27AE60",
                    borderRadius: 2,
                    width: 16,
                    height: 16,
                    marginRight: 2,
                    "&.Mui-checked": {
                      color: "primary",
                    },
                  }}
                />
                <Box
                  component="p"
                  sx={{ color: "#828282 !important" }}
                  className="auth-additionally__text"
                >
                  Регистрируясь, вы подтверждаете, что принимаете наши{" "}
                  <a href="" className="auth-link">
                    Условия использования и Политику конфиденциальности.
                  </a>
                </Box>
              </Box>
              <Box
                sx={{ textAlign: "center", marginTop: 3 }}
                className="auth-additionally__text"
                component="p"
              >
                Уже есть аккаунт?{" "}
                <Link href="/login" passHref>
                  <a className="auth-link">Войти</a>
                </Link>
              </Box>
            </div>
          </div>
        </Form>
      ) : (
        <motion.div
          animate={{ translateX: ["80%", "0%"] }}
          transition={{ duration: 0.5 }}
          className="auth-container"
        >
          <RegistrationInfoContainer>
            <Reactangle />
            <RegistrationInfoContainerInnerTexts>
              <RegistrationInfoContainerHeader>
                Отлично
              </RegistrationInfoContainerHeader>
              <RegistrationInfoContainerText>
                на ваш электронный адрес {registrationInfoModal?.email}{" "}
                отправлено сообщение со ссылкой для подтверждения!
              </RegistrationInfoContainerText>
            </RegistrationInfoContainerInnerTexts>
          </RegistrationInfoContainer>
        </motion.div>
      )}
    </>
  )
}

const TextPrev = styled.div`
  color: #828282;
  display: flex;
  align-items: center;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  position: absolute;
  top: -100%;
  left: -60%;
  z-index: 1;
`
const Form = styled(motion.form)``
const ErrorMessage = styled.p`
  color: #eb5757;
  text-align: center;
  padding-bottom: 16px;
`
const RegistrationInfoContainerInnerTexts = styled.div`
  margin-left: 24px;
`

const Reactangle = styled.div`
  background: #6d4eea;
  width: 8px;
  height: 100%;
  position: absolute;
  left: 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`

const RegistrationInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // width: 100%;
  box-shadow: 0 8px 32px rgba(74, 74, 74, 0.12);
  // height: 100%;
  max-width: 506px;
  // margin: 0 auto;
  border-radius: 8px;
  padding: 24px 24px 24px 0;
  background: #191a1f;
  position: relative;
`

const RegistrationInfoContainerHeader = styled.p`
  color: #f2f2f2;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`

const RegistrationInfoContainerText = styled.p`
  color: #f2f2f2;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  margin-top: 8px;
`

const ModalWrapperAnimate = styled(motion.div)`
  width: 100%;
  margin-top: 60vh;
  max-width: 592px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999999;
`

export default Index
