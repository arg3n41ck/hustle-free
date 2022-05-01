import React from "react"
import styled from "styled-components"

function StoryCollapse() {
  return (
    <ParticipantInfoSummary>
      <ParticipantInfoSummaryField>
        <ParticipantInfoSummaryFieldCol1>
          <ParticipantInfoSummaryFieldCol1Text color={"#27ae60"}>
            Выйграл
          </ParticipantInfoSummaryFieldCol1Text>
        </ParticipantInfoSummaryFieldCol1>
        <ParticipantInfoSummaryFieldCol2 background={"rgba(39, 174, 96, 0.15)"}>
          <ParticipantInfoSummaryFieldCol2Text color={"#F2F2F2"}>
            ARTUR ELZHANOV
          </ParticipantInfoSummaryFieldCol2Text>
          <ParticipantInfoSummaryFieldCol2Text2>
            Выиграл по очкам 9–2
          </ParticipantInfoSummaryFieldCol2Text2>
        </ParticipantInfoSummaryFieldCol2>
      </ParticipantInfoSummaryField>
      <Line />
      <ParticipantInfoSummaryField>
        <ParticipantInfoSummaryFieldCol1>
          <ParticipantInfoSummaryFieldCol1Text color={"#EB5757"}>
            Проиграл
          </ParticipantInfoSummaryFieldCol1Text>
        </ParticipantInfoSummaryFieldCol1>

        <ParticipantInfoSummaryFieldCol2 background={"rgba(235, 87, 87, 0.15)"}>
          <ParticipantInfoSummaryFieldCol2Text color={"#F2F2F2"}>
            ARTUR ELZHANOV
          </ParticipantInfoSummaryFieldCol2Text>
          <ParticipantInfoSummaryFieldCol2Text2>
            Выиграл по очкам 9–2
          </ParticipantInfoSummaryFieldCol2Text2>
        </ParticipantInfoSummaryFieldCol2>
      </ParticipantInfoSummaryField>
      <Line />
      <ParticipantInfoSummaryField>
        <ParticipantInfoSummaryFieldCol1>
          <ParticipantInfoSummaryFieldCol1Text color={"#9B5711"}>
            Итог
          </ParticipantInfoSummaryFieldCol1Text>
        </ParticipantInfoSummaryFieldCol1>
        <ParticipantInfoSummaryFieldCol2
          background={"rgba(255, 255, 255, 0.1)"}
        >
          <ParticipantInfoSummaryFieldCol2Text color={"#9B5711"}>
            Бронза
          </ParticipantInfoSummaryFieldCol2Text>
        </ParticipantInfoSummaryFieldCol2>
      </ParticipantInfoSummaryField>
    </ParticipantInfoSummary>
  )
}

export default StoryCollapse

const ParticipantInfoSummaryFieldCol1Text = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${({ color }) => color};
`

const ParticipantInfoSummary = styled.div`
  width: 100%;
  border: 1px solid #333333;
  border-radius: 8px;
  margin: 32px 0;
`

const ParticipantInfoSummaryField = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
`

const Line = styled.div`
  border: 1px solid #333333;
  width: 100%;
`

const ParticipantInfoSummaryFieldCol1 = styled.div`
  background: #1b1c22;
  max-width: 208px;
  width: 100%;
  padding: 16px;
`

const ParticipantInfoSummaryFieldCol2 = styled.div`
  background: ${({ background }) => background};
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  padding: 16px;
  grid-template-columns: 1fr 1fr;
`

const ParticipantInfoSummaryFieldCol2Text = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${({ color }) => color};
`

const ParticipantInfoSummaryFieldCol2Text2 = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
`
