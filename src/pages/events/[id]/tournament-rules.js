import React from "react"
import Tournamentrules from "../../../components/pages/Event/TournamentRules/TournamentRules"
import styled from "styled-components"
import AuthAthleteToEventAllAccordions from "../../../components/AuthAthleteToEventAccordions/AuthAthleteToEventAllAccordions"
import $api from "../../../services/axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function TournamentRules({ data }) {
  return (
    <TournamentRulesContainer>
      <Tournamentrules event={data} />
      <AuthAthleteToEventAllAccordions event={data} />
    </TournamentRulesContainer>
  )
}

export default TournamentRules

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, [
        "header",
        "common",
        "eventDetail",
        "lkTm",
        "footer",
      ])),
    }, // will be passed to the page component as props
  }
}

const TournamentRulesContainer = styled.div`
  margin-top: 64px;
  width: 100%;
  display: grid;
  grid-template-columns: 8fr 2.5fr;
  grid-gap: 32px;
`
