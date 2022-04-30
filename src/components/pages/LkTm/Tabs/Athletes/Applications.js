import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Avatar } from "@mui/material"
import { Skeleton } from "@mui/lab"
import $api from "../../../../../services/axios"
import { useSelector } from "react-redux"
import CustomButton from "../../../../ui/CustomButton"
import { theme } from "../../../../../styles/theme"

const Applications = ({ applications, onAcceptOrReject }) => {
  return (
    <List>
      {applications.map((application) => (
        <ApplicationItem
          key={application.id}
          onAcceptOrReject={onAcceptOrReject}
          applicationItem={application}
        />
      ))}
    </List>
  )
}
const List = styled.ul`
  margin: 32px;
  display: grid;
  grid-template: 180px / repeat(3, 1fr);
  grid-gap: 16px;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  ${theme.mqMax("md")} {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default Applications

const ApplicationItem = ({ applicationItem, onAcceptOrReject }) => {
  const [athleteItem, setAthleteItem] = useState(null)
  const {
    countries: { data: countries },
  } = useSelector((state) => state.countries)
  const { id, athlete, team, status } = applicationItem

  useEffect(async () => {
    const { data } = await $api.get(`/athlete/athletes_list/${athlete}`)
    setAthleteItem(data.user)
  }, [])

  if (!athleteItem)
    return (
      <Skeleton
        sx={{ background: "#333" }}
        variant="rectangular"
        width={328}
        height={180}
      />
    )

  const { firstName, lastName, avatar, country } = athleteItem

  return (
    <Item>
      <Info>
        <Avatar
          alt={`${firstName} ${lastName}`}
          src={avatar}
          sx={{ width: "100%", height: "100%" }}
        />
        <div>
          <ItemTitle>{`${firstName} ${lastName}`}</ItemTitle>
          <ItemDescription>
            {country &&
              countries.find((countryItem) => countryItem.id === country).name}
          </ItemDescription>
        </div>
      </Info>

      <Line />
      <WrapperButtons>
        <WrapperButton onClick={() => onAcceptOrReject(id, "cancel")}>
          <CustomButton
            typeButton={"secondary"}
            height={"32px"}
            borderRadius={"4px"}
            style={{ fontSize: 14 }}
          >
            Отклонить
          </CustomButton>
        </WrapperButton>

        <WrapperButton onClick={() => onAcceptOrReject(id, "approved")}>
          <CustomButton
            style={{ fontSize: 14 }}
            height={"32px"}
            borderRadius={"4px"}
          >
            Подтвердить
          </CustomButton>
        </WrapperButton>
      </WrapperButtons>
    </Item>
  )
}
const Item = styled.li`
  background: #1b1c22;
  border: 1px solid #333333;
  border-radius: 16px;
  width: 100%;
  padding: 24px;
`
const Info = styled.div`
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
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #bdbdbd;
`
const Line = styled.div`
  height: 1px;
  width: 100%;
  background: #333333;
  margin: 24px 0;
`
const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
`
const WrapperButton = styled.div`
  max-width: 128px;
  width: 100%;
  &:first-child {
    margin-right: 5px;
  }
  &:last-child {
    margin-left: 5px;
  }
`
