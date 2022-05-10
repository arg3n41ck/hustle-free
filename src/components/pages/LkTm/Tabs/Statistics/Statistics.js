import React from "react"
import HeaderContent, { TitleHeader } from "../../../../ui/LKui/HeaderContent"
import styled from "styled-components"
import GoldMedal from "../../../../../assets/svg/gold-medal.svg"
import SilverMedal from "../../../../../assets/svg/silver-medal.svg"
import BronzeMedal from "../../../../../assets/svg/bronze-medal.svg"

const Statistics = ({ onToggleSidebar }) => {
  return (
    <>
      <HeaderContent onToggle={onToggleSidebar}>
        <TitleHeader>Статистика</TitleHeader>
      </HeaderContent>
      <Awards>
        <Award>
          <GoldMedal />
          <AwardInfo>
            <AwardText color={"#FFC107"}>Золото:</AwardText>
            <AwardNumbers color={"#FFC107"}>36</AwardNumbers>
          </AwardInfo>
        </Award>
        <Award>
          <SilverMedal />
          <AwardInfo>
            <AwardText color={"#E0E0E0"}>Золото:</AwardText>
            <AwardNumbers color={"#E0E0E0"}>36</AwardNumbers>
          </AwardInfo>
        </Award>
        <Award>
          <BronzeMedal />
          <AwardInfo>
            <AwardText color={"#D7832D"}>Золото:</AwardText>
            <AwardNumbers color={"#D7832D"}>36</AwardNumbers>
          </AwardInfo>
        </Award>
      </Awards>
    </>
  )
}

const Awards = styled.div`
  padding: 32px;
  border-top: 1px solid #333333;
  border-bottom: 1px solid #333333;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  //margin-bottom: 48px;
`
const Award = styled.div`
  display: flex;
  padding: 0 16px;
  &:nth-child(2) {
    border-left: 1px solid #333333;
    border-right: 1px solid #333333;
  }
`
const AwardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 32px;
`
const AwardText = styled.p`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  color: ${(p) => p.color};
`
const AwardNumbers = styled(AwardText)`
  font-size: 48px;
  line-height: 56px;
`

export default Statistics
