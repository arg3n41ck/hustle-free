import React, { useState, useEffect } from 'react'
import DropdownData from '../../../ui/DropdownData'
import Table from './Table'
import { getGender } from '../../LkOg/Tabs/Events/EventParticipantCategories'
import ULAccordion from '../../../ui/ULAccordion'
import { useMediaQuery } from '@mui/material'
import MobileRow from './MobileRow'

const dateKeys = [
  {
    start: 'earlyRegStart',
    end: 'earlyRegEnd',
    priceKey: 'earlyPrice',
  },
  {
    start: 'lateRegStart',
    end: 'lateRegEnd',
    priceKey: 'latePrice',
  },
  {
    start: 'standartRegStart',
    end: 'standartRegEnd',
    priceKey: 'standartPrice',
  },
]
const getRegDates = (start, end) => {
  const startDate = new Date(start).setHours(0, 0, 0, 0)
  const endDate = new Date(end).setHours(0, 0, 0, 0)
  const today = new Date().setHours(0, 0, 0, 0)
  return { startDate, endDate, today }
}

const getPriceByRegistration = (registration) => {
  return dateKeys.find(({ start, end }) => {
    if (registration[start] && registration[end]) {
      const { today, endDate, startDate } = getRegDates(registration[start], registration[end])
      return startDate <= today && today <= endDate
    }
  })
}

const createDataForTable = (pc = [], crp) => {
  const { id, fromAge, toAge, fromWeight, levels, toWeight, gender, price } = pc
  const { standartPrice, currency, latePrice } = price
  return levels
    .map(({ id: lId, name: lName }, i) => {
      return {
        id: `${id}-${lId}-${i}`,
        gender: getGender(gender, true),
        age: `${fromAge} - ${toAge} лет`,
        price: `${Math.round(price[crp] || standartPrice || latePrice)} ${currency.toLowerCase()}`,
        weight: `${fromWeight} - ${toWeight} кг`,
        name: lName,
      }
    })
    .flat(Infinity)
}

function Row({ pcItem, eventReg, columns }) {
  const [open, setOpen] = useState(!!pcItem)
  const [rewrittenData, setRewrittenData] = useState([])
  const [currentRegPeriod, setCurrentRegPeriod] = useState(null)
  const desk = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (eventReg) {
      const crp = getPriceByRegistration(eventReg)?.priceKey || null
      setCurrentRegPeriod(crp)
    }
  }, [eventReg])

  useEffect(() => {
    setRewrittenData(createDataForTable(pcItem, currentRegPeriod))
  }, [pcItem, currentRegPeriod])

  return desk ? (
    <DropdownData title={pcItem.name} active={open} setActive={setOpen}>
      <Table columns={columns} rewrittenData={rewrittenData} />
    </DropdownData>
  ) : (
    <ULAccordion title={pcItem.name} defaultExpanded={!!pcItem}>
      <MobileRow columns={columns} rewrittenData={rewrittenData} />
    </ULAccordion>
  )
}

export default Row
