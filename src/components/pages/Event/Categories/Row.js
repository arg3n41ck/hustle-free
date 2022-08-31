import React, { useState } from 'react'
import DropdownData from '../../../ui/DropdownData'
import Table from './Table'

function Row({ pcItem }) {
  const [open, setOpen] = useState(!!pcItem)

  return (
    <DropdownData title={pcItem.name} active={open} setActive={setOpen}>
      <Table pc={pcItem} />
    </DropdownData>
  )
}

export default Row
