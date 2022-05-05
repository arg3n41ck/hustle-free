import React, { useMemo } from "react"
import { Avatar } from "@mui/material"
import styled from "styled-components"
import { calendar, email, gender, location, phone } from "./Icons"
import { useSelector } from "react-redux"
import { selectCountriesAndCities } from "../../../redux/components/countriesAndCities"
import { getRuDetailDate } from "../../../helpers/helpers"
import phoneFormatter from "../../../helpers/phoneFormatter"

const getContacts = ({
  email: userEmail,
  gender: userGender,
  city,
  country,
  dateBirthday,
  phoneNumber,
}) => [
  {
    icon: email,
    content: userEmail || "",
  },
  {
    icon: calendar,
    content: dateBirthday ? getRuDetailDate(dateBirthday) : "",
  },
  {
    icon: gender,
    content: userGender ? (userGender === "male" ? "Мужской" : "Женский") : "",
  },
  {
    icon: location,
    content: (country ? `${country},` : "") + (city ? ` г. ${city}` : ""),
  },
  {
    icon: phone,
    content: phoneNumber ? phoneFormatter(phoneNumber) : "",
  },
]

function AthleteUserData({ user }) {
  const [countries, cities] = useSelector(selectCountriesAndCities)

  const userCity = cities.find(({ id }) => id === user.city)?.name || ""
  const userCountry =
    countries.find(({ id }) => id === user.country)?.name || ""

  const contacts = useMemo(
    () => getContacts({ ...user, city: userCity, country: userCountry }),
    [user]
  )

  return (
    <MainWrapper>
      <MainInfo>
        <Avatar
          src={`https://api.dev.hustlefree.pro${user.avatar}`}
          alt={`${user.avatar}`}
          sx={{ width: 264, height: 264 }}
        />
        <h3>{`${user.firstName || ""} ${user.lastName || ""}`}</h3>
      </MainInfo>
      <Contacts>
        {contacts.map(({ content, icon }, i) => (
          <div key={`AthleteUserData-Contacts-${i}`}>
            {icon}
            <p>{content}</p>
          </div>
        ))}
      </Contacts>
    </MainWrapper>
  )
}

export default AthleteUserData

const MainWrapper = styled.div`
  padding: 32px;
  border-right: 1px solid #333333;
`

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-row-gap: 16px;
  border-bottom: 1px solid #333;
  padding-bottom: 16px;
  margin-bottom: 16px;

  h3 {
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
    color: #f2f2f2;
    text-align: center;
  }
`

const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;

  div {
    display: grid;
    grid-template-columns: 24px auto;
    align-items: center;
    grid-column-gap: 10px;

    p {
      font-size: 18px;
      line-height: 24px;
      color: #e0e0e0;
    }
  }
`
