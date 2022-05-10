import React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import styled from "styled-components"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import AddressIcon from "../../assets/svg/address.svg"
import { selectCountriesAndCities } from "../../redux/components/countriesAndCities"
import { useSelector } from "react-redux"
import MapField from "../ui/Map/Field"

function LocationAccordion({ event }) {
  const [countries, cities] = useSelector(selectCountriesAndCities)

  const country = countries.find(({ id }) => id === event?.location.country)
  const city = cities.find(({ id }) => id === event?.location.city)

  const mapPoints =
    event?.location?.lat && event?.location?.long
      ? {
          lat: +event?.location?.lat,
          lng: +event?.location?.long,
        }
      : null

  return (
    <div>
      <LocationAccordionCustom
        sx={{
          "& .MuiAccordionSummary-expandIconWrapper": {
            transform: "rotate(90deg)",
          },
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(-90deg)",
          },
          "& .MuiSvgIcon-root": {
            color: "#828282",
          },
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ padding: "0 24px" }}
        >
          <LocationAccordionCustomHeadingText>
            Локация
          </LocationAccordionCustomHeadingText>
        </AccordionSummary>
        <Line />
        <AccordionDetails
          sx={{
            padding: "24px 24px 0",
            display: "flex",
            flexDirection: "column",
            gridRowGap: "24px",
          }}
        >
          <LocationAccordionItems>
            <LocationPageIcon type={"location"} />
            <div>
              <LocationItemsText>
                {country?.name}, {city?.name}, {event?.location?.address}
              </LocationItemsText>
            </div>
          </LocationAccordionItems>

          <LocationAccordionItems>
            <LocationPageIcon type={"address"} />
            <div>
              <LocationItemsText>
                {event?.location?.placeName}, {event?.location?.weighingPlace}
              </LocationItemsText>
            </div>
          </LocationAccordionItems>

          <Map active={!!mapPoints}>
            {mapPoints && <MapField defaultPoints={mapPoints} disabled />}
          </Map>
        </AccordionDetails>
      </LocationAccordionCustom>
    </div>
  )
}

export default LocationAccordion

const Map = styled.div`
  width: 100%;
  height: 151px;
  border-radius: 16px;
  background: no-repeat
    url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80")
    center / cover;
`

const LocationAccordionCustomHeadingText = styled(Typography)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`

const LocationItemsText = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`

const LocationAccordionItems = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 24px auto;
  grid-column-gap: 12px;
  align-items: flex-start;
  justify-items: center;
`

const Line = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
  margin: ${({ margin }) => (!!margin ? margin : 0)};
`

const LocationAccordionCustom = styled(Accordion)`
  background-color: #1b1c22 !important ;
  border: 1px solid #333333 !important;
  border-radius: 16px !important;
  padding: 24px 0 !important;
  margin: 0 !important;
`

const LocationPageIcon = ({ type }) => {
  return (
    <>
      {type === "location" && (
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
            fill="#BDBDBD"
          />
        </svg>
      )}
      {type === "address" && <AddressIcon />}
    </>
  )
}
