var map;
var buildingType = {
  noData: "Onbekend",
  social: "Sociaal huur woning",
  middel: "Middel huur woning",
  expensive: "Dure huur woning",
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
        info.finishYear = d.JAAROPL;
        info.opdrachtGever = d.OPDRACHTGEVER;
        info.projectName = d.PROJECTNAAM;
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
          "color": "#f5f5f5"
        }]
      },
      {
        "elementType": "geometry.fill",
        "stylers": [{
          "weight": 1.5
        }]
      },
      {
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#616161"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f5f5"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#bdbdbd"
        }]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "landscape",
        "stylers": [{
          "weight": 5.5
        }]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [{
          "weight": 3.5
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#eeeeee"
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
          "color": "#757575"
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
          "color": "#e5e5e5"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      },
      {
        "featureType": "road",
        "stylers": [{
          "weight": 0.5
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
          },
          {
            "weight": 2
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#a7a7a7"
          },
          {
            "saturation": -65
          },
          {
            "lightness": 35
          },
          {
            "weight": 2
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#525252"
          },
          {
            "weight": 5.5
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
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
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#757575"
        }]
      },
      {
        "featureType": "road.highway",
        "stylers": [{
            "color": "#5bc2d9"
          },
          {
            "lightness": 5
          },
          {
            "weight": 1.5
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#2e2e2e"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "weight": 1
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
          "color": "#616161"
        }]
      },
      {
        "featureType": "road.local",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#9e9e9e"
        }]
      },
      {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e5e5e5"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#eeeeee"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#c9c9c9"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#2e2e2e"
          },
          {
            "saturation": -70
          },
          {
            "lightness": 40
          },
          {
            "weight": 3
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#9e9e9e"
          },
          {
            "weight": 8
          }
        ]
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
    coordinate.finishYear = d.finishYear;
    coordinate.projectName = d.projectName;
    coordinate.opdrachtGever = d.opdrachtGever;
    coordinate.projectId = d.projectID;
    coordinate.social= d.buildingSocial;
    coordinate.middel = d.buildingAverage;
    coordinate.expensive = d.buildingExpensive;
    coordinate.house = d.buildingHouse;
    features.push(coordinate);
  });

  
  //From wich year do you want so see  the building build up.
  //For now we're choosing for 2017
  var difference = maxBuildYear - year;
  var timelineYear = year;
  var yearCounter = year;
  for (var i = 0; i < difference + 1; i++) {
    features.forEach(function (feature) {
      if (feature.buildYear == timelineYear) 
      {
        var coordinate = feature.position;
        var buildingType = feature.buildingType;
        var finishYear = feature.finishYear;
        var projectName = feature.projectName;
        var opdrachtGever = feature.opdrachtGever;
        var buildYear = feature.buildYear;
        var social= feature.social;
        var middel = feature.middel;
        var expensive = feature.expensive;
        var house = feature.house;   
        setTimeout(() => {
          insertMarker(coordinate, buildingType,buildYear, finishYear, projectName, opdrachtGever, social, middel,expensive, house);
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

  var size = 0.4;
  var svgPath = "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0";
  var svgOpacity = 1;
  var svgStrokeWeight = 0;
  var svgColorBuilding = {
    noData: "#000000",
    social: "#E53935",
    middel: "#AB47BC",
    expensive: "#FFA726",
    house: "#1E88E5"
  }

  var markerType = {
    noData: {
      path: svgPath,
      fillColor: svgColorBuilding.noData,
      fillOpacity: svgOpacity,
      strokeWeight: svgStrokeWeight,
      scale: size
    },
    social: {
      path: svgPath,
      fillColor: svgColorBuilding.social,
      fillOpacity: svgOpacity,
      strokeWeight: svgStrokeWeight,
      scale: size
    },
    middel: {
      path: svgPath,
      fillColor: svgColorBuilding.middel,
      fillOpacity: svgOpacity,
      strokeWeight: svgStrokeWeight,
      scale: size
    },
    expensive: {
      path: svgPath,
      fillColor: svgColorBuilding.expensive,
      fillOpacity: svgOpacity,
      strokeWeight: svgStrokeWeight,
      scale: size
    },
    house: {
      path: svgPath,
      fillColor: svgColorBuilding.house,
      fillOpacity: svgOpacity,
      strokeWeight: svgStrokeWeight,
      scale: size
    }
  }


  function insertLegend() {

    var legend = d3.select(".legenda-container");
    for (var i in buildingType) {
      var type = buildingType[i];
      var legendContainer = legend.append('div')
        .attr('class', 'sub-container');
      legendContainer.append('div')
        .attr('class', type)
        .style("height", "50px")
        .style("width", "50px")
        .style('background', svgColorBuilding[i]);
      legendContainer.append('span')
        .attr('class', type)
        .text(type);
    }

  }
  insertLegend();

  function insertMarker(coordinate, buildingTypeParameter, buildYear, finishYear, projectName, opdrachtGever, social, middel, expensive, house) {
    var result;
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

    var contentString = '<div class="tooltip-container">'+
    '<div class="tooltip-titel">'+
    '<span>'+ projectName + '</span>' +
    '</div>'+
    '<p>'+ "In opdracht van: "+ '<span>'+ projectName + '</span>' + '</p>'+
    '<p>'+ "Jaarbouw: "+ '<span>'+ buildYear + '</span>' + '</p>'+
    '<p class="oplevering">'+ "Oplevering: "+ '<span>'+ finishYear + '</span>' + '</p>'+
    '<p>'+ "Sociaal huur woning: "+ '<span>'+ social + '</span>' + '</p>'+
    '<p>'+ "Middel huur woning: "+ '<span>'+ middel + '</span>' + '</p>'+
    '<p>'+ "Dure huur woning: "+ '<span>'+ expensive + '</span>' + '</p>'+
    '<p>'+ "Koop woning: "+ '<span>'+ house + '</span>' + '</p>'+
    '</div>';



    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });



    var marker = new google.maps.Marker({
      position: coordinate,
      icon: result,
      animation: google.maps.Animation.jp,
      map: map,
      labelClass: "test"
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
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