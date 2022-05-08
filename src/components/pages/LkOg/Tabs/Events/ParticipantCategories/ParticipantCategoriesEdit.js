import React, { useCallback, useState } from "react"
import Name from "./Name"
import Levels from "./Levels"
import Age from "./Age"
import Weight from "./Weight"
import Gender from "./Gender"
import Price from "./Price"
import $api from "../../../../../../services/axios"

const emptyState = {
  name: "",
  gender: null,
  fromAge: "",
  toAge: "",
  fromWeight: "",
  toWeight: "",
  levels: [],
  event: "",
  price: "",
}

export const editParticipantCategory = async (values, id) => {
  try {
    const { data } = await $api.patch(
      `/directory/participants_categories/${id}/`,
      values
    )
    return data
  } catch (e) {
    console.log(e)
  }
}

function ParticipantCategoriesEdit({
  id,
  onCloseModals,
  open,
  step,
  sportType,
  refreshPC,
  defaultValues,
  eventId,
}) {
  const [initialState, setInitialState] = useState(defaultValues || emptyState)
  const onClose = () => {
    setInitialState(emptyState)
    onCloseModals()
  }
  const onSubmit = useCallback(
    async (values) => {
      //!Это из-за Алиаскара, Алиаскар к∆т∆кбас, и сама архитектура хvњня
      if (step !== 'price') {
        Array.isArray(id)
          ? await Promise.all(
            id.map((_id) => editParticipantCategory(values, +_id))
          )
          : await editParticipantCategory(values, +id)
      }
      onCloseModals()
      setTimeout(() => {
        refreshPC()
      }, 500)
    },
    [initialState]
  )

  switch (step) {
    case "name":
      return (
        <Name
          open={step === "name" && open}
          onClose={onClose}
          defaultValues={{ name: initialState.name }}
          submit={(values) => onSubmit(values)}
        />
      )
    case "levels":
      return (
        <Levels
          open={step === "levels" && open}
          onClose={onClose}
          eventId={eventId}
          sportType={sportType}
          defaultValues={{
            levels:
              initialState?.levels?.length &&
              initialState?.levels.map(({ id }) => id),
          }}
          submit={(values) => onSubmit(values)}
        />
      )
    case "age":
      return (
        <Age
          open={step === "age" && open}
          onClose={onClose}
          defaultValues={{
            fromAge: initialState.fromAge,
            toAge: initialState.toAge,
          }}
          submit={(values) => onSubmit(values)}
        />
      )
    case "weight":
      return (
        <Weight
          open={step === "weight" && open}
          onClose={onClose}
          defaultValues={{
            fromWeight: initialState.fromWeight,
            toWeight: initialState.toWeight,
          }}
          submit={(values) => onSubmit(values)}
        />
      )
    case "gender":
      return (
        <Gender
          open={step === "gender" && open}
          onClose={onClose}
          defaultValues={{
            gender: initialState.gender,
          }}
          submit={(values) => onSubmit(values)}
        />
      )
    case "price":
      return (
        <Price
          open={step === "price" && open}
          onClose={onClose}
          id={id}
          edit
          eventId={eventId}
          priceId={initialState.price?.id}
          submit={(values) => onSubmit(values)}
        />
      )

    default:
      return null
  }
}

export default ParticipantCategoriesEdit
