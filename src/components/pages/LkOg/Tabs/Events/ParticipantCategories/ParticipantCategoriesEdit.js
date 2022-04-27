import React, { useCallback, useState } from "react"
import Name from "./Name"
import Levels from "./Levels"
import Age from "./Age"
import Weight from "./Weight"
import Gender from "./Gender"
import Price from "./Price"

const emptyState = {
  name: "",
  gender: null,
  fromAge: "",
  toAge: "",
  fromWeight: "",
  toWeight: "",
  levels: [],
  event: "",
  order: "",
  price: "",
}

function ParticipantCategoriesEdit({ onCloseModals, open, step }) {
  const [initialState, setInitialState] = useState(emptyState)
  const onClose = () => {
    setInitialState(emptyState)
    onCloseModals()
  }

  const onSubmit = useCallback((values) => {
    alert(`${JSON.stringify(values, null, 2)}`)
  }, [])

  switch (step) {
    case "name":
      return (
        <Name
          open={step === "name" && open}
          onClose={onClose}
          edit
          defaultValues={{ name: initialState.name }}
          submit={onSubmit}
        />
      )
    case "levels":
      return (
        <Levels
          open={step === "levels" && open}
          onClose={onClose}
          edit
          defaultValues={{ levels: initialState.levels }}
          submit={onSubmit}
        />
      )
    case "age":
      return (
        <Age
          open={step === "age" && open}
          onClose={onClose}
          edit
          defaultValues={{
            fromAge: initialState.fromAge,
            toAge: initialState.toAge,
          }}
          submit={onSubmit}
        />
      )
    case "weight":
      return (
        <Weight
          open={step === "weight" && open}
          onClose={onClose}
          edit
          defaultValues={{
            fromWeight: initialState.fromWeight,
            toWeight: initialState.toWeight,
          }}
          submit={onSubmit}
        />
      )
    case "gender":
      return (
        <Gender
          open={step === "gender" && open}
          onClose={onClose}
          edit
          defaultValues={{
            gender: initialState.gender,
          }}
          submit={onSubmit}
        />
      )
    case "price":
      return (
        <Price
          open={step === "price" && open}
          onClose={onClose}
          edit
          priceId={initialState.price}
          submit={(values) => {
            setInitialState((state) => ({ ...state, ...values }))
            console.log({ submit: initialState })
            onClose()
          }}
        />
      )

    default:
      return null
  }
}

export default ParticipantCategoriesEdit
