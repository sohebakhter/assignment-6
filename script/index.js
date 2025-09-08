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


//all catagory এর active class কে এই জায়গা থেকে রিমুভ/add করা হইছে
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

const loadPlantDetali = (id) => {
    const url = (`https://openapi.programming-hero.com/api/plant/${id}`)
    fetch(url)
        .then(res => res.json())
        .then(json => {
            displayPlantDetali(json.plants);
        })
}

//-------------------------------------

const displayPlantDetali = (details) => {
    console.log(details)
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
    
    <div class="card bg-white p-5 gap-3 overflow-hidden">
                    <img class="rounded-xl h-[300px] object-cover" src="${details.image}" alt="">
                    <h1 class="font-medium text-xl ">${details.name}</h1>
                    <p>${details.description}</p>
                    <div class="flex justify-between">
                        <p class="text-xl bg-[#DCFCE7] rounded-full px-4 py-1 text-green-800">${details.category}</p>
                        <p class="text-xl font-medium">$<span>${details.price}</span></p>
                    </div>

                </div>
    
    `
    document.getElementById('word_modal').showModal();
}


const displayAllPlants = (plants) => {

    const allPlant = document.getElementById('card-container')
    allPlant.innerHTML = '';

    for (const plant of plants) {

        const allPlantCard = document.createElement('div')
        allPlantCard.innerHTML = `

         <div class="card bg-white p-5 gap-3 overflow-hidden">
                    <img class="rounded-xl h-[200px] object-cover" src="${plant.image}" alt="">
                    <h1 onclick="loadPlantDetali(${plant.id})" class="font-medium text-xl hover:cursor-pointer hover:text-green-700">${plant.name}</h1>
                    <p>${plant.description}</p>
                    <div class="flex justify-between">
                        <p class="text-xl bg-[#DCFCE7] rounded-full px-4 py-1 text-green-800">${plant.category}</p>
                        <p class="text-xl font-medium">$<span>${plant.price}</span></p>
                    </div>
                    <button class="bg-green-700 text-white text-xl px-20 py-3 rounded-full hover:cursor-pointer addtocart-btn">Add to Cart</button>
                </div>

        `

        allPlant.appendChild(allPlantCard);

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ✅ attach listener right here
        const button = allPlantCard.querySelector('.addtocart-btn');
        button.addEventListener('click', () => {
            // your add-to-cart logic here

            const cartContainer = document.getElementById('addtocart-container')
            // cartContainer.innerHTML = '';

            const cartCard = document.createElement('div')
            cartCard.innerHTML = `

        <div class="side-cart flex justify-between items-center bg-[#F0FDF4] px-4 rounded-lg">
                        <div>
                            <h1 class="font-medium text-lg">${plant.name}</h1>
                            <p class="text-lg">$<span class="card-price">${plant.price}</span></p>
                        </div>
                        <button class="hover:cursor-pointer hover:text-red-500 delete-btn"><i class="fa-solid fa-xmark"></i></button>
                    </div>
        
        `
            // appeding cart here
            cartContainer.appendChild(cartCard);

            cartContainer.addEventListener('click', (e) => {
                if (e.target.closest('.delete-btn')) {
                    const cartItem = e.target.closest('.side-cart');
                    cartItem.remove(); // কার্ড রিমুভ হবে
                    updateTotal(); // total আবার হিসাব হবে
                }
            });

            //এখানে আর একটা অংশ total jog korar part
            function updateTotal() {
                const prices = document.querySelectorAll('.card-price');
                let total = 0;

                prices.forEach(priceSpan => {
                    total += parseFloat(priceSpan.textContent);
                });

                document.getElementById('total-price').textContent = total;
            }

            updateTotal();

        });

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
                    <h1 onclick="loadPlantDetali(${card.id})" class="font-medium text-xl hover:cursor-pointer hover:text-green-700">${card.name}</h1>
                    <p>${card.description}</p>
                    <div class="flex justify-between">
                        <p class="text-xl bg-[#DCFCE7] rounded-full px-4 py-1 text-green-800">${card.category}</p>
                        <p class="text-xl font-medium">$<span>${card.price}</span></p>
                    </div>
                    <button class="bg-green-700 text-white text-xl px-20 py-3 rounded-full hover:cursor-pointer addtocart-btn">Add to Cart</button>
                </div>       
        `

        cardContainer.appendChild(cardInfo);

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ✅ attach listener right here
        const button = cardInfo.querySelector('.addtocart-btn');
        button.addEventListener('click', () => {
            // your add-to-cart logic here

            const cartContainer = document.getElementById('addtocart-container')
            // cartContainer.innerHTML = '';

            const cartCard = document.createElement('div')
            cartCard.innerHTML = `

        <div class="side-cart flex justify-between items-center bg-[#F0FDF4] px-4 rounded-lg">
                        <div>
                            <h1 class="font-medium text-lg">${card.name}</h1>
                            <p class="text-lg">$<span class="card-price">${card.price}</span></p>
                        </div>
                        <button class="hover:cursor-pointer hover:text-red-500 delete-btn"><i class="fa-solid fa-xmark"></i></button>
                    </div>
        
        `
            // appeding cart here
            cartContainer.appendChild(cartCard);

            // x - click করলে delete / remove হবে

            cartContainer.addEventListener('click', (e) => {
                if (e.target.closest('.delete-btn')) {
                    const cartItem = e.target.closest('.side-cart');
                    cartItem.remove(); // কার্ড রিমুভ হবে
                    updateTotal(); // total আবার হিসাব হবে
                }
            });


            //এখানে আর একটা অংশ total jog korar part
            function updateTotal() {
                const prices = document.querySelectorAll('.card-price');
                let total = 0;

                prices.forEach(priceSpan => {
                    total += parseFloat(priceSpan.textContent);
                });

                document.getElementById('total-price').textContent = total;
            }

            updateTotal();

        });
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


