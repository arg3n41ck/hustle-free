import React, { useState } from "react"
import DropdownData from "../../../ui/DropdownData"
import styled from "styled-components"
import GoldIcon from "../../../../public/svg/second-gold-medal.svg"
import SilverIcon from "../../../../public/svg/silver-medal.svg"
import BronzeIcon from "../../../../public/svg/bronze-medal.svg"

const EventResultsItem = () => {
  const [open, setOpen] = useState(false)
  return (
    <EventResultsItemLi>
      <DropdownData
        active={open}
        setActive={setOpen}
        heightWrapper={"100px"}
        title={`Сеньор мужчины / Белый / 25-35 лет / 60 кг - 75 кг`}
      >
        <EventResultsItemLi>
          <Left>
            <GoldIcon />
            <Title>Azamat Askarov</Title>
          </Left>
          <Right>
            <InfoItem>
              <InfoItemTitle>Команда</InfoItemTitle>
              <InfoItemDescription>Checkmat Kazakhstan</InfoItemDescription>
            </InfoItem>
            <InfoItem>
              <InfoItemTitle>Страна</InfoItemTitle>
              <InfoItemDescription>Kazakhstan</InfoItemDescription>
            </InfoItem>
          </Right>
        </EventResultsItemLi>
      </DropdownData>
    </EventResultsItemLi>
  )
}

const EventResultsItemLi = styled.li`
  display: flex;
  justify-content: space-between;
`
const Left = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #f2f2f2;
  margin-left: 24px;
`
const Right = styled.div`
  display: flex;
  align-items: center;
`
const InfoItem = styled.div`
  border-left: 1px solid #333333;
  padding: 0 32px;
`
const InfoItemTitle = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
`
const InfoItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`
export default EventResultsItem
