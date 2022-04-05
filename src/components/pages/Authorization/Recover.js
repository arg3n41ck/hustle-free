import React, { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import styled from "styled-components"
import { Box, TextField } from "@mui/material"
import Link from "next/link"
import { motion } from "framer-motion"
import $api from "../../../services/axios"
import AuthInfo from "../../ui/modals/AuthInfo"

const variants = {
  open: { opacity: 1, transaction: 5 },
  closed: { opacity: 0, transaction: 5 },
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите поле почты корректно")
    .required("Заполните поле почты"),
})

const Recover = ({ onView }) => {
  const [toggleInfoModal, setToggleInfoModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        await $api.post("/accounts/auth/users/reset_password/", values)
        setToggleInfoModal(true)
        setErrorMessage(null)
      } catch (e) {
        if (e?.response?.data[0] === "User with given email does not exist.") {
          setErrorMessage(`Пользователь ${values.email} не найден...`)
        }
      }
    },
    validationSchema,
  })

  return (
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
          <h3 className="auth-title">Забыли пароль?</h3>
          <p className="auth-description">
            Введите свой электронный адрес — и мы вышлем ссылку для смены пароля
          </p>
          <div className="auth-wrapper__input">
            <p className="auth-title__input">Электронный адрес</p>
            <TextField
              sx={{ width: "100%" }}
              name="email"
              onChange={formik.handleChange}
              id="outlined-basic"
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
            {true && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </div>

          <AuthButton
            active={formik.values.email && !Boolean(formik.errors.email)}
            type="submit"
          >
            Подтвердить
          </AuthButton>

          <div className="auth-additionally">
            <Box
              sx={{ marginBottom: 0.8, textAlign: "center" }}
              className="auth-additionally__text"
              component="p"
            >
              Уже есть аккаунт?{" "}
              <span onClick={() => onView("login")} className="auth-link">
                Войти
              </span>
            </Box>
            <Box
              sx={{ textAlign: "center" }}
              className="auth-additionally__text"
              component="p"
            >
              Нет аккаунта?{" "}
              <Link href="/registration" passHref>
                <a className="auth-link">Зарегистрироваться</a>
              </Link>
            </Box>
          </div>
        </div>
      </div>
    </Form>
  )
}

const Form = styled(motion.form)`
  min-height: 87vh;
`
export const AuthButton = styled.button`
  width: 100%;
  background: #${(p) => (p.active ? "27AE60" : "F2F2F2")};
  border-radius: 12px;
  height: 64px;

  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #${(p) => (p.active ? "fff" : "828282")};
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
const ErrorMessage = styled.p`
  color: #eb5757;
  margin: 4px;
  font-size: 13px;
`

export default Recover
