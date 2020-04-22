var lastIndex = [];
let bufferSize = 15;
for (let i = 0; i < bufferSize; i++) {
    lastIndex.push(0);
}

document.addEventListener("DOMContentLoaded", function() {
    SetFact();
    window.addEventListener('keydown', e => {
        if (e.keyCode >= 48 && e.keyCode <= 90) SetFact();
    });
    document.querySelector("#newFact").addEventListener("click", SetFact);
});

function SetFact() {
    window.scrollTo(0,0);

    let newFactIndex = Math.floor(Math.random() * data["Facts"].length);
    
    while (lastIndex.filter(i => i === newFactIndex).length > 0) {
        newFactIndex = Math.floor(Math.random() * (data["Facts"].length));
    }
    let newFact = data["Facts"][newFactIndex];
    lastIndex.unshift(newFactIndex);
    lastIndex.pop();

    document.querySelector(".fact-title h2").innerHTML = newFact["factHeading"];
    document.querySelector(".fact-copy p").innerHTML = newFact["factBody"];
    if (newFact["image"]) {
        document.querySelector("#factImg").setAttribute("src", `Images/Fact/${newFact["image"]}`);
        document.querySelector("#factImg").style.display = "block";
    } else {
        document.querySelector("#factImg").setAttribute("src", "");
        document.querySelector("#factImg").style.display = "none";
    }

    if (newFact["link"]) {
        document.querySelector(".fact-link a").setAttribute("href", newFact["link"]);
    } else {
        document.querySelector(".fact-link a").setAttribute("href", data["Defaults"].filter(d => d.type === newFact["type"])[0].link);
    }

    let bgURL = "";
    let newImgIndex = 0;
    let bgImgCount = data["Defaults"].filter(d => d.type === newFact["type"])[0]["bgCount"];

    if (bgImgCount < 1) {
        bgURL = "Images/BG/Default/Default_1.jpg";
    } else {
        newImgIndex = Math.ceil(Math.random() * bgImgCount)
        bgURL=`Images/BG/${newFact["type"]}/${newFact["type"]}_${newImgIndex}.jpg`;
    }

    document.querySelector(".bg-image").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${bgURL})`;
}