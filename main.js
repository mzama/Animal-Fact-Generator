var lastIndex = 0;
document.addEventListener("DOMContentLoaded", function() {
    SetFact(lastIndex);
    document.querySelector("#newFact").addEventListener("click", SetFact);
});

function SetFact(_lI) {
    let newFactIndex = Math.floor(Math.random() * (data["Facts"].length));
    
    while (newFactIndex === lastIndex) {
        newFactIndex = Math.floor(Math.random() * (data["Facts"].length));
    }
    let newFact = data["Facts"][newFactIndex];
    lastIndex = newFactIndex;

    document.querySelector(".fact-title h2").innerHTML = newFact["factHeading"];
    document.querySelector(".fact-copy p").innerHTML = newFact["factBody"];
    if (newFact["image"]) {
        document.querySelector("#factImg").setAttribute("src", `Images/Fact/${newFact["image"]}`);
    } else {
        document.querySelector("#factImg").setAttribute("src", "");
    }

    if (newFact["link"]) {
        document.querySelector(".fact-link a").setAttribute("href", newFact["link"]);
    } else {
        document.querySelector(".fact-link a").setAttribute("href", data["Defaults"].filter(d => d.type === newFact["type"])[0].link);
    }

    switch (newFact["type"]) {        
        case "turtle":
            let newImgIndex = Math.ceil(Math.random() * 3);
            document.querySelector(".bg-image").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(Images/BG/Turtle/Turtle_${newImgIndex}.jpg)`;
            break;
        default:
            document.querySelector(".bg-image").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(Images/BG/Turtle/Turtle_${newImgIndex}.jpg)`;
            break;
    }
}