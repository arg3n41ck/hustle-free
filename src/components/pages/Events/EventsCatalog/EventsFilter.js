import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Collapse, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchCountries,
  selectCountriesAndCities,
} from "../../../../redux/components/countriesAndCities"
import { Autocomplete } from "@mui/material"
import {
  fetchSportTypes,
  selectSportTypes,
} from "../../../../redux/components/sportTypes"
import useQuery from "../../../../hooks/useQuery"
import { useRouter } from "next/router"
import { fetchEventsByParams } from "../../../../redux/components/events"

const dateTypes = [
  {
    id: "dateType1",
    name: "По возрастанию",
    value: "date_start",
  },
  {
    id: "dateType2",
    name: "По убыванию",
    value: "-date_start",
  },
]

function EventsFilter() {
  const [isFiltersOpen, setFilter] = useState(false)
  const [countries] = useSelector(selectCountriesAndCities)
  const [sportTypes] = useSelector(selectSportTypes)
  const dispatch = useDispatch()
  const query = useQuery()
  const { push: routerPush } = useRouter()

  useEffect(() => {
    query.delete("ordering")
    dispatch(fetchEventsByParams(query))
    dispatch(fetchCountries())
    dispatch(fetchSportTypes())
  }, [])

  const sortHandler = (_) => {}

  const handleCountriesFilter = useCallback(
    (_, value) => {
      value ? query.set("country", value.name) : query.delete("country")
      routerPush(`/events/?${query}`)
    },
    [query]
  )
  const handleSportTypesFilter = useCallback(
    (_, value) => {
      value ? query.set("type_sport", value.name) : query.delete("type_sport")
      routerPush(`/events/?${query}`)
    },
    [query]
  )
  const handleDateFilter = useCallback(
    (_, value) => {
      value ? query.set("ordering", value.value) : query.delete("ordering")
      routerPush(`/events/?${query}`)
    },
    [query]
  )

  useEffect(() => {
    dispatch(fetchEventsByParams(query))
  }, [query])

  const sportTypesValue =
    sportTypes.length &&
    sportTypes.find((type) => type.name === query.get("type_sport"))

  const countriesValue =
    countries.length &&
    countries.find((type) => type.name === query.get("country"))

  const orderingValue =
    query.get("ordering") &&
    dateTypes.find((type) => type.value === query.get("ordering"))

  return (
    <div>
      <BtnsWrapper>
        <SoonBtn>Предстоящие</SoonBtn>
        <LiveBtn>• Live</LiveBtn>
        <PastEventsBtn>Прошедшие</PastEventsBtn>
        <FilterBtn onClick={() => setFilter((s) => !s)}>
          <FilterIcon />
          Фильтр
        </FilterBtn>
      </BtnsWrapper>

      <Collapse in={isFiltersOpen}>
        <Filters>
          {!!sportTypes?.length && (
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(e, value) => handleSportTypesFilter(e, value)}
              options={sportTypes.map((option) => option)}
              getOptionLabel={(option) => option.name}
              fullWidth
              value={sportTypesValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Вид спорта"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <BoxIcon />,
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
          <Autocomplete
            noOptionsText={"Ничего не найдено"}
            onChange={(e, value) => handleDateFilter(e, value)}
            options={dateTypes.map((option) => option)}
            getOptionLabel={(option) => option.name}
            value={orderingValue}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder="Даты"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <CalendarIcon />,
                }}
              />
            )}
          />
          <Autocomplete
            noOptionsText={"Ничего не найдено"}
            onChange={(e, value) => sortHandler(e, value)}
            options={countries.map((option) => option)}
            getOptionLabel={(option) => option.name}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder="Сортировать"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <FieldFilterIcon />,
                }}
              />
            )}
          />
        </Filters>
      </Collapse>
    </div>
  )
}

export default EventsFilter

const BtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  grid-gap: 56px;
`

const SoonBtn = styled.button`
  width: 175px;
  height: 64px;
  font-weight: 600;
  font-size: 18px;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 32px;
`

const LiveBtn = styled.button`
  color: #eb5757;
  font-size: 18px;
  font-weight: 600;

  padding: 0 24px;
  border-radius: 32px;
