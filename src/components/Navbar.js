import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { motion } from "framer-motion"
import { theme } from "../styles/theme"

const routes = [
  {
    name: "Главная",
    path: "/",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.66675 17.0127C6.66675 15.2024 6.66675 14.2972 7.0327 13.5016C7.39864 12.7059 8.0859 12.1168 9.46042 10.9387L10.7938 9.79582C13.2782 7.66632 14.5204 6.60156 16.0001 6.60156C17.4798 6.60156 18.722 7.66632 21.2064 9.79582L22.5397 10.9387C23.9143 12.1168 24.6015 12.7059 24.9675 13.5016C25.3334 14.2972 25.3334 15.2024 25.3334 17.0127V22.6666C25.3334 25.1807 25.3334 26.4378 24.5524 27.2189C23.7713 27.9999 22.5142 27.9999 20.0001 27.9999H12.0001C9.48592 27.9999 8.22885 27.9999 7.4478 27.2189C6.66675 26.4378 6.66675 25.1807 6.66675 22.6666V17.0127Z"
          stroke="#27AE60"
          strokeWidth="2"
        />
        <path
          d="M19.3334 28V21C19.3334 20.4477 18.8857 20 18.3334 20H13.6667C13.1145 20 12.6667 20.4477 12.6667 21V28"
          stroke="#27AE60"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Сообщество",
    path: "/",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.3031 27.2629C25.6954 25.5619 24.3562 24.0587 22.4934 22.9867C20.6305 21.9146 18.348 21.3335 15.9999 21.3335C13.6518 21.3335 11.3693 21.9146 9.50647 22.9867C7.64359 24.0587 6.30444 25.5619 5.69671 27.2629"
          stroke="#27AE60"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <ellipse
          cx="16.0001"
          cy="10.6668"
          rx="5.33333"
          ry="5.33333"
          stroke="#27AE60"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Услуги",
    path: "/",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.66675 8.6665C7.66675 8.11422 8.11446 7.6665 8.66675 7.6665H21.3334C22.9903 7.6665 24.3334 9.00965 24.3334 10.6665V23.3332C24.3334 23.8855 23.8857 24.3332 23.3334 24.3332H8.66675C8.11446 24.3332 7.66675 23.8855 7.66675 23.3332V8.6665Z"
          stroke="#27AE60"
          strokeWidth="2"
        />
        <path d="M12 7.99984V2.6665" stroke="#27AE60" strokeWidth="2" />
        <path d="M12 29.3333V24" stroke="#27AE60" strokeWidth="2" />
        <path d="M20 29.3333V24" stroke="#27AE60" strokeWidth="2" />
        <path d="M29.3333 20L24 20" stroke="#27AE60" strokeWidth="2" />
        <path d="M8.00008 20L2.66675 20" stroke="#27AE60" strokeWidth="2" />
        <path d="M8.00008 12L2.66675 12" stroke="#27AE60" strokeWidth="2" />
        <path
          d="M20.0001 3.6665C21.0944 3.6665 22.1781 3.88205 23.1891 4.30084C24.2002 4.71963 25.1188 5.33346 25.8926 6.10728C26.6665 6.8811 27.2803 7.79976 27.6991 8.81081C28.1179 9.82186 28.3334 10.9055 28.3334 11.9998"
          stroke="#27AE60"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    name: "Вакансии",
    path: "/",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 8C4 6.11438 4 5.17157 4.58579 4.58579C5.17157 4 6.11438 4 8 4H24C25.8856 4 26.8284 4 27.4142 4.58579C28 5.17157 28 6.11438 28 8V24C28 25.8856 28 26.8284 27.4142 27.4142C26.8284 28 25.8856 28 24 28H8C6.11438 28 5.17157 28 4.58579 27.4142C4 26.8284 4 25.8856 4 24V8Z"
          stroke="#27AE60"
          strokeWidth="2"
        />
        <path
          d="M4 13.3335V13.3335C4 15.2191 4 16.1619 4.58579 16.7477C5.17157 17.3335 6.11438 17.3335 8 17.3335H9.22515C9.92087 17.3335 10.2687 17.3335 10.5306 17.5223C10.7925 17.711 10.9025 18.041 11.1225 18.701L11.5442 19.966C11.7642 20.626 11.8742 20.956 12.136 21.1447C12.3979 21.3335 12.7458 21.3335 13.4415 21.3335H18.5585C19.2542 21.3335 19.6021 21.3335 19.864 21.1447C20.1258 20.956 20.2358 20.626 20.4558 19.966L20.8775 18.701C21.0975 18.041 21.2075 17.711 21.4694 17.5223C21.7313 17.3335 22.0791 17.3335 22.7749 17.3335H24C25.8856 17.3335 26.8284 17.3335 27.4142 16.7477C28 16.1619 28 15.2191 28 13.3335V13.3335"
          stroke="#27AE60"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    name: "Задачи",
    path: "/",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.33325 9.3335C5.33325 7.44788 5.33325 6.50507 5.91904 5.91928C6.50482 5.3335 7.44763 5.3335 9.33325 5.3335H11.6764C12.4939 5.3335 12.9026 5.3335 13.2702 5.48574C13.6377 5.63798 13.9268 5.92701 14.5048 6.50507L16.1617 8.16192C16.7397 8.73998 17.0288 9.02901 17.3963 9.18126C17.7639 9.3335 18.1726 9.3335 18.9901 9.3335H22.6666C24.5522 9.3335 25.495 9.3335 26.0808 9.91928C26.6666 10.5051 26.6666 11.4479 26.6666 13.3335V21.3335C26.6666 23.2191 26.6666 24.1619 26.0808 24.7477C25.495 25.3335 24.5522 25.3335 22.6666 25.3335H9.33326C7.44764 25.3335 6.50482 25.3335 5.91904 24.7477C5.33325 24.1619 5.33325 23.2191 5.33325 21.3335V9.3335Z"
          stroke="#27AE60"
          strokeWidth="2"
        />
        <path
          d="M6.66675 14.6665H25.3334"
          stroke="#27AE60"
          strokeWidth="2"
          strokeMiterlimit="1.41421"
        />
      </svg>
    ),
  },
  {
    name: "Новости",
    path: "/",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="6.66675"
          y="6.6665"
          width="18.6667"
          height="18.6667"
          rx="3"
          stroke="#27AE60"
          strokeWidth="2"
        />
        <path
          d="M8 13.3335H24"
          stroke="#27AE60"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Форум",
    path: "/",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.33325 9.3335C5.33325 7.44788 5.33325 6.50507 5.91904 5.91928C6.50482 5.3335 7.44763 5.3335 9.33325 5.3335H11.6764C12.4939 5.3335 12.9026 5.3335 13.2702 5.48574C13.6377 5.63798 13.9268 5.92701 14.5048 6.50507L16.1617 8.16192C16.7397 8.73998 17.0288 9.02901 17.3963 9.18126C17.7639 9.3335 18.1726 9.3335 18.9901 9.3335H22.6666C24.5522 9.3335 25.495 9.3335 26.0808 9.91928C26.6666 10.5051 26.6666 11.4479 26.6666 13.3335V21.3335C26.6666 23.2191 26.6666 24.1619 26.0808 24.7477C25.495 25.3335 24.5522 25.3335 22.6666 25.3335H9.33326C7.44764 25.3335 6.50482 25.3335 5.91904 24.7477C5.33325 24.1619 5.33325 23.2191 5.33325 21.3335V9.3335Z"
          stroke="#27AE60"
          strokeWidth="2"
        />
        <path
          d="M6.66675 14.6665H25.3334"
          stroke="#27AE60"
          strokeWidth="2"
          strokeMiterlimit="1.41421"
        />
      </svg>
    ),
  },
]

const Navbar = ({ open, lg }) => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: lg ? { opacity: 0, x: "-100%" } : { opacity: 1, x: 0 },
  }

  return (
    <Wrapper animate={open ? "open" : "closed"} variants={variants} open={open}>
      {routes.map((item) => (
        <Item key={item.name} open={open}>
          <Link href={item.path} passHref>
            <a>
              {item.icon}
              {open && <ItemName open={open}>{item.name}</ItemName>}
            </a>
          </Link>
        </Item>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled(motion.ul)`
  position: fixed;
  border: 1px solid #d8d8d8;
  height: 100%;
  background: #fff;
  ${theme.mqMax("lg")} {
    display: flex;
    width: 100%;
    max-width: 100vw;
    z-index: 324;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
  }
`
const Item = styled.li`
  cursor: pointer;
  padding: ${(p) => (p.open ? "20px 16px 20px 36px" : "20px 36px")};
  a {
    display: flex;
    align-items: center;
  }
`
const ItemName = styled(motion.div)`
  margin-left: 37px;
  min-width: ${(p) => (p.open ? 197 : 0)}px;
  ${theme.mqMax("lg")} {
    font-size: 30px;
  }
`

export default Navbar
