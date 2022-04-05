import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { theme } from "../../styles/theme"

const CardTemplate = ({
  title,
  content,
  buttonContent,
  section,
  path,
  onChangeSection,
  isStartup = false,
  startupOnChangeTabs,
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <AddButton
        onClick={() => {
          !isStartup && onChangeSection
            ? onChangeSection(section)
            : startupOnChangeTabs && startupOnChangeTabs()
        }}
      >
        {!isStartup ? (
          <Link href={path} passHref>
            <A>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 6L12.5 18"
                  stroke="#27AE60"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M18.5 12L6.5 12"
                  stroke="#27AE60"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <ButtonContent>{buttonContent}</ButtonContent>
            </A>
          </Link>
        ) : (
          <A>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 6L12.5 18"
                stroke="#27AE60"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M18.5 12L6.5 12"
                stroke="#27AE60"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <ButtonContent>{buttonContent}</ButtonContent>
          </A>
        )}
      </AddButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 832px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  text-align: center;
  padding: 32px;
  font-family: Inter, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 0;
  ${theme.mqMax("lg")} {
    max-width: none;
  }
  &:hover {
    box-shadow: 0 8px 32px rgba(74, 74, 74, 0.12);
    button {
      background: #27ae60;
      transition: 0.4s;
      a {
        p {
          color: #fff;
          transition: 0.4s;
        }
        svg * {
          stroke: #fff;
          transition: 0.4s;
        }
      }
    }
  }
`
const Title = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
  margin-bottom: 8px;
  font-family: Inter, sans-serif;
`
const Content = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  margin-bottom: 32px;
`
const AddButton = styled.button`
  width: 100%;
  max-width: 390px;
  background-color: rgba(111, 207, 151, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #27ae60;
  margin-left: 10px;
`
const ButtonContent = styled.p`
  color: #27ae60;
`
const A = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`

export default CardTemplate
