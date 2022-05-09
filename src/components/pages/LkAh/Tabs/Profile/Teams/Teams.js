import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { selectCountriesAndCities } from "../../../../../../redux/components/countriesAndCities"
import { Avatar } from "@mui/material"
import { useRouter } from "next/router"

function Teams({ data, column }) {
  const [countries, cities] = useSelector(selectCountriesAndCities)

  const [country, setCountry] = React.useState(null)
  const [city, setCity] = React.useState(null)
  const { push: routerPush } = useRouter()

  React.useEffect(() => {
    setCountry(countries.find((country) => country.id === data?.country))
    setCity(cities.find((city) => city.id === data?.city))
  }, [data])

  if (!country && !city) {
    return <div />
  }

  return (
    <TeamsContainer key={data?.id} column={column}>
      <TeamsItems>
        <TeamsHeadingInfo column={column}>
          <Avatar
            alt={`${data?.user?.avatar || ""}`}
            src={data?.user?.avatar}
            sx={{ width: 64, height: 64 }}
          />
          <TeamsHeadingText onClick={() => routerPush(`/team/${data?.id}`)}>
            {data?.name}
          </TeamsHeadingText>
        </TeamsHeadingInfo>
        <Line />

        <TeamsBottomInfo column={column}>
          <TeamsBottomInfoCol>
            <LocationIcon />
            <TeamsBottonInfoText>
              {country?.name}, {city?.name}, {data?.address}{" "}
            </TeamsBottonInfoText>
          </TeamsBottomInfoCol>
          <TeamsBottomInfoCol>
            <UserIcon />
            <TeamsBottonInfoText>{data?.fullNameCoach}</TeamsBottonInfoText>
          </TeamsBottomInfoCol>
          <CrtTeamsBottomInfoCol column={column}>
            <TeamsBottomInfoCol>
              <PhoneIcon />
              <TeamsBottonInfoText> {data?.phoneCoach} </TeamsBottonInfoText>
            </TeamsBottomInfoCol>
            <TeamsBottomInfoCol>
              <EmailIcon />
              <TeamsBottonInfoText> {data?.emailCoach} </TeamsBottonInfoText>
            </TeamsBottomInfoCol>
          </CrtTeamsBottomInfoCol>
        </TeamsBottomInfo>
      </TeamsItems>
    </TeamsContainer>
  )
}

export default Teams

const TeamsContainer = styled.div`
  padding: 32px;
  border: 1px solid #333333;
  border-radius: 16px;
  margin: ${({ column }) => (!!column ? 0 : "32px")};
`

const TeamsHeadingText = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const TeamsBottonInfoText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #f2f2f2;
`

const TeamsBottomInfoCol = styled.div`
  max-width: 296px;
  display: grid;
  align-items: flex-start;
  grid-template-columns: 24px 10fr;
  grid-column-gap: 8px;
`

const CrtTeamsBottomInfoCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  grid-row-gap: ${({ column }) => (column ? "16px" : "4px")};

  & ${TeamsBottomInfoCol} {
    align-items: center;
  }
`

const TeamsItems = styled.div``

const TeamsHeadingInfo = styled.div`
  display: grid;
  cursor: pointer;
  grid-template-columns: 64px auto;
  grid-column-gap: 16px;
  align-items: center;
`

const TeamsBottomInfo = styled.div`
  display: grid;
  grid-template-columns: ${({ column }) => (column ? "1fr" : "1fr 1fr 1fr")};
  grid-gap: 16px;

  & > div {
    border-left: ${({ column }) => (column ? 0 : "1px solid #333")};
    padding-left: ${({ column }) => (column ? 0 : "16px")};
    &:first-child {
      border-left: none;
      padding-left: 0;
    }
  }
`

const Line = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
  margin: 32px 0;
`

const LocationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
      fill="#828282"
    />
  </svg>
)

const UserIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.6518 20.4054C20.2046 20.2902 20.5338 19.7117 20.2591 19.2183C19.6535 18.1307 18.6995 17.1749 17.4791 16.4465C15.9073 15.5085 13.9814 15 12.0002 15C10.019 15 8.09316 15.5085 6.52137 16.4465C5.30093 17.1749 4.34691 18.1307 3.74132 19.2183C3.46663 19.7117 3.79586 20.2902 4.34868 20.4054C9.39549 21.4572 14.6049 21.4572 19.6518 20.4054Z"
      fill="#828282"
    />
    <path
      d="M17.0002 8C17.0002 10.7614 14.7616 13 12.0002 13C9.23879 13 7.00022 10.7614 7.00022 8C7.00022 5.23858 9.23879 3 12.0002 3C14.7616 3 17.0002 5.23858 17.0002 8Z"
      fill="#828282"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.67962 3.32038L7.29289 2.70711C7.68342 2.31658 8.31658 2.31658 8.70711 2.70711L11.2929 5.29289C11.6834 5.68342 11.6834 6.31658 11.2929 6.70711L9.50048 8.49952C9.2016 8.7984 9.1275 9.255 9.31653 9.63307C10.4093 11.8186 12.1814 13.5907 14.3669 14.6835C14.745 14.8725 15.2016 14.7984 15.5005 14.4995L17.2929 12.7071C17.6834 12.3166 18.3166 12.3166 18.7071 12.7071L21.2929 15.2929C21.6834 15.6834 21.6834 16.3166 21.2929 16.7071L20.6796 17.3204C18.5683 19.4317 15.2257 19.6693 12.837 17.8777L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L6.12226 11.163C4.33072 8.7743 4.56827 5.43173 6.67962 3.32038Z"
      fill="#828282"
    />
  </svg>
)

const EmailIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.87868 5.87868C3 6.75736 3 8.17157 3 11V13C3 15.8284 3 17.2426 3.87868 18.1213C4.75736 19 6.17157 19 9 19H15C17.8284 19 19.2426 19 20.1213 18.1213C21 17.2426 21 15.8284 21 13V11C21 8.17157 21 6.75736 20.1213 5.87868C19.2426 5 17.8284 5 15 5H9C6.17157 5 4.75736 5 3.87868 5.87868ZM6.5547 8.16795C6.09517 7.8616 5.4743 7.98577 5.16795 8.4453C4.8616 8.90483 4.98577 9.5257 5.4453 9.83205L10.8906 13.4622C11.5624 13.9101 12.4376 13.9101 13.1094 13.4622L18.5547 9.83205C19.0142 9.5257 19.1384 8.90483 18.8321 8.4453C18.5257 7.98577 17.9048 7.8616 17.4453 8.16795L12 11.7982L6.5547 8.16795Z"
      fill="#828282"
    />
  </svg>
)
