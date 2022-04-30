import React, { useState } from "react"
import DropdownData from "../../../ui/DropdownData"
import Table from "./Table"

function Row({ pcItem }) {
  const [open, setOpen] = useState(false)
  return (
    <DropdownData title={pcItem.name} active={open} setActive={setOpen}>
      <Table pc={pcItem} />
    </DropdownData>
  )
}

export default Row
