import React from "react"
import styled from "styled-components"
import HeaderContent, { TitleHeader } from "../HeaderContent"
import EditsIcon from "../../../../../public/svg/edits-icon.svg"
import { Avatar } from "@mui/material"
import { useSelector } from "react-redux"
import CompanyIcon from "../../../../../public/svg/company-icon.svg"
import LocationIcon from "../../../../../public/svg/place-icon.svg"
import CalendarIcon from "../../../../../public/svg/calendar-profile.svg"
import GenderIcon from "../../../../../public/svg/gender.svg"
import EmailIcon from "../../../../../public/svg/email-profile.svg"
import PhoneIcon from "../../../../../public/svg/phone-icon.svg"
import { theme } from "../../../../../styles/theme"
import phoneFormatter from "../../../../../helpers/phoneFormatter"
import { format, parseISO } from "date-fns"
import { ru } from "date-fns/locale"

const Info = ({ onToggleSidebar }) => {
  const { user } = useSelector((state) => state.user)

  return (
    <>
      <HeaderWrapper>
        <HeaderContent onToggle={onToggleSidebar}>
          <TitleHeader>Профиль</TitleHeader>
        </HeaderContent>
      </HeaderWrapper>
      <Content>
        <Center>
          <Avatar
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user.avatar}
            sx={{ width: 112, height: 112 }}
          />
          <CenterRight>
            <FullName>
              {user?.firstName} {user?.lastName}
            </FullName>
            <Button>
              <IconWrapper>
                <EditsIcon />
              </IconWrapper>
              Редактировать
            </Button>
          </CenterRight>
        </Center>
        <List>
          <Item>
            <WrapperIcon>
              <CompanyIcon />
            </WrapperIcon>
            Название организации
          </Item>
          <Item>{user?.nameOrganization}</Item>
          <Item>
            <WrapperIcon>
              <CalendarIcon />
            </WrapperIcon>
            День рождения:
          </Item>
          <Item>
            {!!user?.dateBirthday &&
              format(parseISO(user?.dateBirthday), "dd MMMM yyyy г.", {
                locale: ru,
              })}
          </Item>
          <Item>
            <WrapperIcon>
              <GenderIcon />
            </WrapperIcon>
            Пол
          </Item>
          <Item>{user?.gender}</Item>
          <Item>
            <WrapperIcon>
              <LocationIcon />
            </WrapperIcon>
            Страна, город
          </Item>
          <Item>
            {user.country}, г. {user.city}
          </Item>
          <Item>
            <WrapperIcon>
              <PhoneIcon />
            </WrapperIcon>
            Контакты
          </Item>
          <Item>{phoneFormatter(user.phoneNumber)}</Item>
          <Item>
            <WrapperIcon>
              <EmailIcon />
            </WrapperIcon>
            E-mail
          </Item>
          <Item>{user.email}</Item>
        </List>
      </Content>
    </>
  )
}

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
`
const Content = styled.div`
  margin: 32px 32px 0 32px;
`
const Center = styled.div`
  display: flex;
`
const CenterRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 35px;
  width: 100%;
`
const FullName = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 40px;
  color: #f2f2f2;
`
const Button = styled.button`
  border: 1px solid #333333;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-content: center;
  justify-content: center;
  max-width: 202px;
  width: 100%;
  background: inherit;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 40px;
  color: #bdbdbd;
`
const IconWrapper = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-top: 3px;
`
const List = styled.ul`
  margin-top: 32px;
  display: grid;
  grid-template: repeat(6, 96px) / 1fr 1fr;
  ${theme.mqMax("md")} {
    grid-template: repeat(11, 66px) / 1fr;
  }
`
const Item = styled.li`
  border-top: 1px solid #333333;
  display: flex;
  align-items: center;
  &:nth-child(odd) {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
    color: #828282;
  }
  &:nth-child(even) {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #bdbdbd;
  }
  ${theme.mqMax("md")} {
    &:last-child {
      border-top: 0 solid #333333;
    }
  }
`
const WrapperIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 11px;
`

export default Info
