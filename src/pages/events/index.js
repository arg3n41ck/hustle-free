import Events from "../../components/pages/MainPage/MainPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function Home() {
  return <Events />
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})
