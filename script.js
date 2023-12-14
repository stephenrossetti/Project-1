class Food {
    constructor(name, calories, carbs, fiber, protein, sugar, sodium, fat,  article){
        this.name = name;
        this.calories = calories;
        this.carbs = carbs;
        this.fiber = fiber;
        this.protein = protein;
        this.sugar = sugar;
        this.sodium = sodium;
        this.article = article;   
    }
    getCalories(){
        return this.calories;
    }
    getCarbs(){
        return this.carbs;
    }
    getFiber(){
        return this.fiber;
    }
    getProtein(){
        return this.protein;
    }
    getSugar(){
        return this.sugar;
    }
    getSodium(){
        return this.sodium;
    }
    getArticle(){
        return this.article;
    }
    getName(){
        return this.name;
    }
}

//start stephen's code
$('#selectedFood').on('change', function(){
    selectFood = $(this).val();
    wikiApiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + selectFood;
    wikiUrl = 'https://en.wikipedia.org/wiki/' + selectFood;
    });

    var selectFood = '';
    var wikiApiUrl = '';
    var wikiUrl = '';
    var imgTitle = $('#img-text p');
    var imgUrl = $('#img-text img');
    var getInfoBtn = $('#get-info');
    
    function getWikiApi () {
    fetch(wikiApiUrl)
        .then(function(response) {
            console.log(response);
            return response.json()
        })
        .then(function(data) {
            console.log(data);

            var imgTitleEl = $('#food-title');
            var imgTitle = data.titles.canonical;
            imgTitleEl.text(imgTitle);

            imgUrl = $('#img-text img').attr('src', data.thumbnail.source);
    
            var wikiTextEl = $('#food-summary');
            var wikiText = data.extract;
            wikiTextEl.text(wikiText);
    
            var wikiLinkEl = $('#food-link');
            wikiLinkEl.attr('href', wikiUrl);
            wikiLinkEl.text(wikiUrl);
    
          }
        );
    }

    getInfoBtn.on('click', getWikiApi);


    document.addEventListener('DOMContentLoaded', () => {
        // Functions to open and close a modal
        function openModal($el) {
          $el.classList.add('is-active');
        }
      
        function closeModal($el) {
          $el.classList.remove('is-active');
        }
      
        function closeAllModals() {
          (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
          });
        }
      
        // Add a click event on buttons to open a specific modal
        (document.querySelectorAll('#get-info') || []).forEach(($trigger) => {
          const modal = $trigger.dataset.target;
          const $target = document.getElementById(modal);
      
          $trigger.addEventListener('click', () => {
            if (selectFood === 'Avocado' || selectFood === 'Cherries' || selectFood === 'Chocolate' || selectFood === 'Cinnamon' || selectFood === 'Coffee' || selectFood === 'Grapes' || selectFood === 'Onions') {
            openModal($target);
            }
          });
        });
      
        // Add a click event on various child elements to close the parent modal
        (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
          const $target = $close.closest('.modal');
      
          $close.addEventListener('click', () => {
            closeModal($target);
          });
        });
      
        // Add a keyboard event to close all modals
        document.addEventListener('keydown', (event) => {
          if (event.code === 'Escape') {
            closeAllModals();
          }
        });
      });


// start logan's code
// currently has placeholder api
var foodDataApi = 'https://api.nal.usda.gov/fdc/v1/food/1999634?api_key=Z48TYWkfWlJkfT1ReGVPEqcbi3Ivi0sAG2uluFxx';
// foodDataApi = 'https://api.nal.usda.gov/fdc/v1/food/333281?api_key=Z48TYWkfWlJkfT1ReGVPEqcbi3Ivi0sAG2uluFxx'

// prints the api link being used.
console.log(foodDataApi);


// get information from the current API.
getSelectedAPI = function(api){
    fetch(api).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                createFoodItem(data);
            });
        }
    } )
}

// takes data from getSelectedAPI and collects relevant information
createFoodItem = function(foodData) {
 var foodItem = new Food(foodData.description,
    getCalories(foodData),
    getNutrient('Carbohydrate, by difference', foodData),
    getNutrient('fiber', foodData),
    getNutrient('Protein', foodData),
    getNutrient('Sugar', foodData),
    getNutrient('Sodium', foodData),
    getNutrient('fat', foodData),
    linkText)

    console.log(foodItem);
}

// loads data from API
getSelectedAPI(foodDataApi);

getCalories = function(foodData){
    let amount = 0;

    for(let i = 0; i < foodData.foodNutrients.length; i++){
        var nutrients = foodData.foodNutrients[i].nutrient;
        if(nutrients.name.includes('Energy') && nutrients.unitName.includes('kcal')){
            amount = foodData.foodNutrients[i].amount;
            return amount;
        }
        else {
            amount = 'na';
        }
}
    }
   

getNutrient = function(nutrientName, foodData){
    console.log("getNutrient run");
    console.log("foodData length: " + foodData.foodNutrients.length)
    var amount = 0;
    for(let i = 0; i < foodData.foodNutrients.length; i++){
        var name = foodData.foodNutrients[i].nutrient.name;
        //console.log(foodData.foodNutrients[i].nutrient.name);
        if(name.includes(nutrientName)){
            console.log(name);
            amount = foodData.foodNutrients[i].amount;
            console.log(amount);
            return amount;
        }
        else{
            amount = 'na';
        }
    }
return amount;
}



