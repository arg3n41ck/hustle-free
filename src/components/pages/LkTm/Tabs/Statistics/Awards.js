import React, { useEffect, useState } from "react"
import { GoldMedalIcon } from "../../../../../assets/svg/icons"
import { SilverMedalIcon } from "../../../../../assets/svg/icons"
import { BronzeMedalIcon } from "../../../../../assets/svg/icons"
import styled from "styled-components"
import $api from "../../../../../services/axios"

const getAwards = async (teamId) => {
  const { data } = await $api.get(`/teams/teams/${teamId}/statistic/`)
  return data
}

function Awards({ teamId }) {
  const [awards, setAwards] = useState(null)

  useEffect(() => {
    teamId && getAwards(teamId).then(setAwards)
  }, [])

  return (
    <AwardsWrapper>
      <Award>
        <GoldMedalIcon />
        <AwardInfo>
          <AwardText color={"#FFC107"}>Золото:</AwardText>
          <AwardNumbers color={"#FFC107"}>
            {awards?.places?.gold || "-"}
          </AwardNumbers>
        </AwardInfo>
      </Award>
      <Award>
        <SilverMedalIcon />
        <AwardInfo>
          <AwardText color={"#E0E0E0"}>Серебро:</AwardText>
          <AwardNumbers color={"#E0E0E0"}>
            {awards?.places?.silver || "-"}
          </AwardNumbers>
        </AwardInfo>
      </Award>
      <Award>
        <BronzeMedalIcon />
        <AwardInfo>
          <AwardText color={"#D7832D"}>Бронза:</AwardText>
          <AwardNumbers color={"#D7832D"}>
            {awards?.places?.bronze || "-"}
          </AwardNumbers>
        </AwardInfo>
      </Award>
    </AwardsWrapper>
  )
}

export default Awards

const AwardsWrapper = styled.div`
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
