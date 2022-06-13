import React from "react"
import { Event as Content } from "../../../components/pages/Event/Event/Event"
import $api from "../../../services/axios"
import EdMainLayout from "../../../components/pages/Event/EDMainLayout"
import Head from "next/head"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function EventsDetail({ event }) {
  return (
    <EdMainLayout event={event}>
      <Head>
        <title>{event?.name || "Детали турнира"}</title>
        <meta name="description" content={event?.description || ""} />
        <meta content="Hustle Free" property="og:site_name" />
        <meta content="website" property="og:type" />
        <meta
          content={`https://dev.hustlefree.pro/en/events/${event.id}`}
          property="og:url"
        />
        <meta
          content={event?.name || "Hustle Free - Турнир"}
          property="og:title"
        />
        <meta content={event?.description || ""} property="og:description" />
        {event.image && (
          <>
            <meta content={event.image} property="og:image" />
            <meta content="1050" property="og:image:width" />
            <meta content="630" property="og:image:height" />
          </>
        )}
        <meta
          content="https://www.instagram.com/hustlefree.pro/?hl=ru"
          property="og:see_also"
        />
        <meta
          content="https://www.youtube.com/watch?v=_XzBgefz_U8"
          property="og:see_also"
        />
        <meta
          content="https://twitter.com/hustlefree.pro"
          property="og:see_also"
        />
      </Head>
      <Content event={event} />
    </EdMainLayout>
  )
}

export default EventsDetail

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: {
      event: data,
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
