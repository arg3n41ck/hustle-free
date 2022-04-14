import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  Autocomplete,
  Avatar,
  Box,
  Popover,
  TextField,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material"
import Notifications from "./components/Notifications"
import { useDispatch, useSelector } from "react-redux"
import {
  changeAuthCheck,
  changeOgTabValue,
  changeTmTabValue,
} from "../../redux/components/navigations"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"
import Link from "next/link"
import { theme } from "../../styles/theme"
import $api from "../../services/axios"
import { useCookie } from "react-use"
import clearCookies from "../../helpers/clearCookies"
import LogoIcon from "../../public/svg/logo.svg"
import { lkOgTabs } from "../pages/LkOg/Tabs/tabConstants"
import { lkTmTabs } from "../pages/LkTm/Tabs/tabConstants"
import { lkAhTabs } from "../pages/LkAh/Tabs/tabConstants"

let notificationInterval

// const getNotifications = async () => {
//   try {
//     const {
//       data: { results: userNotification },
//     } = await $api.get(`/notifications/?source=user`)
//     const {
//       data: { results: startupNotification },
//     } = await $api.get(`/notifications/?source=startup`)
//     return !!userNotification?.length && !!startupNotification?.length
//       ? { userNotification, startupNotification }
//       : null
//   } catch (e) {}
// }

