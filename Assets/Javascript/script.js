

// var food = selectFood;
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