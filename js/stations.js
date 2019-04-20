// Permet de récupérer les données de chaque station présentent sur Lyon et d'afficher la Google Maps

var stations = {
    initStation: function () {
        var stations = [];
        var mapObjet = Object.create(map);
        $.get("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=b6b17e2b974d09a5b5ad698fd2993864ec38f8b1", function (reponse) {
            $.each(reponse, function (index, station) {
                stations.push(station);
            })
            mapObjet.initMap(stations);
        });
    }
}