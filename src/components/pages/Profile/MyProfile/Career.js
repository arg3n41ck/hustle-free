import React from "react"
import styled from "styled-components"
import CardTemplate from "../../../ui/CardTemplate"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { changeProfile } from "../../../../redux/components/navigations"
import { formatDistance } from "date-fns"
import { ru } from "date-fns/locale"
import { theme } from "../../../../styles/theme"
import { getRusDate } from "../../../../helpers/getDateWithMonthTitle"

const Career = ({ careers }) => {
  const dispatch = useDispatch()
  const sectionHandler = (section) => {
    dispatch(changeProfile(section))
  }

  return careers.length ? (
    <CareerItem careers={careers} />
  ) : (
    <CardTemplate
      title={"Карьера"}
      content={"Добавьте сведения об опыте работы"}
      buttonContent={"Добавить место работы"}
      section="career"
      path={"/profile/change-data"}
      onChangeSection={sectionHandler}
    />
  )
}

const CareerItem = ({ careers }) => {
  const dispatch = useDispatch()
  const { startups } = useSelector((state) => state.startups)
  const getTotalDate = (startDate, endDate) => {
    // console.log(new Date(startDate), endDate)
    return `${formatDistance(new Date(startDate), new Date(endDate), {
      locale: ru,
    })}`
  }

  return (
    <Wrapper>
      <InfoHeader>
        <InfoTitle>Карьера</InfoTitle>
        <div onClick={() => dispatch(changeProfile("career"))}>
          <Link href={"/profile/change-data"} passHref>
            <InfoChange>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.2038 10.7962L18.9998 9.00019C19.545 8.45494 19.8176 8.18231 19.9634 7.88822C20.2407 7.32866 20.2407 6.67171 19.9634 6.11215C19.8176 5.81806 19.545 5.54544 18.9998 5.00019C18.4545 4.45494 18.1819 4.18231 17.8878 4.03658C17.3282 3.75929 16.6713 3.75929 16.1117 4.03658C15.8176 4.18231 15.545 4.45494 14.9998 5.00019L13.1811 6.81884C14.145 8.46944 15.5311 9.845 17.2038 10.7962ZM11.7267 8.2733L4.85615 15.1438C4.43109 15.5689 4.21856 15.7814 4.07883 16.0425C3.93909 16.3036 3.88015 16.5983 3.76226 17.1878L3.14686 20.2648C3.08034 20.5974 3.04708 20.7637 3.14168 20.8583C3.23629 20.9529 3.4026 20.9196 3.73521 20.8531L6.81219 20.2377C7.40164 20.1198 7.69637 20.0609 7.95746 19.9211C8.21856 19.7814 8.43109 19.5689 8.85615 19.1438L15.7456 12.2544C14.1239 11.2388 12.7522 9.87646 11.7267 8.2733Z"
                  fill="#828282"
                />
              </svg>
              <p>Редактировать</p>
            </InfoChange>
          </Link>{" "}
        </div>
      </InfoHeader>
      {careers.map((item) => (
        <>
          <Job key={item.id}>
            <JobLogo>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="64" height="64" rx="32" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_2198_3024"
                      transform="scale(0.00416667)"
                    />
                  </pattern>
                  <image
                    id="image0_2198_3024"
                    width="240"
                    height="240"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAKO2lDQ1BpY20AAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sk1fsOAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAABhCSURBVHja7Z17kF1VlYe/dHde0KHzNE9JlEB4BCRIhiRCQIwZk1FARWZ0JOiAKJJBRS2tsUbKBzpolYIojA8QR6dqZFQCCiqSGEiNIVESDYgkJEBIpxMMREJCoDvdnfljrTYPu/vec+7e95x77u+rWmUZum+fu/f6nf1Ya689AJFXBgLDgJHAGGD8QTbW/20kMBxoBo4AhgCDgCagwQ2g260T6ABeBvYCe4DngZ3ADuAZYNtBtsP/225gn7okfwxQE2ROI9ACjAMmA8cAU4EpwAQX6lEu0IH+8zHpcrHuBV5wEbcBTwEbgU3AZmA7sMt/XkjAddPezcBEYBpwCnAycKyLdbiPoHmmw0ftNuBx4GFgHbAe2Oqj+n51tQRcFJp9ND0VOAOY4aPsKB9Ri8A+4DkfndcCq4Df+6i9Ry4gAdfalHicC/YsYDZwvAu2sU7aoMsF/RiwEljhgt6uKbcEnEeafP06B5gHzPL/P1hNA0C7r5sfBO4DfgM8jTbGJOCMR9pJwFxgoY+0k+polK1kdN7qIr4HeABo1cgsAVeLkS7W84FzfaRtUrOkotNH5mXAnT7d3qlmkYBjTJGnAecBF2A7x0PVLEF5CdvRXgLche1qd6pZRCU0A/OB27CwSTcWIpHFs25v69u87ZvlhiIpY4BFwL0ciGvKqm97vA8WeZ8I0S8TgMXAb7GEBYkoH9bhfbLY+0iIQ5gIXI1lFHVKMLm1Tu+jq73PRJ0zFrjKnaJLAqkZ6/I+u8r7UNQZLcAlwGqNuDU/Iq/2vmyRWxefQcAC3xhplwAKY+3epwvI/2EQkYIBWOz2VuwInJy+mLbL+/hklONQGEYDH8cyfuTk9WGbvc9Hy/1rlybgjcByrXPrdn283H1Aqa41xkTgy1herZy5vm2n+4LCTjUy6i7EDpQr7VF2cHrmKvcNjcY5ZQzwBY26shKj8RdQWmbudphnAUtRMoasvCSQpe4z2qnOmCHA+4EtckxZQtvivjNEMsqGCcDN2DlSOaQsjb3kPqQDElXmdA8RaKNKFmKDa7n7lIhMI/AOrHypnE8W0ja5bzXWmiBqhSOADwNfwq4XESIkI7Ckjy6strUqZgZkNPB1dABBVp2DEV9HaZjBmAL8WCEiWZVDTT923xMVMN03GORUsixsufugSMEsX4vIkWRZ2lr3RW1iJeBc4Nt6+4kcMA674+pR4EkJuDQLgG9id+QKkZdN1LnABuyOZAm4D96CZcZMls+InDHCRbzRhSwB9yLem4BXyldETmnx6XRuRJwXAS/wkVfiFXnnKOBM7O7jjRKwbVh9U9NmUWMj8RzsMrYn61nAs7DdZm1YiVpcE88CHsLuN647AZ8MfAeFikTtMho4Dbus/M/1JOApwLfIcYBciDIZD5yIZW09Xw8CHg3ciG1cCVEEpgBHA8uAvUUW8BHAtdh9r6pHJIrE8cCRPhLvK6KAG7DzvB9DpT1F8RgAnAq8CKzE8qgLJeALgeuAZvW1KCiNWGmeTVjudGEEPBMVDxP1wVBsZ3ol0FYEAU8A/tO/lBD1wEjgWOBXwO5aFvAQrBL+hepTUWdMwTa1lmIXrdWkgC8FPok2rUR9Mh3YjmVr1ZyAZwNfA0apH0Wd0gS8BniQSOmWsQT8CuAb2La6EPVMi0+nf4GFmHIv4Ebg34CLUbKGEACv4sCF4/vzLuCF2MbVUPWbEOAD2XTs+OHjeRbwRJ8663igEIcyFDgG+DkBQ0uNgV8GnwIuUl8J0SuTsMvUloWaSocU8BuxgwqaOgvRNycAa7B0y9wIeDQWMjpB/SNEyan0K4G7CXD0MJSAF2NJG9p1FqI0RwM7gf/Lg4BPAb6C1QgSQpRmAHCcr4WfyVLAg4DPAa9XnwiRiOHAYCzBoyvthzRU+BBvQAcVhEjLha4hshBwC1Zh4yj1gxCpOMo11JKFgN8KnKM+EKIiznEtVVXAY4ErfA0shEjPINfS2GoK+B+x2j9CiMo53TVVFQFPwmK+DWp3IYLQ4JqaVA0BX4RdiyKECMfJpDhHkFTAE4FLUMaVEKEZ4NqaGFPAb0OXkQkRi+musSgCHoNV2dDaV4h4a+GLXWvBBbwAmKE2FiIqM0hw8V+5Ah4GvBuVhxUiNk2utWEhBTzHTQgRn7L1Vo6AG4F/wqrMCyHic6RrrjGEgE8A5qtNhagq8ymjwk05An4LulVQiGozwbVXkYBHAuerLYXIhPNdg6kFPBsrmSOEqD6nuAZTCbjB3wAqEytENgx1DTakEfDRqNaVEFnzetdiYgGfhV3KJITIjle5FhMJuAm7pKxR7SdEpjS6FpuSCHhKqcWzEKJqzHZNli3g2aSoDiCEiMKkvgbUhj7+bZ6mz0Lkaho9rze99ibgCcAZajMhcsUZ9JIR2dvC+DV9zbdFMHruhk1amuhZYBthSxoNwG7Ly7pAfyvwl4DfbT8wBHh1QWaTU1ybraUEfBZ2Z4uIx1L/33kJf+9J7KzocwEdvRv4IPAZsqu2sh1YBPwh4DN0Ae8FvlQQnxns2ry7vx9qBu73t5csju3EqvHP9RE1ye/uw65yDc04YGWGbXJdhJfHJOChgvnO/a7RPpmOXXcoocWzm3zm04hdip709x8Djo0g4ouAFzNojz/6NDc01xTQd56hRFHJd/vUQ0KLY08AJx3U3tOADSk+56sR1nVDgR9WuT32AVdGEO+pwNMF9J8urOhdn9wokUWzbuATvbT5h4HOhJ+1w6fgoZnlm2TVapNfU+K4XAoGAbcW2I9u7OuLDwNWSGjR7EFfax7O6JT7DktKrYdS7kh/sUrtsZs4Z80XArsK7Ecr6KPg3fFAm4QWxV4C3tmP053vDp3kM18uNZ2qIFyxrgpt8gMP84RkOHBvwX2pzbXaqxN1SGxR7Cf0XxRwMPBfKT73dyS8iqNMLovsC23AzAjPfXkd+HAHcEHPFz546/4UYKBCtMF5Frjed3j7oh24Adia8LNf62ILzf8C90Vsk9v85RN65rC4Dnx4IL1cLtgI3K6RMopdn2DH+DMpPn8LcW7MmOcx69Dt8Qjhz5kPAK6tI5+6/XCfGgmskdiC2wYPFSVJPkjTD7cRPnuuyWPWocNGH4jwsplZZ/s3aw/fvT9RCRxRYnYfSeGMl/gGVZK/9QJllCBNwQnAxoBtshQYEfgZhwDfrzPfesY1+1cW+DpMwgu73T8mhUMOA+5KGVMdFUHEHyVMcs8LwJsjPF+aHfxat3YOuwBtsQQX1F4E3l6BU55D8jzpTuCqCAIZEyg/4HsRpvmj/MVVjz62+OBd6KnaLA7KT4F7Kvj9FcB/J/ydRuxU0XGBv8sO4CsldtFL0YblfbcHfrZ30k/Bt4Iz9eBt6Ts0agaz7YSpJzYNWB951zvJOvMHFbTJ5wl7hrnHgf9Ux352R0/IbCSwWsILZl8i3NG4D5EuT/rsCG/80z1OnbQ91gGTAz9LA/DlOvez1T070VOxUzISX+X2KHBMQEcdDSxP8RxLiJMn/dmEz9GBZUeFZraiJjzRM42eg1V4kADzeTQuT3nSr0wYp74Xy08OSRbHHvNoz7l2eRuWbC8RVmbLCH80DtLnST9EnNLA5capd2Eng0JzIdkUHsjjAZm3NQDjUQ50pezxzaOdET673T+7NeHvnQZcGuF5fuIjazk/Fzqf+hXY+ekj5HIMBMb3CFg1oCtjCfDLiJ+/Brglxe9d5kIOyW4PKz3Xz8+0YgfPOwL/7XejG0N6aOwR8Fi1RUW0YSeJ2iP/ne+4kJMwyXeyQydQlIpT35riWUsxDbiC7Cpn5pFxPaOH1rD5inH2xSLS5UmfF+FZjqP3OPXv6ec6zApGmxvka71GG3hADZHaYsQ4+2MYcGeK54yVJ30Vh8apO4hzPnkuFt+Wzx1qD0B1yqcUtTLC5VSfc8hPnvThuci/AFoC/40jUaZgfwOIkjhS2i8JH+OMOZ1cT/g8abBjjLuxsNGbInz+u1CYs79kDrarIRLbLg47zlVl+lp/ZpEn3ROn/i5W0jUk44FV8rd+8+55Xg2R2G6J4KxJSZMn/Sxx8qSnEudE2yexetryud7teYC9aohE9jRW+T9rRpEuT/pOwudJx+AkLe9K2l5QKdmk9ukcOfl5pMuTXpRz8TYBN8vXytpITTwNq2eLlV9cyfrzewX4HofzBuJUxCxi3TWtMcq0duA9OXT207DSskm/zzU5Fe8w4Gfyt7Lv25KAy7Sf0cedNDngmhTfZwvh86RD8B5UYDGRgDWFLm07fVqXV9JeZh2j0FwW36Oup9DaxCptN/vGSp5Jkye9mzh50mn5tHwt+SaWwkils11OqoGwSzPp8qSXEydPOimnUsxLuaOGkRoIf2azSOwHvgX8MfDnxkh82EPpc7q9cSZ2zjZLBgH/ipXsEeXTAUql7M9WYel8oZ31u1j6Yej1ZyOWLpmXPOlyeRPKCEydSqlsl75rDr0rkrPu8vVnjPuM0uZJ30A2lVmGYwdD5HMpDzPoOGHfhbOPDOysLdiRu2qf0y03T/qcDAT8Pm2kVnacUAf6q5f0f9lhzlqtc7pJ8qSrGeuerAGk8gP9S9QQVZlOHo2Vm6nW+vM8rJxOXvOkB2DliORvFZTUacBKlYgDbMQutu4K/LmXAq/pY816ZYQXxi99GZCEwdgxxWrkSb8WeK/crSKebcCuqBBGN5a0sT7w584A/qWf//7PhL9lr91nEmnqSV8WuZ0H+9JhglyuIrY3ANsijDa1ykrsFr6QDHJnnVRizXp1hPXnGqwcbZrZQsw86b8H3ip3q4gu166uVuHApdwXRmjohVjYqJz15yUR/n7a/OIYcWqw62eWyd/CXK0Cutysx36IXZwVkuHYNSTlPsMa4mQjXUy6POnzIzzLldhFcBJhoMvNdL2o7QPMieCsl5M8xvlZwheKbyZdtGE5dsVpKI7BrmCVAANeL6oLvu2y6NBXdqSNcW7FLtMOzdkkL47e6bvSIWjALj+X+MLYXy/4Hkh9F87+E+EPFlQa4/wBMCTwM1WSJz0twN+fjfLuQ1+rMrDB1yOb63gn7xtY7Dckp1FZjPMCwted7sLi20lDZMcBH6SyOPVQH8l1kV44nnLtArC4Tt9iMXKR0xaaO9xWAGMidHwWedJvR5dyh7bFBzfwAuqvDlGsXdY3kzyFsa9yKR+N8Hxp86TvIl2ceoy/jCS6sAUWD5mhneg7sfXUCDHWmSOwW+lDPeNG4IQIIn4L6fKk08SpP+IvIwkvbNTkxMOD62vrqAHagJkRhPGBCDHOmwhfj2swcFuKZ1lDsjzpacAGCS64re3ZgT54h/L2OmqAayPEWl8FPBLhWXcC8yK8bGaQrp70ZyLvestK2+09m4oNB+1QPlwnu3ePAN/2hggZNnofcYrfjcDypFsCf+5ab4ekXIqdJCrFHOyQhgjPw/RyfuECil8ZoQN4f4QGnenT8pjPHeOE0ETgdymep1Se9JHATzRSRvOFC3pr9OMjO2Ee7F7CX8o9xDfEqlE+ZUoEEcfIk34nOiATc//m+N4afVjBt/t3YSeDQpPmhsC09kXykyd9P73nSY8DHpTQotmK/sJ5Nxb4i99K+Eu5R6aMqaa1bcCsCC+huaTLk/5wL5/1CXTfVky7sdR0qogxu1iXcmdxNC7GscdG4KspnmUDh+ZJnwRsksii3oV0cX8dOb2gCR3XRBDvq7EbG7IoPHBRhO9zLPBYiuf5mr8AmjxmLaHFTeCYXmo9dH/BvnTS5INyw0bXZfidVvpaMzSLU8wonvUp+DnoUu7Ydr9r9K8cnuGzx51jbkHiZV2+Q/wi4Q6md2PVJRdl+L3+zsNKNxHuHHPPLv1akmWpjQL+/aCYtYjHStfoISPJ4fwD8GPydW9sJQJ+wsMkAwI6+giqU3q1P17gQCYVAb/b+BQvu/39+JMIQzt2quvuUgKehCXkT1ObCZEb1mMptYeUCe5t+tWG3conhMgPq1yblBJwt4/AqhUtRH6Wgve5NksKuGex3Kp2EyIXtLomKVfAT/X1C0KIqrPSNVm2gDuBezSNFiIX0+d7XJNlCxgsafpJtZ8QmfKka5GkAn4aS9QXQmTHr12LiQXcjd3Y/pLaUIhMeMk12J1GwD2L53VqRyEyYR0lNpNLCXinvwGEENXnTtdgagED/JReMkCEEFFpc+1RqYD/hJ1SEUJUj3tdexULuAv4H+xInhAiPi+65rpCCBjgN25CiPiUrbdyBbwbOxjfqbYVIiqdrrXdIQUM8HOsWoMQIh5rXWuEFvAO4Pv0E1QWQlREt2tsRwwBg12X8YjaWYgoPOIaI5aAt3Lg9nkhRDj2u7a2xhQw2NWGD6u9hQjKw64tYgu4FbhFa2Ehgq59byFFFZy0NYV/iF1LKYSonN+5pqiWgJ8BbsbuKhVCpKfDtfRMNQUMcAewXO0vREUsdy1RbQHvAq7HbggQQiTnBeAG11LVBQywFPiR+kGIVPwIq/ecmsYKH6ALK3e5EBiu/hCibDZjF6S3ZSlgfPE9CHgDutxKiHLoBv6DhFlXMabQPdwKPKB+EaIsHnDNVExjoAfaC2wD3gwMVf8I0Sd/8anzw3kSML4WHgXMUR8J0SffAL5NoPMEIQW8H3gUeB3ZX34tRB5ZBXyUCsJGMQUMVkVgG7BAU2khep06PxTyQxsjPOgTwFHAmWhXWoie2en1IafOMQW83xfopwGvVt8JwTLg48Ce0B/cGOmBXwQeB+YDLeo/UcdsAT4IrI/x4Y0RH7wVCy/NA5rUj6IOeRn4FLAk1h9ojPwF/giMA05XX4o65DvAdUQsxxxbwJ1YmczXAlPUn6KOWA58CNt9plYFDBZaehQ4FxipfhV1wCbgA7HWvdUWMNiJi22+HlZ8WBSZnnjvr6rxxxqr+MUew05hnF3lvytEtegAPocVqNtfNAHv9/XwKGAmSvIQxWI/8E3gWqpYK67aI+E+YDUwFThBfS4KxB3AxwiY55xHAYPFhlcDM9DOtCgG92PJGm3V/sNZrUWfx5K6ZwHj1f+ihlkLXA5syOKPZ7mZ9GfgD8BZwGj5gahB1rt4H8rqAbLeDW7FYsRzgRHyB1FDPAm8H1iR5UM05qQhNriIdfBB1AJbgCuoUqw37wIG2Oh2FnaWWIi80gpcCdydh4fJU0LFBhfxmRqJRY5H3iuBn+blgfKWEbUBy9h6HSoUL/LFUz5tvjtPD5XHlMaNWEWPWWh3WuSD9diG1a/UFOUzC4ux7ZfJMrS17ou5JM+HClqB3wAnAZP1PhMZ8ADwPmCNBJyOP2MHo48GpqEDEKI6dGO5zVeQUYZVUQQMlna5DGgGTkVHEUVcOrBTRR8jg9zmIgoY7ADEcqza5UxgiPxMRBosPosdCdyl5ojzwnkHVrJEGyyykLbJfUszvCpwuo/I3XI8WYXW7b50eq2OaLVIG3AvcCQwHdWdFul4GSt/8yGqUIBO/C1DsAD7Fo0ksoS2xX1H+ykZMwALtC8FuuSYshLW5b4yiwKEJYuyYG8Ffu6dMx2VrhW98xfgBixEtEHNkT+agIXYRcra4JIdvFG1yn1D+yU1wETgy8BOOW/d2073hYmSRe2NxvOxEEGnHLnurNP7fr5G3dpmNHa58mY5dd3YZu9zHUct0E71ycCtWIqcnLyYtsv7+GR08KWQDAIWYEkg7XL4wli79+kC72NRcFqAS7AbIrQ+ru117mrvS9VRq0PGAlcB61ASSK0lY6zzvhsrNxYTgavdKTQi53vEXed9pbCQ+BsmAIuB32IHuyWafFiH98li7yMh+mUMsMg3RvZIQJnZHu+DRd4nQiSiGUsEuA07wqj0zOqkPbZ5m8/3PhB9oFhZeTRhRfXOAy7A4ow6MBGWl7B64EuAu7DzuZ1qFgk4NCOB2cD5wLlYyVul6qWjE8uaWgbcCazEcpeFBBydRmASdqviQmAOtjOqmkr90wVsxWp+34PVXm71fxcScCYMxGpXzwHmYYfFJwOD1TSAZUptBh4E7nPxPg3sU9NIwHkcmcdhNazn+nR7GjCqjkbnLuA5X8eu9FH298B2jbQScK3RDExxQZ8BzACOcUEPLMh33OeC3YTdJbTKBfsUFgoSEnBh2rvZ18rTgFOwHe1jsQSF4eQ/Gb8DK4DeBjyO7Ryv89F2Kwfi5kICrpspd4tPuyf76DzVR+0JWALDUcARLu6GyM/T7SLdC7wA7HCxPoVd/brJ17PbseN7mhJLwKIXBgLDsLDVK1zg493GYYfVR7n4m13gQ1zkTf5i6OnfngMAnS7Ol12ge1yEzwHPuii3uW3HLpfbCexGG0655P8B5RUrmLY49aEAAAAASUVORK5CYII="
                  />
                </defs>
              </svg>
            </JobLogo>
            <JobContent>
              <h2>
                {item.startup
                  ? startups.find((startup) => startup.id === item.startup)
                      ?.title
                  : item.placeOfWork}
              </h2>
              <JobPosition>{item.position}</JobPosition>
              <JobDate>
                {getRusDate(item.startDate)} —{" "}
                {!!item.untilNow
                  ? "По настоящее время"
                  : getRusDate(item.endDate)}{" "}
                ·{" "}
                <span style={{ color: "#828282" }}>
                  {item.startDate &&
                    getTotalDate(
                      item.startDate,
                      !!item.untilNow ? new Date() : item.endDate
                    )}
                </span>
              </JobDate>
              <JobCity>{item.city}</JobCity>
            </JobContent>
          </Job>
          {careers[careers.length - 1].id !== item.id && <HR />}
        </>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 832px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 32px 32px 0 32px;
  font-family: Inter, sans-serif;
  margin: 32px 0;
  ${theme.mqMax("lg")} {
    max-width: none;
  }
`
const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const InfoTitle = styled.h4`
  font-family: Inter, sans-serif;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
`
const InfoChange = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin: 0 8px;
    font-family: Inter, sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
  }
`
const Job = styled.div`
  display: flex;
  padding: 32px 0;
  //border-bottom: 1px solid #d8d8d8;
  ${theme.mqMax("lg")} {
    justify-content: flex-start;
  }
`
const JobLogo = styled.div`
  width: 100%;
  max-width: 64px;
  margin-right: 24px;
`
const JobContent = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  grid-gap: 4px;
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
  }
`
const JobPosition = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #27ae60;
`
const JobDate = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
`
const JobCity = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`
const HR = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid #d8d8d8;
`
export default Career
