import React, { useMemo } from "react"
import {
  EventEmail,
  EventFacebook,
  EventFacebookHover,
  EventFlag,
  EventGoogleHover,
  EventLinkedin,
  EventLinkHover,
  EventLocation,
  EventMass,
  EventOrganisation,
  EventOrganizer,
  EventPhone,
  EventTGHover,
  EventVK,
  EventVKHover,
} from "./EventIcons"
import styled from "styled-components"
import phoneFormatter from "../../../../helpers/phoneFormatter"
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  VKShareButton,
} from "react-share"
import { toast } from "react-toastify"
import dynamic from "next/dynamic"
import { useTranslation } from "next-i18next"
const MapFiledLeafLet = dynamic(() => import("../../../ui/Map/FieldLeaflet"), {
  ssr: false,
})

const getContacts = (event) => {
  const { contacts } = event
  const { t: tEventDetail } = useTranslation("eventDetail")

  return [
    {
      id: "orgName_1",
      label: tEventDetail("eventMainInfo.nameOfTheOrganization"),
      value: contacts?.nameOrganization || "",
      icon: <EventOrganisation />,
    },
    {
      id: "organizer_2",
      label: tEventDetail("eventMainInfo.organizer"),
      value: `${contacts?.firstName || ""} ${contacts?.lastName || ""}`,
      icon: <EventOrganizer />,
    },
    {
      id: "email_3",
      label: tEventDetail("eventMainInfo.email"),
      value: contacts?.email || "",
      icon: <EventEmail />,
    },
    {
      id: "phone_4",
      label: tEventDetail("eventMainInfo.phoneNumber"),
      value: contacts?.phoneNumber1
        ? phoneFormatter(contacts?.phoneNumber1)
        : "",
      icon: <EventPhone />,
    },
  ]
}

const getAddresses = (event) => {
  const { location } = event
  const { t: tEventDetail } = useTranslation("eventDetail")

  return [
    {
      id: "getAddresses_1",
      label: tEventDetail("eventMainInfo.addressOfTheEvent"),
      value: location?.address || "",
      icon: <EventLocation />,
    },
    {
      id: "getAddresses_2",
      label: tEventDetail("eventMainInfo.weighingAddress"),
      value: location?.weighingPlace || "",
      icon: <EventMass />,
    },
    {
      id: "getAddresses_3",
      label: tEventDetail("eventMainInfo.arenaName"),
      value: location?.placeName || "",
      icon: <EventFlag />,
    },
  ]
}

const getParticipantCategories = () => {
  const { t: tEventDetail } = useTranslation("eventDetail")

  return [
    {
      id: "getParticipantCategories_1",
      label: `${tEventDetail("eventMainInfo.categories")}:`,
      value: "",
    },
    {
      id: "getParticipantCategories_2",
      label: `${tEventDetail("eventMainInfo.levels")}:`,
      value: "",
    },
    {
      id: "getParticipantCategories_3",
      label: `${tEventDetail("eventMainInfo.gender")}:`,
      value: "",
    },
    {
      id: "getParticipantCategories_4",
      label: `${tEventDetail("eventMainInfo.age")}:`,
      value: "",
    },
    {
      id: "getParticipantCategories_5",
      label: `${tEventDetail("eventMainInfo.weight")}:`,
      value: "",
    },
    {
      id: "getParticipantCategories_6",
      label: `${tEventDetail("eventMainInfo.price")}:`,
      value: "",
    },
  ]
}

