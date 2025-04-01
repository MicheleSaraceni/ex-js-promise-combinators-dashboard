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

    const [arrayCittà, arrayMeteo, arrayAereoporto] = arrayPromises;

    const città = arrayCittà[0];
    const meteo = arrayMeteo[0];
    const aereoporto = arrayAereoporto[0];

    return {
      city: città ? città.name : null,
      country: città ? città.country : null,
      temperature: meteo ? meteo.temperature : null,
      weather: meteo ? meteo.weather_description : null,
      airport: aereoporto ? aereoporto.name : null
    }

  }


  getDashboardData("vienna")
    .then((data) => {
      console.log('Dasboard data:', data);
      if (data.city !== null && data.country !== null) {
        console.log(`${data.city} is in ${data.country}.`)
      }
      if (data.temperature !== null && data.weather !== null) {
        console.log(`Today there are ${data.temperature} degrees and the weather is ${data.weather}.`)
      }
      if (data.airport !== null) {
        console.log(`The main airport is ${data.airport}.`);
      }
    })

    .catch((error) => console.log("Error fetching data:", error))

}
