import { decamelizeKeys } from "humps"

async function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      )
    })
  } else {
    const value = data == null ? "" : data
    const snakeParent = await decamelizeKeys({ [parentKey]: value })

    const decamelizeObjEnt = Object.entries(snakeParent)[0]
    formData.append(decamelizeObjEnt[0], value)
  }
}
export async function objToFormData(data) {
  const formData = new FormData()

  await buildFormData(formData, data)

  return formData
}
