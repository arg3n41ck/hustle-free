import React from "react"
import styled from "styled-components"
import AuthAthleteToEventAllAccordions from "../../../components/AuthAthleteToEventAccordions/AuthAthleteToEventAllAccordions"
import AuthorizationAthleteToEvent from "../../../components/pages/Authorization/AuthorizationAthleteToEvent"
import $api from "../../../services/axios"
import { useDispatch } from "react-redux"

function Registration({ data, query }) {
  const dispatch = useDispatch()

  // React.useEffect(() => {
    // dispatch(fetchUser())
  // }, [])

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
