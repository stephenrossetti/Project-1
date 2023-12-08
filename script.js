var food = ['Cheese', 'Bacon'];
// var wikiApiUrl = 'https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search='+ food[1] +'&limit=1&prop=text&format=json';
var wikiApiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/'+food[1];
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

        var linkEl = document.createElement('a');
        var linkText = 'https://en.wikipedia.org/wiki/' + food[1];
        linkEl.href = linkText;

        linkEl.append(linkText);
        wikiDiv.append(linkEl);

        var wikiTextEl = document.createElement('p');
        var wikiText = data.extract;
        wikiTextEl.textContent = wikiText;
        wikiDiv.append(wikiTextEl);

      }
    );
}

getInfoBtn.on('click', getWikiApi);