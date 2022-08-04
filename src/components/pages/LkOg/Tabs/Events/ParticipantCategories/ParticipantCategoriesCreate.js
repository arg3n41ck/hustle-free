import React, { useCallback, useState } from 'react'
import Name from './Name'
import Levels from './Levels'
import Age from './Age'
import Weight from './Weight'
import Gender from './Gender'
import Price from './Price'
import $api from '../../../../../../services/axios'

const emptyState = {
  name: '',
  gender: null,
  fromAge: '',
  toAge: '',
  fromWeight: '',
  toWeight: '',
  levels: [],
  event: '',
  price: '',
}

export const createParticipantCategory = async (values) => {
  try {
    const { data } = await $api.post('/directories/event_part_categories/', values)
    return data
  } catch (e) {
    console.log(e)
  }
}

function ParticipantCategoriesCreate({ onCreatePC, onCloseModals, open, eventId, sportType }) {
  const [initialState, setInitialState] = useState(emptyState)
  const [step, setStep] = useState('name')
  const onClose = () => {
    setInitialState(emptyState)
    setStep('name')
    onCloseModals()
  }

  const globalSubmit = useCallback((values) => {
    createParticipantCategory({ ...values, event: +eventId }).then((data) => {
      onCreatePC(data)
      setInitialState(emptyState)
      onClose()
    })
  }, [])

  const onSubmit = useCallback(
    (values, _step) => {
      const newValues = { ...initialState, ...values }
      setInitialState(newValues)
      _step !== 'close' ? setStep(_step) : globalSubmit(newValues)
    },
    [initialState, step],
  )

  switch (step) {
    case 'name':
      return (
        <Name
          open={step === 'name' && open}
          onClose={onClose}
          onBack={onClose}
          defaultValues={{ name: initialState.name }}
          submit={(values) => onSubmit(values, 'levels')}
        />
      )
    case 'levels':
      return (
        <Levels
          open={step === 'levels' && open}
          onClose={onClose}
          onBack={() => setStep('name')}
          eventId={eventId}
          name={initialState.name}
          sportType={sportType}
          defaultValues={initialState.levels}
          submit={(values) => onSubmit(values, 'age')}
        />
      )
    case 'age':
      return (
        <Age
          open={step === 'age' && open}
          onClose={onClose}
          onBack={() => setStep('levels')}
          name={initialState.name}
          defaultValues={{
            fromAge: initialState.fromAge,
            toAge: initialState.toAge,
          }}
          submit={(values) => onSubmit(values, 'weight')}
        />
      )
    case 'weight':
      return (
        <Weight
          open={step === 'weight' && open}
          onClose={onClose}
          onBack={() => setStep('age')}
          name={initialState.name}
          defaultValues={{
            fromWeight: initialState.fromWeight,
            toWeight: initialState.toWeight,
          }}
          submit={(values) => onSubmit(values, 'gender')}
        />
      )
    case 'gender':
      return (
        <Gender
          open={step === 'gender' && open}
          onClose={onClose}
          onBack={() => setStep('weight')}
          name={initialState.name}
          defaultValues={{
            gender: initialState.gender,
          }}
          submit={(values) => onSubmit(values, 'price')}
        />
      )
    case 'price':
      return (
        <Price
          open={step === 'price' && open}
          onClose={onClose}
          onBack={() => setStep('gender')}
          name={initialState.name}
          eventId={eventId}
          priceId={initialState.price}
          submit={(values) => onSubmit(values, 'close')}
        />
      )

    default:
      return null
  }
}

export default ParticipantCategoriesCreate
