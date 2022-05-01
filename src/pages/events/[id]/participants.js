import React, { useState } from "react"
import EdMainLayout from "../../../components/pages/Event/EDMainLayout"
import $api from "../../../services/axios"
import EventParticipantsList from "../../../components/pages/Event/Participants/EventParticipantsList"

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  const { data: eventParticipants } = await $api.get(`/events/participants/`)
  return {
    props: { event: data, eventParticipants: eventParticipants || [] }, // will be passed to the page component as props
  }
}

function Participants({ event, eventParticipants }) {
  return (
    <EdMainLayout event={event}>
      <EventParticipantsList eventParticipants={eventParticipants} />
      participants
    </EdMainLayout>
  )
}

export default Participants
