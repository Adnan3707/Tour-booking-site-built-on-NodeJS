/* eslint-disable */
// Map Box Section

const locations = JSON.parse(document.getElementById('map').dataset.locations);

 mapboxgl.accessToken = 'pk.eyJ1IjoiYWRuYW4zNyIsImEiOiJja3plNzk2NzAwZ2UxMm9tcXYycWEzeWtjIn0.hmAoXWPNVIflkdPJw_3cUg';

 
 var map = new mapboxgl.Map({
   container: 'map',
   style: 'mapbox://styles/mapbox/light-v10'
  });
  


    // add markers to map
for (const feature of locations) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(feature.coordinates).addTo(map);
}
