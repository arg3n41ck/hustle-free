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
  const [localization, setLocalization] = React.useState("ru")
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

  const handleChange = (event) => {
    setLocalization(event.target.value)
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
                <svg
                  width="230"
                  height="38"
                  viewBox="0 0 230 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.64098 35.1038L4.603 31.586C2.34651 30.0104 1.21826 29.2226 0.609132 28.0655C0 26.9084 0 25.553 0 22.8422V15.9929C0 15.1296 0 14.4038 0.0196709 13.7781L13.2819 23.0386V37.5C12.3016 36.9616 11.1577 36.1629 9.64098 35.1038Z"
                    fill="#4081E1"
                  />
                  <path
                    d="M18.7779 37.5C19.7583 36.9616 20.9021 36.1629 22.4189 35.1038L27.4568 31.586C29.7133 30.0104 30.8416 29.2226 31.4507 28.0655C32.0598 26.9084 32.0598 25.553 32.0598 22.8422V15.9929C32.0598 15.1296 32.0598 14.4038 32.0402 13.7781L18.7779 23.0386V37.5Z"
                    fill="#4081E1"
                  />
                  <path
                    d="M29.6624 8.83599L16.0299 18.3549L2.39746 8.83599C2.97806 8.38372 3.70024 7.87946 4.603 7.2491L9.64098 3.7313C12.7261 1.5771 14.2687 0.5 16.0299 0.5C17.7912 0.5 19.3337 1.5771 22.4189 3.73129L27.4568 7.24909C28.3596 7.87946 29.0818 8.38372 29.6624 8.83599Z"
                    fill="#4081E1"
                  />
                  <path
                    d="M95.9301 13.5909C96.3751 13.9621 96.6241 14.4792 96.6773 15.142H101.977C101.97 13.8097 101.638 12.6463 100.981 11.652C100.33 10.651 99.4035 9.87547 98.2014 9.32528C96.9994 8.77509 95.5748 8.5 93.9278 8.5C92.314 8.5 90.8828 8.77178 89.6343 9.31534C88.3924 9.8589 87.4195 10.6179 86.7155 11.5923C86.0182 12.5601 85.6728 13.6903 85.6795 14.983C85.6728 16.5739 86.1875 17.83 87.2235 18.7514C88.2662 19.6662 89.6907 20.3191 91.4971 20.7102L93.5294 21.1477C94.2864 21.3134 94.8875 21.4924 95.3324 21.6847C95.7774 21.8703 96.0962 22.0824 96.2888 22.321C96.488 22.553 96.5909 22.8248 96.5976 23.1364C96.5909 23.4678 96.4847 23.7628 96.2788 24.0213C96.0729 24.2798 95.7707 24.482 95.3723 24.6278C94.9738 24.7737 94.479 24.8466 93.888 24.8466C93.184 24.8466 92.5763 24.7372 92.065 24.5185C91.5602 24.2997 91.1684 23.9782 90.8895 23.554C90.6105 23.1297 90.4545 22.6061 90.4213 21.983H85.1615C85.1681 23.6866 85.5334 25.0852 86.2572 26.179C86.9878 27.2661 88.0105 28.0715 89.3255 28.5952C90.6471 29.1188 92.1945 29.3807 93.9677 29.3807C95.6944 29.3807 97.172 29.1387 98.4007 28.6548C99.6359 28.1709 100.586 27.465 101.25 26.5369C101.914 25.6089 102.249 24.4754 102.256 23.1364C102.249 22.3608 102.123 21.6449 101.877 20.9886C101.638 20.3324 101.263 19.7424 100.752 19.2188C100.24 18.6884 99.5828 18.2277 98.7792 17.8366C97.9756 17.4455 97.0093 17.1307 95.8803 16.892L94.2067 16.5341C93.7219 16.4347 93.3035 16.322 92.9516 16.196C92.5996 16.0701 92.3107 15.9309 92.0849 15.7784C91.8591 15.6193 91.6931 15.4437 91.5868 15.2514C91.4872 15.0526 91.444 14.8305 91.4573 14.5852C91.4639 14.2869 91.5536 14.0218 91.7263 13.7898C91.8989 13.5578 92.1646 13.3755 92.5232 13.2429C92.8885 13.1037 93.3567 13.0341 93.9278 13.0341C94.8244 13.0341 95.4918 13.2197 95.9301 13.5909Z"
                    fill="url(#paint0_linear_1447_4472)"
                  />
                  <path
                    d="M44.3954 8.77841V29.142H49.9341V21.1875H57.266V29.142H62.8047V8.77841H57.266V16.733H49.9341V8.77841H44.3954Z"
                    fill="url(#paint1_linear_1447_4472)"
                  />
                  <path
                    d="M197.846 8.77856V29.1422H212.51V24.6877H203.385V21.1877H211.792V16.7331H203.385V13.2331H212.549V8.77856H197.846Z"
                    fill="url(#paint2_linear_1447_4472)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M179.034 29.1456V8.78198H187.841C189.355 8.78198 190.68 9.05708 191.815 9.60727C192.951 10.1575 193.834 10.9496 194.465 11.9837C195.096 13.0178 195.412 14.2574 195.412 15.7024C195.412 17.1608 195.086 18.3904 194.435 19.3914C193.834 20.3256 193.004 21.0463 191.946 21.5532L196.089 29.1456H190.072L186.49 22.424H184.573V29.1456H179.034ZM184.573 13.1968V18.1286H186.526C187.176 18.1286 187.731 18.049 188.189 17.8899C188.654 17.7242 189.009 17.4624 189.255 17.1044C189.508 16.7465 189.634 16.2791 189.634 15.7024C189.634 15.1191 189.508 14.6451 189.255 14.2806C189.009 13.9094 188.654 13.6376 188.189 13.4652C187.731 13.2862 187.176 13.1968 186.526 13.1968H184.573Z"
                    fill="url(#paint3_linear_1447_4472)"
                  />
                  <path
                    d="M215.296 29.1422V8.77856H230V13.2331H220.835V16.7331H229.243V21.1877H220.835V24.6877H229.96V29.1422H215.296Z"
                    fill="url(#paint4_linear_1447_4472)"
                  />
                  <path
                    d="M77.5083 8.77841H83.0471V21.8239C83.0471 23.375 82.6752 24.7173 81.9314 25.8509C81.1942 26.9777 80.1648 27.8494 78.8432 28.4659C77.5216 29.0758 75.9875 29.3807 74.2409 29.3807C72.4809 29.3807 70.9402 29.0758 69.6186 28.4659C68.297 27.8494 67.2676 26.9777 66.5304 25.8509C65.7999 24.7173 65.4346 23.375 65.4346 21.8239V8.77841H70.9734V21.3466C70.9734 21.9763 71.1129 22.5398 71.3918 23.0369C71.6707 23.5275 72.0559 23.9119 72.5474 24.1903C73.0454 24.4688 73.6099 24.608 74.2409 24.608C74.8784 24.608 75.4429 24.4688 75.9344 24.1903C76.4258 23.9119 76.811 23.5275 77.0899 23.0369C77.3689 22.5398 77.5083 21.9763 77.5083 21.3466V8.77841Z"
                    fill="url(#paint5_linear_1447_4472)"
                  />
                  <path
                    d="M103.805 13.233V8.77841H121.537V13.233H115.4V29.142H109.941V13.233H103.805Z"
                    fill="url(#paint6_linear_1447_4472)"
                  />
                  <path
                    d="M123.621 8.77841V29.142H137.408V24.6875H129.16V8.77841H123.621Z"
                    fill="url(#paint7_linear_1447_4472)"
                  />
                  <path
                    d="M139.647 29.142V8.77841H154.351V13.233H145.186V16.733H153.594V21.1875H145.186V24.6875H154.311V29.142H139.647Z"
                    fill="url(#paint8_linear_1447_4472)"
                  />
                  <path
                    d="M162.686 8.77841V29.142H168.225V21.1875H176.155V16.733H168.225V13.233H177.031V8.77841H162.686Z"
                    fill="url(#paint9_linear_1447_4472)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1447_4472"
                      x1="0"
                      y1="19"
                      x2="230"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3F82E1" />
                      <stop offset="1" stop-color="#7A3FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1447_4472"
                      x1="0"
                      y1="19"
                      x2="230"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3F82E1" />
                      <stop offset="1" stop-color="#7A3FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1447_4472"
                      x1="0"
                      y1="19"
                      x2="230"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3F82E1" />
                      <stop offset="1" stop-color="#7A3FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_1447_4472"
                      x1="0"
                      y1="19"
                      x2="230"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3F82E1" />
                      <stop offset="1" stop-color="#7A3FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_1447_4472"
                      x1="0"
                      y1="19"
                      x2="230"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3F82E1" />
                      <stop offset="1" stop-color="#7A3FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint5_linear_1447_4472"
                      x1="0"
                      y1="19"
                      x2="230"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3F82E1" />
                      <stop offset="1" stop-color="#7A3FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint6_linear_1447_4472"
                      x1="0"
                      y1="19"
                      x2="230"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3F82E1" />
                      <stop offset="1" stop-color="#7A3FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint7_linear_1447_4472"
                      x1="0"
                      y1="19"
                      x2="230"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3F82E1" />
                      <stop offset="1" stop-color="#7A3FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint8_linear_1447_4472"
                      x1="0"
                      y1="19"
                      x2="230"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3F82E1" />
                      <stop offset="1" stop-color="#7A3FED" />
                    </linearGradient>
                    <linearGradient
                      id="paint9_linear_1447_4472"
                      x1="0"
                      y1="19"
                      x2="230"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3F82E1" />
                      <stop offset="1" stop-color="#7A3FED" />
                    </linearGradient>
                  </defs>
                </svg>
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
                  <UserName>Argen Alimbaev</UserName>
                  <UserRole>Боец</UserRole>
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
  z-index: 1;
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
