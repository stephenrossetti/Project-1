var food = ['Cheese', 'Bacon'];
var wikiApiUrl = 'https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search='+ food[1] +'&limit=1&format=json';
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
        var linkText = data[3];
        linkEl.href = linkText;

        linkEl.append(linkText);
        wikiDiv.append(linkEl);
      }
    );
}

getInfoBtn.on('click', getWikiApi);