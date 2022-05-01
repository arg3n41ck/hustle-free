import React from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import useFetch from "../../../hooks/useFetch"
import { API_URL } from "../../../services/constants"
import AuthAthleteToEventAllAccordions from "../../../components/AuthAthleteToEventAccordions/AuthAthleteToEventAllAccordions"
import AuthorizationAthleteToEvent from "../../../components/pages/Authorization/AuthorizationAthleteToEvent"
import $api from "../../../services/axios"
import { getCookie } from "../../../services/JWTService"

function Registration({ data, query }) {
  React.useEffect(() => {
    const fetchU = async () => {
      const { data: dataCategory } = await $api.get(
        `/athlete/events/${query.id}/registration/`
      )
      console.log(dataCategory)
    }
    fetchU()
  }, [])

  return (
    <RegistrationContainer>
      <AuthorizationAthleteToEvent data={data} />
      <AuthAthleteToEventAllAccordions data={data} />
    </RegistrationContainer>
  )
}

export default Registration

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)

  return {
    props: { data, query }, // will be passed to the page component as props
  }
}

const RegistrationContainer = styled.div`
  margin-top: 64px;
  width: 100%;
  display: grid;
  grid-template-columns: 8fr 2.5fr;
  grid-gap: 32px;
`
