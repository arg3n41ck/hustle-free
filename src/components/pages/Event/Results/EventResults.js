import React, { useState } from "react"
import styled from "styled-components"
import HorizontalTabsBorder from "../../../ui/tabs/HorizontalTabsBorder"
import GoldMedal from "../../../../public/svg/gold-medal.svg"
import SilverMedal from "../../../../public/svg/silver-medal.svg"
import BronzeMedal from "../../../../public/svg/bronze-medal.svg"
import Teams from "./Teams"
import useDebounce from "../../../../hooks/useDebounce"
import Participants from "./Participants"

const tabs = [
  {
    name: "Участники",
    value: "participants",
  },
  {
    name: "Команды",
    value: "teams",
  },
]

const EventResults = () => {
  const [view, setView] = useState("participants") // participants | teams

  return (
    <>
      <MedalsTitle>Всего боев: 152</MedalsTitle>
      <Medals>
        <Medal>
          <GoldMedal />
          <MedalInfo>
            <MedalText color={"#FFC107"}>Золото:</MedalText>
            <MedalText color={"#FFC107"}>-</MedalText>
          </MedalInfo>
        </Medal>
        <Medal>
          <SilverMedal />
          <MedalInfo>
            <MedalText color={"#E0E0E0"}>Бронза:</MedalText>
            <MedalText color={"#E0E0E0"}>-</MedalText>
          </MedalInfo>
        </Medal>
        <Medal>
          <BronzeMedal />
          <MedalInfo>
            <MedalText color={"#D7832D"}>Серебро:</MedalText>
            <MedalText color={"#D7832D"}>-</MedalText>
          </MedalInfo>
        </Medal>
      </Medals>
      <HorizontalTabsBorder
        arrayTab={tabs}
        valueTab={view}
        onChangeHandler={setView}
        height={"96px"}
      >
        {view === "participants" ? <Participants /> : <Teams />}
      </HorizontalTabsBorder>
    </>
  )
}

const Medals = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 48px;
`
const MedalsTitle = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  margin-bottom: 32px;
`
const Medal = styled.div`
  display: flex;
  padding: 0 16px;
  &:nth-child(2) {
    border-left: 1px solid #333333;
    border-right: 1px solid #333333;
  }
`
const MedalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 32px;
`
const MedalText = styled.p`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  color: ${(p) => p.color};
`

export default EventResults
