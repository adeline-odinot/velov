// L'objet compteur permet l'affichage du défilement du minuteur ainsi que son bouton d'annulation

var compteur = {
    interval: null,

    // Initialisation du compteur

    // TODO : Cette fonction n'est pas utilisable en dehors de son contexte car tu bloques son utilisation avec la condition d'avoir un element nomé dans son initialisation
    initCompteur: function () {
        if (sessionStorage.getItem("totalSeconds") > 0) {
            sessionStorage.setItem("totalSeconds", sessionStorage.getItem("totalSeconds") - 1);
            var seconds = sessionStorage.getItem("totalSeconds") % 60;
            var secondsTens = Math.floor(seconds / 10);
            var secondsOnes = seconds % 10;
            var minutes = Math.floor(sessionStorage.getItem("totalSeconds") / 60);
            var station = JSON.parse(sessionStorage.getItem("station"));
            $(".texteCompteur").text("Vous venez de réserver un vélo'v à la station : " + station.name + " pour " + minutes + " minute(s) " + secondsTens + secondsOnes + " seconde(s)");
            $(".annulation").removeClass("hide");
            $(".texteCompteur").removeClass("hide");
        } else {
            $(".texteCompteur").addClass("hide");
            $("texteReservation").addClass("show");
            $(".annulation").addClass("hide");
        }
    },

    // Annule la réservation

    annulerElt: function (ev) {
        
        var self = this;
        
        var annulation = ev.target;
        $(annulation).addClass("hide");
        $(".texteCompteur").addClass("hide");
        $(".texteReservation").removeClass("hide");
        
        var domObjet = Object.create(dom);
        domObjet.reinitialiserVeloEtPlaceDispo(sessionStorage.getItem("station"));
        domObjet.debloquerReservationEnCours()
        sessionStorage.clear();
        self.stopCompteur();
        
    },

    // Initialise l'événement d'annulation de la réservation

    initEventAnnulerElt: function () {
        var self = this;
        var annulation = $(".annulation");
        $(annulation).click(function(e) {self.annulerElt(e)});
    },

    // Vérifie une réservation en cours

    verifierReservation: function () {
        if (sessionStorage.getItem("station")) {
            this.interval = setInterval(this.initCompteur, 1000);
            var txtReservation = $(".texteReservation");
            txtReservation.removeClass("show");
            txtReservation.addClass("hide");
        }
    },

    // Efface le compteur

    stopCompteur: function () {
        clearInterval(this.interval);
    }
}