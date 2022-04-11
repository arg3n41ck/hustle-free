import React, { useEffect, useState } from "react"
import $api from "../../../../../services/axios"
import Service from "./Service"
import { useSelector } from "react-redux"

const ServicesList = () => {
  const [favoritesServices, setFavoritesServices] = useState([])
  const { user } = useSelector((state) => state.user)

  // useEffect(async () => {
  //   const resFavoritesServices = await $api.get(
  //     `/accounts/users/${user.id}/service_favorites/`
  //   )
  //   setFavoritesServices(resFavoritesServices.data)
  // }, [])

  const deleteHandler = async (id) => {
    const index = favoritesServices.findIndex((service) => service.id === id)
    setFavoritesServices((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ])
    await $api.delete(`/favorites/services/${id}/`)
  }

  return (
    <>
      {favoritesServices.map((service) => (
        <Service
          onDelete={deleteHandler}
          serviceId={service.id}
          service={service.service}
          key={service.id}
        />
      ))}
    </>
  )
}

export default ServicesList
