const chuckBtn = document.getElementById('chuck')
const catBtn = document.getElementById('cat')
const foodBtn = document.getElementById('food')
const beerBtn = document.getElementById('beer')
const breedInput = document.querySelector('input')
const imageDiv = document.querySelector('div')
const h1 = document.querySelector('h1')
const list = document.querySelector('ul')

// button.addEventListener('click', async () => {
//     let breed = breedInput.value
//     let response = await axios.get(
//         `https://dog.ceo/api/breed/${breed}/images/random`)
//     let dogPic = response.data.message
//     imageDiv.innerHTML = `<img src=${dogPic}>`
// })

beerBtn.addEventListener('click', async () => {
    // let breed = breedInput.value
    let response = await axios.get(
        `https://api.openbrewerydb.org/breweries`)
    let breweries = response.data;
    
    breweries.forEach((brewery) => {
        console.log(brewery)
        let newLi = document.createElement('li')
        newLi.innerText = brewery.name
        list.append(newLi)
    });
        
    // let dogPic = response.data.message
    // imageDiv.innerHTML = `<img src=${dogPic}>`
})

chuckBtn.addEventListener('click', async () => {
    let response = await axios.get(
        `https://api.chucknorris.io/jokes/random`)
    let quote = response.data.value
    console.log(quote)
    h1.innerHTML = quote
})

catBtn.addEventListener('click', async () => {
    let response = await axios.get(
        `https://cat-fact.herokuapp.com/facts`)
    let quote = response.data[0].text
    console.log(response)
    h1.innerHTML = quote
})

foodBtn.addEventListener('click', async () => {
    let response = await axios.get(
        `https://foodish-api.herokuapp.com/api`)
    // let quote = response.data[0].text
    console.log(response)
    imageDiv.innerHTML = `<img src=${response.data.image}>`
})