import React, { useEffect, useState } from "react"
import $api from "../../../../services/axios"
import { useRouter } from "next/router"
import Row from "./Row"
import styled from "styled-components"

const getEventPC = async (query) => {
  const { data } = await $api.get(`/events/participant_category/`, {
    params: query,
  })
  return data
}

const createPCList = (pc) => {
  return pc.reduce((pre, { eventParticipantsCategory }) => {
    const findIsPcInPre =
      pre?.length && pre.some(({ id }) => id === eventParticipantsCategory.id)
    if (!findIsPcInPre) {
      pre = [...(pre || []), eventParticipantsCategory]
    }
    return pre
  }, [])
}

function EventCategories() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [pc, setPc] = useState([])
  console.log(pc)
  useEffect(() => {
    getEventPC({ event_id: eventId }).then((data) => {
      data?.length && setPc(createPCList(data))
    })
  }, [])

  return (
    <CollapseWrapper>
      {!!pc?.length &&
        pc.map((pci) => (
          <Row key={`EventCategories_PC_Collapse_${pci.id}`} pcItem={pci} />
        ))}
    </CollapseWrapper>
  )
}

export default EventCategories

const CollapseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
`
