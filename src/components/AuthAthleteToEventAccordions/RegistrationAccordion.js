import React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import styled from "styled-components"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import { getRusBetweenDate } from "../../helpers/helpers"

function RegistrationAccordion({ data }) {
  console.log(data)
  return (
    <div>
      <RegistrationAccordionCustom
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
          <RegistrationAccordionCustomHeadingText>
            Регистрация
          </RegistrationAccordionCustomHeadingText>
        </AccordionSummary>
        <Line />
        <AccordionDetails sx={{ padding: "24px" }}>
          {!!data?.registration?.earlyRegActive && (
            <RegistrationAccordionItems>
              <RegistrationIcon period="early" />
              <div>
                <RegistrationAccordionItemTopText>
                  Ранняя регистрация
                </RegistrationAccordionItemTopText>
                <RegistrationAccordionItemBottomText>
                  {getRusBetweenDate(
                    data?.registration?.earlyRegStart,
                    data?.registration?.earlyRegEnd
                  )}
                </RegistrationAccordionItemBottomText>
              </div>
            </RegistrationAccordionItems>
          )}
          <Line margin={"24px 0"} />
          <RegistrationAccordionItems>
            <RegistrationIcon period="standart" />
            <div>
              <RegistrationAccordionItemTopText>
                Стандартная регистрация
              </RegistrationAccordionItemTopText>
              <RegistrationAccordionItemBottomText>
                {getRusBetweenDate(
                  data?.registration?.standartRegStart,
                  data?.registration?.standartRegEnd
                )}
              </RegistrationAccordionItemBottomText>
            </div>
          </RegistrationAccordionItems>
          <Line margin={"24px 0"} />
          {data?.registration?.late_reg_active && (
            <>
              <RegistrationAccordionItems>
                <RegistrationIcon period="late" />
                <div>
                  <RegistrationAccordionItemTopText>
                    Поздняя регистрация
                  </RegistrationAccordionItemTopText>
                  <RegistrationAccordionItemBottomText>
                    {getRusBetweenDate(
                      data?.registration?.lateRegStart,
                      data?.registration?.lateRegEnd
                    )}
                  </RegistrationAccordionItemBottomText>
                </div>
              </RegistrationAccordionItems>
              <Line margin={"24px 0"} />
            </>
          )}
          <RegistrationAccordionItems>
            <RegistrationIcon period="period" />
            <div>
              <RegistrationAccordionItemTopText>
                Длительность турнира
              </RegistrationAccordionItemTopText>
              <RegistrationAccordionItemBottomText>
                {getRusBetweenDate(data?.dateStart, data?.dateEnd)}
              </RegistrationAccordionItemBottomText>
            </div>
          </RegistrationAccordionItems>
        </AccordionDetails>
      </RegistrationAccordionCustom>
    </div>
  )
}

export default RegistrationAccordion

const RegistrationAccordionItemBottomText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`

const RegistrationAccordionItemTopText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
`

const RegistrationAccordionCustomHeadingText = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`

const RegistrationAccordionCustom = styled(Accordion)`
  background: #1b1c22;
  border: 1px solid #333333;
  border-radius: 16px !important;
  padding: 24px 0px;
  margin: 0;
`

const RegistrationAccordionItems = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
  align-items: flex-start;
`

const Line = styled.div`
  border: 1px solid #333333;
  width: 100%;
  margin: ${({ margin }) => (!!margin ? margin : 0)};
`

