import MainPageForNotAuthUser from "../components/pages/MainPageForNotAuthUser/MainPageForNotAuthUser"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function Home() {
  return <MainPageForNotAuthUser />
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "header",
      "common",
      "mainPageForNotAuthUser",
      "footer",
    ])),
  },
})
