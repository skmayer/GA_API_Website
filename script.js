
let searchZip = document.getElementById('searchZip')
let searchType = document.getElementById('searchType')
let searchInput = document.querySelector('input')
let selectedItem = document.getElementById('searchZip');
const imageDiv = document.querySelector('div')
const h1 = document.querySelector('h1')
const list = document.querySelector('ul')

if(searchZip){
    let breweriesFound = 0;;
    searchZip.addEventListener('click', async () => {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
          }

        let zip = searchInput.value
        let response = await axios.get(
            `https://api.openbrewerydb.org/breweries?by_postal=${zip}`)
        breweries = response.data;
        breweriesFound = breweries.length;
        if(breweries.length === 0){
            h1.innerHTML = "Sorry, there are no breweries in ya hood"
        }
        else {
            let grammer = breweriesFound == 1 ? "brewery": "breweries";
            h1.innerHTML = `Found ${breweriesFound} ${grammer} in ${zip}:`
            let breweries = response.data;

            breweries.forEach((brewery) => {
                let breweryName = document.createElement("p");
                breweryName.innerText = brewery.name
                breweryName.setAttribute('class', "brewery-name");

                let addressBtn = document.createElement("button");
                addressBtn.innerText = `${brewery.street}. ${brewery.city}, ${brewery.state}`
                addressBtn.setAttribute('class', "brewery-address");

                let typeBtn = document.createElement("button");
                typeBtn.innerText = `${brewery.brewery_type}`
                typeBtn.setAttribute('class', "brewery-type");

                let phoneBtn = document.createElement("button");
                phoneBtn.innerText = formatPhoneNumber(brewery.phone)
                phoneBtn.setAttribute('class', "brewery-phone");

                let newLine = document.createElement('li')
                newLine.appendChild(breweryName);
                newLine.appendChild(addressBtn)
                newLine.appendChild(phoneBtn)
                newLine.appendChild(typeBtn)
                list.appendChild(newLine);
            });
        }
    })
}

if(searchType){
    searchType.addEventListener('click', async () => {
        let type = searchInput.value
       
        let response = await axios.get(
            `https://api.openbrewerydb.org/breweries?by_type=${type}`).catch(function (error) {
                if (error.response) {
                  h1.innerHTML = "Sorry, that's not a brewery type we've heard of"
                }
              });

        if (response){
            h1.innerHTML = `Ooo good selection. Here are some ${type} breweries:`
            let breweries = response.data;

            breweries.forEach((brewery) => {
                let breweryName = document.createElement("p");
                breweryName.innerText = brewery.name
                breweryName.setAttribute('class', "brewery-name");

                let addressBtn = document.createElement("button");
                addressBtn.innerText = `${brewery.street}. ${brewery.city}, ${brewery.state}`
                addressBtn.setAttribute('class', "brewery-address");

                let typeBtn = document.createElement("button");
                typeBtn.innerText = `${brewery.brewery_type}`
                typeBtn.setAttribute('class', "brewery-type");

                let phoneBtn = document.createElement("button");
                phoneBtn.innerText = formatPhoneNumber(brewery.phone)
                phoneBtn.setAttribute('class', "brewery-phone");

                let newLine = document.createElement('li')
                newLine.appendChild(breweryName);
                newLine.appendChild(addressBtn)
                newLine.appendChild(phoneBtn)
                newLine.appendChild(typeBtn)
                list.appendChild(newLine);
            });
        }
        
    })
}

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return "no phone";
  }