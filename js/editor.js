var activeFID = 0;

document.addEventListener("DOMContentLoaded", function() {
    data["Defaults"].sort((a, b) => (a.type > b.type) ? 1 : -1)

    LoadFactPreviews();
    LoadFactCategories();
    ChangeActiveFact(activeFID);

    document.querySelector("#saveAll").addEventListener("click", SaveData);
    document.querySelector("#saveFact").addEventListener("click", SaveFact);
    document.querySelector("#deleteFact").addEventListener("click", DeleteFact);  
});

function LoadFactPreviews() {
    let scrollHolder = document.querySelector('.facts-scroll');
    // scrollHolder.innerHTML = `<div class="create-fact-button"><button id="createFact">Create Fact</button></div>`;    

    for (let i = 0; i < data["Facts"].length; i++) {
        scrollHolder.innerHTML += `<div class="fact-scroll-preview" id="${i}" onclick="ChangeActiveFact(id, true)">${i}. ${data["Facts"][i]["factHeading"]}</div>`;
    }

    document.querySelector("#createFact").addEventListener("click", CreateNewFact);
}

function LoadFactCategories() {
    let categoryDropdown = document.querySelector('#factTypeInput');
    
    categoryDropdown.innerHTML = ``;    

    for (let i = 0; i < data["Defaults"].length; i++) {
        categoryDropdown.innerHTML += `<option value="${data["Defaults"][i]["type"]}">${data["Defaults"][i]["type"]}</option>`
    }
}

function ChangeActiveFact(_FID, _confirmChange) {
    if (CheckFactChanged() && _confirmChange) {
        if (!confirm("This fact has unsaved changes that will be lost. Proceed?"))
        {
            return;
        }
    }

    activeFID = _FID;
    _newFact = data["Facts"][_FID];

    document.querySelector(".fact-title h2").innerHTML = _FID;
    document.querySelector("#factHeadingArea").value = _newFact["factHeading"];
    document.querySelector("#factCopyArea").value = _newFact["factBody"];

    document.querySelector("#factLinkInput").value = _newFact["link"];
    document.querySelector("#factTypeInput").value = _newFact["type"];
    document.querySelector("#factImageInput").value = _newFact["image"];

    let bgURL = "";
    if (!_newFact["type"] || _newFact["type"] === "Fact type.") {
        bgURL = "Images/BG/Default/Default_1.jpg";
    } else {
        let bgImgCount = data["Defaults"].filter(d => d.type === _newFact["type"])[0]["bgCount"];
        let newImgIndex = Math.ceil(Math.random() * bgImgCount);
        bgURL=`Images/BG/${_newFact["type"]}/${_newFact["type"]}_${newImgIndex}.jpg`;
    }

    document.querySelector(".bg-image").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${bgURL})`;
}

function CreateNewFact() {
    data["Facts"].push({factHeading: "Fact Heading.", factBody: "Fact body.", link: "Fact link.", type: "Fact type.", image: "Fact image."});
    LoadFactPreviews();
    document.querySelector(".facts-scroll").scrollTo(0,1000000);
    ChangeActiveFact(data["Facts"].length - 1, false);    
}

function SaveFact() {
    if (confirm("Save changes to fact? This can be undone by refreshing before final save."))
    {
        factToUpdate = data["Facts"][activeFID];

        factToUpdate["factHeading"] = document.querySelector("#factHeadingArea").value;
        factToUpdate["factBody"] = document.querySelector("#factCopyArea").value;

        if (document.querySelector("#factLinkInput").value === "Fact link.") {
            factToUpdate["link"] = "";
            document.querySelector("#factLinkInput").value = "";
        } else {
            factToUpdate["link"] = document.querySelector("#factLinkInput").value;
        }

        factToUpdate["type"] = document.querySelector("#factTypeInput").value;

        if (document.querySelector("#factImageInput").value === "Fact image.") {
            factToUpdate["image"] = "";
            document.querySelector("#factImageInput").value = "";
        } else {
            factToUpdate["image"] = document.querySelector("#factImageInput").value;
        }

        LoadFactPreviews();
    }
}

function DeleteFact() {
    if (confirm("Delete fact? This can be undone by refreshing before final save."))
    {
        data["Facts"].splice(activeFID, 1);
        LoadFactPreviews();
        activeFID = 0;
        changeConfirm = true;
        ChangeActiveFact(activeFID, false);
        changeConfirm = false;
        document.querySelector('.facts-scroll').scrollTo(0, 0);
    }
}

function SaveData() {
    let _writeData = "var data = " + JSON.stringify(data, null, " ");
    let _filename = `data.js`;

    var _file = new Blob([_writeData], {type: "text/javascript"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(_file, _filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(_file);
        a.href = url;
        a.download = _filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function CheckFactChanged() {
    let _activeFact = data["Facts"][activeFID];
    return (document.querySelector("#factHeadingArea").value !== _activeFact["factHeading"] || 
    document.querySelector("#factCopyArea").value !== _activeFact["factBody"] ||
    document.querySelector("#factLinkInput").value !== _activeFact["link"] ||
    document.querySelector("#factTypeInput").value !== _activeFact["type"] ||
    document.querySelector("#factImageInput").value !== _activeFact["image"]);
}