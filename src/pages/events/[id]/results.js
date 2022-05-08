import React  from "react"
import EdMainLayout from "../../../components/pages/Event/EDMainLayout"
import $api from "../../../services/axios"
import EventResults from "../../../components/pages/Event/Results/EventResults"

function Results({ event }) {

  return (
    <EdMainLayout event={event}>
      <EventResults />
    </EdMainLayout>
  )
}

export default Results

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: { event: data }, // will be passed to the page component as props
  }
}
