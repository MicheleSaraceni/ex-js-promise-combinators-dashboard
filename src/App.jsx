export default function App() {

  //https://boolean-spec-frontend.vercel.app/freetestapi

  async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj
  }


  async function getDashboardData(query) {
    const promiseCittà = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
    const promiseMeteo = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
    const promiseAereoporto = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)

    const arrayPromises = await Promise.all([promiseCittà, promiseMeteo, promiseAereoporto])

    const [città, meteo, aereoporto] = arrayPromises;

    return {
      city: città[0].name,
      country: città[0].country,
      temperature: meteo[0].temperature,
      weather: meteo[0].weather_description,
      airport: aereoporto[0].name
    }

  }


  getDashboardData("london")
    .then((data) => console.log(data))
    .catch((error) => console.log("Error fetching data:", error))

}