const RegistrationIcon = ({ period }) => {
  return (
    <>
      {period === "early" && (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.30932 35.6905L10.0164 34.9834L10.0164 34.9834L9.30932 35.6905ZM30.69 35.6905L29.9829 34.9834V34.9834L30.69 35.6905ZM31.1046 9.81493L30.2731 10.3705V10.3705L31.1046 9.81493ZM30.1849 8.89526L29.6293 9.72673V9.72673L30.1849 8.89526ZM8.89478 9.81493L9.72625 10.3705L8.89478 9.81493ZM9.81444 8.89526L10.37 9.72673L9.81444 8.89526ZM30.6663 14.1668V30.0002H32.6663V14.1668H30.6663ZM24.9997 35.6668H14.9997V37.6668H24.9997V35.6668ZM9.33301 30.0002V14.1668H7.33301V30.0002H9.33301ZM14.9997 35.6668C13.4001 35.6668 12.3009 35.6647 11.4753 35.5537C10.6785 35.4466 10.2878 35.2548 10.0164 34.9834L8.60221 36.3976C9.30714 37.1026 10.1903 37.3989 11.2089 37.5359C12.1987 37.669 13.4566 37.6668 14.9997 37.6668V35.6668ZM7.33301 30.0002C7.33301 31.5432 7.33088 32.8012 7.46396 33.791C7.60091 34.8096 7.89729 35.6927 8.60221 36.3976L10.0164 34.9834C9.74504 34.712 9.55326 34.3213 9.44613 33.5245C9.33513 32.6989 9.33301 31.5998 9.33301 30.0002H7.33301ZM30.6663 30.0002C30.6663 31.5998 30.6642 32.6989 30.5532 33.5245C30.4461 34.3213 30.2543 34.712 29.9829 34.9834L31.3971 36.3976C32.1021 35.6927 32.3984 34.8096 32.5354 33.791C32.6685 32.8012 32.6663 31.5432 32.6663 30.0002H30.6663ZM24.9997 37.6668C26.5428 37.6668 27.8007 37.669 28.7905 37.5359C29.8091 37.3989 30.6922 37.1026 31.3971 36.3976L29.9829 34.9834C29.7115 35.2548 29.3208 35.4466 28.524 35.5537C27.6984 35.6647 26.5993 35.6668 24.9997 35.6668V37.6668ZM32.6663 14.1668C32.6663 13.0173 32.6676 12.0798 32.591 11.3272C32.5127 10.5578 32.345 9.87143 31.936 9.25936L30.2731 10.3705C30.4259 10.5992 30.5391 10.9184 30.6013 11.5296C30.6651 12.1575 30.6663 12.9756 30.6663 14.1668H32.6663ZM25.833 9.3335C27.0242 9.3335 27.8423 9.3347 28.4703 9.39858C29.0815 9.46076 29.4007 9.57394 29.6293 9.72673L30.7405 8.06379C30.1284 7.65482 29.442 7.48712 28.6727 7.40885C27.92 7.33229 26.9826 7.3335 25.833 7.3335V9.3335ZM31.936 9.25936C31.6199 8.7862 31.2136 8.37995 30.7405 8.06379L29.6293 9.72673C29.8841 9.89697 30.1029 10.1157 30.2731 10.3705L31.936 9.25936ZM9.33301 14.1668C9.33301 12.9756 9.33422 12.1575 9.39809 11.5296C9.46027 10.9184 9.57345 10.5992 9.72625 10.3705L8.06331 9.25936C7.65433 9.87143 7.48663 10.5578 7.40836 11.3272C7.3318 12.0798 7.33301 13.0173 7.33301 14.1668H9.33301ZM14.1663 7.3335C13.0168 7.3335 12.0793 7.33229 11.3267 7.40885C10.5573 7.48712 9.87094 7.65482 9.25887 8.06379L10.37 9.72673C10.5987 9.57394 10.9179 9.46076 11.5291 9.39858C12.157 9.3347 12.9751 9.3335 14.1663 9.3335V7.3335ZM9.72625 10.3705C9.89648 10.1157 10.1152 9.89697 10.37 9.72673L9.25887 8.06379C8.78571 8.37995 8.37946 8.7862 8.06331 9.25936L9.72625 10.3705Z"
            fill="#27AE60"
          />
          <path
            d="M15 8.33333C15 6.49238 16.4924 5 18.3333 5H21.6667C23.5076 5 25 6.49238 25 8.33333C25 10.1743 23.5076 11.6667 21.6667 11.6667H18.3333C16.4924 11.6667 15 10.1743 15 8.33333Z"
            stroke="#27AE60"
            stroke-width="2"
          />
          <path
            d="M15 20L25 20"
            stroke="#27AE60"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M15 26.6665L21.6667 26.6665"
            stroke="#27AE60"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      )}
      {period === "standart" && (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.30932 35.6905L10.0164 34.9834L10.0164 34.9834L9.30932 35.6905ZM30.69 35.6905L29.9829 34.9834V34.9834L30.69 35.6905ZM31.1046 9.81493L30.2731 10.3705V10.3705L31.1046 9.81493ZM30.1849 8.89526L29.6293 9.72673V9.72673L30.1849 8.89526ZM8.89478 9.81493L9.72625 10.3705L8.89478 9.81493ZM9.81444 8.89526L10.37 9.72673L9.81444 8.89526ZM30.6663 14.1668V30.0002H32.6663V14.1668H30.6663ZM24.9997 35.6668H14.9997V37.6668H24.9997V35.6668ZM9.33301 30.0002V14.1668H7.33301V30.0002H9.33301ZM14.9997 35.6668C13.4001 35.6668 12.3009 35.6647 11.4753 35.5537C10.6785 35.4466 10.2878 35.2548 10.0164 34.9834L8.60221 36.3976C9.30714 37.1026 10.1903 37.3989 11.2089 37.5359C12.1987 37.669 13.4566 37.6668 14.9997 37.6668V35.6668ZM7.33301 30.0002C7.33301 31.5432 7.33088 32.8012 7.46396 33.791C7.60091 34.8096 7.89729 35.6927 8.60221 36.3976L10.0164 34.9834C9.74504 34.712 9.55326 34.3213 9.44613 33.5245C9.33513 32.6989 9.33301 31.5998 9.33301 30.0002H7.33301ZM30.6663 30.0002C30.6663 31.5998 30.6642 32.6989 30.5532 33.5245C30.4461 34.3213 30.2543 34.712 29.9829 34.9834L31.3971 36.3976C32.1021 35.6927 32.3984 34.8096 32.5354 33.791C32.6685 32.8012 32.6663 31.5432 32.6663 30.0002H30.6663ZM24.9997 37.6668C26.5428 37.6668 27.8007 37.669 28.7905 37.5359C29.8091 37.3989 30.6922 37.1026 31.3971 36.3976L29.9829 34.9834C29.7115 35.2548 29.3208 35.4466 28.524 35.5537C27.6984 35.6647 26.5993 35.6668 24.9997 35.6668V37.6668ZM32.6663 14.1668C32.6663 13.0173 32.6676 12.0798 32.591 11.3272C32.5127 10.5578 32.345 9.87143 31.936 9.25936L30.2731 10.3705C30.4259 10.5992 30.5391 10.9184 30.6013 11.5296C30.6651 12.1575 30.6663 12.9756 30.6663 14.1668H32.6663ZM25.833 9.3335C27.0242 9.3335 27.8423 9.3347 28.4703 9.39858C29.0815 9.46076 29.4007 9.57394 29.6293 9.72673L30.7405 8.06379C30.1284 7.65482 29.442 7.48712 28.6727 7.40885C27.92 7.33229 26.9826 7.3335 25.833 7.3335V9.3335ZM31.936 9.25936C31.6199 8.7862 31.2136 8.37995 30.7405 8.06379L29.6293 9.72673C29.8841 9.89697 30.1029 10.1157 30.2731 10.3705L31.936 9.25936ZM9.33301 14.1668C9.33301 12.9756 9.33422 12.1575 9.39809 11.5296C9.46027 10.9184 9.57345 10.5992 9.72625 10.3705L8.06331 9.25936C7.65433 9.87143 7.48663 10.5578 7.40836 11.3272C7.3318 12.0798 7.33301 13.0173 7.33301 14.1668H9.33301ZM14.1663 7.3335C13.0168 7.3335 12.0793 7.33229 11.3267 7.40885C10.5573 7.48712 9.87094 7.65482 9.25887 8.06379L10.37 9.72673C10.5987 9.57394 10.9179 9.46076 11.5291 9.39858C12.157 9.3347 12.9751 9.3335 14.1663 9.3335V7.3335ZM9.72625 10.3705C9.89648 10.1157 10.1152 9.89697 10.37 9.72673L9.25887 8.06379C8.78571 8.37995 8.37946 8.7862 8.06331 9.25936L9.72625 10.3705Z"
            fill="#2E79DD"
          />
          <path
            d="M15 8.33333C15 6.49238 16.4924 5 18.3333 5H21.6667C23.5076 5 25 6.49238 25 8.33333C25 10.1743 23.5076 11.6667 21.6667 11.6667H18.3333C16.4924 11.6667 15 10.1743 15 8.33333Z"
            stroke="#2E79DD"
            stroke-width="2"
          />
          <path
            d="M15 20L25 20"
            stroke="#2E79DD"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M15 26.6665L21.6667 26.6665"
            stroke="#2E79DD"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      )}
      {period === "late" && (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.30932 35.6905L10.0164 34.9834L10.0164 34.9834L9.30932 35.6905ZM30.69 35.6905L29.9829 34.9834V34.9834L30.69 35.6905ZM31.1046 9.81493L30.2731 10.3705V10.3705L31.1046 9.81493ZM30.1849 8.89526L29.6293 9.72673V9.72673L30.1849 8.89526ZM8.89478 9.81493L9.72625 10.3705L8.89478 9.81493ZM9.81444 8.89526L10.37 9.72673L9.81444 8.89526ZM30.6663 14.1668V30.0002H32.6663V14.1668H30.6663ZM24.9997 35.6668H14.9997V37.6668H24.9997V35.6668ZM9.33301 30.0002V14.1668H7.33301V30.0002H9.33301ZM14.9997 35.6668C13.4001 35.6668 12.3009 35.6647 11.4753 35.5537C10.6785 35.4466 10.2878 35.2548 10.0164 34.9834L8.60221 36.3976C9.30714 37.1026 10.1903 37.3989 11.2089 37.5359C12.1987 37.669 13.4566 37.6668 14.9997 37.6668V35.6668ZM7.33301 30.0002C7.33301 31.5432 7.33088 32.8012 7.46396 33.791C7.60091 34.8096 7.89729 35.6927 8.60221 36.3976L10.0164 34.9834C9.74504 34.712 9.55326 34.3213 9.44613 33.5245C9.33513 32.6989 9.33301 31.5998 9.33301 30.0002H7.33301ZM30.6663 30.0002C30.6663 31.5998 30.6642 32.6989 30.5532 33.5245C30.4461 34.3213 30.2543 34.712 29.9829 34.9834L31.3971 36.3976C32.1021 35.6927 32.3984 34.8096 32.5354 33.791C32.6685 32.8012 32.6663 31.5432 32.6663 30.0002H30.6663ZM24.9997 37.6668C26.5428 37.6668 27.8007 37.669 28.7905 37.5359C29.8091 37.3989 30.6922 37.1026 31.3971 36.3976L29.9829 34.9834C29.7115 35.2548 29.3208 35.4466 28.524 35.5537C27.6984 35.6647 26.5993 35.6668 24.9997 35.6668V37.6668ZM32.6663 14.1668C32.6663 13.0173 32.6676 12.0798 32.591 11.3272C32.5127 10.5578 32.345 9.87143 31.936 9.25936L30.2731 10.3705C30.4259 10.5992 30.5391 10.9184 30.6013 11.5296C30.6651 12.1575 30.6663 12.9756 30.6663 14.1668H32.6663ZM25.833 9.3335C27.0242 9.3335 27.8423 9.3347 28.4703 9.39858C29.0815 9.46076 29.4007 9.57394 29.6293 9.72673L30.7405 8.06379C30.1284 7.65482 29.442 7.48712 28.6727 7.40885C27.92 7.33229 26.9826 7.3335 25.833 7.3335V9.3335ZM31.936 9.25936C31.6199 8.7862 31.2136 8.37995 30.7405 8.06379L29.6293 9.72673C29.8841 9.89697 30.1029 10.1157 30.2731 10.3705L31.936 9.25936ZM9.33301 14.1668C9.33301 12.9756 9.33422 12.1575 9.39809 11.5296C9.46027 10.9184 9.57345 10.5992 9.72625 10.3705L8.06331 9.25936C7.65433 9.87143 7.48663 10.5578 7.40836 11.3272C7.3318 12.0798 7.33301 13.0173 7.33301 14.1668H9.33301ZM14.1663 7.3335C13.0168 7.3335 12.0793 7.33229 11.3267 7.40885C10.5573 7.48712 9.87094 7.65482 9.25887 8.06379L10.37 9.72673C10.5987 9.57394 10.9179 9.46076 11.5291 9.39858C12.157 9.3347 12.9751 9.3335 14.1663 9.3335V7.3335ZM9.72625 10.3705C9.89648 10.1157 10.1152 9.89697 10.37 9.72673L9.25887 8.06379C8.78571 8.37995 8.37946 8.7862 8.06331 9.25936L9.72625 10.3705Z"
            fill="#EB5757"
          />
          <path
            d="M15 8.33333C15 6.49238 16.4924 5 18.3333 5H21.6667C23.5076 5 25 6.49238 25 8.33333C25 10.1743 23.5076 11.6667 21.6667 11.6667H18.3333C16.4924 11.6667 15 10.1743 15 8.33333Z"
            stroke="#EB5757"
            stroke-width="2"
          />
          <path
            d="M15 20L25 20"
            stroke="#EB5757"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M15 26.6665L21.6667 26.6665"
            stroke="#EB5757"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      )}

      {period === "period" && (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5"
            y="10"
            width="30"
            height="25"
            rx="2"
            stroke="#BDBDBD"
            stroke-width="2"
          />
          <path
            d="M5 14C5 12.1144 5 11.1716 5.58579 10.5858C6.17157 10 7.11438 10 9 10H31C32.8856 10 33.8284 10 34.4142 10.5858C35 11.1716 35 12.1144 35 14V16.6667H5V14Z"
            fill="#BDBDBD"
          />
          <path
            d="M11.667 5L11.667 10"
            stroke="#BDBDBD"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M28.333 5L28.333 10"
            stroke="#BDBDBD"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      )}
    </>
  )
}