`

const PastEventsBtn = styled.button`
  height: 100%;
  color: #bdbdbd;
  font-weight: 600;
  font-size: 18px;
  padding: 0 24px;
`

const FilterBtn = styled.button`
  height: 64px;
  left: 1257px;
  background: #333333;
  border: 1px solid #333333;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 20px;
  color: #f2f2f2;
  border-radius: 16px;
  display: flex;
  align-items: center;
  grid-gap: 15px;
  padding: 20px;
  margin: 0 0 0 auto;
`

const FilterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12L5 4"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M19 20L19 18"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M5 20L5 16"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M19 12L19 4"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 7L12 4"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 20L12 12"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="5"
      cy="14"
      r="2"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="9"
      r="2"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="19"
      cy="15"
      r="2"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 32px;
  margin: 34px 0 0;
`

export const BoxIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.1299 6.36756C11.8403 6.31132 11.5629 6.19799 11.3179 6.0337C10.7191 5.63261 10.3456 4.94576 10.3387 4.22671C10.3319 3.49067 10.7033 2.78577 11.3167 2.37458C11.93 1.96339 12.7259 1.88506 13.4084 2.16773C14.0758 2.44396 14.5757 3.04605 14.7249 3.74948C14.8775 4.47152 14.647 5.24209 14.1222 5.76351C13.6048 6.27699 12.8503 6.50689 12.1329 6.36827L12.1299 6.36756Z"
      fill="#828282"
    />
    <path
      d="M20.6363 6.38984C20.7576 6.38984 20.8788 6.40569 20.9959 6.43741C21.6483 6.61422 22.0782 7.26374 21.9881 7.92978C21.8984 8.59473 21.3097 9.10467 20.6362 9.10467C20.352 9.10686 20.077 9.10229 19.8127 8.98139C19.7624 8.95834 19.7135 8.93277 19.6664 8.90382C19.6505 8.8941 19.635 8.88377 19.6195 8.87334L19.1532 8.87349C18.961 8.87349 18.7722 8.80744 18.6227 8.6873C18.6116 8.6784 18.6028 8.66957 18.5949 8.66158C18.5756 8.64207 18.5613 8.6276 18.5293 8.62963L13.6107 8.94529L14.1662 9.6951C14.1858 9.72157 14.1965 9.71555 14.2181 9.70343C14.2263 9.69883 14.236 9.69335 14.2484 9.68843C14.2974 9.66905 14.3478 9.65586 14.399 9.64405L14.4132 9.64074C14.4951 9.62171 14.7113 9.57148 14.8136 9.55034C14.8418 9.51981 14.8715 9.49043 14.9024 9.46267C14.9708 9.40148 15.0456 9.3472 15.1252 9.30096C15.2598 9.22296 15.4043 9.17539 15.5551 9.14044C15.8379 9.07491 16.1083 9.02944 16.3961 9.10467C16.7181 9.18872 17.0034 9.39239 17.1859 9.66948C17.5696 10.252 17.4322 11.0536 16.8778 11.4776C16.6539 11.6487 16.3981 11.7118 16.1297 11.7741C15.9359 11.819 15.7363 11.826 15.5409 11.7869C15.4453 11.7678 15.3442 11.7343 15.3144 11.7241C15.2543 11.7394 15.151 11.7654 15.1253 11.7714C15.0965 11.7781 15.0676 11.785 15.0388 11.792C14.975 11.8074 14.9112 11.8229 14.8469 11.8355C14.7924 11.8462 14.739 11.8463 14.6859 11.8465C14.6237 11.8467 14.562 11.8469 14.4999 11.8641C14.3473 11.9065 14.1947 11.9488 14.0421 11.9911C13.9959 12.0039 13.9497 12.0167 13.9035 12.0295C13.5907 12.116 13.26 12.0496 13.0221 11.8231L12.979 11.7821C12.8733 11.6814 12.7675 11.5807 12.6615 11.4801L11.8013 13.6856L13.6165 15.1686C14.4735 15.8844 14.535 16.0354 14.6105 16.2208C14.743 16.5467 14.8104 16.9025 14.876 17.2491C14.8846 17.2945 14.8932 17.3398 14.9018 17.3848C15.0698 18.2556 15.2057 19.1323 15.3405 20.0085C15.3539 20.0957 15.3687 20.1831 15.3835 20.2705C15.4174 20.4704 15.4514 20.671 15.4692 20.8718C15.4984 21.2006 15.3647 21.5301 15.1155 21.7476C14.5738 22.2207 13.6936 21.9995 13.4425 21.3273C13.3763 21.1501 13.327 20.9647 13.2779 20.7802C13.2539 20.69 13.2299 20.6 13.2041 20.5112C13.0844 20.1008 12.9647 19.6905 12.8409 19.2813C12.706 18.8358 12.2983 17.5995 12.2983 17.5995C12.2983 17.5995 10.054 16.147 9.31118 15.6763C9.24931 15.8181 9.18766 15.96 9.12601 16.102C8.98976 16.4156 8.85349 16.7293 8.71489 17.0418C8.70646 17.0608 8.6971 17.0821 8.68686 17.1054C8.54512 17.4279 8.23397 18.1357 7.88503 18.4479C7.65103 18.6572 7.402 18.8499 7.15353 19.0422C7.12939 19.0608 7.10526 19.0795 7.08115 19.0982C6.36786 19.6509 5.64371 20.1903 4.91846 20.7274L3.98002 21.4185C3.9429 21.4459 3.90597 21.4742 3.86891 21.5026C3.77626 21.5736 3.68277 21.6452 3.58337 21.7043C2.96334 22.0726 2.13659 21.6943 2.01471 20.9851C1.95571 20.6421 2.07664 20.2833 2.33284 20.0461C2.40643 19.977 2.48107 19.909 2.55572 19.8409C2.59266 19.8072 2.6296 19.7735 2.66642 19.7397C3.28525 19.171 3.90374 18.6021 4.51688 18.0272C4.86419 17.7015 5.21055 17.3745 5.5514 17.042C5.63926 16.9563 5.72673 16.8699 5.8133 16.7828C5.84172 16.7541 5.93743 16.6537 5.93743 16.6537C5.93743 16.6537 6.05735 16.2702 6.11745 16.0786C6.38557 15.2252 6.65158 14.3711 6.91625 13.5166L7.04636 13.0969C7.08232 12.9941 7.07966 12.9267 7.07647 12.8457C7.07244 12.7433 7.06755 12.6193 7.13891 12.3748C7.16284 12.2929 7.18801 12.2112 7.21892 12.1316C7.22471 12.1167 7.2306 12.1017 7.23629 12.0867C7.36901 11.7466 7.52402 11.4101 7.67902 11.0735C7.83403 10.737 7.98904 10.4004 8.12175 10.0603C8.30597 9.58762 8.49031 9.11502 8.67463 8.64246C8.75288 8.44184 8.83113 8.24124 8.90936 8.04063C9.10761 7.53235 9.45483 7.10155 9.92886 6.82279C9.93792 6.81746 9.94786 6.81148 9.95874 6.80493C10.1271 6.7036 10.5187 6.46788 11.3414 6.46788C11.7313 6.46788 12.1204 6.50017 12.5096 6.53246C12.7042 6.54861 12.8989 6.56477 13.0937 6.57688L18.5381 6.86541C18.5647 6.86703 18.581 6.8495 18.5985 6.83075C18.606 6.82261 18.6138 6.81425 18.6227 6.80712C18.7723 6.68707 18.9611 6.62093 19.1532 6.62093C19.2196 6.62 19.4457 6.62043 19.597 6.62072L19.6088 6.62074C19.6281 6.61541 19.6441 6.60537 19.6638 6.59301C19.6709 6.58858 19.6784 6.58385 19.6868 6.57893C19.7275 6.55484 19.7696 6.53284 19.8127 6.51312C20.0783 6.39165 20.3515 6.38984 20.6363 6.38984Z"
      fill="#828282"
    />
  </svg>
)

export const LocationIcon = () => (
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

const CalendarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
    <path d="M7 3L7 6" stroke="#828282" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M17 3L17 6"
      stroke="#828282"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

const FieldFilterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 7H19" stroke="#828282" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 12H15" stroke="#828282" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 17H11" stroke="#828282" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
