import React from "react"
import styled from "styled-components"
import CardTemplate from "../../../ui/CardTemplate"
import { FileIcon, defaultStyles } from "react-file-icon"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../../../redux/components/navigations"
import { theme } from "../../../../styles/theme"

const Certificates = ({ certificates }) => {
  const dispatch = useDispatch()
  const sectionHandler = (section) => {
    dispatch(changeProfile(section))
  }

  return certificates.length ? (
    <CertificateItem certificates={certificates} />
  ) : (
    <CardTemplate
      title={"Сертификаты"}
      content={
        "Добавьте сертификаты, чтобы продемонстрировать свою компетентность"
      }
      buttonContent={"Добавить сертификаты"}
      section="certificates"
      path={"/profile/change-data"}
      onChangeSection={sectionHandler}
    />
  )
}

const CertificateItem = ({ certificates }) => {
  const dispatch = useDispatch()
  const skills = useSelector((state) => state.skills.skills)

  return (
    <Wrapper>
      <CertificatesHeader>
        <CertificatesTitle>Сертификаты</CertificatesTitle>
        <div onClick={() => dispatch(changeProfile("certificates"))}>
          <Link href={"/profile/change-data"} passHref>
            <CertificatesChange>
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
            </CertificatesChange>
          </Link>{" "}
        </div>
      </CertificatesHeader>
      <CertificatesBody>
        {certificates.map((item) => {
          const typeFile =
            item.image?.split(".")[item.image?.split(".").length - 1]
          return (
            <>
              <Certificate key={item.id}>
                <CertificatesImg>
                  <FileIcon
                    extension={typeFile}
                    labelColor={"#27AE60"}
                    {...defaultStyles[`${item.image ? typeFile : "file"}`]}
                  />
                </CertificatesImg>
                <CertificatesContent>
                  <h2>{item.nameOfCertificate}</h2>
                  <div>
                    {skills
                      .filter((itemFilter) =>
                        item.skills.includes(itemFilter.id)
                      )
                      .map((elem) => (
                        <Item key={elem.id}>{elem.title}</Item>
                      ))}
                  </div>
                  <CertificatesContentDescription>
                    {item.description}
                  </CertificatesContentDescription>
                  <div style={{ display: "flex", gridGap: 10 }}>
                    <CertificatesLink target="_blank" href={item.link}>
                      {item.link.length > 30
                        ? `${item.link.slice(0, 30)}...`
                        : item.link}
                    </CertificatesLink>
                    {item.image && (
                      <CertificatesLink target="_blank" href={item.image}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 2C2.44772 2 2 2.44772 2 3V11C2 11.5523 2.44772 12 3 12H11C11.5523 12 12 11.5523 12 11V10.5C12 9.94771 12.4477 9.5 13 9.5C13.5523 9.5 14 9.94771 14 10.5V11C14 12.6569 12.6569 14 11 14H3C1.34315 14 0 12.6569 0 11V3C0 1.34315 1.34315 0 3 0H3.5C4.05228 0 4.5 0.447715 4.5 1C4.5 1.55228 4.05228 2 3.5 2H3Z"
                            fill="#2F80ED"
                          />
                          <path
                            d="M6.5 1C6.5 0.447715 6.94772 0 7.5 0H12C13.1046 0 14 0.895431 14 2V6.5C14 7.05228 13.5523 7.5 13 7.5C12.4477 7.5 12 7.05228 12 6.5V3.41421L7.20711 8.20711C6.81658 8.59763 6.18342 8.59763 5.79289 8.20711C5.40237 7.81658 5.40237 7.18342 5.79289 6.79289L10.5858 2H7.5C6.94772 2 6.5 1.55228 6.5 1Z"
                            fill="#2F80ED"
                          />
                        </svg>
                      </CertificatesLink>
                    )}
                  </div>
                </CertificatesContent>
              </Certificate>
            </>
          )
        })}
      </CertificatesBody>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 832px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 32px 32px 0 32px;
  font-family: Inter, sans-serif;
  margin: 32px 0;
  color: #333333;
  a {
    color: #2f80ed;
  }
  ${theme.mqMax("lg")} {
    max-width: none;
  }
`
const CertificatesHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const CertificatesTitle = styled.h4`
  font-family: Inter, sans-serif;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
`
const CertificatesChange = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin: 0 8px;
    font-family: Inter, sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
  }
`
const Certificate = styled.div`
  display: flex;
  padding: 32px 0;
  border-bottom: 1px solid #d8d8d8;
  &:last-child {
    border-bottom: none;
  }
`
const CertificatesBody = styled.div``
const CertificatesImg = styled.div`
  width: 100%;
  max-width: 64px;
  margin-right: 16px;
`
const CertificatesContent = styled.div`
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
  }
  div {
    display: flex;
    margin: 8px 0;
    flex-wrap: wrap;
  }
  a {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }
`
const CertificatesContentDescription = styled.p`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin: 4px 0;
`
const CertificatesLink = styled.a`
  color: #2f80ed;

  svg {
  }
`
const Item = styled.p`
  padding: 8px 12px;
  text-align: center;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  margin: 3px;
  &:first-child {
    margin-left: 0;
  }
`
export default Certificates
