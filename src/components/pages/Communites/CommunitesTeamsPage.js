import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTeams, teamsSelector } from "../../../redux/components/teams"
import styled from "styled-components"
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
import { useTranslation } from "next-i18next"

function CommunitesPage() {
  const dispatch = useDispatch()
  const [, teams] = useSelector(teamsSelector)
  const [countries] = useSelector(selectCountriesAndCities)
  const [sportTypes] = useSelector(selectSportTypes)
  const query = useQuery()
  const searchValue = query.get("search")
  const [search, setSearch] = useState(searchValue)
  const { push: routerPush } = useRouter()
  const { t: tCommunities } = useTranslation("communities")

  const sportTypesValue =
    sportTypes.length &&
    sportTypes.find((type) => `${type.id}` === query.get("sports__id"))

  const countriesValue =
    countries.length &&
    countries.find((type) => `${type.id}` === query.get("country__id"))

  const handleCountriesFilter = useCallback(
    (_, value) => {
      value ? query.set("country__id", value.id) : query.delete("country__id")
      routerPush(`/communities/teams/?${query}`)
    },
    [query]
  )

  const handleSportTypesFilter = useCallback(
    (_, value) => {
      value ? query.set("sports__id", value.id) : query.delete("sports__id")
      routerPush(`/communities/teams/?${query}`)
    },
    [query]
  )

  React.useEffect(() => {
    dispatch(fetchTeams(query))
  }, [query])

  React.useEffect(() => {
    dispatch(fetchTeams(query))
    dispatch(fetchCountries())
    dispatch(fetchSportTypes())
  }, [])

  const handleSubmit = (e, value) => {
    e.preventDefault()
    value ? query.set("search", value) : query.delete("search")
    routerPush(`/communities/teams/?${query}`)
  }

  return (
    <CommunitesContainer>
      <CommunitesItems>
        <form onSubmit={(e) => handleSubmit(e, search)}>
          <CommunitesHeadingInputAndButton>
            <CommunitesHeadingInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tCommunities("communities.search")}
            />
            <CommunitesHeadingButton
              type="submit"
              // searchIcon={searchIcon}
            >
              <SearchIcon />
              {tCommunities("communities.find")}
            </CommunitesHeadingButton>
          </CommunitesHeadingInputAndButton>
        </form>

        <CommunitesAutoCompletes>
          {!!sportTypes?.length && (
            <Autocomplete
              noOptionsText={tCommunities("communities.nothingFound")}
              onChange={(e, value) => handleSportTypesFilter(e, value)}
              options={sportTypes.map((option) => option)}
              getOptionLabel={(option) => option.name}
              fullWidth
              value={sportTypesValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder={tCommunities("communities.kindOfSport")}
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
              noOptionsText={tCommunities("communities.nothingFound")}
              onChange={(e, value) => handleCountriesFilter(e, value)}
              options={countries.map((option) => option)}
              getOptionLabel={(option) => option.name}
              value={countriesValue}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder={tCommunities("communities.country")}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <LocationIcon />,
                  }}
                />
              )}
            />
          )}
        </CommunitesAutoCompletes>

        <CommunitesItem>
          <CommunitesHeadingText>
            {tCommunities("communities.teams")}
          </CommunitesHeadingText>
        </CommunitesItem>
        <CommunitesList data={teams} />
      </CommunitesItems>
    </CommunitesContainer>
  )
}

export default CommunitesPage

const CommunitesAutoCompletes = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 35px;
`

const CommunitesHeadingText = styled.h2`
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
  padding: 0;
  height: 64px;
`

const CommunitesHeadingInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  padding: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #bdbdbd;
`

const CommunitesHeadingButton = styled.button`
  background: #333333;
  border: 1.5px solid #333333;
  border-radius: 0 16px 16px 0;
  height: 100%;
  color: #ffffff;
  //background-image: url(${({ searchIcon }) => searchIcon});
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
      fillRule="evenodd"
      clipRule="evenodd"
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
      fill="#828282"
    />
  </svg>
)
