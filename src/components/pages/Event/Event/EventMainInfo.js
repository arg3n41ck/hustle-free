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
import MapField from "../../../ui/Map/Field"

const getContacts = (event) => {
  const { contacts } = event
  return [
    {
      id: "orgName_1",
      label: "Название организации",
      value: contacts?.nameOrganization || "",
      icon: <EventOrganisation />,
    },
    {
      id: "organizer_2",
      label: "Организатор",
      value: `${contacts?.firstName || ""} ${contacts?.lastName || ""}`,
      icon: <EventOrganizer />,
    },
    {
      id: "email_3",
      label: "Электронный адрес",
      value: contacts?.email || "",
      icon: <EventEmail />,
    },
    {
      id: "phone_4",
      label: "Номер телефона",
      value: contacts?.phoneNumber1 || "",
      icon: <EventPhone />,
    },
  ]
}

const getAddresses = (event) => {
  const { location } = event

  return [
    {
      id: "getAddresses_1",
      label: "Адрес проведения мероприятия",
      value: location?.address || "",
      icon: <EventLocation />,
    },
    {
      id: "getAddresses_2",
      label: "Адрес взвешивания",
      value: location?.weighingPlace || "",
      icon: <EventMass />,
    },
    {
      id: "getAddresses_3",
      label: "Название арены",
      value: location?.placeName || "",
      icon: <EventFlag />,
    },
  ]
}

const getParticipantCategories = () => {
  return [
    {
      id: "getParticipantCategories_1",
      label: "Категории:",
      value: "lorem ipsum dolor",
    },
    {
      id: "getParticipantCategories_2",
      label: "Уровни:",
      value: "lorem ipsum dolor",
    },
    {
      id: "getParticipantCategories_3",
      label: "Пол:",
      value: "lorem ipsum dolor",
    },
    {
      id: "getParticipantCategories_4",
      label: "Возраст:",
      value: "lorem ipsum dolor",
    },
    {
      id: "getParticipantCategories_5",
      label: "Вес:",
      value: "lorem ipsum dolor",
    },
    {
      id: "getParticipantCategories_6",
      label: "Цены:",
      value: "",
    },
  ]
}

function EventMainInfo({ event }) {
  const { contacts, addresses, categories } = useMemo(() => {
    return {
      contacts: getContacts(event),
      addresses: getAddresses(event),
      categories: getParticipantCategories(event),
    }
  }, [event])

  const mapPoints =
    event?.location?.lat && event?.location?.long
      ? {
          lat: +event?.location?.lat,
          lng: +event?.location?.long,
        }
      : null

  console.log({ event })

  return (
    <MainWrapper>
      <Column>
        <h3>Контакты</h3>
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
        <h3>Социальные сети</h3>
        <ContactsSocials>
          <EventFacebook />
          <EventLinkedin />
          <EventVK />
        </ContactsSocials>
      </Column>

      <Column>
        <h3>Локация</h3>
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
          {mapPoints && <MapField defaultPoints={mapPoints} disabled />}
        </Map>
      </Column>

      <Column listWrapped>
        <h3>Категории участников</h3>

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

        <CategoriesShareTitle>Поделиться</CategoriesShareTitle>
        <CategorySocials>
          <EventGoogleHover />
          <EventFacebookHover />
          <EventVKHover />
          <EventTGHover />
          <EventLinkHover />
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
  width: 100%;
  height: 151px;
  border-radius: 16px;
  background: no-repeat
    url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80")
    center / cover;
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
