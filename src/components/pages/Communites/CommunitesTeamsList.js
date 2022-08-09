import React from "react"
import Teams from "../../pages/LkAh/Tabs/Profile/Teams/Teams"
import styled from "styled-components"

function CommunitesList({ data }) {
  console.log({data});
  return (
    <CommunitesListItems>
      {!!data?.length &&
        data.map((item) => <Teams data={item} column={true} />)}
    </CommunitesListItems>
  )
}

export default CommunitesList

const CommunitesListItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 32px;
`
