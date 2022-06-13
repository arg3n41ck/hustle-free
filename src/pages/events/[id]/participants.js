import React from "react"
import EdMainLayout from "../../../components/pages/Event/EDMainLayout"
import $api from "../../../services/axios"
import EventParticipants from "../../../components/pages/Event/Participants/EventParticipants"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: {
      event: data || null,
      ...(await serverSideTranslations(locale, [
        "header",
        "common",
        "eventDetail",
        "lkTm",
        "footer",
      ])),
    },
  }
}

function Participants({ event }) {
  return (
    <EdMainLayout event={event}>
      <EventParticipants />
    </EdMainLayout>
  )
}

export default Participants
