// Initialize the map
function initMap() {
    const minZoomLevel = 2; // Set the minimum zoom level to show the whole world
    const maxZoomLevel = 18; // Set the maximum zoom level (18 is the max for Google Maps)

    const worldBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-85.05112878, -180), // Southwestern corner of the world
        new google.maps.LatLng(85.05112878, 180)   // Northeastern corner of the world
    );

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 }, // Center the map at the world's equator and prime meridian
        zoom: minZoomLevel, // Set the initial zoom level to the minimum

        // Set the minimum and maximum zoom levels
        minZoom: minZoomLevel,
        maxZoom: maxZoomLevel,
        mapTypeId: 'satellite', // Use the satellite map type

        // Set the restriction to world bounds
        restriction: {
            latLngBounds: worldBounds,
            strictBounds: false,
        },
    });

    // Disable map type control (prevents switching between map and satellite)
    map.setOptions({ mapTypeControl: false });
}

// Load the Google Maps API when the page loads
loadGoogleMapsAPI();
// Define your MAP_KEY (replace with your actual map_key)
const MAP_KEY = '0a99be10cfebba71b9e96715339da3c1'; // Replace with your map_key

// Define the parameters for the API endpoint
const SOURCE = 'VIIRS_NOAA20_NRT'; // Sensor/source name
const AREA_COORDINATES = 'world'; // Area coordinates (in this example, querying the entire world)
const DAY_RANGE = '1'; // Number of days to look back (1 for the most recent day)

// Define the URL for querying fire detection hotspots
const areaUrl = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${MAP_KEY}/${SOURCE}/${AREA_COORDINATES}/${DAY_RANGE}`;

// Make a GET request to the area API
fetch(areaUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        // Process the CSV data here
        // You can parse the CSV data into an array or perform other operations as needed
        console.log(data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
