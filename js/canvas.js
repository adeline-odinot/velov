// Objet qui permet de dessiner dans le champ de signature grâce à ses diverses méthodes.

var canvas = {
    data: {
        
        signature: $("#signature"),
        ctx: this.signature.getContext("2d"),
        autoriser: false,
    },

    methodes: {
        
        // Permet d'activer le dessin de la signature

        activer: function () {
            canvas.data.autoriser = true;
            canvas.data.ctx.beginPath();
        },

        // Permet de dessiner la signature

        dessiner: function (e) {
            var rect = canvas.data.signature[0].getBoundingClientRect();
            canvas.data.ctx.lineWidth = 2;
            canvas.data.ctx.strokeStyle = "black";
            if (canvas.data.autoriser === true) {
                $(".validation").removeClass("hide");
                canvas.data.ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                canvas.data.ctx.stroke();
            }
        },

        // Permet de désactiver le dessin de la signature

        desactiver: function () {
            canvas.data.autoriser = false;
        },

        // Permet d'éffacer le dessin de la signature

        effacer: function () {
            canvas.data.ctx.clearRect(0, 0, canvas.data.signature[0].width, canvas.data.signature[0].height);
            $(".validation").addClass("hide");
        },

        // Permet de faire fonctionner le dessin de la signature sur écran tactile

        mobile: function (e) {
            e.preventDefault();
            var type = null;
            var touche = e.targetTouches[0];
            switch (e.type) {
                case 'touchstart':
                    type = 'mousedown';
                    break;
                case 'touchmove':
                    type = 'mousemove';
                    break;
                case 'touchend':
                    touche = e.changedTouches[0];
                    type = 'mouseup';
                    break;
                default:
                    alert("Erreur: vous venez de rencontrer une erreur concernant l'événement tactile de la signature.");
                    break;
            }
            var souris = document.createEvent("MouseEvents");
            souris.initMouseEvent(type, true, true, window, 0, touche.screenX, touche.screenY, touche.clientX, touche.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
            this.dispatchEvent(souris);
        },

        // Initialise les événements de la signature

        initEvent: function () {

            // Evenement souris

            $(canvas.data.signature).on("mousedown", this.activer);
            $(canvas.data.signature).on("mousemove", this.dessiner);
            $("body").on("mouseup", this.desactiver);

            // Evenement tactile

            $(canvas.data.signature).on("touchstart", this.mobile);
            $(canvas.data.signature).on("touchmove", this.mobile);
            $(canvas.data.signature).on("touchend", this.mobile);

            // Evenement au click sur les boutons

            $(".effacer").click(this.effacer);
            $(".validation").click(this.effacer);
            $(".annuler").click(this.effacer);
            $(".fa-times-circle").click(this.effacer);
        }
    }
}