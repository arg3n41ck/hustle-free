import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTeams, teamsSelector } from "../../../redux/components/teams"
import styled from "styled-components"
import searchIcon from "../../../public/svg/searchIcon.svg"
import Image from "next/image"
import CommunitesList from "./CommunitesTeamsList"
import { Autocomplete, TextField } from "@mui/material"
import {
  selectCountriesAndCities,
  fetchCountries,
} from "../../../redux/components/countriesAndCities"
import {
  selectSportTypes,
  fetchSportTypes,
} from "../../../redux/components/sportTypes"
import useQuery from "../../../hooks/useQuery"
import { useRouter } from "next/router"
import {
  fetchAthletesByParams,
  selectAthletes,
} from "../../../redux/components/athletes"
import CommunitesAthletesList from "./CommunitiesAthleteList"

const gender = [
  {
    id: 1,
    value: "male",
    name: "Мужчина",
  },
  {
    id: 2,
    value: "female",
    name: "Женщина",
  },
]

function CommunitesAthletesPage() {
  const dispatch = useDispatch()
  const [, teams] = useSelector(teamsSelector)
  const [countries] = useSelector(selectCountriesAndCities)
  const [sportTypes] = useSelector(selectSportTypes)
  const query = useQuery()
  const [search, setSearch] = useState("")
  const [, athletes] = useSelector(selectAthletes)
  const { push: routerPush } = useRouter()

  const teaamsValue =
    teams.length && teams.find((type) => type.name === query.get("teams"))

  const countriesValue =
    countries.length &&
    countries.find((type) => type.name === query.get("country"))

  const gendersValue =
    gender.length && gender.find((type) => type.name === query.get("gender"))

  const handleCountriesFilter = useCallback(
    (_, value) => {
      value ? query.set("country", value.name) : query.delete("country")
      routerPush(`/communities-athletes/?${query}`)
    },
    [query]
  )

  const handleTeamsTypesFilter = useCallback(
    (_, value) => {
      value ? query.set("teams", value.name) : query.delete("teams")
      routerPush(`/communities-athletes/?${query}`)
    },
    [query]
  )

  const handleGendersFilter = useCallback(
    (_, value) => {
      value ? query.set("gender", value.name) : query.delete("gender")
      routerPush(`/communities-athletes/?${query}`)
    },
    [query]
  )
  //

  React.useEffect(() => {
    dispatch(fetchTeams())
    dispatch(fetchCountries())
    dispatch(fetchSportTypes())
    dispatch(fetchAthletesByParams())
  }, [])

  const handleSubmit = (e, value) => {
    e.preventDefault()
    value ? query.set("search", value) : query.delete("search")
    routerPush(`/communities-athletes/?${query}`)
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

        <CommunitesAutoCompletes>
          {!!teams?.results?.length && (
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(e, value) => handleTeamsTypesFilter(e, value)}
              options={teams?.results?.map((option) => option)}
              getOptionLabel={(option) => option.name}
              fullWidth
              value={teaamsValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Команда"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <UsersIcon />,
                  }}
                />
              )}
            />
          )}
          {!!countries?.length && (
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(e, value) => handleCountriesFilter(e, value)}
              options={countries.map((option) => option)}
              getOptionLabel={(option) => option.name}
              value={countriesValue}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Страна"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <LocationIcon />,
                  }}
                />
              )}
            />
          )}
          {!!gender?.length && (
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(e, value) => handleGendersFilter(e, value)}
              options={gender.map((option) => option)}
              getOptionLabel={(option) => option.name}
              value={gendersValue}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Пол"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <GenderIcon />,
                  }}
                />
              )}
            />
          )}
        </CommunitesAutoCompletes>

        <CommunitesItem>
          <CommunitesHeadingText>Участники</CommunitesHeadingText>
        </CommunitesItem>
        <CommunitesAthletesList data={athletes} />
      </CommunitesItems>
    </CommunitesContainer>
  )
}

export default CommunitesAthletesPage

