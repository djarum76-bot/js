function getText(){
    const textH1 = document.getElementsByTagName('h1')[0].innerText

    document.getElementsByTagName('p')[0].innerText = textH1;
}

function getInput(){
    // let input = document.getElementById('input');
    let input = document.getElementsByTagName('input')[0];

    document.getElementsByTagName('p')[0].innerText = input.value;
}