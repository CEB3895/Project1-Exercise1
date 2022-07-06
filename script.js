// GET DATA FROM API
async function loadData() {
  let response = await axios.get('https://api.covid19api.com/summary');
  // console.log(response.data.Countries)
  return response.data.Countries.splice(0,15)
}

// CREATE ARRAY FOR CONTAINER OF THE DATA FROM API
let countries = []
let TotalConfirmed = []
let TotalDeaths = []
let recordDate= []

// GETTING COUNTRIES
async function getData(){
  let series = await loadData(); 
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

async function selectData(){
  
  var select = document.getElementById("select-country");
  var options = countries;
  console.log(options)

  for(var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }
}
var select = document.getElementById("select-country");
var options = countries;
console.log(options)

for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
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
    height:'600px',
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
  await selectData();
  await chart.render();
})


//RENDERING THE CHART
const chart = new ApexCharts(
  document.querySelector('#chart'),
  options
)

function selectCountry(){
  let selectedCountry = document.getElementById("select-country").value;
  console.log(selectedCountry)
}

