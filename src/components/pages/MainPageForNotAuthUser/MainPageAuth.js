import React, { useEffect } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import { localStorageSetItem } from "../../../helpers/helpers"
import { useDispatch } from "react-redux"
import { exitUser } from "../../../redux/components/user"
import { useTranslation } from "next-i18next"

function MainPageAuth() {
  const router = useRouter()
  const { t: tMainPageFotNotAuthUser } = useTranslation(
    "mainPageForNotAuthUser"
  )
  const dispatch = useDispatch()
  const handleClick = (role) => {
    localStorageSetItem("role", role)
    router.push("/registration")
  }

  const array = [
    {
      id: 1,
      value: "organizer",
      heading: tMainPageFotNotAuthUser("mainPage.auth.forOrganizers"),
      description: tMainPageFotNotAuthUser("mainPage.auth.forOrganizersDesc"),
    },
    {
      id: 2,
      value: "athlete",
      heading: tMainPageFotNotAuthUser("mainPage.auth.forAthletes"),
      description: tMainPageFotNotAuthUser("mainPage.auth.forAthletesDesc"),
    },
    {
      id: 3,
      value: "team",
      heading: tMainPageFotNotAuthUser("mainPage.auth.forTeams"),
      description: tMainPageFotNotAuthUser("mainPage.auth.fotTeamsDesc"),
    },
  ]

  useEffect(() => {
    dispatch(exitUser())
  }, [])

  return (
    <ContainerCards>
      {array.map((item) => (
        <Card key={item.id}>
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M112.889 95.1119C112.889 96.2906 112.421 97.4211 111.587 98.2546C110.754 99.0881 109.623 99.5564 108.445 99.5564H55.1111C53.9324 99.5564 52.8019 99.0881 51.9684 98.2546C51.1349 97.4211 50.6667 96.2906 50.6667 95.1119C50.6667 88.0395 53.4762 81.2567 58.4772 76.2557C63.4782 71.2548 70.2609 68.4453 77.3334 68.4453H86.2223C93.2947 68.4453 100.077 71.2548 105.078 76.2557C110.079 81.2567 112.889 88.0395 112.889 95.1119ZM81.7778 28.4453C78.2617 28.4453 74.8246 29.488 71.901 31.4414C68.9775 33.3948 66.6988 36.1714 65.3533 39.4198C64.0077 42.6683 63.6557 46.2428 64.3416 49.6913C65.0276 53.1399 66.7208 56.3076 69.207 58.7938C71.6933 61.2801 74.861 62.9733 78.3096 63.6592C81.7581 64.3452 85.3326 63.9931 88.5811 62.6476C91.8296 61.302 94.6061 59.0234 96.5595 56.0999C98.513 53.1763 99.5556 49.7392 99.5556 46.2231C99.5556 41.5081 97.6826 36.9863 94.3486 33.6523C91.0146 30.3183 86.4928 28.4453 81.7778 28.4453ZM41.7778 28.4453C38.2617 28.4453 34.8245 29.488 31.901 31.4414C28.9774 33.3948 26.6988 36.1714 25.3533 39.4198C24.0077 42.6683 23.6556 46.2428 24.3416 49.6913C25.0276 53.1399 26.7207 56.3076 29.207 58.7938C31.6933 61.2801 34.861 62.9733 38.3095 63.6592C41.7581 64.3452 45.3326 63.9931 48.5811 62.6476C51.8295 61.302 54.606 59.0234 56.5595 56.0999C58.5129 53.1763 59.5556 49.7392 59.5556 46.2231C59.5556 41.5081 57.6826 36.9863 54.3486 33.6523C51.0146 30.3183 46.4928 28.4453 41.7778 28.4453ZM41.7778 95.1119C41.7712 90.4435 42.6909 85.8202 44.4838 81.5098C46.2766 77.1994 48.9069 73.2875 52.2223 70.0008C49.5091 68.9765 46.6335 68.4495 43.7334 68.4453H39.8222C33.2721 68.457 26.9935 71.0643 22.3618 75.696C17.7301 80.3276 15.1229 86.6062 15.1111 93.1564V95.1119C15.1111 96.2906 15.5794 97.4211 16.4129 98.2546C17.2464 99.0881 18.3768 99.5564 19.5556 99.5564H42.5778C42.0604 98.1311 41.7898 96.6281 41.7778 95.1119Z"
              fill="#6D4EEA"
            />
          </svg>
          <div>
            <CardTextHeading>{item.heading}</CardTextHeading>
            <CardTextDesc>{item.description}</CardTextDesc>
          </div>
          <CardButton onClick={() => handleClick(item.value)}>
            {tMainPageFotNotAuthUser("mainPage.auth.signUp")}
          </CardButton>
        </Card>
      ))}
    </ContainerCards>
  )
}

const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
`

const Card = styled.div`
  background: #1b1c22;
  padding: 32px;
  height: auto;
  max-width: 448px;
  border-radius: 16px;
  width: 100%;
  display: grid;
  grid-template: 128px auto 48px / 1fr;
  grid-row-gap: 24px;
  justify-items: center;
`

const CardTextHeading = styled.h3`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  text-align: center;
  text-transform: uppercase;
`

const CardTextDesc = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-size: 21px;
  line-height: 32px;
  color: #f2f2f2;
  text-align: center;
  text-transform: lowercase;
`

const CardButton = styled.button`
  background: rgba(109, 78, 234, 0.07);
  border-radius: 8px;
  width: 100%;
  padding: 0 24px;
  color: #6d4eea;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 48px;
`

export default MainPageAuth
