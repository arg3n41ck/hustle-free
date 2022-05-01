import React from "react"
import ContactAccordion from "./ContactAccordion"
import LocationAccordion from "./LocationAccordion"
import RegistrationAccordion from "./RegistrationAccordion"
import styled from "styled-components"

function AuthAthleteToEventAllAccordions({ data }) {
  return (
    <TournamentRulesAccordions>
      <RegistrationAccordion data={data} />
      <LocationAccordion data={data} />
      <ContactAccordion data={data} />
    </TournamentRulesAccordions>
  )
}

export default AuthAthleteToEventAllAccordions

const TournamentRulesAccordions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
`
