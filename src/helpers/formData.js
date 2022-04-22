import { camelizeKeys, decamelizeKeys } from "humps"

async function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    const snakeCaseData = await decamelizeKeys(camelizeKeys(data))
    Object.keys(snakeCaseData).forEach((key) => {
      buildFormData(
        formData,
        snakeCaseData[key],
        parentKey ? `${parentKey}[${key}]` : key
      )
    })
  } else {
    const value = data == null ? "" : data

    formData.append(parentKey, value)
  }
}
export async function objToFormData(data) {
  const formData = new FormData()

  await buildFormData(formData, data)

  return formData
}
