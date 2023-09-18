let searchInputElement = document.getElementById("searchInput");
let serchResultsElement = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");

function createAndAppendsearchResults(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultItemElement = document.createElement("div");
    resultItemElement.classList.add("result-item");


    let titleElement = document.createElement("a");
    titleElement.classList.add("result-title");
    titleElement.href = link;
    titleElement.target = "_blank";
    titleElement.textContent = title;
    resultItemElement.appendChild(titleElement);


    let firstBreakElement = document.createElement("br");
    resultItemElement.appendChild(firstBreakElement);


    let urlElement = document.createElement("a");
    urlElement.classList.add("result-url");
    urlElement.href = link;
    urlElement.target = "_blank";
    urlElement.textContent = link;
    resultItemElement.appendChild(urlElement);


    let secondBreakElement = document.createElement("br");
    resultItemElement.appendChild(secondBreakElement);


    let descriptionElement = document.createElement("p");
    descriptionElement.classList.add("link-description");
    descriptionElement.textContent = description;
    resultItemElement.appendChild(descriptionElement);

    serchResultsElement.appendChild(resultItemElement);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    //let result = searchResults[0];
    for (let result of searchResults) {
        createAndAppendsearchResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        serchResultsElement.textContent = "";

        let searchInputVal = searchInputElement.value;
        let url = " https://en.wikipedia.org/wiki-Search?search=" + searchInputVal;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                //console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputElement.addEventListener("keydown", searchWikipedia);