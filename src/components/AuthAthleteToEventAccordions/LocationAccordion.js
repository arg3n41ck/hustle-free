import React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import styled from "styled-components"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import AddressIcon from "../../public/svg/address.svg"
import { selectCountriesAndCities } from "../../redux/components/countriesAndCities"
import { useSelector } from "react-redux"

function LocationAccordion({ data }) {
  const [countries, cities] = useSelector(selectCountriesAndCities)

  const country = countries.find(({ id }) => id === data?.location.country)
  const city = cities.find(({ id }) => id === data?.location.city)

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
        <AccordionDetails sx={{ padding: "24px" }}>
          <LocationAccordionItems>
            <LocationPageIcon type={"location"} />
            <div>
              <LocationItemsText>
                {country?.name}, {city?.name}, {data?.location?.address}
              </LocationItemsText>
            </div>
          </LocationAccordionItems>

          <LocationAccordionItems margin={"24px 0"}>
            <LocationPageIcon type={"address"} />
            <div>
              <LocationItemsText>
                {data?.location?.placeName}, {data?.location?.weighingPlace}
              </LocationItemsText>
            </div>
          </LocationAccordionItems>
        </AccordionDetails>
      </LocationAccordionCustom>
    </div>
  )
}

export default LocationAccordion

const LocationAccordionCustomHeadingText = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`

const LocationItemsText = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`

const LocationAccordionItems = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
  align-items: flex-start;
  margin: ${({ margin }) => (!!margin ? margin : 0)};
`

const Line = styled.div`
  border: 1px solid #333333;
  width: 100%;
  margin: ${({ margin }) => (!!margin ? margin : 0)};
`

const LocationAccordionCustom = styled(Accordion)`
  background: #1b1c22;
  border: 1px solid #333333;
  border-radius: 16px !important;
  padding: 24px 0px;
  margin: 0;
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
            fill="#BDBDBD"
          />
        </svg>
      )}
      {type === "address" && <AddressIcon />}
    </>
  )
}
