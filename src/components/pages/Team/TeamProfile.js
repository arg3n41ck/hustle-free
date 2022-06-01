import React, { useEffect, useMemo, useState } from "react"
import $api from "../../../services/axios"
import LkDefaultHeader from "../../ui/LKui/LKDefaultHeader"
import { TitleHeader } from "../../ui/LKui/HeaderContent"
import { HeaderWrapper } from "../LkOg/Tabs/Events/Events/Events"
import styled from "styled-components"
import { Avatar, Box } from "@mui/material"
import { WebsiteIcon } from "../../../assets/svg/icons"
import { DefaultEmailIcon } from "../../../assets/svg/icons"
import { LinkIcon } from "../../../assets/svg/icons"
import { UserIcon } from "../../../assets/svg/icons"
import { DefaultPhoneIcon } from "../../../assets/svg/icons"
import phoneFormatter from "../../../helpers/phoneFormatter"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchCountries,
  selectCountriesAndCities,
} from "../../../redux/components/countriesAndCities"
import ApplyToTeam from "../../TeamProfile/ApplyToTeam"

const getTeamData = async (teamId) => {
  const { data } = await $api.get(`/teams/teams/${teamId}/`)
  return data
}

function TeamInfo({
  onToggleSidebar,
  teamId,
  userStatusInTeam,
  checkUserStatus,
}) {
  const [team, setTeam] = useState(null)
  const [countries] = useSelector(selectCountriesAndCities)
  const user = useSelector((state) => state.user.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  useEffect(() => {
    teamId && getTeamData(teamId).then(setTeam)
  }, [teamId])

  const currentLocations = useMemo(() => {
    const country =
      team &&
      countries.length &&
      countries.find(({ id }) => id === team.country)
    return country
      ? {
          ...country,
          cityCountry: country?.cityCountry?.find(({ id }) => id === team.city)
            ?.name,
        }
      : null
  }, [countries, team])

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <HeaderWrapper>
          <TitleHeader>Профиль</TitleHeader>
          {user?.role === "athlete" && (
            <ApplyToTeam
              userStatusInTeam={userStatusInTeam}
              checkUserStatus={checkUserStatus}
            />
          )}
        </HeaderWrapper>
      </LkDefaultHeader>
      {team && (
        <Content>
          <Center>
            <Avatar
              alt={`${team?.fullNameCoach}`}
              src={team?.user?.avatar}
              sx={{ width: 112, height: 112 }}
            />
            <CenterText>
              <CenterTitle>{team?.name || ""}</CenterTitle>
              <CenterDescription>{team?.description || ""}</CenterDescription>
            </CenterText>
          </Center>
          <div>
            <List>
              <Item>
                <ItemTitle>
                  <WrapperIcon>
                    <WebsiteIcon />
                  </WrapperIcon>
                  <p>Страна, город</p>
                </ItemTitle>
                {currentLocations && (
                  <ItemDescription>
                    {currentLocations?.name}, г. {currentLocations?.cityCountry}
                  </ItemDescription>
                )}
              </Item>
              <Item>
                <ItemTitle>
                  <WrapperIcon>
                    <DefaultEmailIcon />
                  </WrapperIcon>
                  <p>E-mail</p>
                </ItemTitle>
                {team?.emailCoach && (
                  <ItemDescription>{team?.emailCoach}</ItemDescription>
                )}
              </Item>
              <Item>
                <ItemTitle>
                  <WrapperIcon>
                    <WebsiteIcon />
                  </WrapperIcon>
                  <p>Сайт</p>
                </ItemTitle>
                <ItemDescription>
                  {
                    <a
                      target={"_blank"}
                      style={{
                        color: "#2E79DD",
                        textDecoration: "underline",
                      }}
                      rel="noreferrer noopener"
                      href={team?.webSite}
                    >
                      {team?.webSite || ""}
                      <Box component={"span"} sx={{ marginLeft: 1 }}>
                        <LinkIcon />
                      </Box>
                    </a>
                  }
                </ItemDescription>
              </Item>
              <CoachBlock>
                <CoachItem>
                  <ItemTitle>
                    <WrapperIcon>
                      <UserIcon />
                    </WrapperIcon>
                    <p>Главный тренер</p>
                  </ItemTitle>
                  <ItemDescription>{team?.fullNameCoach || ""}</ItemDescription>
                </CoachItem>

                <CoachItem style={{ marginTop: 16 }}>
                  <ItemTitle>
                    <WrapperIcon>
                      <DefaultPhoneIcon />
                    </WrapperIcon>
                    <p>Контакты</p>
                  </ItemTitle>
                  <ItemDescription>
                    {!!team?.phoneCoach && phoneFormatter(team?.phoneCoach)}
                  </ItemDescription>
                </CoachItem>
              </CoachBlock>
            </List>
          </div>
        </Content>
      )}
    </div>
  )
}

export default TeamInfo

export const CreateEventBTN = styled.button`
  padding: 12px 20px;
  background: ${({ active }) =>
    active ? "linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%)" : "#333"};
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  grid-column-gap: 8px;
`

const Content = styled.div`
  margin: 32px 32px 0 32px;
`
const Center = styled.div`
  display: flex;
`
const CenterText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
`
const CenterTitle = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`
const CenterDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`
const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 32px 0;
  border-top: 1px solid #333333;
`
const ItemTitle = styled.h5`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #828282;
  width: 50%;
  display: flex;
  align-items: center;
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #bdbdbd;
  flex-grow: 1;
  width: 50%;
`
const WrapperIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 11px;
`
const CoachBlock = styled.div`
  padding: 32px 0;
  border-top: 1px solid #333333;
`
const CoachItem = styled.div`
  display: flex;
  align-items: center;
`

export const PlusIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 8L16 24"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 16L8 16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
