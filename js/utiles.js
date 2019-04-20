// Ferme un contenu par son attribut

var utiles = {
    closeContent: function (e) {
        var attribut = $(e).attr("data-close");
        $("#"+attribut).addClass("hide");
    }
}