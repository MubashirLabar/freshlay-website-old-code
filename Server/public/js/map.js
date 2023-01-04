mapboxgl.accessToken = 'pk.eyJ1IjoiYWhhZGciLCJhIjoiY2tqMXZkNHFkMjdxcTJxcnc5MTl5NjdqMCJ9.i10iuEH6qU2ucz-1FS22xg';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 9,
center: [-121.403732, 40.492392],

zoom : 10
});

//center: [-71.157895, 42.707741],

let datageojson = 
    {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              285.380859375,
              43.45291889355465
            ],
            [
              284.69970703125,
              42.22851735620852
            ],
            [
              285.66650390625,
              42.06560675405716
            ],
            [
              286.89697265625,
              42.50450285299051
            ],
            [
              285.380859375,
              43.45291889355465
            ]
          ]
        ]
      }
    }
  ]
}
  

function loadmap() {
    map.on('load', function () {
        map.addSource('point', {
            'type': 'geojson',
            'data': {
            'type': 'FeatureCollection',
            'features': [
            {
            'type': 'Feature',
            'geometry': {
            'type': 'Point',
            'coordinates': [-71.157895, 42.707741]
            },
            properties : {
                storeId: '001',
                icon: 'shop'
            }
            }
            ]
            }
            });
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'point',
                'layout': {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{storeId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS bold'],
                'text-offset': [0,0.9],
                'text-anchor': 'top'
                }
                });
        });
}
//loadmap();

map.on('load', function () {
    map.addSource('national-park', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'geometry': {
    'type': 'Polygon',
    'coordinates': [
    [
    [-121.353637, 40.584978],
    [-121.284551, 40.584758],
    [-121.275349, 40.541646],
    [-121.246768, 40.541017],
    [-121.251343, 40.423383],
    [-121.32687, 40.423768],
    [-121.360619, 40.43479],
    [-121.363694, 40.409124],
    [-121.439713, 40.409197],
    [-121.439711, 40.423791],
    [-121.572133, 40.423548],
    [-121.577415, 40.550766],
    [-121.539486, 40.558107],
    [-121.520284, 40.572459],
    [-121.487219, 40.550822],
    [-121.446951, 40.56319],
    [-121.370644, 40.563267],
    [-121.353637, 40.584978]
    ]
    ]
    }
    },
    {
    'type': 'Feature',
    'geometry': {
    'type': 'Point',
    'coordinates': [-121.415061, 40.506229]
    }
    },
    {
    'type': 'Feature',
    'geometry': {
    'type': 'Point',
    'coordinates': [-121.505184, 40.488084]
    }
    },
    {
    'type': 'Feature',
    'geometry': {
    'type': 'Point',
    'coordinates': [-121.354465, 40.488737]
    }
    }
    ]
    }
    });
     
    map.addLayer({
    'id': 'park-boundary',
    'type': 'fill',
    'source': 'national-park',
    'paint': {
    'fill-color': '#888888',
    'fill-opacity': 0.4
    },
    'filter': ['==', '$type', 'Polygon']
    });
     
    map.addLayer({
    'id': 'park-volcanoes',
    'type': 'circle',
    'source': 'national-park',
    'paint': {
    'circle-radius': 6,
    'circle-color': '#B42222'
    },
    'filter': ['==', '$type', 'Point']
    });
    });
    