import React from "react"
import Test from "../../../public/svg/logo.svg"

import styled from "styled-components"
import { Avatar } from "@mui/material"
import { Skeleton } from "@mui/lab"
import Link from "next/link"

const Notifications = ({
  view,
  setView,
  startupNotification,
  userNotification,
}) => {
  return (
    <Wrapper>
      <Header>
        <HeaderTitle
          active={view === "user"}
          onClick={() => {
            setView("user")
          }}
        >
          Пользователь{" "}
          <Count active={view === "user"}>
            <span>{userNotification?.length || 0}</span>
          </Count>
        </HeaderTitle>
        <Line />
        <HeaderTitle
          active={view === "startup"}
          onClick={() => {
            setView("startup")
          }}
        >
          Стартапы{" "}
          <Count active={view === "startup"}>
            <span>{startupNotification?.length || 0}</span>
          </Count>
        </HeaderTitle>
      </Header>
      <List>
        <NotificationsUser
          notifications={
            view === "user" ? userNotification : startupNotification
          }
        />
      </List>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 480px;
  width: 100%;
  max-height: 548px;
`
const Header = styled.div`
  display: flex;
  padding: 8px 0 16px 0;
`
const HeaderTitle = styled.h3`
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-weight: ${(p) => (p.active ? 400 : 700)};
  font-size: 14px;
  line-height: 20px;
  color: #${(p) => (p.active ? "27AE60" : "333333")};
`
const Line = styled.div`
  margin: 0 16px;
  height: 21px;
  width: 1px;
  background: #d8d8d8;
`
const Count = styled.span`
  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${(p) => (p.active ? "rgba(39, 174, 96, 0.1)" : "")};
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
`
const List = styled.ul`
  & li:last-child {
    border-bottom: none;
  }
`
const ListItem = styled.li`
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-gap: 12px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  padding: 16px 0;
  cursor: pointer;
`
const ItemTitle = styled.h4`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
`
const ItemContent = styled.p`
  font-family: Inter, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
`

export default Notifications

const NotificationsUser = ({ notifications }) => {
  return (
    <>
      {!!notifications?.length &&
        notifications.map((item) => (
          <Link
            passHref
            key={`user_all_notifications_${item?.typeNotification}__${item.id}`}
            href={`/redirect/?type=${item?.typeNotification}&startup=${item?.startup}`}
          >
            <ListItem>
              {item.avatar ? (
                <Avatar
                  sx={{ width: 64, height: 64, marginRight: 1.2 }}
                  alt={item.recipient.avatar || item.recipient.logo || null}
                  src={Test}
                />
              ) : (
                <Skeleton
                  variant="circular"
                  width={64}
                  height={64}
                  sx={{ marginRight: 1.2 }}
                />
              )}
              <div>
                <ItemTitle>{item.extraInfo}</ItemTitle>
                <ItemContent>{item.extraInfo}</ItemContent>
              </div>
            </ListItem>
          </Link>
        ))}
    </>
  )
}
