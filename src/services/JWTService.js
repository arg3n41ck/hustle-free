export function getCookie(name) {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(";").shift()
  }
}

export function setCookie(cName, cValue, expDays) {
  let date = new Date()
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
  const expires = "expires=" + date.toUTCString()
  document.cookie = cName + "=" + cValue + "; " + expires + ";path=/"
}

// export async function refreshTokens() {
//   if (!refresh) {
//     await clearTokens()
//     throw new Error("No refresh token")
//   }
//
//   // await console.log(data)
//   await setCookie("token", data.access, 99999)
//
//   return await data
// }
