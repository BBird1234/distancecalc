let input1 = document.getElementById('from');
let input2 = document.getElementById('to');

let autocomplete1 = new google.maps.places.Autocomplete(input1);
let autocomplete2 = new google.maps.places.Autocomplete(input2);

let myLatLng = {
    lat: 38.239,
    lng: -0.4689
};

let mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

let map = new google.maps.Map(document.querySelector('.googleMap'), mapOptions);

// Create a DirectionsService object to use the route method and get a result for our request
let directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
let directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

// Define calcRoute function
function calcRoute(event) {
    event.preventDefault(); // Prevent form submission

    // Create request
    let request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, // WALKING, BICYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC
    };

    // Pass the request to the route method
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Get distance and time
            const output = document.querySelector("#output");
            output.innerHTML = `
                <div class='alert alert-info'>
                    From: ${document.getElementById("from").value}.<br />
                    To: ${document.getElementById("to").value}.<br />
                    Driving distance: ${result.routes[0].legs[0].distance.text}.<br />
                    Duration: ${result.routes[0].legs[0].duration.text}.
                </div>
            `;

            // Display the route
            directionsDisplay.setDirections(result);
        } else {
            // Delete route from map
            directionsDisplay.setDirections({ routes: [] });
            // Center map in London
            map.setCenter(myLatLng);

            // Show error message
            output.innerHTML = "<div class='alert alert-danger'>Could not retrieve driving distance.</div>";
        }
    });
}
