const countrysSelectELement = document.querySelector("#select-country");
let currentCountry;
const chartDiv = document.querySelector(".chartDiv");
let _countries = []
let recordDate = []

function displayChart(data) {
    let provinces = [];
    let confirmed = [];

    data.map(snapshot => {
        if (snapshot.Province !== "") {
            provinces.push(snapshot.Province)
            confirmed.push(snapshot.Confirmed)
        }
    })


     var options = {
         series: [{
             name: 'cases',
             data: confirmed
         }],
         chart: {
             type: 'bar',
             width: '10000px',
             height: '1000px',
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
             categories: provinces,
         },
     }

     

    const chart = new ApexCharts(document.querySelector(".chartDiv"), options);

    chart.render();
}

function getCovidData(country) {
    // Get latest covid update, delay from 1 day
    const dateToday = moment().startOf('day').subtract(1, 'days').format();
    axios.get(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/${dateToday}`)
        //.then(response => (response.data))
        .then(data => {
            chartDiv.innerHTML = "";
            displayChart(data.data);
        })
        .catch(err => console.warn(err));
}

function getCountries() {
    axios.get("https://api.covid19api.com/countries")
         .then(response => (response.data))
         .then(async snapshot => {

            // Fetch country [RAW]
            const unsortedCountry = [];
             
            snapshot.forEach(dataSnapshot => {
                unsortedCountry.push(dataSnapshot.Country)
            });
            
            // Sort Country alphabetically
            const sortedCountry = unsortedCountry.sort((a, b) => a.localeCompare(b));
            
            // Display the sorted country
            sortedCountry.forEach(countryName => {
                const option = document.createElement("option");
                option.setAttribute("value", countryName);
                option.innerHTML = countryName;
                countrysSelectELement.appendChild(option);
            })

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