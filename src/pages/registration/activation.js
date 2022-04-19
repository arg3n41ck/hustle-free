import React, { useEffect, useState } from "react"
import InputPersonalData from "../../components/pages/LkAh/AthleteActivation/InputPersonalData"
import { useDispatch } from "react-redux"
import $api from "../../services/axios"
import OrganizerPersonalData from "../../components/pages/LkOg/OrganizerActivation/OrganizerTabs"
import { setCookie } from "../../services/JWTService"
import { fetchCountries } from "../../redux/components/countriesAndCities"

const InputData = ({ query }) => {
  const [view, setView] = useState("personal") // personal | skills
  const dispatch = useDispatch()
  const [role, setRole] = useState(null)

  const viewHandler = (type) => {
    setView(type)
  }

  const activationUser = async (uid, token) => {
    await $api
      .post("/accounts/auth/users/activation/", {
        uid,
        token,
      })
      .then(({ data }) => {
        setCookie("token", data.access, 999)
        setCookie("refresh", data.refresh, 999999)
        setCookie("email", data.email)
        setRole(data.role)
      })
  }

  useEffect(() => {
    !role && activationUser(query?.uid, query?.token)
    dispatch(fetchCountries())
  }, [])

  return (
    <>
      {!!role && role === "athlete" && (
        <InputPersonalData onView={viewHandler} />
      )}
      {!!role && role === "organizer" && <OrganizerPersonalData />}
      {!!role && role === "team" && alert(role)}
    </>
  )
}

export default InputData

export async function getServerSideProps(context) {
  return {
    props: { query: context.query }, // will be passed to the page component as props
  }
}
