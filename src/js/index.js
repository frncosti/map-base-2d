

// Initialize Map
initMap();


function initMap() {
    const config = {
        data: './src/data/data.json',
        layer: 'https://pro-ags1.dfs.un.org/arcgis/rest/services/basemaps/clearmap_webtopo_nolabel_cvw/MapServer/tile/{z}/{y}/{x}',
        startCoords: [41.902782,12.496366],
        zoom: 4,
        minZoom: 3,
        maxZoom: 6,
    }

    const map = L.map('map', {
        minZoom: config.minZoom,
        maxZoom: config.maxZoom,
    }).setView(config.startCoords, config.zoom);

    // Layers order
    map.createPane("bottom");
    map.getPane("bottom").style.zIndex = "1";

    // Create layer 
    const layer1 = L.tileLayer(config.layer, {
        pane: "bottom",
        noWrap: true,
    }).addTo(map);

    // Add layer to map 
    layer1.addTo(map);
    
    // Get Data 
    getData(config.data, map);
}

async function getData(data, map) {
    const res = await fetch(data);
    const dataJson = await res.json();
    // const loader = document.getElementById('mapLoader');

    let marker;
    let content;


    for(let i = 0; i < dataJson.length; i++) {
        content = `
            <h4>${dataJson[i].country} - ${dataJson[i].city}</h4>
            <p>Latitude: ${dataJson[i].lat}</p>
            <p>Longitude: ${dataJson[i].lon}</p>
        `
        marker = L.marker([dataJson[i].lat, dataJson[i].lon]).addTo(map);
        marker.bindPopup(content);
    }

    // loader.style.display = 'none';
}
