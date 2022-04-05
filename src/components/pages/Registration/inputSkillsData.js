import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Autocomplete, Box, TextField } from "@mui/material"

import { motion } from "framer-motion"
import { AuthButton } from "../Authorization/Authorization"
import AuthInfo from "../../ui/modals/AuthInfo"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser, saveUserItem } from "../../../redux/components/user"
import { fetchSkills } from "../../../redux/components/skills"
import $api from "../../../services/axios"
import { useCookie } from "react-use"
import { fetchTechnologies } from "../../../redux/components/technologies"
import { fetchStartups } from "../../../redux/components/startups"
import { changeAuthCheck } from "../../../redux/components/navigations"
import { toast } from "react-toastify"
import axios from "axios"

const InputSkillsData = () => {
  const allSkills = useSelector((state) => state.skills)
  const dispatch = useDispatch()
  const [skills, setSkills] = useState([])
  const [skill, setSkill] = useState("")
  const router = useRouter()
  const [token] = useCookie("token")

  useEffect(() => {
    dispatch(fetchSkills())
  }, [])

  const searchHandler = (e, value) => {
    const item = allSkills.skills.find((item) => item.title === value)
    if (!skills.find((skill) => skill?.id === item?.id)) {
      setSkills((prev) => [...prev, item])
      setSkill("")
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (skills.length) {
      toast.info("Ожидайте ответа от сервера")
      const newSkills = skills.map((skill) => skill.id)
      try {
        dispatch(saveUserItem({ userItem: "skills", value: newSkills }))
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}accounts/users/me/`,
          {
            skills: newSkills,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        toast.success("Данные успешно сохранены!")
        router.push("/profile")
      } catch (e) {
        console.log(e)
      }
    }
  }

  const disableKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault()
    }
  }

  return (
    <Form
      animate={{ translateX: ["20%", "0%"] }}
      transition={{ duration: 0.5 }}
      onSubmit={submitHandler}
      onKeyDown={disableKeyDown}
    >
      <Box
        sx={{
          marginBottom: " 14vh !important",
        }}
        className="auth-container"
      >
        <div className="auth-wrapper">
          <h3 className="auth-title">Регистрация</h3>
          <p className="auth-description">
            Создайте аккаунт, чтобы пользоваться сервисами и было проще.
          </p>

          <Box sx={{ display: "flex", marginBottom: 2 }}>
            <Autocomplete
              sx={{
                "& .MuiSvgIcon-root": {
                  width: 0,
                },
              }}
              id="blur-on-select"
              blurOnSelect
              value={skill}
              noOptionsText={"Ничего не найдено"}
              fullWidth
              onChange={(e, value) => searchHandler(e, value)}
              options={allSkills.skills
                .filter((item) => !skills.includes(item.title))
                .map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder={"Найдите навык"}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="7"
                          stroke="#828282"
                          strokeWidth="2"
                        />
                        <path
                          d="M20 20L17 17"
                          stroke="#828282"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                  }}
                />
              )}
            />
          </Box>

          <Skills>
            {!!skills?.length &&
              skills.map((skillItem) => {
                return (
                  skillItem && (
                    <Skill key={skillItem?.id}>{skillItem?.title}</Skill>
                  )
                )
              })}
          </Skills>

          <Box sx={{ margin: "24px 0" }}>
            <AuthInfo
              title={""}
              text={
                "Выбранные Вами навыки дадут возможность платформе высвечивать вакансий, задачи и курсы, которые Вам будут интересны. Вы можете редактировать их в своем личном кабинете по завершению регистрации."
              }
            />
          </Box>

          <AuthButton
            onClick={() => {
              dispatch(changeAuthCheck(true))
            }}
            active={skills.length}
            type="submit"
          >
            Завершить
          </AuthButton>
        </div>
      </Box>
    </Form>
  )
}

const Form = styled(motion.form)``
const Skills = styled.ul`
  //display: inline-grid;
  //grid-auto-flow: column;
  //grid-auto-columns: auto;
  //grid-gap: 16px 6px;
  //margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
`
const Skill = styled.li`
  display: inline-block;
  padding: 8px 12px;
  border: 0.5px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  margin: 8px 3px;
`

export default InputSkillsData
