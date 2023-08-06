const searchDish = document.getElementById("search-btn");
const mealContainer = document.getElementById("meal-container");

searchDish.addEventListener("click", getMealList);

let favMealId = [];

// search meal and display result
async function getMealList(e) {
     e.preventDefault();
     let searchInput = document.getElementById("dishpedia-finder-input").value.trim();
     document.getElementById("fav-meal").innerHTML = ''
     document.getElementById('fav-heading').innerText = ''
     mealContainer.innerHTML = `
     <h3 class="text-center mt-5" style="color: #01161e;">Your Searched Meals</h3>
               <div
                    class="container mt-2"
                    style="
                         background-color: black;
                         color: white;
                         border-radius: 20px;
                         padding: 20px;
                         padding-top: 28px;
                    ">
                    <div class="container">
                         <div class="row row-cols-4" id="meal">
                         </div>
                    </div>
               </div>
          </div>
     `;
     document.getElementById("meal").innerHTML = `<div class="text-center">Searching meal database...</div>`;

     await fetch(`
     https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}
     `)
          .then((response) => response.json())
          .then((data) => {
               let html = "";
               if (data.meals) {
                    data.meals.forEach((meal) => {
                         html += `
                         <div class="col meal-container mb-3" data-id="${meal.idMeal}">
                                   <img
                                        src="${meal.strMealThumb}"
                                        alt="Meal Image"
                                        class="meal-image" />
                                   <div class="meal-info">
                                        <div class="meal-title-likes" style="margin-bottom: 0; margin-top: 0">
                                             <div class="dish-name-type">
                                                  <strong>${meal.strMeal.slice(0, 20)}</strong>
                                                  &nbsp;
                                             </div>
                                        </div>
                                        <small style="margin-bottom: 0; margin-top: 0; color: white">
                                             ${meal.strInstructions.slice(0, 50)}...
                                        </small
                                        ><br />
                                        <a href="#" class="recipe-btn" >show details...</a>
                                   </div>
                              </div>
                         `;
                    });
               } else {
                    html = `<div class="text-center">Sorry! Your dish not found.</div>`;
               }
               document.getElementById("meal").innerHTML = html;
          });

     const recipeButtons = document.querySelectorAll(".recipe-btn");

     recipeButtons.forEach((button) => {
          const toggleableElement = document.querySelector(".meal-full-details");
          button.addEventListener("click", async function () {
               toggleableElement.style.display = "block";
               if (event.target.classList.contains("recipe-btn")) {
                    const parentElement = event.target.closest(".meal-container");
                    const dataId = parentElement.getAttribute("data-id");

                    console.log("Data ID:", dataId);

                    // Now you can use the dataId for further actions, such as fetching more details.

                    await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dataId}
                    `)
                         .then((response) => response.json())
                         .then((data) => {
                              console.log(data);
                              if (data.meals) {
                                   data.meals.forEach((meal) => {
                                        document.getElementById("meal-full-details").innerHTML = `
                                        <div class="meal-header">
                                        <h3></h3>
                                        <button class="btn-x">
                                             <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
                                                  <style>
                                                       svg {
                                                            fill: #fa0000;
                                                       }
                                                  </style>
                                                  <path
                                                       d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                                             </svg>
                                        </button>
                                   </div>
                    
                                   <div class="meal-cover-instruction">
                                        <img
                                             src="${meal.strMealThumb}"
                                             alt="Meal Image"
                                             class="meal-image-large" />
                                        <div class="meal-instructions">
                                             <h3 style="color: #70e000"> ${meal.strMeal}</h3>
                                             <p style="text-align: justify">
                                                  ${meal.strInstructions}
                                             </p>
                                             <div style="display: flex; margin-bottom: 10px">
                                                  <div class="text-gap">Category:</div>
                                                  ${meal.strCategory}
                                             </div>
                                             <div style="display: flex; margin-bottom: 10px">
                                                  <div class="text-gap">Country:</div>
                                                  ${meal.strArea}
                                             </div>
                                             <div style="display: flex; margin-bottom: 10px">
                                                  <div class="text-gap">Indgredients:</div>

                                                  <span class="badge ingredients-badge text-bg-warning">${meal.strIngredient1} ${meal.strMeasure1}</span>
                                                  <span class="badge ingredients-badge text-bg-warning">${meal.strIngredient2} ${meal.strMeasure2}</span>
                                                  <span class="badge ingredients-badge text-bg-warning">${meal.strIngredient3} ${meal.strMeasure3}</span>
                                                  <span class="badge ingredients-badge text-bg-warning">${meal.strIngredient4} ${meal.strMeasure4}</span> more...
                                             </div>
                    
                                             <a href="${meal.strYoutube}" style="text-decoration: none;">
                                             <button class="button">
                                             <span>Watch</span>
                                             <svg
                                                  width="34"
                                                  height="34"
                                                  viewBox="0 0 74 74"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg">
                                                  <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                                                  <path
                                                       d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                                                       fill="black"></path>
                                             </svg>
                                        </button>
                                             </a>

                                             <button class="add-to-fav" id="add-to-fav">
                                                  Add Fav
                                             </button>
                                        </div>
                                   </div>
                                        `;

                                        const favbtn = document.getElementById("add-to-fav");
                                        favbtn.addEventListener('click', ()=>{
                                             favMealId.push(meal.idMeal);
                                             console.log(meal.idMeal)
                                             console.log(favMealId)
                                             document.getElementById('favCount').innerHTML = favMealId.length
                                        })
                                   });
                              }
                         });
               }

               const btnX = document.querySelector(".btn-x");
               btnX.addEventListener("click", () => {
                    toggleableElement.style.display = "none";
               });
          });
     });
}

const favCountBtn = document.getElementById('favCountBtn');
favCountBtn.addEventListener('click',()=>{
     document.getElementById("fav-meal").innerHTML = ''
     document.getElementById('meal-container').innerHTML = '';
     document.getElementById('fav-heading').innerText = 'Favourite Meals'
     favMealId.forEach( async (mealId)=>{
          await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
          .then((response)=>response.json())
          .then((data)=>{
               console.log(data)
               if(data){
                    document.getElementById("fav-meal").innerHTML += `
                    <div class="fav-box">
                         <img class="fav-meal-img" src="${data.meals[0].strMealThumb}" alt="">
                         <div class="fav-meal-details">
                              <h3 class="fav-meal-name">${data.meals[0].strMeal}</h3>
                              <p class="fav-meal-type">${data.meals[0].strCategory}</p>
                              <p class="fav-meal-area">${data.meals[0].strArea}</p>
                         </div>
                    </div>
                    `

               }
          })
     })
})