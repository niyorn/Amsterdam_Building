var map;
var buildingType = {
    noData: "Geen Data",
    social: "Sociaal huur woning",
    middel: "Middel huur woning",
    expensive: "Duur huur woning",
    house: "Koop woning"
}

const year = 2019;

function initMap() {
    initMapData();
    loadBuildingData();
}


function loadBuildingData() {
    d3.json("data/bouwplannen.json", function (err, data) {

        if (err) {
            throw err;
        }

        //put all coordinate of the building in an array
        var building = [];
        data.forEach(function (d) {
            if (d.JAARBOUW >= year) {
                var info = {};
                //replace is used because google maps use a dot for the coordination
                info.LAT = d.LAT.replace(/,/g, '.');
                info.LNG = d.LNG.replace(/,/g, '.');
                info.buildYear = d.JAARBOUW
                info.buildingType = [d.HUUR_SOC, d.HUUR_MIDDEL, d.HUUR_DUUR, d.KOOP];
                info.buildingSocial = d.HUUR_SOC;
                info.buildingAverage = d.HUUR_MIDDEL;
                info.buildingExpensive = d.HUUR_DUUR;
                info.buildingHouse = d.KOOP;
                info.projectID = d.PROJECTID;


                info.buildingType = checkTypeBuilding(info.buildingType, buildingType);
                building.push(info);
            } else {
                return
            }
        });

        createMarker(building);
    });
};

function initMapData(coordinateMarker) {
    var infoWindow;
    infoWindow = new google.maps.InfoWindow;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 52.3697856,
            lng: 4.89738837
        },
        zoom: 13,
        styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#242f3e"
                }]
            },
            {
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#746855"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#242f3e"
                }]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#d59563"
                }]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#d59563"
                }]
            },
            {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#263c3f"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#6b9a76"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#38414e"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#212a37"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9ca5b3"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#746855"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#1f2835"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#f3d19c"
                }]
            },
            {
                "featureType": "road.local",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "transit",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#2f3948"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#d59563"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#17263c"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#515c6d"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#17263c"
                }]
            }
        ],
        disableDefaultUI: true,
    });
}


function createMarker(data) {
    //Get the highest and lowest build year of the buildings
    var maxBuildYear = d3.max(data, function (d) {
        return +d.buildYear;
    });
    var minBuildYear = d3.min(data, function (d) {
        return +d.buildYear;
    });

    var features = [];
    //create marker
    data.forEach(function (d) {
        var coordinate = {};
        coordinate.buildingType = d.buildingType;
        coordinate.position = new google.maps.LatLng(d.LAT, d.LNG);
        coordinate.buildYear = d.buildYear;
        features.push(coordinate);
    });
    //From wich year do you want so see  the building build up.
    //For now we're choosing for 2017
    var difference = maxBuildYear - year;
    var timelineYear = year;
    var yearCounter = year;
    for (var i = 0; i < difference + 1; i++) {
        features.forEach(function (feature) {
            if (feature.buildYear == timelineYear) {
                var coordinate = feature.position;
                var buildingType = feature.buildingType;
                setTimeout(() => {
                    insertMarker(coordinate, buildingType);
                }, 1000 * i);
            }
        });

        setTimeout(() => {
            d3.select(".year")
                .text(yearCounter);
            yearCounter++;
        }, 1000 * i);
        timelineYear++;
    }

    var size = 0.7;
    var svgPath = "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0";
    var svgOpacity = 0.7;
    var svgStrokeWeight = 0;

    var markerType = {
        noData: {
            path: svgPath,
            fillColor: '#fff',
            fillOpacity: svgOpacity,
            strokeWeight: svgStrokeWeight,
            scale: size
        },
        social: {
            path: svgPath,
            fillColor: '#FF0000',
            fillOpacity: svgOpacity,
            strokeWeight: svgStrokeWeight,
            scale: size
        },
        middel: {
            path: svgPath,
            fillColor: '#f7f2',
            fillOpacity: svgOpacity,
            strokeWeight: svgStrokeWeight,
            scale: size
        },
        expensive: {
            path: svgPath,
            fillColor: '#f2f',
            fillOpacity: svgOpacity,
            strokeWeight: svgStrokeWeight,
            scale: size
        },
        house: {
            path: svgPath,
            fillColor: '#ff2',
            fillOpacity: svgOpacity,
            strokeWeight: svgStrokeWeight,
            scale: size
        }
    }



    function insertMarker(coordinate, buildingTypeParameter) {

        var result;

        console.log(buildingTypeParameter);


        switch (buildingTypeParameter) {
            case buildingType.noData:
                {
                    result = markerType.noData;
                    break;
                }
            case buildingType.social:
                {
                    result = markerType.social;
                    break;
                }
            case buildingType.middel:
                {
                    result = markerType.middel;
                    break;
                }
            case buildingType.expensive:
                {
                    result = markerType.expensive;
                    break;
                }
            case buildingType.house:
                {
                    result = markerType.house;
                    break;
                }
        }



        var marker = new google.maps.Marker({
            position: coordinate,
            icon: result,
            map: map
        })
    }
}

function checkTypeBuilding(data, buildingType) {
    var buildingType;
    var noData = 0;
    var noDataCount;
    buildingArrayHolder = data;
    buildingArrayLenght = buildingArrayHolder.length;
    var result;


    buildingArrayHolder.forEach(function (d) {
        if (d == 0) {
            noData++;
        }
    });

    if (noData == buildingArrayLenght) {
        result = -1
    } else {
        var maxBuilding = d3.max(buildingArrayHolder, function (d) {
            return d
        });
        result = buildingArrayHolder.findIndex(find);
    }


    function find(index) {
        return index == maxBuilding;
    }


    switch (result) {
        case -1:
            {
                result = buildingType.noData;
                break;
            }
        case 0:
            {
                result = buildingType.social;
                break;
            }
        case 1:
            {
                result = buildingType.middel;
                break;
            }
        case 2:
            {
                result = buildingType.expensive;
                break;
            }
        case 3:
            {
                result = buildingType.house;
                break;
            }
    }
    return result;
}