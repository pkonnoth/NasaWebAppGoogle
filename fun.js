
// Define a function to load the Google Maps API
function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBrQ_mXhabKMKgPXFlnquwXjUflwSLRy2M&callback=initMap';
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
}

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
        mapTypeId: 'terrain', // Use the terrain map type

        // Set the restriction to world bounds
        restriction: {
            latLngBounds: worldBounds,
            strictBounds: false,
        },
    });

    // Disable map type control (prevents switching between map and satellite)
    map.setOptions({ mapTypeControl: false });

    // Initialize the Geocoder service
    const geocoder = new google.maps.Geocoder();

    // Add a click event listener to the map
    map.addListener('click', event => {
        // Get the coordinates where the user clicked
        const coordinates = event.latLng;

        // Use the Geocoder to get the country name
        geocoder.geocode({ location: coordinates }, (results, status) => {
            if (status === 'OK') {
                // Check if there are any results
                if (results[0]) {
                    // Extract the country name from the results
                    window.countryName = '';

                    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat()}, ${coordinates.lng()}&sensor=false&key=AIzaSyBrQ_mXhabKMKgPXFlnquwXjUflwSLRy2M`).then(response => response.json().then(
                        data => {
                            window.countryName = data.results[data.results.length - 1].formatted_address;
                        }
                    )).then(() => {
                        console.log("Country name: " + window.countryName);
                    });
                } else {
                    console.log('No results found');
                }
            } else {
                console.error('Geocoder failed due to:', status);
            }
        });
    });

    
    
    var latlon;
    fetch('./data.json')
    .then(response => response.json()) // this will parse the JSON data as an object
    .then(data => {
        const latlon = data
        console.log()
        const max=Object.keys(latlon.latitude).length
        console.log(max)
        const image="https://raw.githubusercontent.com/DuckyProgramming/SpaceApps2023/main/frontend/public/untitled%20(1).png";
        for(var a=0;a<max;a++){
            var marker = new google.maps.Marker({
                position: {lat:latlon.latitude[a],lng:latlon.longitude[a]},
                icon:image,
                title:"Fire",
            });

            marker.setMap(map);
        }
    }); // this will print the JSON data as an object

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
        // console.log(data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
