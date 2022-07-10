const countrysSelectELement = document.querySelector("#select-country");
let currentCountry;
const chartDiv = document.querySelector(".chartDiv");
let _countries = []
let recordDate = []

function displayChart(data) {
    let provinces = [];
    let confirmed = [];
    let deaths = [];
    let recovered = [];
    let counter = 0;

    data.map(async snapshot => {
        if (snapshot.Province !== "") {
            provinces.push(snapshot.Province)
            confirmed.push(snapshot.Confirmed)
            deaths.push(snapshot.Deaths)
            recovered.push(snapshot.Recovered)
        }

        counter++;

        var options = {
            series: [{
                name: 'Deaths',
                data: deaths
            },
            {
               name: 'Confirmed',
               data: confirmed
            },
            {
               name: 'Recovered',
               data: recovered
            }],
            chart: {
                type: 'bar',
                width: '900px',
                height: 'auto',
                // Di pawala wala pagnirender ule ung height
                redrawOnParentResize: false
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

        if (counter == data.length) {
            // Resize by the length of the province
            options.chart.height = 100 * provinces.length
            const chart = new ApexCharts(document.querySelector(".chartDiv"), options);
            await chart.render();
        }
    })



}

function getCovidData(country) {
    // Get latest covid update, delay from 1 day
    const dateToday = moment().startOf('day').subtract(1, 'days').format();
    const lastUpdatedText = document.getElementById("lastUpdated");
    lastUpdatedText.textContent = moment().startOf('day')

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