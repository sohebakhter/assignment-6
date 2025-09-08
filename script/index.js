const loadButtonName = () => {
    const url = `https://openapi.programming-hero.com/api/categories`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            displayButtonName(json.categories);
        })
}

//active class কে এই জায়গা থেকে রিমুভ করা হইছে
const removeActive = () => {
    const ctgButton = document.querySelectorAll('.ctg-class-button')
    ctgButton.forEach(btn => btn.classList.remove('active'))
}


const loadPlantCatagories = (id) => {
    const url = (`https://openapi.programming-hero.com/api/category/${id}`)
    fetch(url)
        .then(res => res.json())
        .then(json => {
            removeActive();
            const clickBtn = document.getElementById(`btn-${id}`)
            clickBtn.classList.add('active')
            displayPlantCatagories(json.plants)
        })

}


//all catagory এর active class কে এই জায়গা থেকে রিমুভ করা হইছে
const clickBtn = document.querySelector('#all-btn')
clickBtn.addEventListener('click', () => {
    removeActive();
    clickBtn.classList.add('active')
})


const loadAllPlants = () => {
    const url = (`https://openapi.programming-hero.com/api/plants`)
    fetch(url)
        .then(res => res.json())
        .then(json => {
            displayAllPlants(json.plants)
        })
}



const displayAllPlants = (plants) => {

    const allPlant = document.getElementById('card-container')
    // allPlant.innerHTML = '';

    for (const plant of plants) {

        const allPlantCard = document.createElement('div')
        allPlantCard.innerHTML = `

         <div class="card bg-white p-5 gap-3 overflow-hidden">
                    <img class="rounded-xl h-[200px] object-cover" src="${plant.image}" alt="">
                    <h1 class="font-medium text-xl">${plant.name}</h1>
                    <p>${plant.description}</p>
                    <div class="flex justify-between">
                        <p class="text-xl bg-[#DCFCE7] rounded-full px-4 py-1 text-green-800">${plant.category}</p>
                        <p class="text-xl font-medium">$<span>${plant.price}</span></p>
                    </div>
                    <button class="bg-green-700 text-white text-xl px-20 py-3 rounded-full">Add to Cart</button>
                </div>

        `

        allPlant.appendChild(allPlantCard);
    }
}

loadAllPlants();



const displayPlantCatagories = (cards) => {

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';

    for (const card of cards) {
        const cardInfo = document.createElement('div')
        cardInfo.innerHTML = `
            <div class="card bg-white p-5 gap-3 overflow-hidden">
                    <img class="rounded-xl h-[200px] object-cover" src="${card.image}" alt="">
                    <h1 class="font-medium text-xl">${card.name}</h1>
                    <p>${card.description}</p>
                    <div class="flex justify-between">
                        <p class="text-xl bg-[#DCFCE7] rounded-full px-4 py-1 text-green-800">${card.category}</p>
                        <p class="text-xl font-medium">$<span>${card.price}</span></p>
                    </div>
                    <button class="bg-green-700 text-white text-xl px-20 py-3 rounded-full">Add to Cart</button>
                </div>       
        `

        cardContainer.appendChild(cardInfo);
    }
}

// এখানে বাটন dynamic name কে শো করা হবে
const displayButtonName = (names) => {

    // 1 get the container
    const buttonContainer = document.getElementById('btn-container')
    buttonContainer.innerHTML = '';

    // 2 create element 
    for (const name of names) {

        const buttonDiv = document.createElement('div')
        buttonDiv.innerHTML = `
        
        <button id="btn-${name.id}" onclick="loadPlantCatagories(${name.id})" class="border-2 border-green-700 w-[250px] py-2 rounded-md text-left px-4 mt-1 hover:cursor-pointer ctg-class-button">${name.category_name}</button>

        `
        // 3 append করতে হবে 

        buttonContainer.appendChild(buttonDiv);
    }

}

loadButtonName(); //wow eita seita 
