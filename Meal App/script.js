if (localStorage.getItem("FavouriteItem") == null) {
  localStorage.setItem("FavouriteItem", JSON.stringify([]));
}

function showMealList() {
  let inputValue = document.getElementById("my-search").value;
  let arr = JSON.parse(localStorage.getItem("FavouriteItem"));
  let html = "";
  let meals = fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
  ).then((response) => response.json());
  meals.then((data) => {
    if (data.meals) {
      data.meals.forEach((element) => {
        let Fav = false;
        for (let index = 0; index < arr.length; index++) {
          if (arr[index] == element.idMeal) {
            Fav = true;
          }
        }
        if (Fav) {
          html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button id="btn" type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button clss="btn" id="main${element.idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
        } else {
          html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button id="btn" type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button clss="btn" id="main${element.idMeal}" class="btn btn-outline-light" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
        }
      });
    } else {
      html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">error......</span>
                            <div class="mb-4 lead">
                                The meal you are looking for was not found.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    }
    document.getElementById("main").innerHTML = html;
  });
}

async function showMealDetails(id) {
  let html = "";
  let MealDetails = fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  ).then((response) => response.json());
  await MealDetails.then((data) => {
    html += `
          <div id="meal-details" class="mb-5">
            <div id="meal-header" class="d-flex justify-content-around flex-wrap">
              <div id="meal-thumbail">
                <img class="mb-2" src="${data.meals[0].strMealThumb}" alt="" srcset="">
              </div>
              <div id="details">
                <h3>${data.meals[0].strMeal}</h3>
                <h6>Category : ${data.meals[0].strCategory}</h6>
                <h6>Area : ${data.meals[0].strArea}</h6>
              </div>
            </div>
            <div id="meal-instruction" class="mt-3">
              <h5 class="text-center">Instruction :</h5>
              <p>${data.meals[0].strInstructions}</p>
            </div>
            <div class="text-center">
              <a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-outline-light mt-3">Watch Video</a>
            </div>
          </div>
        `;
  });
  document.getElementById("main").innerHTML = html;
}

async function showFavMealList() {
  let arr = JSON.parse(localStorage.getItem("FavouriteItem"));
  let html = "";
  if (arr.length == 0) {
    html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                No meal added in your favourites list.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
  } else {
    for (let index = 0; index < arr.length; index++) {
      await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arr[index]}`
      )
        .then((response) => response.json())
        .then((data) => {
          html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.meals[0].strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button id="btn" type="button" class="btn btn-outline-light" onclick="showMealDetails(${data.meals[0].idMeal})">More Details</button>
                            <button class="btn" id="main${data.meals[0].idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${data.meals[0].idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
        });
    }
  }
  document.getElementById("favourites-body").innerHTML = html;
}

function addRemoveToFavList(id) {
  let arr = JSON.parse(localStorage.getItem("FavouriteItem"));
  let contain = false;
  for (let index = 0; index < arr.length; index++) {
    if (id == arr[index]) {
      contain = true;
    }
  }
  if (contain) {
    let number = arr.indexOf(id);
    arr.splice(number, 1);
    alert("your meal removed from your favourites list");
  } else {
    arr.push(id);
    alert("your meal added into your favourites list");
  }
  localStorage.setItem("FavouriteItem", JSON.stringify(arr));
  showMealList();
  showFavMealList();
}
