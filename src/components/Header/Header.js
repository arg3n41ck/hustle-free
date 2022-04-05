import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Autocomplete, Avatar, Box, Popover, TextField } from "@mui/material"
import Notifications from "./components/Notifications"
import { useDispatch, useSelector } from "react-redux"
import { change, changeAuthCheck } from "../../redux/components/navigations"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"
import Link from "next/link"
import { theme } from "../../styles/theme"
import $api from "../../services/axios"
import { useCookie } from "react-use"
import clearCookies from "../../helpers/clearCookies"

let notificationInterval

const getNotifications = async () => {
  try {
    const {
      data: { results: userNotification },
    } = await $api.get(`/notifications/?source=user`)
    const {
      data: { results: startupNotification },
    } = await $api.get(`/notifications/?source=startup`)
    return !!userNotification?.length && !!startupNotification?.length
      ? { userNotification, startupNotification }
      : null
  } catch (e) {}
}

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
  const { skills } = useSelector((state) => state.skills)
  const [notificationView, setNotificationView] = useState("user")
  const [userNotification, setUserNotifications] = useState([])
  const [startupNotification, setStartupNotifications] = useState([])
  const { avatar, firstName, lastName } = useSelector(
    (state) => state.user.user
  )
  const { authCheck } = useSelector((state) => state.profileMenu)

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

  const handleClose = (setState) => {
    setState(null)
  }

  const changeMenu = (value) => {
    router.push("/profile")
    dispatch(change(value))
    handleClose(setAnchorUserMenu)
  }

  const outHandler = async () => {
    clearCookies()
    dispatch(changeAuthCheck(false))

    await router.push("/login")
  }

  const createNotificationInterval = () => {
    if (token) {
      notificationInterval = setInterval(() => {
        getNotifications().then((res) => {
          if (res) {
            setUserNotifications(res.userNotification)
            setStartupNotifications(res.startupNotification)
          }
        })
      }, 60000)
    } else {
      clearInterval(notificationInterval)
    }
  }

  useEffect(() => {
    clearInterval(notificationInterval)
    createNotificationInterval()
  }, [])

  useEffect(() => {

  }, [])

  return (
    <Wrapper>
      <Left>
        <Box
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
        </Box>
        <Box sx={{ minWidth: 50 }}>
          <Link href={"/"} passHref>
            <a>
              <svg
                width="72"
                height="32"
                viewBox="0 0 72 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1113_12502)">
                  <path
                    d="M28.7233 1.93652L28.7263 10.4716H28.7233V17.6432C28.7108 25.575 22.2934 31.9993 14.3665 31.9993C6.43969 31.9993 0.0124121 25.573 0 17.6412H7.20365C7.20365 21.6012 10.4106 24.8113 14.3666 24.8113C18.3226 24.8113 21.5295 21.6012 21.5295 17.6412V9.14974H14.3326V1.93652H28.7233Z"
                    fill="#27AE60"
                  />
                  <path
                    d="M47.831 11.0424L47.1174 12.61C45.4451 11.2289 43.3147 10.4316 40.9295 10.4316C34.7374 10.4316 30.311 14.8999 30.311 21.1779C30.311 27.4777 34.7373 31.9996 40.9295 31.9996C43.2817 31.9996 45.3817 31.2249 47.0401 29.8802L47.7909 31.3139H52.102V11.0428L47.831 11.0424V11.0424ZM41.2065 26.7029C38.0923 26.7029 35.8034 24.3476 35.8034 21.1925C35.8034 18.0565 38.0736 15.7012 41.2065 15.7012C44.3205 15.7012 46.6096 18.0565 46.6096 21.1925C46.6096 24.3476 44.3205 26.7029 41.2065 26.7029Z"
                    fill="#27AE60"
                  />
                  <path
                    d="M64.3127 20.9099C64.7063 21.4631 64.9393 22.1382 64.9393 22.869C64.9393 24.7389 63.4252 26.2548 61.5568 26.2548C59.8327 26.2548 58.413 24.9626 58.2041 23.2936L53.5532 25.1083V31.3197H58.0228V29.8132C59.4319 31.1666 61.3435 31.9997 63.451 31.9997C67.785 31.9997 71.2983 28.4828 71.2983 24.1446C71.2983 22.1524 70.5561 20.3349 69.3351 18.9502L64.3127 20.91V20.9099Z"
                    fill="#27AE60"
                  />
                  <path
                    d="M60.3929 20.8068C60.1032 20.3314 59.9331 19.7748 59.9331 19.1771C59.9331 17.4446 61.336 16.0401 63.0669 16.0401C64.5883 16.0401 65.8553 17.1252 66.14 18.5642L70.849 16.7272V11.0432H66.3791V12.1832C65.0368 11.0596 63.3077 10.3833 61.4208 10.3833C57.148 10.3833 53.6838 13.8508 53.6838 18.1282C53.6838 19.8878 54.2711 21.5096 55.2587 22.8102L60.3929 20.8068V20.8068Z"
                    fill="#27AE60"
                  />
                  <path
                    d="M17.6228 22.5787C18.9104 23.1848 19.8928 23.4225 21.2946 23.0328C22.8339 22.6049 23.861 21.3462 24.0439 19.9343C24.2801 18.1099 23.3361 17.0973 22.9486 16.758C22.1713 16.0775 20.0996 15.9338 19.3821 17.1993C18.1837 19.3133 20.0734 20.6926 20.0734 20.6926C20.0734 20.6926 17.0173 20.3265 17.3253 17.2447C17.4679 15.8182 18.5674 14.7286 19.4782 14.4039C20.8205 13.9255 22.1498 13.9623 23.4379 14.6005C24.6164 15.1846 25.5778 16.1657 25.9071 17.4343C26.2461 18.7403 26.6759 21.6518 24.9274 27.3608C25.0325 27.247 25.1335 27.1296 25.2349 27.0125C25.2872 26.9518 25.341 26.8924 25.3922 26.8308C25.4521 26.7593 25.5094 26.6855 25.5679 26.6129C25.6598 26.4981 25.752 26.3835 25.8406 26.2659C25.8665 26.2315 25.8913 26.1963 25.9169 26.1617C27.6757 23.7791 28.7184 20.8339 28.7234 17.6436V10.4721H28.7265L28.7239 0C28.0087 0.548834 25.6785 3.35107 25.0567 5.55189C24.3217 8.95427 25.7946 11.7798 25.9212 12.0358C24.0372 11.1881 22.2615 10.6984 20.3709 10.8966C18.5569 11.0869 17.0805 11.879 15.9197 13.2803C14.8099 14.6198 14.3484 16.2933 14.5047 18.0647C14.7253 20.5659 16.5648 22.0804 17.6227 22.5785L17.6228 22.5787Z"
                    fill="#F2994A"
                  />
                  <path
                    d="M70.8581 9.14341H31.5134V1.99414H70.8581V9.14341Z"
                    fill="#F2994A"
                  />
                  <path
                    d="M38.5853 4.37493L39.4613 6.75252H40.3658L41.2418 4.37493H40.4263L39.9135 5.97537L39.4007 4.37493H38.5852H38.5853ZM42.2781 4.37493V6.75252H44.0799V6.15367H42.9974V5.85068H44.055V5.25189H42.9974V4.97385H44.0799V4.37499H42.2781V4.37493ZM46.0278 5.47639L46.9038 6.75252H47.5946V4.37493H46.8753V5.57264L46.0492 4.37493H45.3085V6.75252H46.0278V5.47639ZM49.3965 5.00229V6.75252H50.1159V5.00229H50.7497V4.37493H48.7591V5.00229H49.3965H49.3965ZM51.9142 4.37493V5.77579C51.9142 6.08597 52.0067 6.33545 52.1955 6.52083C52.3842 6.7062 52.6691 6.79889 53.0536 6.79889C53.4347 6.79889 53.7231 6.7062 53.9119 6.52083C54.1006 6.33551 54.1931 6.08597 54.1931 5.77579V4.37493H53.4631V5.75384C53.4631 5.8751 53.4275 5.97548 53.3598 6.05026C53.2922 6.12515 53.1889 6.16428 53.05 6.16428C52.9111 6.16428 52.8078 6.12869 52.7402 6.0538C52.6726 5.97896 52.6369 5.87853 52.6369 5.75378V4.37846L51.9141 4.37486L51.9142 4.37493ZM56.4689 5.98963L56.7962 6.75247H57.6153L57.1847 5.9112C57.2986 5.8577 57.398 5.76861 57.4873 5.6474C57.5726 5.52974 57.6153 5.38006 57.6153 5.19115C57.6153 5.03787 57.5833 4.89884 57.5159 4.77408C57.448 4.65291 57.352 4.55665 57.22 4.48178C57.092 4.4105 56.9388 4.37486 56.7608 4.37486H55.493V6.75247H56.2123V5.98963H56.4689ZM56.8141 5.03081C56.8602 5.07004 56.8815 5.11994 56.8815 5.18049C56.8815 5.2411 56.8568 5.29453 56.8108 5.33377C56.7642 5.373 56.7108 5.39079 56.6429 5.39079H56.205V4.97372H56.6429C56.7075 4.97372 56.7608 4.9915 56.8068 5.03074H56.8141V5.03081ZM58.8116 4.37493V6.75252H60.6137V6.15367H59.5313V5.85068H60.589V5.25189H59.5313V4.97385H60.6137V4.37499H58.8116V4.37493ZM62.0346 5.88274L61.6607 6.41742C61.942 6.6705 62.3086 6.7953 62.7645 6.7953C63.085 6.7953 63.3343 6.724 63.5162 6.57787C63.6975 6.43168 63.7868 6.22851 63.7868 5.96824C63.7868 5.80072 63.7368 5.66531 63.6369 5.56552C63.5375 5.46573 63.4196 5.39438 63.2843 5.35162C63.1457 5.30885 62.9924 5.27322 62.8111 5.2411C62.6791 5.21973 62.5865 5.19834 62.5365 5.17696C62.4871 5.15557 62.4619 5.12347 62.4619 5.07717C62.4619 4.99517 62.5332 4.9524 62.6791 4.9524C62.7751 4.9524 62.8857 4.97379 63.0104 5.01302C63.1316 5.05225 63.2417 5.10928 63.3416 5.18415L63.7261 4.67442C63.5942 4.56391 63.441 4.48191 63.2669 4.42489C63.0957 4.36786 62.9144 4.33936 62.7184 4.33936C62.5085 4.33936 62.3299 4.37499 62.1806 4.44627C62.0273 4.52114 61.9173 4.6138 61.8426 4.72785C61.7674 4.84549 61.7287 4.97379 61.7287 5.11281C61.7287 5.2946 61.7781 5.43715 61.8814 5.54053C61.9847 5.64392 62.0986 5.71522 62.2272 5.75794C62.3552 5.80072 62.5191 5.83996 62.7184 5.87561C62.8397 5.897 62.925 5.92198 62.975 5.95039C63.0244 5.97891 63.0497 6.01456 63.0497 6.06093C63.0497 6.1073 63.0244 6.13936 62.975 6.16428C62.9211 6.18921 62.861 6.20352 62.7858 6.20352C62.6331 6.20352 62.4905 6.17501 62.3586 6.11802C62.2272 6.06098 62.1132 5.98609 62.0167 5.89346L62.0346 5.88274Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1113_12502">
                    <rect width="71.2982" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </Link>
        </Box>
      </Left>
      <WrapperCenter>
        {authCheck && (
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
        )}
      </WrapperCenter>
      <Right>
        {authCheck && (
          <>
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
                  d="M8.59712 10.6259C9.01625 6.85376 12.2047 4 16 4V4C19.7953 4 22.9838 6.85376 23.4029 10.6259L23.7386 13.6475C23.8068 14.2616 23.841 14.5686 23.8978 14.8691C24.0354 15.5959 24.2731 16.3 24.6041 16.9614C24.741 17.2349 24.8999 17.4998 25.2178 18.0297L26.1826 19.6377C26.9884 20.9806 27.3912 21.6521 27.104 22.1594C26.8168 22.6667 26.0337 22.6667 24.4676 22.6667H7.53238C5.96627 22.6667 5.18322 22.6667 4.89599 22.1594C4.60876 21.6521 5.01164 20.9806 5.81739 19.6377L6.78221 18.0297C7.10009 17.4998 7.25904 17.2349 7.39591 16.9614C7.72691 16.3 7.96459 15.5959 8.10216 14.8691C8.15904 14.5686 8.19316 14.2616 8.26139 13.6475L8.59712 10.6259Z"
                  stroke="#828282"
                  strokeWidth="2"
                />
                <path
                  d="M12.1363 23.5529C12.3642 24.8287 12.8664 25.9561 13.565 26.7601C14.2635 27.5642 15.1195 28 16 28C16.8805 28 17.7365 27.5642 18.435 26.7601C19.1336 25.9561 19.6358 24.8287 19.8637 23.5529"
                  stroke="#828282"
                  strokeWidth="2"
                  strokeLinecap="round"
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
                <Box sx={{ p: 2 }}>
                  <UserMenuItem onClick={() => changeMenu("profile")}>
                    Мой профиль
                  </UserMenuItem>
                  {/*<UserMenuItemOfProfile onClick={() => changeMenu("vacancy")}>*/}
                  {/*  Мои вакансии*/}
                  {/*</UserMenuItemOfProfile>*/}
                  {/*<UserMenuItemOfProfile onClick={() => changeMenu("tasks")}>*/}
                  {/*  Мои задачи*/}
                  {/*</UserMenuItemOfProfile>*/}
                  <UserMenuItemOfProfile
                    onClick={() => changeMenu("favorites")}
                  >
                    Избранное
                  </UserMenuItemOfProfile>
                  <UserMenuItemOfProfile onClick={outHandler}>
                    Выйти
                  </UserMenuItemOfProfile>
                  <Line />
                  <UserMenuItem onClick={() => changeMenu("startups")}>
                    Стартапы
                  </UserMenuItem>
                  {/*<UserMenuItem onClick={() => changeMenu("settings")}>*/}
                  {/*  Настройки*/}
                  {/*</UserMenuItem>*/}
                </Box>
              </WrapperUserMenu>
            </Popover>
          </>
        )}
      </Right>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  grid-gap: 10px;
  align-items: center;
  padding: 16px 38px;
  border: 1px solid #d8d8d8;
  background: #fff;
  z-index: 1;
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
  max-width: 832px;
  margin-right: 134px;
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
const UserMenuItem = styled.p`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  cursor: pointer;
  padding: 10px 5px;
`
const UserMenuItemOfProfile = styled(UserMenuItem)`
  padding: 10px 15px;
  color: #828282;
`
const WrapperUserMenu = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  width: 256px;
`
const Line = styled.div`
  background: #d8d8d8;
  height: 1px;
  width: 100%;
  margin: 10px 0;
`

export default Header
