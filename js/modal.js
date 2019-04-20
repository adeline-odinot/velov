// Permet de fermer l'affichage du modal

var modal = {
    fermerModal: function () {
        var modal = $("#modal-signature");
        $(window).click(function(e) {
            if ($(e.target).is(modal)) {
                modal.addClass("hide");
            }
        })
        
        var fermer = $(".fa-times-circle");
        $(fermer).click(function (e) {
            if ($(e.target).is(fermer)) {
                utiles.closeContent(this);
            }
        })
        
        var annuler = $(".annuler");
        $(annuler).click(function (e) {
            if ($(e.target).is(annuler)) {
                utiles.closeContent(this);
            }
        })
    }
}