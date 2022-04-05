import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Autocomplete, Box, TextField } from "@mui/material"

import AuthInfo from "../../ui/modals/AuthInfo"
import { AuthButton } from "../Authorization/Authorization"
import { useDispatch, useSelector } from "react-redux"
import { saveUserItem } from "../../../redux/components/user"
import { theme } from "../../../styles/theme"
import $api from "../../../services/axios"
import { toast } from "react-toastify"

const ProfileSkills = ({ onTabs }) => {
  const [skillsState, setSkillsState] = useState([])
  const { skills } = useSelector((state) => state.skills)
  const { user } = useSelector((state) => state.user)
  const [skill, setSkill] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    setSkillsState(user.skills)
  }, [user.skills])

  const searchHandler = (e, value) => {
    const item = skills.find((item) => item.title === value)
    if (!skillsState.find((skill) => skill.id === item.id)) {
      setSkillsState((prev) => [...prev, item])
      setSkill("")
    }
  }

  const submitHandler = async (e) => {
    toast.info("Ожидайте ответа от сервера...")
    e.preventDefault()
    if (skillsState !== user.skills) {
      dispatch(saveUserItem({ userItem: "skills", value: skillsState }))
      try {
        await $api.put("accounts/users/me/", {
          skills: skillsState.map((skill) => skill.id),
        })
        toast.success("Добавление навыка прошло успешно")
        onTabs("certificates")
      } catch (e) {}
    }
  }

  const deleteHandler = (id) => {
    const index = skillsState.findIndex((skill) => skill.id === id)
    if (index !== -1) {
      const newArr = [...skillsState]
      newArr.splice(index, 1)
      setSkillsState(newArr)
    }
  }

  return (
    <>
      <Wrapper>
        <Title>Навыки</Title>
        <Line />
        <Content>
          <Box sx={{ display: "flex", marginBottom: 2 }}>
            <Autocomplete
              sx={{
                "& .MuiSvgIcon-root": {
                  width: 0,
                },
              }}
              noOptionsText={"Ничего не найдено"}
              fullWidth
              id="blur-on-select"
              blurOnSelect
              value={skill}
              onChange={(e, value) => {
                searchHandler(e, value)
              }}
              options={skills
                .filter((item) => !skillsState.includes(item.id))
                .map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  maxLength={500}
                  fullWidth
                  placeholder="Найдите навык"
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
            {skillsState.map((skillItem) => (
              <Skill key={skillItem.id}>
                {skillItem.title}{" "}
                <Box
                  onClick={() => deleteHandler(skillItem.id)}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 0.3,
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="9" fill="white" />
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

          <Box sx={{ margin: "24px 0" }}>
            <AuthInfo
              title={""}
              text={
                "Выбранные Вами навыки дадут возможность платформе высвечивать вакансий, задачи и курсы, которые Вам будут интересны. Вы можете редактировать их в своем личном кабинете по завершению регистрации."
              }
            />
          </Box>
        </Content>
      </Wrapper>
      <AuthButton
        onClick={submitHandler}
        active={skillsState !== user.skills}
        disabled={skillsState === user.skills}
        type="submit"
      >
        Сохранить
      </AuthButton>
    </>
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
const Content = styled.div`
  padding: 32px;
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
  display: inline-flex;
  padding: 8px 12px;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  margin: 8px 3px;
  background: #f4f4f4;
`

export default ProfileSkills
