import React from 'react'
import {
  EventFacebookHover,
  EventGoogleHover,
  EventLinkHover,
  EventTGHover,
  EventVKHover,
} from './EventIcons'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  VKShareButton,
} from 'react-share'
import styled from 'styled-components'

function EventMainInfoShare({ event }) {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url)
    toast.success(`${tEventDetail('eventMainInfo.linkCopied')}`)
  }

  return (
    <ShareWrapper>
      <CategoriesShareTitle>{tEventDetail('eventMainInfo.share')}</CategoriesShareTitle>
      <CategorySocials>
        <EmailShareButton
          subject={event?.name}
          body={event?.description?.description}
          url={`https://dev.hustlefree.pro/en/events/${event.id}`}
        >
          <EventGoogleHover />
        </EmailShareButton>
        <FacebookShareButton url={`https://dev.hustlefree.pro/en/events/${event.id}`}>
          <EventFacebookHover />
        </FacebookShareButton>
        <VKShareButton
          url={`https://dev.hustlefree.pro/en/events/${event.id}`}
          title={event.name}
          image={event?.description?.banner}
          noParse={true}
        >
          <EventVKHover />
        </VKShareButton>
        <TelegramShareButton
          url={`https://dev.hustlefree.pro/en/events/${event.id}`}
          title={event.name}
        >
          <EventTGHover />
        </TelegramShareButton>
        <div onClick={() => copyUrl(`https://dev.hustlefree.pro/en/events/${event.id}`)}>
          <EventLinkHover />
        </div>
      </CategorySocials>
    </ShareWrapper>
  )
}

export default EventMainInfoShare

const ShareWrapper = styled.div`
  display: flex;
  grid-gap: 24px;
  flex-direction: column;
`

const CategorySocials = styled.div`
  display: flex;
  grid-gap: 16px;
`

const CategoriesShareTitle = styled.h3`
  height: 100%;
  display: flex;
  align-items: flex-end;
`
