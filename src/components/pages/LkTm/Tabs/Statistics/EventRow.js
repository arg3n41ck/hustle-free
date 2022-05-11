import React from "react"
import DropdownData from "../../../../ui/DropdownData"
import styled from "styled-components"
import { useRouter } from "next/router"

function EventRow({ eventResults, isPublic, teamId }) {
  const { push: routerPush } = useRouter()
  const info = (
    <Info>
      <InfoItem color={"#828282"}>
        <p>542</p>
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
      <InfoItem color={"#FFC107"}>
        <p>{eventResults?.placesCount?.gold || 0}</p>
        <div>Золото</div>
      </InfoItem>
      <InfoItem color={"#E0E0E0"}>
        <p>{eventResults?.placesCount?.silver || 0}</p>
        <div>Серебро</div>
      </InfoItem>
      <InfoItem color={"#D7832D"}>
        <p>{eventResults?.placesCount?.bronze || 0}</p>
        <div>Бронзо</div>
      </InfoItem>
    </Info>
  )

  return (
    <DropdownData
      heightWrapper={"212px"}
      title={eventResults?.eventName || ""}
      additionalData={info}
      onClickRedirect={async () =>
        await routerPush(
          isPublic && teamId
            ? `/team/${teamId}/statistics/${eventResults.id}/`
            : `/lk-tm/profile/statistics/${eventResults.id}/`
        )
      }
    />
  )
}

export default EventRow

const Info = styled.div`
  display: grid;
  grid-template: 1fr / repeat(7, 1fr);
  padding: 32px 0;
  margin: 0 32px;

  border-top: 1px solid #333;
`

const InfoItem = styled.div`
  justify-self: center;
  align-self: center;
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
    margin: 0;
  }
`
