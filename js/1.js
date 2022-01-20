function pantek(d){
    let bilangan = d;

    console.log(bilangan == 10); // Output: true
    console.log(bilangan == 8); // Output: false
    console.log(bilangan == "10"); // Output: true
    console.log(bilangan === "10");

    console.log("");
    console.log("");

    console.log(bilangan != 8); // Output: true --> nilai tidak sama tetapi tipe data sama
    console.log(bilangan != "8"); // Output: true --> nilai dan tipe data tidak sama
    console.log(bilangan != 10); // Output: false --> nilai dan tipe data sama
    console.log(bilangan != "10");

    console.log("");
    console.log("");

    console.log(bilangan !== 8); // Output: true --> nilai tidak sama tetapi tipe data sama
    console.log(bilangan !== "8"); // Output: true --> nilai dan tipe data tidak sama
    console.log(bilangan !== 10); // Output: false --> nilai dan tipe data sama
    console.log(bilangan !== "10");

    console.log("");
    console.log("");

    let makanan = "daging";

    let jenisHewan = makanan === "daging"  ? "karnivora" : "herbivora";

    console.log(jenisHewan); // Output: "karnivora"
}

// pantek(12);

function tambah(a,b){
    console.log(a+b);
}

// tambah(2,4);

var mbah = function(a,b){
    return a*b;
}

console.log(mbah(4,3));