import React from "react"
import styled from "styled-components"

const TeamItem = ({ team: { team }, index }) => {
  return (
    <Item>
      <ItemLeft>
        <ItemNumber>{index}.</ItemNumber>
        <ItemText>
          <ItemTitle>{team.name}</ItemTitle>
          <ItemDescription>{team.country.name}</ItemDescription>
        </ItemText>
      </ItemLeft>
      <ItemRight>
        <Info>
          <InfoItem color={"#828282"}>
            <p>{team.teamMembersCount}</p>
            <div>Участника</div>
          </InfoItem>
          <InfoItem color={"#2E79DD"}>
            <p>0</p>
            <div>Балла</div>
          </InfoItem>
          <InfoItem color={"#27AE60"}>
            <p>0</p>
            <div>Побед</div>
          </InfoItem>
          <InfoItem color={"#EB5757"}>
            <p>0</p>
            <div>Поражений</div>
          </InfoItem>
        </Info>
        <Medal>
          <InfoItem color={"#FFC107"}>
            <p>0</p>
            <div>Золото</div>
          </InfoItem>
          <InfoItem color={"#E0E0E0"}>
            <p>0</p>
            <div>Серебро</div>
          </InfoItem>
          <InfoItem color={"#D7832D"}>
            <p>0</p>
            <div>Бронзо</div>
          </InfoItem>
        </Medal>
      </ItemRight>
    </Item>
  )
}
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #333333;
  padding-bottom: 32px;
`
const ItemLeft = styled.div`
  display: flex;
  align-items: center;
`
const ItemRight = styled.div`
  display: flex;
  align-items: center;
`
const ItemNumber = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #828282;
  margin-right: 30px;
`
const ItemText = styled.div`
  display: flex;
  flex-direction: column;
`
const ItemTitle = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  color: #f2f2f2;
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
`
const Info = styled.div`
  display: flex;
  padding: 0 24px;
  border-right: 1px solid #333333;
  border-left: 1px solid #333333;
`
const InfoItem = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(p) => p.color};
  margin-right: 32px;
  &:last-child {
    margin: 0;
  }
  p {
    margin-bottom: 4px;
  }
`
const Medal = styled.div`
  display: flex;
  padding-left: 24px;
`

export default TeamItem
