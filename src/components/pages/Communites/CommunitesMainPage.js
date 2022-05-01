import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTeams, teamsSelector } from "../../../redux/components/teams"
import styled from "styled-components"
import searchIcon from "../../../public/svg/searchIcon.svg"
import Image from "next/image"
import CommunitesList from "./CommunitesTeamsList"
import Link from "next/link"
import useQuery from "../../../hooks/useQuery"
import { useRouter } from "next/router"
import {
  fetchAthletesByParams,
  selectAthletes,
} from "../../../redux/components/athletes"
import CommunitesAthletesList from "./CommunitiesAthleteList"
import { fetchCountries } from "../../../redux/components/countriesAndCities"

function CommunitesMainPage() {
  const dispatch = useDispatch()
  const [, teams] = useSelector(teamsSelector)
  const [search, setSearch] = useState("")
  const query = useQuery()
  const { push: routerPush } = useRouter()
  const [, athletes] = useSelector(selectAthletes)

  React.useEffect(() => {
    dispatch(fetchTeams())
    dispatch(fetchAthletesByParams())
    dispatch(fetchCountries())
  }, [])

  const handleSubmit = (e, value) => {
    e.preventDefault()
    value ? query.set("search", value) : query.delete("search")
    routerPush(`/communities/?${query}`)
  }

  return (
    <CommunitesContainer>
      <CommunitesItems>
        <form onSubmit={(e) => handleSubmit(e, search)}>
          <CommunitesHeadingInputAndButton>
            <CommunitesHeadingInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск"
            />
            <CommunitesHeadingButton type="submit" searchIcon={searchIcon}>
              <SearchIcon />
              Найти
            </CommunitesHeadingButton>
          </CommunitesHeadingInputAndButton>
        </form>

        <CommunitesItem>
          <CommunitesHeadingText>Участники</CommunitesHeadingText>
          <Link href={`/communities-athletes`} passHref>
            <CommunitesHeadingTextViewAll>См.все</CommunitesHeadingTextViewAll>
          </Link>
        </CommunitesItem>

        <CommunitesAthletesList data={athletes.slice(0, 8)} />

        <CommunitesItem>
          <CommunitesHeadingText>Команды</CommunitesHeadingText>
          <Link href={`/communities-teams`} passHref>
            <CommunitesHeadingTextViewAll>См.все</CommunitesHeadingTextViewAll>
          </Link>
        </CommunitesItem>
        <CommunitesList data={teams?.results?.slice(0, 6)} />
      </CommunitesItems>
    </CommunitesContainer>
  )
}

export default CommunitesMainPage

const CommunitesHeadingText = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #ffffff;
`

const CommunitesItems = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 48px;
`

const CommunitesHeadingTextViewAll = styled.button`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #6d4eea;
`

const CommunitesItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CommunitesContainer = styled.div`
  margin-top: 48px;
  width: 100%;
`

const CommunitesHeadingInputAndButton = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid #333333;
  border-radius: 16px;
  padding: 0px;
  height: 64px;
`

const CommunitesHeadingInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  padding: 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #bdbdbd;
`

const CommunitesHeadingButton = styled.button`
  background: #333333;
  border: 1.5px solid #333333;
  border-radius: 0px 16px 16px 0px;
  height: 100%;
  color: #ffffff;
  background-image: url(${({ searchIcon }) => searchIcon});
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 48px;
  margin-right: -2px;
  max-width: 137px;
  justify-content: space-between;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 23px;
`

const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C12.9036 19 14.652 18.3351 16.0255 17.2249C16.0661 17.4016 16.1552 17.5694 16.2929 17.7071L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L17.7071 16.2929C17.5694 16.1552 17.4016 16.0661 17.2249 16.0255C18.3351 14.652 19 12.9036 19 11C19 6.58172 15.4183 3 11 3ZM5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11C17 14.3137 14.3137 17 11 17C7.68629 17 5 14.3137 5 11Z"
      fill="white"
    />
  </svg>
)