function EventMainInfo({ event }) {
  const { t: tEventDetail } = useTranslation("eventDetail")

  const { contacts, addresses, categories } = useMemo(() => {
    return {
      contacts: getContacts(event),
      addresses: getAddresses(event),
      categories: getParticipantCategories(event),
    }
  }, [event])

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url)
    toast.success(`${tEventDetail("eventMainInfo.linkCopied")}`)
  }
  const mapPoints =
    event?.location?.lat && event?.location?.long
      ? {
          lat: +event?.location?.lat,
          lng: +event?.location?.long,
        }
      : null

  return (
    <MainWrapper>
      <Column>
        <h3>{tEventDetail("eventMainInfo.contacts")}</h3>
        <ul>
          {contacts.map(({ id, label, value, icon }) => (
            <li key={`EventMainInfoContacts_${id}`}>
              {icon}
              <div>
                <span>{label}</span>
                <p>{value}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3>{tEventDetail("eventMainInfo.socialNetworks")}</h3>
        <ContactsSocials>
          {event?.contacts?.facebook && (
            <a
              href={event?.contacts?.facebook}
              rel="noreferrer noopener"
              target="_blank"
            >
              <EventFacebook />
            </a>
          )}
          {event?.contacts?.linkedin && (
            <a
              href={event?.contacts?.linkedin}
              rel="noreferrer noopener"
              target="_blank"
            >
              <EventLinkedin />
            </a>
          )}
          {event?.contacts?.vk && (
            <a
              href={event?.contacts?.vk}
              rel="noreferrer noopener"
              target="_blank"
            >
              <EventVK />
            </a>
          )}
        </ContactsSocials>
      </Column>

      <Column>
        <h3>{tEventDetail("eventMainInfo.location")}</h3>
        <ul>
          {addresses.map(({ id, label, value, icon }) => (
            <li key={`EventMainInfoContacts_${id}`}>
              {icon}
              <div>
                <span>{label}</span>
                <p>{value}</p>
              </div>
            </li>
          ))}
        </ul>
        <div />
        <Map active={!!mapPoints}>
          <MapFiledLeafLet defaultPoints={mapPoints} disabled />
        </Map>
      </Column>

      <Column listWrapped>
        <h3>{tEventDetail("eventMainInfo.participantsCategories")}</h3>

        <ul>
          {categories.map(({ id, label, value, icon }) => (
            <li key={`EventMainInfoContacts_${id}`}>
              {icon}
              <div>
                <span>{label}</span>
                <p>{value}</p>
              </div>
            </li>
          ))}
        </ul>

        <CategoriesShareTitle>{tEventDetail("eventMainInfo.share")}</CategoriesShareTitle>
        <CategorySocials>
          <EmailShareButton
            subject={event.name}
            body={event.description}
            url={`https://dev.hustlefree.pro/en/events/${event.id}`}
          >
            <EventGoogleHover />
          </EmailShareButton>
          <FacebookShareButton
            url={`https://dev.hustlefree.pro/en/events/${event.id}`}
          >
            <EventFacebookHover />
          </FacebookShareButton>
          <VKShareButton
            url={`https://dev.hustlefree.pro/en/events/${event.id}`}
            title={event.name}
            image={event.image}
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
          <div
            onClick={() =>
              copyUrl(`https://dev.hustlefree.pro/en/events/${event.id}`)
            }
          >
            <EventLinkHover />
          </div>
        </CategorySocials>
      </Column>
    </MainWrapper>
  )
}

export default EventMainInfo

const MainWrapper = styled.div`
  display: grid;
  grid-template: 1fr / repeat(3, 1fr);
  grid-column-gap: 16px;
  padding: 0 0 32px 0;
  border-bottom: 1px solid #333;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
  border-right: 1px solid #333;
  padding: 0 16px 0 0;

  &:last-child {
    border-right: none;
    padding: 0;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    color: #f2f2f2;
  }

  ul {
    display: grid;
    ${({ listWrapped }) => {
      return !listWrapped
        ? "grid-template-columns: 1fr; grid-auto-rows: auto;"
        : "grid-template: 1fr 1fr 1fr / 1fr 1fr;"
    }}
    grid-row-gap: 24px;

    li {
      display: flex;
      grid-column-gap: 10px;

      div {
        display: flex;
        flex-direction: column;
        grid-gap: 12px;
        span {
          font-size: 18px;
          color: #bdbdbd;
        }
        p {
          font-size: 18px;
          line-height: 24px;
          color: #f2f2f2;
        }
      }
    }
  }
`

const ContactsSocials = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 24px;
`

const Map = styled.div`
  width: 500px;
  height: 151px;
  border-radius: 16px;
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
