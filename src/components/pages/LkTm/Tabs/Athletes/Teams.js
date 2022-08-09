import React, { useEffect } from "react"
import styled from "styled-components"
import Athlete from "../../../../ui/Ahtletes/Athlete"
import { useDispatch } from "react-redux"
import { fetchCountries } from "../../../../../redux/components/countriesAndCities"

const Athletes = ({ teams }) => {
  if (!teams) return null
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])
console.log({athletes: teams});
  return (
    <List>
      {teams.map((teamItem) => (
        <Athlete
          key={`${teamItem?.id}-${teamItem?.athlete?.id}`}
          user={teamItem?.athlete?.user || null}
          athleteId={teamItem?.athlete?.id}
        />
      ))}
    </List>
  )
}
const List = styled.ul`
  margin: 32px;
  display: grid;
  grid-template: 100px / repeat(3, 1fr);
  grid-gap: 16px;
`
export default Athletes
