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
    var wikiDiv = $('#food-wiki');
    var getInfoBtn = $('#get-info');
    
    function getWikiApi () {
    fetch(wikiApiUrl)
        .then(function(response) {
            console.log(response);
            return response.json()
        })
        .then(function(data) {
            console.log(data);
    
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



