import React from "react"
import styled from "styled-components"
import { Avatar } from "@mui/material"

const TeamMembers = ({ teamMembers, onViewToggle, onTabs }) => {
  return (
    <WrapperBlock>
      <HeaderInfo>
        <HeaderText>
          <h2>Сотрудники</h2>
          <CountMembers>{teamMembers?.length || 0}</CountMembers>
        </HeaderText>
        <AddButton
          onClick={() => {
            onViewToggle()
            onTabs("staff")
          }}
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 6L12.5 18"
              stroke="#27AE60"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18.5 12L6.5 12"
              stroke="#27AE60"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Добавить
        </AddButton>
      </HeaderInfo>
      <ScrollerBody>
        {!!teamMembers?.length &&
          teamMembers.map(
            ({ id, user: { firstName, lastName, avatar, skills } }) => (
              <Member key={id}>
                <StuffAvaWrapper>
                  <Avatar alt={firstName} src={avatar} />
                </StuffAvaWrapper>
                <h2>
                  {firstName} {lastName}
                </h2>
                {!!skills?.length && <p>{skills[skills.length - 1].title}</p>}
              </Member>
            )
          )}
      </ScrollerBody>
    </WrapperBlock>
  )
}
const WrapperBlock = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 32px;
  margin: 32px 0;
  text-align: center;
`

const StuffAvaWrapper = styled.div`
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  border: 2px solid #e5e5e5;
  margin: 0 0 8px 0;
`

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 40px 0;
`
const HeaderText = styled.div`
  display: flex;
  align-items: center;
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: #333333;
    margin-right: 10px;
  }
`
const AddButton = styled.button`
  background-color: rgba(111, 207, 151, 0.1);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #27ae60;
  svg {
    margin-right: 9px;
  }
  &:hover {
    background: #27ae60;
    color: #fff;
    transition: 0.4s;
    svg * {
      stroke: #fff;
      transition: 0.4s;
    } 
`
const ScrollerBody = styled.div`
  max-width: 832px;
  overflow-x: scroll;
  min-height: 155px;
  margin: 5px 0;
  display: flex;
`
const Member = styled.div`
  min-width: 180px;
  max-width: 180px;
  margin-right: 10px;
  display: grid;
  grid-template-rows: 1fr 24px 24px;
  div {
    min-width: 128px;
    min-height: 128px;
    border-radius: 50%;
  }
  h2 {
    text-align: center;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #333333;
    white-space: nowrap;
  }
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #828282;
    margin-top: 4px;
  }
`
const CountMembers = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #bdbdbd;
`

export default TeamMembers
