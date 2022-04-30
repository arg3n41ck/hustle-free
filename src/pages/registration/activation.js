import React, { useEffect, useState } from "react"
import InputPersonalData from "../../components/pages/LkAh/AthleteActivation/InputPersonalData"
import InputSkillsData from "../../components/pages/LkAh/AthleteActivation/inputSkillsData"
import { fetchUser } from "../../redux/components/user"
import { useDispatch } from "react-redux"
import $api from "../../services/axios"
import OrganizerPersonalData from "../../components/pages/LkOg/OrganizerActivation/OrganizerTabs"
import { setCookie } from "../../services/JWTService"
import { fetchCountries } from "../../redux/components/countriesAndCities"

const InputData = ({ query }) => {
  const dispatch = useDispatch()
  const [role, setRole] = useState(null)

  const activationUser = async (uid, token) => {
    await $api
      .post("/accounts/auth/users/activation/", {
        uid,
        token,
      })
      .then(async ({ data }) => {
        setCookie("token", data.access, 999)
        setCookie("refresh", data.refresh, 999999)
        setCookie("email", data.email)
        setRole(data.role)
      })
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    !role && activationUser(query?.uid, query?.token)
    dispatch(fetchCountries())
    return () => {
      // dispatch(fetchSkills())
      // dispatch(fetchTechnologies())
      // dispatch(fetchUser())
      // dispatch(fetchStartups())
    }
  }, [])

  return (
    <>
      {/* {(view === "personal" && ( */}
      {!!role && role === "athlete" && <InputPersonalData />}
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
