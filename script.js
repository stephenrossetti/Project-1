class Food {
    constructor(name, calories, carbs, fiber, protein, sugar, sodium, fat){
        this.name = name;
        this.calories = calories;
        this.carbs = carbs;
        this.fiber = fiber;
        this.protein = protein;
        this.sugar = sugar;
        this.sodium = sodium; 
        this.fat = fat;  
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
    getName(){
        return this.name;
    }
}

//start stephen's code
$('#selectedFood').on('change', function(){
    selectFood = $(this).val();
    wikiApiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + selectFood;
    wikiUrl = 'https://en.wikipedia.org/wiki/' + selectFood;
    checkSelectedFood(selectFood);
    });

    var selectFood = '';
    var wikiApiUrl = '';
    var wikiUrl = '';
    var imgTitle = $('#img-text p');
    var imgUrl = $('#img-text img');
    var getInfoBtn = $('#get-info');

    var foodID = 0;
    var foodList = [
    ['Apples', 1750343],
    ['Bananas', 1105314],
    ['Blueberries', 2346411],
    ['Broccoli',  747447],
    ['Carrots',  2258586],
    ['Cheese', 328637],
    ['Chicken', 331960],
    ['Cucumber', 2346406],
    ['Eggs', 747997],
    ['Oatmeal', 2346396],
    ['Peanut Butter', 2262072],
    ['Peas', 2644291],
    ['Popcorn',  2343707],
    ['Rice', 2512381],
    ['Shrimp', 2341777],
    ['Spinach', 1999633],
    ['Watermelon', 2344765],

]

    
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
            
            // loads data from FoodData API
            console.log("Current food id: " + foodID);
            var foodDataApi = `https://api.nal.usda.gov/fdc/v1/food/` + foodID + `?api_key=Z48TYWkfWlJkfT1ReGVPEqcbi3Ivi0sAG2uluFxx`;
            getSelectedAPI(foodDataApi);
    
          }
        );
    }

    //Gets wiki information and displays it
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
// foodDataApi = 'https://api.nal.usda.gov/fdc/v1/food/333281?api_key=Z48TYWkfWlJkfT1ReGVPEqcbi3Ivi0sAG2uluFxx'


// get information from the current API.
getSelectedAPI = function(api){
    // prints the api link being used.
    console.log(api);   
    fetch(api).then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log("FoodData api information: " + data);
                var foodObj = createFoodObj(data);
                console.log("Food object\n");
                renderNutritionData(foodObj);
            });
        }
    } )
}

// updates html to display treat nutrition
renderNutritionData = function(obj) {
    console.log(Object.keys(obj).length);
    console.log(Object.keys(obj)[1]);
    let element = document.getElementById('calories');
    element.textContent = `calories: ${obj.calories}`;
    for(let i = 2; i < Object.keys(obj).length; i++){
        console.log("Updated text");
        element = document.getElementById(Object.keys(obj)[i]);
        console.log(Object.keys(obj)[i])
        let nName = Object.keys(obj)[i];
        element.textContent = `${Object.keys(obj)[i]}: ${roundToHundredth(obj[nName]['amount'])}${obj[nName]['unit']}`;
    }
}

roundToHundredth = function(num) {
    var result = Math.round(100*num)/100;
    return result;
}

// takes data from getSelectedAPI and collects relevant information
createFoodObj = function(foodData) {
    console.log(foodData);
 var foodItem = new Food(foodData.description,
    getCalories(foodData),
    getNutrient('carbohydrate, by difference', foodData),
    getNutrient('fiber', foodData),
    getNutrient('protein', foodData),
    getNutrient('sugar', foodData),
    getNutrient('sodium', foodData),
    getNutrient('fat', foodData))

    console.log("info of selected food item: " + foodItem);
    return foodItem;
}

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
    var foodObj = {
        amount: 'na',
        unit: ''
    };
    for(let i = 0; i < foodData.foodNutrients.length; i++){
        var name = foodData.foodNutrients[i].nutrient.name;
        //console.log(foodData.foodNutrients[i].nutrient.name);
        if(name.toLowerCase().includes(nutrientName)){
            console.log("Nutrient: " + name);
            foodObj['amount'] = foodData.foodNutrients[i].amount;
            console.log("amount: " + foodObj['amount']);
            foodObj['unit']= foodData.foodNutrients[i].nutrient.unitName;
            console.log(foodObj['unit']);
        }
    }
    return foodObj;
}

checkSelectedFood = function(foodName){
    for(let i = 0; i < foodList.length; i++){
        if(foodList[i][0] === foodName){
            foodID = foodList[i][1];
            console.log("Selected food and ID is: " + foodName + " " + foodID);
            return foodID;
        }
    }
}


