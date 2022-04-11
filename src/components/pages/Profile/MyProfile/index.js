import React from "react"
import Image from "next/image"
import styled from "styled-components"
import Link from "next/link"
import format from "date-fns/format"
import { ru } from "date-fns/locale"

import Career from "./Career"
import Education from "./Education"
import Skills from "./Skills"
import Certificates from "./Certificates"
import { useSelector } from "react-redux"
import { theme } from "../../../../styles/theme"
import { Box } from "@mui/material"
import phoneFormatter from "../../../../helpers/phoneFormatter"

const Index = () => {
  const userData = useSelector((state) => state.user.user)

  return (
    <>
      <Wrapper>
        <UserInfo>
          <UserInfoHeader>
            <UserInfoTitle>Общие сведения</UserInfoTitle>
            <Link href={"profile/change-data"} passHref>
              <UserInfoChange>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.2038 10.7962L18.9998 9.00019C19.545 8.45494 19.8176 8.18231 19.9634 7.88822C20.2407 7.32866 20.2407 6.67171 19.9634 6.11215C19.8176 5.81806 19.545 5.54544 18.9998 5.00019C18.4545 4.45494 18.1819 4.18231 17.8878 4.03658C17.3282 3.75929 16.6713 3.75929 16.1117 4.03658C15.8176 4.18231 15.545 4.45494 14.9998 5.00019L13.1811 6.81884C14.145 8.46944 15.5311 9.845 17.2038 10.7962ZM11.7267 8.2733L4.85615 15.1438C4.43109 15.5689 4.21856 15.7814 4.07883 16.0425C3.93909 16.3036 3.88015 16.5983 3.76226 17.1878L3.14686 20.2648C3.08034 20.5974 3.04708 20.7637 3.14168 20.8583C3.23629 20.9529 3.4026 20.9196 3.73521 20.8531L6.81219 20.2377C7.40164 20.1198 7.69637 20.0609 7.95746 19.9211C8.21856 19.7814 8.43109 19.5689 8.85615 19.1438L15.7456 12.2544C14.1239 11.2388 12.7522 9.87646 11.7267 8.2733Z"
                    fill="#828282"
                  />
                </svg>
                <p>Редактировать</p>
              </UserInfoChange>
            </Link>
          </UserInfoHeader>
          <UserInfoBody>
            <UserInfoBodyImg>
              {userData.avatar ? (
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    overflow: "hidden",
                  }}
                  style={{ borderRadius: 8 }}
                >
                  <Image
                    src={userData.avatar}
                    width={200}
                    height={200}
                    objectFit={"cover"}
                    alt={"avatar"}
                    placeholder={"blurDataURL"}
                  />
                </Box>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <rect width="200" height="200" rx="8" fill="#DFDFDF" />
                  <path
                    d="M130.695 80.1898C130.731 80.47 130.765 80.7513 130.797 81.0332C130.844 81.446 130.886 81.8609 130.923 82.2776C132.303 81.0917 133.755 80.5839 135.003 81.0169C137.705 81.9544 138.425 86.9456 136.611 92.1654C135.011 96.7719 131.973 100.017 129.424 100.071C126.935 109.367 121.883 117.116 115.36 121.908V127.15C116.564 126.741 117.651 126.117 118.499 125.15C118.923 127.311 119.267 129.484 119.533 131.668C137.294 134.533 152.435 141.211 162.353 150.136C147.686 168.341 125.208 180 100 180C74.7924 180 52.3151 168.341 37.6475 150.136C47.5654 141.211 62.707 134.533 80.4681 131.668C80.7335 129.485 81.0778 127.311 81.5022 125.15C82.3465 126.114 83.4292 126.737 84.6284 127.145V121.899C78.1112 117.107 73.0639 109.361 70.5767 100.071C68.0323 100.023 64.9913 96.7779 63.3868 92.1742C61.5704 86.9622 62.2996 81.9725 64.9933 81.0338C66.2435 80.6002 67.6967 81.1077 69.0764 82.293C69.0933 82.1021 69.1112 81.9116 69.1303 81.7213C66.5699 76.4237 64.6132 70.8864 64.7589 65.0642C64.9688 56.6783 71.3574 47.8227 79.7478 48.1191C80.2468 48.136 80.7473 48.1851 81.2482 48.2343H81.2527C82.2141 48.328 83.1769 48.4218 84.1344 48.2922C86.3649 47.9789 88.1507 46.5071 89.9231 45.0468L89.9312 45.0404C90.4636 44.6017 90.9945 44.1639 91.5362 43.7592C96.8497 39.8195 104.239 38.8931 110.368 41.3756C112.44 42.2214 114.337 43.4122 116.237 44.6044C117.805 45.588 119.374 46.5728 121.044 47.3659C127.915 50.6263 136.392 50.2928 142.978 46.4766C141.606 49.0577 139.283 51.1205 136.552 52.1825C139.073 52.9855 141.853 52.9113 144.325 51.9726C142.842 54.665 140.371 56.814 137.504 57.9134L143.892 58.3578C142.076 60.9269 139.481 62.9399 136.528 64.064C136.978 64.0773 137.429 64.0914 137.88 64.1062L139.067 64.1457H139.071C139.891 64.1729 140.712 64.2 141.532 64.2244C140.284 67.9049 137.059 70.8569 133.278 71.7585C134.353 71.7708 135.428 71.7832 136.503 71.8079C134.742 74.3522 132.978 76.8965 131.214 79.4405L130.695 80.1898Z"
                    fill="white"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="76"
                    stroke="#DFDFDF"
                    strokeWidth="8"
                  />
                </svg>
              )}
            </UserInfoBodyImg>
            <UserInfoBodyInfo>
              <UserInfoBodyInfoHeader>
                <UserInfoBodyInfoName>
                  {`${userData.lastName} ${userData.firstName}`}
                </UserInfoBodyInfoName>
                <UserInfoBodyInfoSocialNetworks>
                  <Box sx={{ pointerEvents: userData.facebook ? "" : "none" }}>
                    <a href={userData.facebook} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12.0001 0C5.37268 0 0 5.39514 0 12.0502C0 18.0191 4.32626 22.9623 9.9987 23.9195V14.5642H7.10393V11.1977H9.9987V8.71529C9.9987 5.83501 11.7506 4.26543 14.3096 4.26543C15.5353 4.26543 16.5886 4.35714 16.8944 4.39753V7.40819L15.1194 7.40905C13.728 7.40905 13.4598 8.07288 13.4598 9.04735V11.1959H16.7798L16.3468 14.5625H13.4598V24C19.397 23.2744 24 18.2052 24 12.0468C24 5.39514 18.6273 0 12.0001 0Z"
                          fill={`${userData.facebook ? "#2F80ED" : "#BDBDBD"}`}
                        />
                      </svg>
                    </a>
                  </Box>
                  <Box sx={{ pointerEvents: userData.linkedin ? "" : "none" }}>
                    <a href={userData.linkedin} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 0C5.3736 0 0 5.3736 0 12C0 18.6264 5.3736 24 12 24C18.6264 24 24 18.6264 24 12C24 5.3736 18.6264 0 12 0ZM8.51294 18.1406H5.59039V9.34808H8.51294V18.1406ZM7.05176 8.14746H7.03271C6.052 8.14746 5.41772 7.47235 5.41772 6.6286C5.41772 5.76581 6.07141 5.10938 7.07117 5.10938C8.07092 5.10938 8.68616 5.76581 8.7052 6.6286C8.7052 7.47235 8.07092 8.14746 7.05176 8.14746ZM19.051 18.1406H16.1288V13.4368C16.1288 12.2547 15.7057 11.4485 14.6483 11.4485C13.8409 11.4485 13.3601 11.9923 13.1488 12.5173C13.0715 12.7051 13.0527 12.9677 13.0527 13.2305V18.1406H10.1303C10.1303 18.1406 10.1686 10.173 10.1303 9.34808H13.0527V10.593C13.441 9.9939 14.1359 9.14172 15.6865 9.14172C17.6093 9.14172 19.051 10.3984 19.051 13.099V18.1406Z"
                          fill={`${userData.linkedin ? "#2F80ED" : "#BDBDBD"}`}
                        />
                      </svg>
                    </a>
                  </Box>
                  <Box sx={{ pointerEvents: userData.vk ? "" : "none" }}>
                    <a href={userData.vk} target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 0C5.37281 0 0 5.37256 0 12C0 18.6274 5.37281 24 12 24C18.6272 24 24 18.6274 24 12C24 5.37256 18.6272 0 12 0ZM18.087 13.2978C18.6463 13.8441 19.2381 14.3583 19.7402 14.961C19.9626 15.2277 20.1723 15.5034 20.3319 15.8135C20.5597 16.2557 20.354 16.7406 19.9582 16.7669L17.4997 16.7664C16.8648 16.8189 16.3595 16.5628 15.9335 16.1287C15.5935 15.7828 15.278 15.4133 14.9505 15.0556C14.8167 14.9087 14.6757 14.7705 14.5078 14.6617C14.1726 14.4437 13.8815 14.5105 13.6895 14.8606C13.4938 15.2169 13.4491 15.6117 13.4304 16.0082C13.4037 16.5879 13.2288 16.7394 12.6472 16.7666C11.4044 16.8248 10.2251 16.6362 9.12908 16.0097C8.16221 15.457 7.41385 14.677 6.76174 13.7938C5.49189 12.0722 4.51937 10.1826 3.64554 8.23881C3.44888 7.80104 3.59276 7.56681 4.0757 7.55773C4.87808 7.54226 5.68045 7.54423 6.48282 7.55699C6.80937 7.56215 7.02543 7.74899 7.1509 8.05713C7.58449 9.12393 8.11605 10.1389 8.78216 11.0803C8.95967 11.3309 9.14087 11.5809 9.39892 11.7579C9.68372 11.9534 9.90077 11.8888 10.0351 11.5708C10.121 11.3688 10.1581 11.1527 10.1767 10.9361C10.2406 10.1944 10.2482 9.45293 10.1377 8.71415C10.069 8.25183 9.80894 7.95327 9.34809 7.86586C9.11337 7.82142 9.14774 7.73451 9.26191 7.60045C9.46005 7.36868 9.64567 7.22529 10.0167 7.22529L12.7943 7.2248C13.232 7.31073 13.3303 7.50715 13.3897 7.94811L13.3921 11.0348C13.387 11.2055 13.4778 11.7113 13.7842 11.823C14.0297 11.904 14.1918 11.7071 14.3386 11.5517C15.0047 10.8448 15.4793 10.0105 15.9043 9.14701C16.0919 8.7662 16.2537 8.37213 16.4108 7.97733C16.5277 7.6854 16.7094 7.54177 17.0389 7.54668L19.7136 7.54987C19.7924 7.54987 19.8725 7.55061 19.9506 7.56411C20.4014 7.64121 20.5248 7.83517 20.3854 8.27491C20.1659 8.96581 19.7394 9.54132 19.3225 10.1183C18.8757 10.736 18.3991 11.3322 17.9567 11.9526C17.5501 12.5198 17.5822 12.8053 18.087 13.2978Z"
                          fill={`${userData.vk ? "#2F80ED" : "#BDBDBD"}`}
                        />
                      </svg>
                    </a>
                  </Box>
                </UserInfoBodyInfoSocialNetworks>
              </UserInfoBodyInfoHeader>
              <UserInfoBodyInfoPosition>
                {userData.careers[0]?.position}
              </UserInfoBodyInfoPosition>

              <UserInfoBodyInfoBirthdayWrapper>
                <UserInfoBodyInfoBirthday>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="3"
                      y="6"
                      width="18"
                      height="15"
                      rx="2"
                      stroke="#828282"
                      strokeWidth="2"
                    />
                    <path
                      d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z"
                      fill="#828282"
                    />
                    <path
                      d="M7 3L7 6"
                      stroke="#828282"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17 3L17 6"
                      stroke="#828282"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <UserInfoBodyInfoBirthdayTitle>
                    День рождения:
                  </UserInfoBodyInfoBirthdayTitle>
                </UserInfoBodyInfoBirthday>
                <UserInfoBodyInfoBirthdayContent>
                  {userData.birthDate &&
                    format(new Date(userData.birthDate), "d MMMM yyyy г.", {
                      locale: ru,
                    })}
                </UserInfoBodyInfoBirthdayContent>
              </UserInfoBodyInfoBirthdayWrapper>

              {!!userData.phoneNumber && (
                <UserInfoBodyInfoContactsWrapper>
                  <UserInfoBodyInfoContacts>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M2.67962 1.32038L3.29289 0.707107C3.68342 0.316583 4.31658 0.316582 4.70711 0.707106L7.29289 3.29289C7.68342 3.68342 7.68342 4.31658 7.29289 4.70711L5.50048 6.49952C5.2016 6.7984 5.1275 7.255 5.31653 7.63307C6.40929 9.81858 8.18142 11.5907 10.3669 12.6835C10.745 12.8725 11.2016 12.7984 11.5005 12.4995L13.2929 10.7071C13.6834 10.3166 14.3166 10.3166 14.7071 10.7071L17.2929 13.2929C17.6834 13.6834 17.6834 14.3166 17.2929 14.7071L16.6796 15.3204C14.5683 17.4317 11.2257 17.6693 8.83698 15.8777L7.62857 14.9714C5.88504 13.6638 4.33622 12.115 3.02857 10.3714L2.12226 9.16302C0.330722 6.7743 0.568269 3.43173 2.67962 1.32038Z"
                        fill="#828282"
                      />
                    </svg>
                    <UserInfoBodyInfoContactsTitle>
                      Контакты
                    </UserInfoBodyInfoContactsTitle>
                  </UserInfoBodyInfoContacts>
                  <UserInfoBodyInfoContactsContent>
                    {phoneFormatter(
                      `+${userData.phoneNumber.replace(/[^0-9]/g, "")}`
                    )}
                  </UserInfoBodyInfoContactsContent>
                </UserInfoBodyInfoContactsWrapper>
              )}

              <UserInfoBodyInfoEmailWrapper>
                <UserInfoBodyInfoEmail>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.0132028 4.15129C-3.38676e-10 4.69022 0 5.30205 0 6V8C0 10.8284 0 12.2426 0.87868 13.1213C1.75736 14 3.17157 14 6 14H12C14.8284 14 16.2426 14 17.1213 13.1213C18 12.2426 18 10.8284 18 8V6C18 5.30205 18 4.69022 17.9868 4.15129L9.97129 8.60436C9.36724 8.93994 8.63276 8.93994 8.02871 8.60436L0.0132028 4.15129ZM0.242967 2.02971C0.325845 2.05052 0.407399 2.08237 0.485643 2.12584L9 6.85604L17.5144 2.12584C17.5926 2.08237 17.6742 2.05052 17.757 2.02971C17.6271 1.55619 17.4276 1.18491 17.1213 0.87868C16.2426 0 14.8284 0 12 0H6C3.17157 0 1.75736 0 0.87868 0.87868C0.572448 1.18491 0.372942 1.55619 0.242967 2.02971Z"
                      fill="#828282"
                    />
                  </svg>
                  <UserInfoBodyInfoEmailTitle>
                    E-mail
                  </UserInfoBodyInfoEmailTitle>
                </UserInfoBodyInfoEmail>
                <UserInfoBodyInfoEmailContent href={`mailto:${userData.email}`}>
                  {userData.email}
                </UserInfoBodyInfoEmailContent>
              </UserInfoBodyInfoEmailWrapper>
            </UserInfoBodyInfo>
          </UserInfoBody>
        </UserInfo>
      </Wrapper>
      <Career careers={userData.careers} />
      <Education educations={userData.educations} />
      <Skills skills={userData.skills} />
      <Certificates certificates={userData.certifications} />
    </>
  )
}

const Wrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
`
const UserInfo = styled.div`
  padding: 32px;
`
const UserInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 32px;
  border-bottom: 1px solid #d8d8d8;
`
const UserInfoTitle = styled.h4`
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: #333333;
`
const UserInfoChange = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin-left: 12px;
    font-family: Inter, sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
  }
`
const UserInfoBody = styled.div`
  display: flex;
  padding-top: 15px;
  ${theme.mqMax("md")} {
    justify-content: space-around;
  }
  ${theme.mqMax("sm")} {
    flex-direction: column;
    align-items: center;
  }
`
const UserInfoBodyImg = styled.div`
  max-width: 200px;
  width: 100%;
  border-radius: 8px;
  margin-right: 20px;
  ${theme.mqMax("sm")} {
    margin-right: 0;
  }
`
const UserInfoBodyInfo = styled.div`
  width: 70%;
  ${theme.mqMax("md")} {
    width: 50%;
  }
  ${theme.mqMax("sm")} {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
const UserInfoBodyInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  ${theme.mqMax("md")} {
    display: flex;
    flex-direction: column;
  }
`
const UserInfoBodyInfoName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  line-height: 32px;
  color: #828282;
`
const UserInfoBodyInfoSocialNetworks = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100px;
  width: 100%;
`
const UserInfoBodyInfoPosition = styled.p`
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  margin: 10px 0 15px 0;
`
const UserInfoBodyInfoBirthdayWrapper = styled.div`
  margin-bottom: 16px;
`
const UserInfoBodyInfoBirthday = styled.div`
  display: flex;
  align-items: center;
`
const UserInfoBodyInfoBirthdayTitle = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 32px;
  margin-left: 10px;
  color: #828282;
`
const UserInfoBodyInfoBirthdayContent = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
  margin-left: 34px;
`
const UserInfoBodyInfoContactsWrapper = styled.div`
  margin-bottom: 16px;
`
const UserInfoBodyInfoContacts = styled.div`
  display: flex;
  //align-items: center;
`
const UserInfoBodyInfoContactsTitle = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
  margin-left: 10px;
  color: #828282;
`
const UserInfoBodyInfoContactsContent = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #828282;
  line-height: 24px;
  margin-left: 34px;
`
const UserInfoBodyInfoEmailWrapper = styled.div`
  margin-bottom: 16px;
`
const UserInfoBodyInfoEmail = styled.div`
  display: flex;
  //align-items: center;
`
const UserInfoBodyInfoEmailTitle = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 14px;
  margin-left: 10px;
  color: #828282;
`
const UserInfoBodyInfoEmailContent = styled.a`
  color: #4285f4;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin-left: 34px;
`

export default Index
