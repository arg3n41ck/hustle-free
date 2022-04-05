import React, { useEffect, useState } from "react"
import styled from "styled-components"
import $api from "../../../../services/axios"

const AboutUsSMI = ({ data }) => {
  const { id, title, link } = data

  return (
    <>
      <Item key={id}>
        <h2>{title.length <= 30 ? title : `${title.slice(0, 30)}...`}</h2>
        <a target={"_blank"} href={link}>
          {!!link &&
            link
              .replace("http://", "")
              .replace("https://", "")
              .split(/[/?#]/)[0]}
        </a>
      </Item>
    </>
  )
}
const Item = styled.div`
  min-width: 240px;
  max-width: 240px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  max-height: 152px;
  min-height: 152px;
  padding: 16px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #333333;
  }
  a {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #828282;
    text-decoration: none;
  }
`
export default AboutUsSMI