const Header = ({ onMenu }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [anchorUserMenu, setAnchorUserMenu] = useState(null)
  const [openUserMenu, setUserMenu] = useState(false)
  const [token] = useCookie("token")
  const idUserMenu = !!anchorUserMenu ? "simple-popover" : undefined
  const [anchorNotifications, setAnchorNotifications] = useState(null)
  const idNotifications = !!anchorNotifications ? "simple-popover" : undefined
  const [cookies] = useCookies(["token", "refresh"])
  const [notificationView, setNotificationView] = useState("user")
  const [userNotification, setUserNotifications] = useState([])
  const [startupNotification, setStartupNotifications] = useState([])
  const { avatar, firstName, lastName, role } = useSelector(
    (state) => state.user.user
  )
  const [localization, setLocalization] = React.useState("ru")
  const { authCheck } = useSelector((state) => state.navigations)
  const activeTabs =
    (role === "organizer" && lkOgTabs) ||
    (role === "team" && lkTmTabs) ||
    (role === "athlete" && lkAhTabs)
  useEffect(() => {
    // setAuthCheck(!!cookies.token)
    dispatch(changeAuthCheck(!!cookies.token))
  }, [cookies.token])

  useEffect(() => {
    setUserMenu(false)
  }, [authCheck])

  const handleClick = (event, setState) => {
    setState(event.currentTarget)
  }

  const handleChange = (event) => {
    setLocalization(event.target.value)
  }

  const handleClose = (setState) => {
    setState(null)
  }

  const changeMenu = (value) => {
    if (role === "organizer") {
      router.push("/lk-og/profile")
      dispatch(changeOgTabValue(value))
    } else if (role === "athlete") {
      router.push("/lk-ah/profile")
      // dispatch(changeTmTabValue(value))
    } else if (role === "team") {
      router.push("/lk-tm/profile")
      dispatch(changeTmTabValue(value))
    }

    if (value === "exit") {
      outHandler()
    }

    handleClose(setAnchorUserMenu)
  }

  const outHandler = async () => {
    clearCookies()
    dispatch(changeAuthCheck(false))

    await router.push("/login")
  }

  // const createNotificationInterval = () => {
  //   if (token) {
  //     notificationInterval = setInterval(() => {
  //       getNotifications().then((res) => {
  //         if (res) {
  //           setUserNotifications(res.userNotification)
  //           setStartupNotifications(res.startupNotification)
  //         }
  //       })
  //     }, 60000)
  //   } else {
  //     clearInterval(notificationInterval)
  //   }
  // }

  // useEffect(() => {
  //   clearInterval(notificationInterval)
  //   createNotificationInterval()
  // }, [])

  useEffect(() => {}, [])

  return (
    <Wrapper>
      <WrapperItems>
        <Left>
          {/* <Box
          onClick={onMenu}
          sx={{ marginRight: 2.2, cursor: "pointer", minWidth: 32 }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9.3335H26"
              stroke="#27AE60"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 16H26"
              stroke="#27AE60"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 22.667H26"
              stroke="#27AE60"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Box> */}
          <Box sx={{ minWidth: 50 }}>
            <Link href={"/"} passHref>
              <a>
                <LogoIcon />
              </a>
            </Link>
          </Box>
        </Left>
        <WrapperCenter>
          {/* {authCheck && (
            <Autocomplete
              sx={{
                "& .MuiSvgIcon-root": {
                  width: 0,
                },
              }}
              noOptionsText={"Ничего не найдено"}
              fullWidth
              // onChange={(e, value) => searchHandler(e, value)}
              options={skills.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="7"
                          stroke="#828282"
                          strokeWidth="2"
                        />
                        <path
                          d="M20 20L17 17"
                          stroke="#828282"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                  }}
                />
              )}
            />
          )} */}
          <NavbarTextList>
            <NavbarText>Турниры</NavbarText>
            <NavbarText>Подробнее</NavbarText>
            <NavbarText>Сообщество</NavbarText>
          </NavbarTextList>
        </WrapperCenter>
        <Right>
          {authCheck && (
            <>
              <Localization>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <LocalizationSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={localization}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"ru"}>RU</MenuItem>
                  <MenuItem value={"en"}>EN</MenuItem>
                  <MenuItem value={"kz"}>KZ</MenuItem>
                </LocalizationSelect>
              </Localization>
              <Notification>
                <svg
                  onClick={(e) => handleClick(e, setAnchorNotifications)}
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.66993 9.30021C9.04652 5.53439 12.2154 2.66663 16 2.66663V2.66663C19.7846 2.66663 22.9534 5.5344 23.33 9.30021L23.7121 13.1217C23.8011 14.0111 23.8455 14.4558 23.9375 14.8873C24.0865 15.5872 24.3288 16.2639 24.6579 16.8994C24.8608 17.2912 25.1087 17.6631 25.6045 18.4067L27.2604 20.8906C28.1729 22.2593 28.6291 22.9437 28.3465 23.4718C28.0638 24 27.2413 24 25.5963 24H6.40366C4.75863 24 3.93612 24 3.65347 23.4718C3.37082 22.9437 3.82706 22.2593 4.73956 20.8906L6.39544 18.4067C6.89123 17.6631 7.13913 17.2912 7.34201 16.8994C7.67107 16.2639 7.91339 15.5872 8.06246 14.8873C8.15438 14.4558 8.19885 14.0111 8.28778 13.1217L8.66993 9.30021Z"
                    fill="#828282"
                  />
                  <path
                    d="M13.4242 27.5059C13.5761 27.6476 13.9109 27.7729 14.3766 27.8622C14.8423 27.9516 15.4129 28 16 28C16.587 28 17.1576 27.9516 17.6233 27.8622C18.089 27.7729 18.4238 27.6476 18.5758 27.5059"
                    stroke="#828282"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>

                <Popover
                  id={idNotifications}
                  open={!!anchorNotifications}
                  anchorEl={anchorNotifications}
                  onClose={() => handleClose(setAnchorNotifications)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      maxWidth: 480,
                      width: "100%",
                      borderRadius: "12px",
                    },
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Notifications
                      setView={setNotificationView}
                      view={notificationView}
                      userNotification={userNotification}
                      startupNotification={startupNotification}
                    />
                  </Box>
                </Popover>
              </Notification>
              <UserMenu
                onClick={(e) => {
                  setUserMenu(true)
                  handleClick(e, setAnchorUserMenu)
                }}
                aria-describedby={idUserMenu}
              >
                <Avatar
                  src={avatar}
                  sx={{ marginRight: 1.2, objectFit: "cover" }}
                  alt={`${firstName} ${lastName}`}
                />
                <UserInfo>
                  <UserName>
                    {firstName} {lastName}
                  </UserName>
                  <UserRole>{role}</UserRole>
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
                  handleClose(setAnchorUserMenu)
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <WrapperUserMenu>
                  <Box sx={{ padding: "32px" }}>
                    {!!activeTabs &&
                      activeTabs.map((tab) => (
                        <UserMenuItem onClick={() => changeMenu(tab.value)}>
                          <UserMenuItemContent>
                            <IconWrapper>{tab.icon}</IconWrapper>
                            <p>{tab.name}</p>
                          </UserMenuItemContent>
                        </UserMenuItem>
                      ))}
                  </Box>
                </WrapperUserMenu>
              </Popover>
            </>
          )}
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

const Localization = styled(FormControl)`
  min-width: 72px;
`

const LocalizationSelect = styled(Select)`
  border: 1px solid #333333;
  border-radius: 8px;
  color: #828282;
  height: 44px;
`

const UserInfo = styled.div`
  max-width: 180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 15px;
`

const UserName = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  // line-height: 24px;
  color: #f2f2f2;
`

const UserRole = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  // line-height: 20px;
  color: #828282;
`

const NavbarTextList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const NavbarText = styled.div`
  font-family: "Inter";
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
  // margin-right: 134px;
  ${theme.mqMax("xl")} {
    margin: 0 10px;
  }
`

const Right = styled.div`
  display: flex;
`
const Notification = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 26px;
  img {
    min-width: 32px;
    min-height: 32px;
  }
`
const UserMenu = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border: none;
`
const IconWrapper = styled.div`
  margin-right: 28px;
  height: 100%;
  svg * {
    fill: #828282;
    stroke: #828282;
  }
`
const UserMenuItem = styled.p`
  margin: 12px 0;
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
`

export default Header
