// GET DATA FROM API
async function loadData() {
    let response = await axios.get('https://api.covid19api.com/summary');
    console.log(response.data.Countries)
    return response.data.Countries
  }
  
  // CREATE ARRAY FOR CONTAINER OF THE DATA FROM API
  let countries = []
  let TotalConfirmed = []
  let TotalDeaths = []
  let recordDate= []
  
  // GETTING COUNTRIES
  async function getData(){
    let series = await loadData(); 
    console.log(series)
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
  
  
  // PRINTING THE ARRAYS FOR DEBUGGING
  
  console.log(countries)
  console.log(TotalConfirmed)
  console.log(TotalDeaths)
  console.log(recordDate)
  
  
  
  
  
  
  //CREATING THE CHART DESIGN
  var options = {
    series: [{
    data: TotalConfirmed
    }],
      chart: {
      type: 'bar',    
      width:'900px',
      height:'6000px',
      
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
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