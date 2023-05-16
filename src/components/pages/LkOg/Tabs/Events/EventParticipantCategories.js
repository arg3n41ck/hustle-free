import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { Cancel, EventFormFooter, Field, Form, Submit } from './EventDefaults'
import styled from 'styled-components'
import ParticipantCategoriesCreate, {
  createParticipantCategory,
} from './ParticipantCategories/ParticipantCategoriesCreate'
import Table from '../../../../ui/Table/Table'
import { Collapse } from '@mui/material'
import ParticipantCategoriesEdit from './ParticipantCategories/ParticipantCategoriesEdit'
import EventParticipantCategoriesTableCollapseHead from './EventParticipantCategoriesTableCollapseHead'
import EventParticipantAutocomplete from './ParticipantCategories/EventParticipantAutocomplete'
import { useTranslation } from 'next-i18next'

const emptyInitialValues = {
  pc: [],
}

export const getGender = (gender, isFull = false) =>
  gender === 'male' ? (!isFull ? 'М' : 'Мужской') : !isFull ? 'Ж' : 'Женский'

const createDataForTable = (defaultData = []) => {
  return defaultData.map((currentValue) => {
    const { fromAge, fromWeight, gender, id, levels, name, price, toAge, toWeight } = currentValue

    return {
      id,
      name,
      level: levels?.length || 0,
      gender: getGender(gender),
      age: `${fromAge} - ${toAge}`,
      weight: `${fromWeight} кг - ${toWeight} кг`,
      price: price
        ? `${Math.round(price.standartPrice)} ${price.currency.toUpperCase()}`
        : `${Math.round(price || 0)}`,
    }
  })
}

function EventParticipantCategories({
  refreshPC,
  manualEventPC,
  selectedRows,
  eventId,
  sportType,
}) {
  const [participantCategories, setParticipantCategories] = useState([])
  const [openPCM, setOpenPCM] = useState(false)
  const [openPCME, setOpenPCME] = useState({ id: '' | [], step: '' })
  const [selectedInTableRows, setSelectedInTableRows] = useState([])
  const { push: routerPush } = useRouter()
  const { t: tLkOg } = useTranslation('lkOg')

  const validationSchema = yup.object({
    pc: yup.mixed().test({
      test: (array) => array.some((value) => value),
      message: tLkOg('validation.chooseAtLeastOneCategory'),
    }),
  })

  const { handleSubmit, errors, touched, setFieldValue } = useFormik({
    initialValues: emptyInitialValues,
    validationSchema,
    onSubmit: async () => {
      routerPush(`/lk-og/profile/events/edit/${eventId}/contacts`)
    },
  })

  useEffect(() => {
    if (selectedRows.length) {
      setParticipantCategories(createDataForTable(selectedRows))
    } else {
      setParticipantCategories([])
    }
  }, [selectedRows])

  const columns = useMemo(() => {
    return [
      {
        column: tLkOg('categoriesOfParticipants.categories'),
        accessor: 'name',
        onClick: (rowId) => setOpenPCME({ id: rowId, step: 'name' }),
      },
      {
        column: tLkOg('categoriesOfParticipants.levels'),
        accessor: 'level',
        onClick: (rowId) => setOpenPCME({ id: rowId, step: 'levels' }),
      },
      {
        column: tLkOg('categoriesOfParticipants.gender'),
        accessor: 'gender',
        onClick: (rowId) => setOpenPCME({ id: rowId, step: 'gender' }),
      },
      {
        column: tLkOg('categoriesOfParticipants.age'),
        accessor: 'age',
        onClick: (rowId) => setOpenPCME({ id: rowId, step: 'age' }),
      },
      {
        column: tLkOg('categoriesOfParticipants.weight'),
        accessor: 'weight',
        onClick: (rowId) => setOpenPCME({ id: rowId, step: 'weight' }),
      },
      {
        column: tLkOg('categoriesOfParticipants.price'),
        accessor: 'price',
        onClick: (rowId) => setOpenPCME({ id: rowId, step: 'price' }),
      },
    ]
  }, [])

  const onClickChangeSomeRows = ({ target: { value } }) => {
    setOpenPCME({ id: selectedInTableRows, step: value })
  }
  const onCreateNewPC = useCallback(() => {
    refreshPC()
  }, [selectedRows])

  useEffect(() => {
    participantCategories.length
      ? setFieldValue(
          'pc',
          participantCategories.map(({ id }) => id),
        )
      : setFieldValue('pc', [])
  }, [participantCategories])

  const onSelectManual = useCallback((values) => {
    values?.length &&
      values.map(async ({ price, ...value }) => {
        createParticipantCategory({
          ...value,
          levels: value.levels?.map(({ id }) => id),
          event: eventId,
        }).then(() => refreshPC())
      })
  }, [])

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field>
          <EventParticipantAutocomplete
            manualEventPC={manualEventPC}
            onSelectManual={onSelectManual}
          />
        </Field>

        <TableWrapper>
          <Collapse in={!!selectedInTableRows?.length}>
            <EventParticipantCategoriesTableCollapseHead
              onClickChangeSomeRows={onClickChangeSomeRows}
              selectedInTableRows={selectedInTableRows}
              refreshPC={refreshPC}
              selectedRows={selectedRows}
              setSelectedInTableRows={setSelectedInTableRows}
            />
          </Collapse>
          <Table
            columns={columns}
            select
            onSelect={(values) => setSelectedInTableRows(values)}
            selectedRows={selectedInTableRows}
            data={participantCategories}
          />
        </TableWrapper>

        {touched.pc && errors.pc && <Error>{errors.pc}</Error>}

        <EventFormFooter>
          <OpenPCM onClick={() => setOpenPCM(true)}>
            + {tLkOg('categoriesOfParticipants.addANewCategory')}
          </OpenPCM>
          <Cancel type='button' onClick={() => routerPush('/lk-og/profile/events')}>
            {tLkOg('editEvent.cancel')}
          </Cancel>
          <Submit type='submit' onClick={handleSubmit}>
            {tLkOg('editEvent.save')}
          </Submit>
        </EventFormFooter>
      </Form>
      <ParticipantCategoriesCreate
        open={openPCM}
        eventId={eventId}
        sportType={sportType}
        onCloseModals={() => setOpenPCM(false)}
        onCreatePC={(newPC) => onCreateNewPC(newPC)}
      />
      {!!(openPCME.id && openPCME.step) && (
        <ParticipantCategoriesEdit
          id={openPCME.id}
          defaultValues={selectedRows.find(({ id }) => id === openPCME?.id)}
          open={!!(openPCME.id && openPCME.step)}
          step={openPCME.step}
          sportType={sportType}
          refreshPC={refreshPC}
          eventId={eventId}
          onCloseModals={() => setOpenPCME({ id: '', step: '' })}
        />
      )}
    </>
  )
}

export default EventParticipantCategories

const TableWrapper = styled.div`
  display: grid;
  grid-template: 1fr / 1fr;
  margin: 0 -32px;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
`

const OpenPCM = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #6d4eea;
  margin: 0 auto 0 0;
  cursor: pointer;
`

const Error = styled.p`
  margin: 10px 0;
  color: #d32f2f;
`
