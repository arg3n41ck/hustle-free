import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Avatar } from "@mui/material"
import { Skeleton } from "@mui/lab"
import $api from "../../../../../services/axios"
import { useDispatch, useSelector } from "react-redux"
import CustomButton from "../../../../ui/CustomButton"
import { theme } from "../../../../../styles/theme"
import Athlete from "../../../../ui/Ahtletes/Athlete"
import { fetchCountries } from "../../../../../redux/components/countriesAndCities"

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
  const dispatch = useDispatch()
  const { id, athlete } = applicationItem

  useEffect(async () => {
    const { data } = await $api.get(`/athlete/athletes_list/${athlete}`)
    setAthleteItem(data.user)
    dispatch(fetchCountries())
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

  return (
    <Athlete user={athleteItem}>
      <Line />
      <WrapperButtons>
        <CustomButton
          typeButton={"secondary"}
          height={"32px"}
          borderRadius={"4px"}
          onClick={() => onAcceptOrReject(id, "cancel")}
          style={{ fontSize: 14 }}
        >
          Отклонить
        </CustomButton>

        <CustomButton
          style={{ fontSize: 14 }}
          height={"32px"}
          borderRadius={"4px"}
          onClick={() => onAcceptOrReject(id, "approved")}
        >
          Подтвердить
        </CustomButton>
      </WrapperButtons>
    </Athlete>
  )
}

const Line = styled.div`
  height: 1px;
  width: 100%;
  background: #333333;
  margin: 24px 0;
`
const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  
  grid-column-gap: 24px;
`
