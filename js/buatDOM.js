//2
let body = document.body;

//3
let heading = document.createElement('h1');
console.log(heading);

//4
body.appendChild(heading);

//5
let id = document.createAttribute('id');
id.value = "mainHeading";
heading.setAttributeNode(id);

//6
let contentHeading = document.createTextNode("Heading Cok");
heading.appendChild(contentHeading);
