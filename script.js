// GET DATA FROM API
async function loadData() {
  const response = await axios.get('https://api.covid19api.com/summary')
  // console.log(response)
  return response.data.Countries.splice(0,25)
}

// CREATE ARRAY FOR CONTAINER OF THE DATA FROM API
let countries = []
let TotalConfirmed = []
let TotalDeaths = []
let recordDate= []

// GETTING COUNTRIES
async function getData(){
  const series = await loadData(); 
  // console.log(series)
  series.map (data=>{
    countries.push(
      data.Country
    )
    TotalDeaths.push(
      data.TotalConfirmed
    )
    TotalConfirmed.push(
      data.TotalDeaths
    )
    recordDate.push(
      data.Date
    )
    
  })
}

async function getCountry(){
  const countrySelect = document.getElementById("select-country");
  countries.forEach(country => {
    const countryName = country;
    const option = document.createElement('option')
    option.setAttribute('value', countryName)
    option.innerHTML = countryName;
    countrySelect.appendChild(option)
  })
}

// PRINTING THE ARRAYS FOR DEBUGGING

// console.log(countries)
// console.log(TotalConfirmed)
// console.log(TotalDeaths)
// console.log(recordDate)


//CREATING THE CHART DESIGN
var options = {
  series: [{
  data: TotalConfirmed
  }],
    chart: {
    type: 'bar',
    height:'500px',
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: countries,    
  },
  colors:['#ED428B']
};


window.addEventListener('DOMContentLoaded', async()=>{
  //RE-RENDER THE CHART
  chart.updateOptions({
    xaxis: {
      labels: {
        show: true
      }
    },    
  })

  // CALLING THE FUNCTIONS
  await getData(); 
  await getCountry();
  await chart.render();
})


//RENDERING THE CHART
const chart = new ApexCharts(
  document.querySelector('#chart'),
  options
)

