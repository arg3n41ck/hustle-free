import React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import styled from "styled-components"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import { selectCountriesAndCities } from "../../redux/components/countriesAndCities"
import { useSelector } from "react-redux"
import dynamic from "next/dynamic"
const MapFiledLeafLet  = dynamic(
  () => import("../ui/Map/FieldLeaflet"),
  {
    ssr: false,
  })

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
            {mapPoints && <MapFiledLeafLet points={mapPoints} disabled />}
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

const AddressIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16.577 8.52566L6.65811 5.21937C6.3578 5.11927 6.20764 5.06921 6.10382 5.14405C6 5.21888 6 5.37716 6 5.69371V13L16.577 9.47434C17.1653 9.27824 17.4594 9.18019 17.4594 9C17.4594 8.81981 17.1653 8.72176 16.577 8.52566Z" fill="#BDBDBD"/>
    <path d="M6.65811 5.21937L6.34189 6.16805H6.34189L6.65811 5.21937ZM16.577 8.52566L16.2607 9.47434L16.577 8.52566ZM16.577 9.47434L16.8932 10.423H16.8932L16.577 9.47434ZM5 19C5 19.5523 5.44772 20 6 20C6.55228 20 7 19.5523 7 19H5ZM6.10382 5.14405L5.51911 4.3328L5.51911 4.3328L6.10382 5.14405ZM6.34189 6.16805L16.2607 9.47434L16.8932 7.57698L6.97434 4.27069L6.34189 6.16805ZM7 13V5.69371H5V13H7ZM16.2607 8.52566L5.68377 12.0513L6.31623 13.9487L16.8932 10.423L16.2607 8.52566ZM5 13V18H7V13H5ZM5 18V19H7V18H5ZM16.2607 9.47434C16.4111 9.52448 16.5279 9.56347 16.6253 9.59839C16.7251 9.6342 16.7768 9.6561 16.8014 9.66803C16.8359 9.68484 16.7711 9.66018 16.6894 9.57665C16.6426 9.52888 16.5824 9.45387 16.5346 9.34828C16.485 9.23869 16.4594 9.11932 16.4594 9H18.4594C18.4594 8.24928 17.8132 7.93617 17.6763 7.86956C17.4553 7.76206 17.157 7.66492 16.8932 7.57698L16.2607 9.47434ZM16.8932 10.423C17.157 10.3351 17.4553 10.2379 17.6763 10.1304C17.8132 10.0638 18.4594 9.75072 18.4594 9H16.4594C16.4594 8.88068 16.485 8.76131 16.5346 8.65172C16.5824 8.54613 16.6426 8.47112 16.6894 8.42335C16.7711 8.33982 16.8359 8.31516 16.8014 8.33197C16.7768 8.3439 16.7251 8.3658 16.6253 8.40161C16.5279 8.43653 16.4111 8.47553 16.2607 8.52566L16.8932 10.423ZM6.97434 4.27069C6.85485 4.23086 6.65981 4.16314 6.48251 4.13158C6.28206 4.0959 5.8912 4.06462 5.51911 4.3328L6.68853 5.95529C6.56794 6.04221 6.43628 6.08708 6.31883 6.10209C6.21584 6.11526 6.14449 6.10285 6.13206 6.10064C6.11863 6.09825 6.12508 6.09841 6.16872 6.11166C6.21117 6.12456 6.26301 6.14176 6.34189 6.16805L6.97434 4.27069ZM7 5.69371C7 5.61057 7.00007 5.55595 7.00126 5.5116C7.00249 5.46601 7.00437 5.45984 7.00239 5.47333C7.00056 5.48582 6.98977 5.55744 6.94472 5.65098C6.89333 5.75765 6.80913 5.86837 6.68853 5.95529L5.51911 4.3328C5.14703 4.60099 5.0531 4.98168 5.02356 5.18313C4.99743 5.36132 5 5.56776 5 5.69371H7Z" fill="#BDBDBD"/>
  </svg>
)
