let searchList = [];

function onSearch(){
    let searchValue = document.getElementById("searchkey").value;
    searchList.push(searchValue);

    let searchListString = JSON.stringify(searchList);
    localStorage.setItem('searchKey', searchListString);
}

let listCari = JSON.parse(localStorage.getItem('searchKey'));

function getSearchHistory(){
    var list = '';
    for(let i=0;i<listCari.length;i++){
        list += `<div>${listCari[i]}</div>`;
    }
    document.getElementById("search-history").innerHTML = list;
}

if(listCari.length > 0){
    getSearchHistory();
}

function clearSearchHistory(){
    localStorage.removeItem('searchKey');
    document.getElementById("search-history").innerHTML = '';
}