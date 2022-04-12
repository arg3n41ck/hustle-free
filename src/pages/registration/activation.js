import React, { useEffect, useState } from "react"
import InputPersonalData from "../../components/pages/Lk-Og/AthleteActivation/InputPersonalData"
import InputSkillsData from "../../components/pages/Lk-Og/AthleteActivation/inputSkillsData"
import { fetchSkills } from "../../redux/components/skills"
import { fetchTechnologies } from "../../redux/components/technologies"
import { fetchUser } from "../../redux/components/user"
import { fetchStartups } from "../../redux/components/startups"
import { useDispatch } from "react-redux"
import $api from "../../services/axios"
import OrganizerPersonalData from "../../components/pages/Lk-Og/OrganizerActivation/OrganizerTabs"
import { setCookie } from "../../services/JWTService"

const InputData = ({ query }) => {
  const [view, setView] = useState("personal") // personal | skills
  const dispatch = useDispatch()
  const [role, setRole] = useState("organizer")
  console.log(role)

  const viewHandler = (type) => {
    setView(type)
  }

  // const activationUser = async (uid, token) => {
  //   await $api
  //     .post("/accounts/auth/users/activation/", {
  //       uid,
  //       token,
  //     })
  //     .then(({ data }) => {
  //       setCookie("token", data.access, 999)
  //       setCookie("refresh", data.refresh, 999999)
  //       setRole(data.role)
  //     })
  // }

  // useEffect(() => {
  //   !role && activationUser(query?.uid, query?.token)
  //   return () => {
  //     // dispatch(fetchSkills())
  //     // dispatch(fetchTechnologies())
  //     // dispatch(fetchUser())
  //     // dispatch(fetchStartups())
  //   }
  // }, [])

  return (
    <>
      {/* {(view === "personal" && ( */}
      {!!role && role === "athlete" && (
        <InputPersonalData onView={viewHandler} />
      )}
      {!!role && role === "organizer" && <OrganizerPersonalData />}
      {!!role && role === "team" && alert(role)}
      {/* )) || */}
      {/* (view === "skills" && <InputSkillsData />)} */}
    </>
  )
}

export default InputData

export async function getServerSideProps(context) {
  return {
    props: { query: context.query }, // will be passed to the page component as props
  }
}
