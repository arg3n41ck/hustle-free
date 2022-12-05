import { useState } from 'react'
import Router from 'next/router'
import FullScreenLoader from './FullScreenLoader'

const RouterLoader = ({ open }) => {
  const [routeLoading, setRouterLoading] = useState(false)

  Router.onRouteChangeStart = () => setRouterLoading(true)
  Router.onRouteChangeComplete = () => setRouterLoading(false)
  return <FullScreenLoader open={open || routeLoading} />
}

export default RouterLoader
