import React from "react"
import { Event as Content } from "../../../components/pages/Event/Event/Event"
import $api from "../../../services/axios"
import EdMainLayout from "../../../components/pages/Event/EDMainLayout"

function EventsDetail({event}) {
  return (
    <EdMainLayout event={event}>
      <Content event={event}/>
    </EdMainLayout>
  )
}

export default EventsDetail

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: { event: data }, // will be passed to the page component as props
  }
}
