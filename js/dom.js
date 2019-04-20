/* L'objet dom permet de mettre en place par ses méthodes les différentes informations des stations (nom, adresse, état) et de faire des vérifications pour un bon fonctionnement.
   Il permet aussi la validation de la réservation.
*/

var dom = {

    // Permet l'affichage des informations de la sation

    initDom: function (station) {

        var info = $(".text-informations");
        info.addClass("hide");

        var contenuInfoStation = $(".contenu-info-station");
        contenuInfoStation.removeClass("hide");
        contenuInfoStation.addClass("bordure");

       $(".reservation").removeClass("hide");

        var nomStationSpan = $("#nom-station");
        $(nomStationSpan).text(station.name);

        var adresseStationSpan = $("#adresse-station");
        $(adresseStationSpan).text(station.address);

        var veloStationSpan = $("#numero-velo-station");
        $(veloStationSpan).text(station.available_bikes);

        var placeStationSpan = $("#numero-place-station");
        $(placeStationSpan).text(station.available_bike_stands);

        var etatStation = this.etatStation(station);
        var nbreVeloDispo = this.verifierNombreVeloDispo(station, contenuInfoStation);
        var veloEtPlaceDispo = this.verifierVeloEtPlaceDispo(station);
    },

    // Coloration et modification du texte correspondant à l'état de la station en fonction de la condition

    etatStation: function (station) {

        var etatStation = $("#etat-station");
        var etat = $("#etat");

        etat.removeClass("vert");
        etat.removeClass("orange");
        etat.removeClass("rouge");

        if ((station.status === "OPEN") && (station.available_bikes > 0)) {
            $(etatStation).text("Ouvert");
            etat.addClass("vert");
        }
        if ((station.status === "OPEN") && (station.available_bikes === 0)) {
            $(etatStation).text("Ouvert");
            etat.addClass("orange");
        }
        if (station.status === "CLOSED") {
            $(etatStation).text("Fermer");
            etat.addClass("rouge");
        }
    },

    // Vérifie le nombre de vélos disponibles et fait un affichage selon sa condition

    verifierNombreVeloDispo: function (station, contenuInfoStation) {

        var reservation = $(".reservation");
        var reservationTxt = $(".reservation-txt");
        reservationTxt.html("");

        $(reservation).click(function () {
            if (station.available_bikes > 0) {
                
                var modalContent = $("#modal-signature");
                modalContent.removeClass("hide");
                
                var modalObjet = Object.create(modal);

                modalObjet.fermerModal();

                var pCanvasElt = $(".titre-signature");
                $(pCanvasElt).text("Souhaitez-vous réserver un vélo correspondant à la station : " + station.name + " ?");
            }
        })
        if (station.available_bikes === 0) {
            reservation.addClass("hide");
            $(reservationTxt).text("Aucun vélo'v n'est disponible à la station " + station.name + " pour le moment. Veuillez patientez en l'attente d'un velo'v, ou bien, choisissez une autre station.");
        }
    },

    // Vérifie si réservation à lieu pour afficher le bon nombre correspondant aux nombres de vélos et de places disponibles

    verifierVeloEtPlaceDispo: function (station) {
        var veloDispoStationSpan = $("#numero-velo-station");
        var placeStationSpan = $("#numero-place-station");
        if (sessionStorage.getItem("station")) {
            var stationStorage = JSON.parse(sessionStorage.getItem("station"));
            if (stationStorage.name === station.name) {
                $(veloDispoStationSpan).text(station.available_bikes - 1);
                $(placeStationSpan).text(station.available_bike_stands + 1);
            } else {
                $(veloDispoStationSpan).text(station.available_bikes);
                $(placeStationSpan).text(station.available_bike_stands);
            }
        }
    },

    // Vérifie le nombre de vélos et de places disponibles pour un affichage au pluriels du texte si nécessaire 

    verifierPlurielsDispo: function (station) {

        var placeDispoStationSpan = $("#texte-place-station");

        var veloDispoStationSpan = $("#texte-velo-station");


        if (station.available_bike_stands > 1) {
            $(placeDispoStationSpan).text("Places disponibles : ");
        } else {
            $(placeDispoStationSpan).text("Place disponible : ");
        }
        if (station.available_bikes > 1) {
            $(veloDispoStationSpan).text("Vélos disponibles : ");
        } else {
            $(veloDispoStationSpan).text("Vélo disponible : ");
        }
    },
    
    // Bloque une réservation déjà en cours sur la station choisi

    bloquerReservationEnCours: function (station) {

        var reservation = $(".reservation");
        var reservationTxt = $(".reservation-txt");
        if (sessionStorage.getItem("station")) {
            var stationStorage = JSON.parse(sessionStorage.getItem("station"));
            if (station.name === stationStorage.name) {
                reservation.addClass("hide");
                $(reservationTxt).text("La réservation à bien été prise en compte, vous avez 20 minutes pour récupérer votre vélo'v à la station.")
            }
        }
    },
    
    // Débloque la réservation en cours

    debloquerReservationEnCours: function () {
        var reservation = $(".reservation");
        var reservationTxt = $(".reservation-txt");
        reservation.removeClass("hide");
        $(reservationTxt).text("");
    },
    
    // Réinitialise le nombre de vélo(s) et place(s) disponible(s)
    
    reinitialiserVeloEtPlaceDispo: function (station) {
        var stationElt = JSON.parse(station);
        var veloDispoStationSpan = $("#numero-velo-station");
        var placeStationSpan = $("#numero-place-station");
        $(veloDispoStationSpan).text(stationElt.available_bikes);
        $(placeStationSpan).text(stationElt.available_bike_stands);
    },

    // Permet la validation de la réservation

    valider: function (station) {
        var validation = $(".validation");
        var self = this;

        $(validation).click(function () {

            $("#modal-signature").addClass("hide");
            $(".texteReservation").addClass("hide");

            sessionStorage.setItem("totalSeconds", 20 * 60);

            if (!sessionStorage.getItem("station")) {
                compteur.interval = setInterval(compteur.initCompteur, 1000);
            }

            var stationStorage = JSON.stringify(station);
            sessionStorage.setItem("station", stationStorage);

            self.verifierVeloEtPlaceDispo(station);
            self.bloquerReservationEnCours(station);
        })
    }
}