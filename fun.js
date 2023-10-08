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
                    const addressComponents = results[0].address_components;
                    let countryName = '';

                    for (const component of addressComponents) {
                        if (component.types.includes('country')) {
                            countryName = component.long_name;
                            break; // Stop searching once the country name is found
                        }
                    }

                    // Log the country name to the console
                    console.log('Country Name:', countryName);
                } else {
                    console.log('No results found');
                }
            } else {
                console.error('Geocoder failed due to:', status);
            }
        });
    });
}

// Load the Google Maps API when the page loads
loadGoogleMapsAPI();
