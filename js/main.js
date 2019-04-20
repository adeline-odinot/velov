// Affiche au chargement de la page les méthodes d'objets

$(window).on("load", function () {

    var menuActifObjet = Object.create(menuActif);
    var sliderObjet = Object.create(slider);
    var stationsObjet = Object.create(stations);
    var canvasObjet = Object.create(canvas);
    var compteurObjet = Object.create(compteur);

    menuActifObjet.initEvent();
    sliderObjet.showSlides(slider.slideIndex);
    sliderObjet.keyboardEvent();
    sliderObjet.mouseEvent();
    stations.initStation();
    canvasObjet.methodes.initEvent();
    compteurObjet.verifierReservation();
    compteurObjet.initEventAnnulerElt();
})