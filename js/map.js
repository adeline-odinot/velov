/* Contient la Google Maps et ses différents marqueurs positionnés en fonction de chaque station qui sont représentés visuellement sur la carte par des icones de manière à savoir si la station est ouverte ou fermée. */

var map = {
    googleMap: null,
    
    // Affiche la map et ses marqueurs ainsi que les informations de la station séléctionnée
    
    initMap: function (stations) {
        var self = this;
        this.googleMap = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 45.75,
                lng: 4.85
            },
            zoom: 14
        });
        var markerTab = [];
        
        var domObjet = Object.create(dom);

        $.each(stations, function (index, station) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(station.position.lat, station.position.lng),
                icon: self.choisirIcone(station)
            })
            var infowindow = new google.maps.InfoWindow({
                content: "Station : " + station.name
            });

            marker.addListener("click", function () {
                infowindow.open(this.googleMap, marker);
                domObjet.initDom(station);
                domObjet.valider(station);
                domObjet.verifierPlurielsDispo(station);
                domObjet.bloquerReservationEnCours(station);
            })
            markerTab.push(marker);
            marker.setMap(self.map);
        })
        new MarkerClusterer(this.googleMap, markerTab, {
            imagePath: './images/markerclusterer/m'
        });
    },
    
    // Image de l'icône du marqueur representée par sa condition

    choisirIcone: function (station) {
        var iconeVerte = {
            url: './images/marker-icone/icone-verte.png',
            scaledSize: new google.maps.Size(30, 30),
        }
        var iconeOrange = {
            url: './images/marker-icone/icone-orange.png',
            scaledSize: new google.maps.Size(30, 30),
        }
        var iconeRouge = {
            url: './images/marker-icone/icone-rouge.png',
            scaledSize: new google.maps.Size(30, 30),
        }

        if ((station.status === "OPEN") && (station.available_bikes > 0)) {
            return iconeVerte;
        }

        if ((station.status === "OPEN") && (station.available_bikes === 0)) {
            return iconeOrange;
        }

        if (station.status === "CLOSED") {
            return iconeRouge;
        }
    }
}