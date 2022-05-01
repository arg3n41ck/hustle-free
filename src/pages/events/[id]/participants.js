import React, { useEffect, useState } from "react"
import EdMainLayout from "../../../components/pages/Event/EDMainLayout"
import $api from "../../../services/axios"
import EventParticipantsList from "../../../components/pages/Event/Participants/EventParticipantsList"
import EventParticipants from "../../../components/pages/Event/Participants/EventParticipants"

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: {
      event: data || null,
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
