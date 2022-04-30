import React from "react"
import EdMainLayout from "../../../components/pages/Event/EDMainLayout"
import $api from "../../../services/axios"

function Results({ event }) {
  return <EdMainLayout event={event}>results</EdMainLayout>
}

export default Results

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: { event: data }, // will be passed to the page component as props
  }
}