const CommunitesAutoCompletes = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 35px;
`

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

const UsersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.1673 17.8335C21.1673 18.0545 21.0795 18.2665 20.9233 18.4227C20.767 18.579 20.555 18.6668 20.334 18.6668H10.334C10.113 18.6668 9.90101 18.579 9.74473 18.4227C9.58845 18.2665 9.50066 18.0545 9.50066 17.8335C9.50066 16.5074 10.0274 15.2356 10.9651 14.298C11.9028 13.3603 13.1746 12.8335 14.5007 12.8335H16.1673C17.4934 12.8335 18.7652 13.3603 19.7029 14.298C20.6405 15.2356 21.1673 16.5074 21.1673 17.8335ZM15.334 5.3335C14.6747 5.3335 14.0303 5.52899 13.4821 5.89526C12.9339 6.26153 12.5067 6.78213 12.2544 7.39122C12.0021 8.0003 11.9361 8.67052 12.0647 9.31713C12.1933 9.96373 12.5108 10.5577 12.977 11.0238C13.4431 11.49 14.0371 11.8075 14.6837 11.9361C15.3303 12.0647 16.0005 11.9987 16.6096 11.7464C17.2187 11.4941 17.7393 11.0669 18.1056 10.5187C18.4718 9.97056 18.6673 9.3261 18.6673 8.66683C18.6673 7.78277 18.3161 6.93493 17.691 6.30981C17.0659 5.68469 16.218 5.3335 15.334 5.3335ZM7.83399 5.3335C7.17472 5.3335 6.53025 5.52899 5.98209 5.89526C5.43392 6.26153 5.00668 6.78213 4.75439 7.39122C4.5021 8.0003 4.43608 8.67052 4.5647 9.31713C4.69332 9.96373 5.01079 10.5577 5.47696 11.0238C5.94314 11.49 6.53708 11.8075 7.18369 11.9361C7.83029 12.0647 8.50051 11.9987 9.1096 11.7464C9.71869 11.4941 10.2393 11.0669 10.6056 10.5187C10.9718 9.97056 11.1673 9.3261 11.1673 8.66683C11.1673 7.78277 10.8161 6.93493 10.191 6.30981C9.56589 5.68469 8.71804 5.3335 7.83399 5.3335ZM7.83399 17.8335C7.83275 16.9582 8.0052 16.0913 8.34136 15.2831C8.67751 14.4749 9.17069 13.7414 9.79232 13.1252C9.2836 12.9331 8.74443 12.8343 8.20065 12.8335H7.46732C6.23916 12.8357 5.06193 13.3246 4.19349 14.193C3.32505 15.0614 2.83619 16.2387 2.83398 17.4668V17.8335C2.83398 18.0545 2.92178 18.2665 3.07806 18.4227C3.23434 18.579 3.4463 18.6668 3.66732 18.6668H7.98399C7.88697 18.3996 7.83624 18.1178 7.83399 17.8335Z"
      fill="#828282"
    />
  </svg>
)

const LocationIcon = () => (
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
      d="M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
      fill="#828282"
    />
  </svg>
)

const GenderIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.4068 11.8727L6.88112 9.40327C7.82762 10.1108 9.00755 10.4342 10.1834 10.3083C11.3592 10.1825 12.4436 9.61677 13.2183 8.72507C13.9929 7.83336 14.4004 6.68187 14.3585 5.5024C14.3167 4.32293 13.8287 3.20307 12.9929 2.36824C12.157 1.53341 11.0352 1.04561 9.85342 1.00304C8.67163 0.960468 7.51756 1.36628 6.62354 2.13879C5.72951 2.9113 5.1619 3.99314 5.03498 5.16653C4.90806 6.33992 5.23126 7.51773 5.9395 8.46286L3.46452 10.9329L2.52224 9.99185C2.39719 9.86715 2.22763 9.79712 2.05086 9.79718C1.87408 9.79725 1.70458 9.86739 1.57962 9.99219C1.45467 10.117 1.3845 10.2862 1.38457 10.4626C1.38463 10.639 1.45491 10.8082 1.57995 10.9329L2.52224 11.874L1.20344 13.1895C1.13979 13.2509 1.08903 13.3242 1.0541 13.4054C1.01918 13.4865 1.00079 13.5738 1.00003 13.6621C0.999256 13.7504 1.01612 13.838 1.04962 13.9197C1.08313 14.0015 1.13261 14.0757 1.19518 14.1382C1.25775 14.2006 1.33216 14.25 1.41405 14.2834C1.49595 14.3169 1.5837 14.3337 1.67218 14.3329C1.76067 14.3322 1.84811 14.3138 1.92941 14.279C2.01072 14.2441 2.08425 14.1934 2.14572 14.1299L3.46452 12.8137L4.4068 13.7542C4.46827 13.8177 4.5418 13.8683 4.6231 13.9032C4.70441 13.9381 4.79185 13.9564 4.88034 13.9572C4.96882 13.9579 5.05657 13.9411 5.13847 13.9077C5.22036 13.8742 5.29477 13.8248 5.35734 13.7624C5.41991 13.7 5.46939 13.6257 5.5029 13.544C5.5364 13.4622 5.55326 13.3747 5.55249 13.2863C5.55173 13.198 5.53334 13.1108 5.49842 13.0296C5.46349 12.9485 5.41272 12.8751 5.34908 12.8137L4.4068 11.8727ZM9.67131 2.35352C10.3303 2.35352 10.9745 2.54855 11.5224 2.91394C12.0704 3.27934 12.4975 3.79869 12.7496 4.40632C13.0018 5.01394 13.0678 5.68256 12.9393 6.32762C12.8107 6.97267 12.4933 7.56519 12.0274 8.03025C11.5614 8.49531 10.9677 8.81202 10.3213 8.94033C9.675 9.06864 9.00506 9.00278 8.39622 8.7511C7.78738 8.49941 7.267 8.07319 6.90088 7.52634C6.53476 6.97949 6.33934 6.33657 6.33934 5.67887C6.33934 4.79694 6.69038 3.95112 7.31525 3.32749C7.94011 2.70387 8.78761 2.35352 9.67131 2.35352Z"
      fill="#828282"
    />
    <path
      d="M20.3336 7.67408H17.0016C16.8249 7.67408 16.6554 7.74415 16.5304 7.86888C16.4055 7.9936 16.3352 8.16277 16.3352 8.33915C16.3352 8.51554 16.4055 8.6847 16.5304 8.80943C16.6554 8.93415 16.8249 9.00422 17.0016 9.00422H18.7249L15.1264 12.5956C14.1796 11.8885 12.9996 11.5656 11.8239 11.6919C10.6481 11.8182 9.56395 12.3843 8.78963 13.2763C8.0153 14.1683 7.6083 15.3199 7.65055 16.4993C7.69281 17.6787 8.18118 18.7984 9.01735 19.6329C9.85353 20.4674 10.9754 20.9548 12.1572 20.997C13.339 21.0392 14.4929 20.633 15.3867 19.8602C16.2804 19.0874 16.8477 18.0054 16.9742 16.832C17.1008 15.6586 16.7772 14.4809 16.0687 13.536L19.6672 9.94463V11.6645C19.6672 11.8409 19.7374 12.0101 19.8624 12.1348C19.9874 12.2595 20.1569 12.3296 20.3336 12.3296C20.5103 12.3296 20.6798 12.2595 20.8048 12.1348C20.9298 12.0101 21 11.8409 21 11.6645V8.33915C21 8.16277 20.9298 7.9936 20.8048 7.86888C20.6798 7.74415 20.5103 7.67408 20.3336 7.67408ZM12.3369 19.6453C11.6779 19.6453 11.0337 19.4503 10.4857 19.0849C9.9378 18.7195 9.51073 18.2002 9.25854 17.5926C9.00636 16.9849 8.94037 16.3163 9.06894 15.6713C9.1975 15.0262 9.51484 14.4337 9.98082 13.9686C10.4468 13.5036 11.0405 13.1868 11.6868 13.0585C12.3332 12.9302 13.0031 12.9961 13.612 13.2478C14.2208 13.4995 14.7412 13.9257 15.1073 14.4725C15.4734 15.0194 15.6689 15.6623 15.6689 16.32C15.6689 16.7567 15.5827 17.1891 15.4152 17.5926C15.2478 17.996 15.0023 18.3626 14.6929 18.6714C14.3835 18.9802 14.0162 19.2251 13.612 19.3922C13.2077 19.5593 12.7744 19.6453 12.3369 19.6453Z"
      fill="#828282"
    />
  </svg>
)
