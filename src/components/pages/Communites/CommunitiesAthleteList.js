import React from "react"
import Teams from "../../pages/LkAh/Tabs/Profile/Teams/Teams"
import styled from "styled-components"
import Athlete from "../../ui/Ahtletes/Athlete"
import { useSelector } from "react-redux"
import { selectCountriesAndCities } from "../../../redux/components/countriesAndCities"

function CommunitesAthletesList({ data }) {
  const [countries] = useSelector(selectCountriesAndCities)

  return (
    <CommunitesAthletesListItems>
      {!!data?.length &&
        data.map(({ user }) => (
          <Athlete user={user}>
            <AthletesBottomInfo>
              <AthletesBottomItem>
                <AthletesBottomItemTextHeading>
                  Страна
                </AthletesBottomItemTextHeading>
                <AthletesBottomItemText>
                  {countries.find(({ id }) => id === user.country)?.name}
                </AthletesBottomItemText>
              </AthletesBottomItem>
              {!!user?.phoneNumber && (
                <AthletesBottomItem>
                  <AthletesBottomItemTextHeading>
                    Телефон
                  </AthletesBottomItemTextHeading>
                  <AthletesBottomItemText>
                    {user?.phoneNumber}
                    {/* {user?.gender === "male" && "Мужчина"}
                    {user?.gender === "female" && "Женщина"} */}
                  </AthletesBottomItemText>
                </AthletesBottomItem>
              )}
            </AthletesBottomInfo>
          </Athlete>
        ))}
    </CommunitesAthletesListItems>
  )
}

export default CommunitesAthletesList

const AthletesBottomInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 28px;
`

const AthletesBottomItem = styled.div`
  display: flex;
  flex-direction: column;
`

const AthletesBottomItemTextHeading = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #828282;
`

const AthletesBottomItemText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #f2f2f2;
`

const CommunitesAthletesListItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 32px;
`
