/* Code Snippet to Create and Populate the Map */

/* GLOBAL VARIABLES */
var lastOpenedInfoWindow;

// Initialize and add the map
function initMap() {
    // The location of Oxford
    var oxford = {
        lat: 51.752022,
        lng: -1.257677
    };
    // The map, centered at Oxford
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 7,
            center: oxford,
        });

    // Fetch Markers Data
    fetch('./data/distilleries.json')
        .then(data => data.json())
        .then(res => {
            res.forEach(item => {
                // Create HTML Content for the infoWindow
                var contentWrapper = document.createElement('div');
                var imgWrapper = document.createElement('div');
                var img = document.createElement('img');
                var textWrapper = document.createElement('div');
                var name = document.createElement('p');
                var address = document.createElement('p')
                var rating = document.createElement('p')
                var reviewsCount = document.createElement('p')

                // Set attributes
                contentWrapper.setAttribute('class', 'info-window');
                imgWrapper.setAttribute('class', 'imgWrapper');
                img.setAttribute('src', `../powerhugs/images/distilleries/${item.photos.img_url}`);
                textWrapper.setAttribute('class', 'textWrapper')
                name.setAttribute('class', 'name');
                address.setAttribute('class', 'address');
                rating.setAttribute('class', 'rating');
                reviewsCount.setAttribute('class', 'reviews-count');

                // Set Content
                name.innerHTML = `<span>Name:</span> ${item.name}`;
                address.innerHTML = `<span>Address:</span> ${item.formatted_address}`;
                rating.innerHTML = `<span>Rating:</span> ${item.rating} / 5 Stars`;
                reviewsCount.innerHTML = `<span>Reviews:</span> ${item.user_ratings_total}`;

                // Set DOM Hierarchy
                imgWrapper.appendChild(img);

                textWrapper.appendChild(name);
                textWrapper.appendChild(address);
                textWrapper.appendChild(rating);
                textWrapper.appendChild(reviewsCount);

                contentWrapper.appendChild(imgWrapper);
                contentWrapper.appendChild(textWrapper);

                // Assign the HTML Content to a infoWindow
                var infoWindowContent = contentWrapper;
                var infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                // Create A marker for each location and place it on the map
                var marker = new google.maps.Marker({
                    position: item.geometry.location,
                    map: map,
                    title: item.name
                });

                // Assign the infowindow to the marker and set it to open when user click on Marker
                marker.addListener('click', function () {
                    closeLastOpenedInfoWindow();
                    infoWindow.open(map, marker);
                    lastOpenedInfoWindow = infoWindow;
                });

                function closeLastOpenedInfoWindow() {
                    if (lastOpenedInfoWindow) {
                        lastOpenedInfoWindow.close();
                    }
                }

            })
        })
        .catch(err => console.log(`There was an error handling your request: ${err}`))
}

initMap();