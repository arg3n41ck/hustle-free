import Link from "next/link"
import { Skeleton } from "@mui/material"
import React from "react"
import styled from "styled-components"

const NotificationItems = () => {
  return (
    <>
      <Link passHref href={`/redirect/`}>
        <ListItem>
          {/*TODO user avatar*/}
          <Skeleton
            variant="circular"
            width={64}
            height={64}
            sx={{ marginRight: 1.2 }}
          />
          <Text>Сообщение об успехе или о выполнении условий</Text>
        </ListItem>
      </Link>
    </>
  )
}

export default NotificationItems

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-gap: 12px;
  border-top: 1px solid #333333;
  border-bottom: 1px solid #333333;
  padding: 16px;
  cursor: pointer;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;

  color: #f2f2f2;
`
