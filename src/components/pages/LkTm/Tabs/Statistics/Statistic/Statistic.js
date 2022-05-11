import React from "react"
import HeaderWithBack from "../../../../../ui/LKui/HeaderWithBack"
import Row from "./Row"
import styled from "styled-components"

function Statistic({ statistic, isPublic = false, teamId }) {
  const { eventparticipantscategorySet, name } = statistic
  return (
    <div>
      <HeaderWithBack
        link={
          teamId && isPublic
            ? `/team/${teamId}/statistics/`
            : "/lk-tm/profile/statistics"
        }
        title={name}
      />
      <Title>Категории</Title>
      <Rows>
        {!!eventparticipantscategorySet?.length ? (
          eventparticipantscategorySet.map((ePC, index) => (
            <>
              {!!ePC?.participantsCategory?.length &&
                ePC?.participantsCategory.map(({ level, participants }, i) => (
                  <Row
                    key={`EPC-${ePC.id}-${index}-${i}`}
                    ePC={{ ...ePC, level }}
                    participants={participants}
                  />
                ))}
            </>
          ))
        ) : (
          <Empty>Нет категорий</Empty>
        )}
      </Rows>
    </div>
  )
}

export default Statistic

const Rows = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
`

const Title = styled.h1`
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #bdbdbd;
  padding: 32px 32px 0;
  border-top: 1px solid #333;
`

const Empty = styled.p``
