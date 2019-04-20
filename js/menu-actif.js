// Permet le fonctionnement de l'effet actif du menu de navigation

var menuActif = {

    // Initialise l'effet actif du menu de navigation

    activerMenu: function () {
        var ancre = $(".ancre");
        var diaporama = $("#slide-container");
        var diaporamaCal = diaporama.outerHeight() + diaporama.offset().top;

        var pos = window.scrollY;

        if (pos < diaporamaCal) {
            ancre.find("li:eq(0)").addClass("active");
            ancre.find("li:eq(2)").removeClass("active");
        } else {
            ancre.find("li:eq(2)").addClass("active");
            ancre.find("li:eq(0)").removeClass("active");
        }
    },

    // Initialise l'événement

    initEvent: function () {
        $(window).scroll(this.activerMenu);
    }
}