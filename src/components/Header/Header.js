import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Avatar, Box, Popover } from "@mui/material"
import Notifications from "./components/Notifications/Notifications"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import Link from "next/link"
import { theme } from "../../styles/theme"
import clearCookies from "../../helpers/clearCookies"
import LogoIcon from "../../public/svg/logo.svg"
import { lkOgTabs } from "../pages/LkOg/Tabs/tabConstants"
import { lkTmTabs } from "../pages/LkTm/Tabs/tabConstants"
import { lkAhTabs } from "../pages/LkAh/Tabs/tabConstants"
import { exitUser, selectIsUserAuth } from "../../redux/components/user"
import HeaderLocalizationPopover from "./components/HeaderLocalizationPopover"
import { getRoleInRu } from "../../helpers/helpers"

const Header = () => {
  const { push: routerPush } = useRouter()
  const [anchorUserMenu, setAnchorUserMenu] = useState(null)
  const [openUserMenu, setUserMenu] = useState(false)
  const idUserMenu = "userRouteModal"
  const user = useSelector((state) => state.user.user)
  const [userAuthenticated] = useSelector(selectIsUserAuth)
  const dispatch = useDispatch()
  const activeTabs = userAuthenticated
    ? (user.role === "organizer" && lkOgTabs) ||
      (user.role === "team" && lkTmTabs) ||
      (user.role === "athlete" && lkAhTabs)
    : null

  useEffect(() => {
    setUserMenu(false)
  }, [userAuthenticated])

  const changeMenu = (value) => {
    setAnchorUserMenu(null)
    if (value === "exit") {
      outHandler()
      return
    }
    routerPush(value)
  }

  const outHandler = async () => {
    await clearCookies()
    dispatch(exitUser())
    await routerPush("/")
  }

  return (
    <Wrapper>
      <WrapperItems>
        <Left>
          <Box sx={{ minWidth: 50 }}>
            <Link href={"/"} passHref>
              <a>
                <LogoIcon />
              </a>
            </Link>
          </Box>
        </Left>
        <WrapperCenter>
          <NavbarTextList>
            <Link href={"/events"}>
              <a>
                <NavbarText>Турниры</NavbarText>
              </a>
            </Link>
            <Link href={"/about"}>
              <a>
                <NavbarText>Подробнее</NavbarText>
              </a>
            </Link>
            <Link href={"/communities"}>
              <a>
                <NavbarText>Сообщество</NavbarText>
              </a>
            </Link>
          </NavbarTextList>
        </WrapperCenter>
        <Right>
          {userAuthenticated && <Notifications />}
          <HeaderLocalizationPopover />
          {userAuthenticated ? (
            <UserMenu
              onClick={(e) => {
                setUserMenu(true)
                setAnchorUserMenu(e.currentTarget)
              }}
              aria-describedby={idUserMenu}
            >
              <Avatar
                src={user.avatar}
                sx={{ marginRight: 1.2, objectFit: "cover" }}
                alt="userAva"
              />
              <UserInfo>
                <UserName>
                  {user?.role !== "team"
                    ? `${user.firstName} ${user.lastName}`
                    : user.fullNameCoach}
                </UserName>
                <UserRole>{getRoleInRu(user.role)}</UserRole>
              </UserInfo>
              <svg
                width="18"
                height="11"
                viewBox="0 0 18 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 9L9.70711 9.70711L9 10.4142L8.29289 9.70711L9 9ZM17.7071 1.70711L9.70711 9.70711L8.29289 8.29289L16.2929 0.292892L17.7071 1.70711ZM8.29289 9.70711L0.292892 1.70711L1.70711 0.292893L9.70711 8.29289L8.29289 9.70711Z"
                  fill="#828282"
                />
              </svg>
            </UserMenu>
          ) : (
            <LoginButton onClick={() => routerPush("/login")}>
              ВОЙТИ
            </LoginButton>
          )}
          <Popover
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "0 0 18px 18px",
                background: "none",
              },
            }}
            id={idUserMenu}
            open={!!anchorUserMenu && openUserMenu}
            anchorEl={anchorUserMenu}
            onClose={() => {
              setUserMenu(false)
              setAnchorUserMenu(null)
            }}
            anchorOrigin={{
              vertical: 62,
              horizontal: "left",
            }}
          >
            <WrapperUserMenu>
              {!!activeTabs &&
                activeTabs.map((tab) => (
                  <UserMenuItem
                    key={`headerActiveTabs_${tab.href}`}
                    onClick={() => changeMenu(tab.href)}
                  >
                    <UserMenuItemContent>
                      <IconWrapper>{tab.icon}</IconWrapper>
                      <p>{tab.name}</p>
                    </UserMenuItemContent>
                  </UserMenuItem>
                ))}
            </WrapperUserMenu>
          </Popover>
        </Right>
      </WrapperItems>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  border: 1px solid #333333;
  background: rgba(25, 26, 31, 0.9);
  z-index: 11;
`

const WrapperItems = styled.div`
  max-width: 1408px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  grid-gap: 10px;
  align-items: center;
  padding: 16px 38px;
`

const UserInfo = styled.div`
  max-width: 180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 15px;
  grid-row-gap: 2px;
`

const UserName = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #f2f2f2;
`

const UserRole = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #828282;
`

const NavbarTextList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const NavbarText = styled.div`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #828282;
  cursor: pointer;
`

const Left = styled.div`
  display: flex;
  align-items: center;
  ${theme.mqMax("lg")} {
    margin-right: 10px;
  }
`
const WrapperCenter = styled.div`
  width: 100%;
  max-width: 690px;
  ${theme.mqMax("xl")} {
    margin: 0 10px;
  }
`

const Right = styled.div`
  display: flex;
  grid-column-gap: 32px;
`

const UserMenu = styled.button`
  width: max-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border: none;
  margin-right: 10px;
`
const IconWrapper = styled.div`
  margin-right: 28px;
  height: 100%;
  svg * {
    fill: #828282;
    stroke: #828282;
  }
`
const UserMenuItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #bdbdbd;

  background: inherit;
  border-radius: 16px;
  width: 264px;
  height: 72px;
  transition: 0.3s;
  &:hover {
    color: #fff;
    background: #0f0f10;
    ${IconWrapper} {
      svg * {
        transition: 0.3s;
        fill: #fff;
        stroke: #fff;
      }
    }
  }
`
const UserMenuItemContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  div {
    display: flex;
    align-items: center;
  }
`
const WrapperUserMenu = styled.div`
  background: #1b1c22;
  width: 312px;
  border-radius: 0 0 16px 16px;
  border: 1.5px solid #333333;
  padding: 24px;
  display: flex;
  flex-direction: column;
  grid-row-gap: 24px;
`

const LoginButton = styled.button`
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  text-align: right;
  color: #f2f2f2;
`

export default Header
