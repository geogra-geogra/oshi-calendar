// filename (without extension) from URL
let filename = window.location.pathname.split("/").pop().replace(".html", "");

// Fetch mascot data
fetch("../data/oshi.json")
    .then(response => response.json())
    .then(mascotData => {
        let item = mascotData.find(m => m.name === filename);
        if (item) {
            let html = `
        <h1>${item.full}${item.team ? `(${item.team})`: ''}</h1>`
        document.getElementById('mascot-title').innerHTML = html;
    }    });