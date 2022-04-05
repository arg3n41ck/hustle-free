import { Modal } from "@mui/material"
import { useState } from "react"
import Router from "next/router"
import styled from "styled-components"

const RouterLoader = () => {
  const [routeLoading, setRouterLoading] = useState(false)

  Router.onRouteChangeStart = () => setRouterLoading(true)
  Router.onRouteChangeComplete = () => setRouterLoading(false)
  return (
    <Modal
      // sx={{
      //   "& .MuiBackdrop-root": {
      //     backgroundColor: "rgba(255, 255, 255, 0.78) !important",
      //   },
      // }}
      open={routeLoading}
    >
      <LDSRing>
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </LDSRing>
    </Modal>
  )
}

const LDSRing = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & .lds-ring {
    display: flex;

    align-items: center;
    justify-content: center;
    position: relative;
    width: 120px;
    height: 120px;

    & div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 98px;
      height: 98px;
      margin: 8px;
      border: 8px solid #6d4eea;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #6d4eea transparent transparent transparent;
    }

    & div:nth-child(1) {
      animation-delay: -0.45s;
    }

    & div:nth-child(2) {
      animation-delay: -0.3s;
    }

    & div:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default RouterLoader
