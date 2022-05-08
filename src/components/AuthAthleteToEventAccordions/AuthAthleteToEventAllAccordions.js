import React from "react"
import ContactAccordion from "./ContactAccordion"
import LocationAccordion from "./LocationAccordion"
import RegistrationAccordion from "./RegistrationAccordion"
import styled from "styled-components"

function AuthAthleteToEventAllAccordions({ event }) {
  return (
    <TournamentRulesAccordions>
      <RegistrationAccordion event={event} />
      <LocationAccordion event={event} />
      <ContactAccordion event={event} />
    </TournamentRulesAccordions>
  )
}

export default AuthAthleteToEventAllAccordions

const TournamentRulesAccordions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, min-content);
  grid-gap: 32px;
`
