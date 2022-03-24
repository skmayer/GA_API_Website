
let searchZip = document.getElementById('searchZip')
let searchType = document.getElementById('searchType')
let searchInput = document.querySelector('input')
let selectedItem = document.getElementById('searchZip');
const imageDiv = document.querySelector('div')
const h1 = document.querySelector('h1')
const list = document.querySelector('ul')

if(searchZip){   
    searchZip.addEventListener('click', async () => {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
          }

        let zip = searchInput.value
        let response = await axios.get(
            `https://api.openbrewerydb.org/breweries?by_postal=${zip}`)
        let breweries = response.data;
        if(breweries.length === 0){
            h1.innerHTML = "Sorry, there are no breweries in ya hood"
        }
        else {
            breweries.forEach((brewery) => {
                console.log(brewery)
                let a = document.createElement("button");
                let newLine = document.createElement('li')
                a.innerText = brewery.name
                a.setAttribute('id', brewery.id);
               
                newLine.appendChild(a);
                list.appendChild(newLine);

                selectedItem = document.getElementById(brewery.id)
            });
        }
    })
}

if(selectedItem){
    console.log("breweryId")
    selectedItem.addEventListener("click", async () => {
        console.log("selectedItem", selectedItem)
    });
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
            h1.innerHTML = "Ooo good selection"
            let breweries = response.data;

            breweries.forEach((brewery) => {
                console.log(brewery)
                let newLine = document.createElement('li')
                newLine.innerText = brewery.name
                list.append(newLine)
            });
        }
        
    })
}