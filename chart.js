const countrysSelectELement = document.querySelector("#select-country");
let currentCountry;
const chartDiv = document.querySelector(".chartDiv");
let countries = []
let recordDate = []


function displayChart(data) {
    const dailyCases = data.map((daily, index) => {
        return Math.abs(daily.Confirmed)
    }).splice(1, 20);
    TotalConfirmed = dailyCases

    const dateCases = data.map((daily, index) => {
        return daily.Date
    }).splice(1, 20);
    recordDate = moment(dateCases).format('YYYY-MM-DDTHH')

    console.log(data)
    var options = {
        series: [{
            name: 'cases',
            data: TotalConfirmed
        }],
        chart: {
            type: 'bar',
            height: '500px',
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
            categories: dateCases,
        },
    }

    const chart = new ApexCharts(document.querySelector(".chartDiv"), options);

    chart.render();
}

function getCovidData(country) {

  axios.get(`https://api.covid19api.com/total/dayone/country/${country}`)
        .then(response => (response.data))
        .then(data => {
            chartDiv.innerHTML = "";
            displayChart(data);
        })
        .catch(err => console.warn(err));

}

function getCountries() {
    axios.get("https://api.covid19api.com/countries")
         .then(response => (response.data))
         .then(countries => {
              countries.forEach(country => {
                  const countryName = country.Country;
                  const option = document.createElement("option");
                  option.setAttribute("value", countryName);
                  option.innerHTML = countryName;
                  countrysSelectELement.appendChild(option);
              });
              currentCountry = countrysSelectELement.children[0].value;
              getCovidData(currentCountry);
          })
          .catch(err => console.warn(err));
}

getCountries();

countrysSelectELement.addEventListener("change", () => {
    const currentIndex = countrysSelectELement.selectedIndex;
    const countrySelected = countrysSelectELement.children[currentIndex].value;
    currentCountry = countrySelected;
    getCovidData(countrySelected);
});