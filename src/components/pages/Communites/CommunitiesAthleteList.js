import React from "react"
import styled from "styled-components"
import Athlete from "../../ui/Ahtletes/Athlete"
import { useSelector } from "react-redux"
import { selectCountriesAndCities } from "../../../redux/components/countriesAndCities"
import { useTranslation } from "next-i18next"

function CommunitesAthletesList({ data }) {
  const [countries] = useSelector(selectCountriesAndCities)
  const { t: tCommon } = useTranslation("common")
  const { t: tCommunities } = useTranslation("communities")

  return (
    <CommunitesAthletesListItems>
      {!!data?.length &&
        data.map(({ id, user }) => (
          <Athlete
            key={`communities-${id}-${user?.id}`}
            userId={id}
            user={user}
          >
            <AthletesBottomInfo>
              <AthletesBottomItem>
                <AthletesBottomItemTextHeading>
                  {tCommunities("communities.country")}
                </AthletesBottomItemTextHeading>
                <AthletesBottomItemText>
                  {countries.find(({ id }) => id === user.country)?.name ||
                    tCommunities("communities.notSpecified")}
                </AthletesBottomItemText>
              </AthletesBottomItem>
              <AthletesBottomItem>
                <AthletesBottomItemTextHeading>
                  {tCommon("form.fieldsNames.gender.label")}
                </AthletesBottomItemTextHeading>
                <AthletesBottomItemText>
                  {user?.gender === "male"
                    ? tCommunities("communities.male")
                    : user?.gender === "female"
                    ? tCommunities("communities.female")
                    : tCommunities("communities.notSpecified")}
                </AthletesBottomItemText>
              </AthletesBottomItem>
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
