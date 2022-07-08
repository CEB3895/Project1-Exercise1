// GET DATA FROM API
async function loadData() {
    let response = await axios.get('https://api.covid19api.com/live/country/south-africa/status/confirmed');
    console.log(response.data.Countries)
    return response.data.Countries
  }
  
  // CREATE ARRAY FOR CONTAINER OF THE DATA FROM API
  let countries = []
  let TotalConfirmed = []
  let TotalDeaths = []
  let recordDate= []
  let countrySlug = []
  
  // GETTING COUNTRIES
  async function getData(){
    let series = await loadData();
    console.log(series)
    series.map (data=>{
      countries.push(
        data.Country
      )
      TotalDeaths.push(
        data.TotalDeaths
      )
      TotalConfirmed.push(
        data.TotalConfirmed
      )
      recordDate.push(
        data.Date
      )
      countrySlug.push(
        data.Slug
      )
      
    })
  }
  
  
  // PRINTING THE ARRAYS FOR DEBUGGING
  
  console.log(countries)
  console.log(TotalConfirmed)
  console.log(TotalDeaths)
  console.log(recordDate)
  
  
  
  
  
  
  //CREATING THE CHART DESIGN
  var options = {
    series: [{
      name:'Total Confirmed',
      data: TotalConfirmed
    },
    {
      name:'Total Deaths',
      data: TotalDeaths
    }
    ],
      chart: {
      type: 'bar',    
      width:'900px',
      height:'10000px',
      
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: countries,    
    }
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
    await chart.render();
  })
  
  
  //RENDERING THE CHART
  const chart = new ApexCharts(
    document.querySelector('#chart'),
    options
  )