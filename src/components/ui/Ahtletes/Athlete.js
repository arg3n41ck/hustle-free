import React, { useMemo } from "react"
import { Avatar } from "@mui/material"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { selectCountriesAndCities } from "../../../redux/components/countriesAndCities"
import { useRouter } from "next/router"

function Athlete({ children, user }) {
  const [countries, cities] = useSelector(selectCountriesAndCities)
  const { push: routerPush } = useRouter()

  const { countryName, cityName } = useMemo(() => {
    const city = cities?.length
      ? cities.find(({ id }) => id === user?.city)
      : { name: "" }
    const country = countries?.length
      ? countries.find(({ id }) => id === user?.country)
      : { name: "" }
    return { countryName: country?.name || "", cityName: city?.name || "" }
  }, [user, children])

  return (
    <div>
      {user && (
        <ItemWrapper>
          <Item>
            <Avatar
              alt={`${user?.avatar || ""}`}
              src={user?.avatar || ""}
              sx={{ width: "100%", height: "100%" }}
            />
            <div>
              <ItemTitle onClick={() => routerPush(`/athlete/${user?.id}`)}>
                {user?.firstName || ""} {user?.lastName || ""}
              </ItemTitle>
              {countryName && cityName && (
                <ItemDescription>{`${countryName}, г. ${cityName}`}</ItemDescription>
              )}
            </div>
          </Item>
          {children}
        </ItemWrapper>
      )}
    </div>
  )
}

export default Athlete

const ItemWrapper = styled.div`
  background: #1b1c22;
  border: 1px solid #333333;
  border-radius: 16px;
  padding: 24px;
`

const Item = styled.li`
  width: 100%;
  display: grid;
  grid-template: 48px / 48px 1fr;
  grid-gap: 16px;
`
const ItemTitle = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #bdbdbd;
`
