var lastIndex = [];
let bufferSize = 15;
for (let i = 0; i < bufferSize; i++) {
    lastIndex.push(0);
}

var FID = new URLSearchParams(location.search).get("FID");

document.addEventListener("DOMContentLoaded", function() {
    SetFact(FID);
    window.addEventListener('keydown', e => {
        if (e.keyCode >= 37 && e.keyCode <= 40) SetFact("");
    });
    document.querySelector("#newFact").addEventListener("click", SetFact);    
    LoadImages();
});

function LoadImages() {
    let images = new Array();
    data.Defaults.forEach(d => {
        for (let i = 0; i < d.bgCount; i++) {
            images[i] = new Image();
            images[i].src = `Images/BG/${d.type}/${d.type}_${i+1}.jpg`
        }
    });
}

function SetFact(_FID) {
    window.scrollTo(0,0);

    let newFactIndex = 0;
    if(_FID && !isNaN(_FID) && _FID >= 0 && _FID < data["Facts"].length) {
        newFactIndex = _FID;
        FID = "";
    } else {
        newFactIndex = Math.floor(Math.random() * data["Facts"].length);    
        while (lastIndex.filter(i => i === newFactIndex).length > 0) {
            newFactIndex = Math.floor(Math.random() * (data["Facts"].length));
        }
    }

    let newFact = data["Facts"][newFactIndex];
    lastIndex.unshift(newFactIndex);
    lastIndex.pop();

    history.replaceState(`Fact: ${newFactIndex}`, 'Animal Fact Generator', `/?FID=${newFactIndex}`);

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
    document.querySelector(".bg-image").style.transition = "none";
    document.querySelector(".bg-image").style.opacity = 0;
    setTimeout(ResetImageOpac, 1);

    document.querySelector(".twitt-button").innerHTML="";
    
    let twitSize = "large";
    if (window.matchMedia("(max-width: 980px)").matches) {
        twitSize="small";
    }

    twttr.widgets.createShareButton(
        location.href,
        document.querySelector(".twitt-button"),
        {
            size: `${twitSize}`,
            text: `Did you know: ${newFact.factHeading}\n`,            
            hashtags: "SciComm",
            via: "AdaMcVean",
            related: "animals,animalfacts,trivia,nature,wildlife,SciComm"
        }
      );
}

function ResetImageOpac() {
    document.querySelector(".bg-image").style.transition = "opacity 0.2s ease-in-out";
    document.querySelector(".bg-image").style.opacity = 1;
}