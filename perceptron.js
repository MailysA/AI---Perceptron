

function Perceptron(){
    this.tauxApprentissage = 0.2;
    this.seuilActivation = 0.5;
    this.reseauNeronaux = [];
    this.reaseauDeSortie = [];

    this.nombreElementApprendre = 10;
}

Perceptron.prototype.initialiserReseauxNeuronaux = function (nombreDeCase, nombreDeValeurApprendre) {
    for (var i = 0; i < nombreDeCase; ++i){
        this.reseauNeronaux[i] = [];
        for(var j =0; j < nombreDeValeurApprendre; ++j){
            this.reseauNeronaux[i][j] = 1;
        }
    }

    this.initialiserReseauxNeuronauxSortie(nombreDeValeurApprendre);
}

Perceptron.prototype.initialiserReseauxNeuronauxSortie = function (nombreDeValeurApprendre){
    for(var i = 0; i < nombreDeValeurApprendre; ++i){
        this.reaseauDeSortie[i] = 1;
    }
}

Perceptron.prototype.apprendre = function (tableDePixels, nombreApprendre){
    var resultat = 0;
    var compteurCycle = 0;
    var sommePondere = 0;
    var erreurs = true;

    var etatPixelTester = 0;

    while(erreurs){
        erreurs = false;
        ++compteurCycle;

        for(var i = 0; i < 20; ++i){
            sommePondere = 0;

            for(var j = 0; j < this.nombreElementApprendre; ++j){
                if(tableDePixels[i]){
                    etatPixelTester = 1;
                }else{
                    etatPixelTester = 0;
                }

                sommePondere += etatPixelTester * this.reseauNeronaux[j][parseInt(nombreApprendre)];
            }

            resultat = ( sommePondere > this.seuilActivation ) ? 1 : 0;

            for(var j = 0; j < this.nombreElementApprendre; ++j){
                this.reseauNeronaux[j][parseInt(nombreApprendre)] +=   this.tauxApprentissage *  (this.reaseauDeSortie[i] - resultat) * this.reseauNeronaux[i][j];
            }

            if(this.reaseauDeSortie[i] - resultat != 0){
                erreurs = true;
            }

        }

        sommePondere;
    }

}

Perceptron.prototype.chercher = function (tableDePixels){
    tableDePixels;
}

function calculFormulePoid() {

    var poidDeLaConnexion = 0;
    var tauxApprentissage = 0;
    var sortieAttendu = 0;
    var sortieObtenu = 0;
    var entree = 0;

    return poidDeLaConnexion + tauxApprentissage * (sortieAttendu - sortieObtenu) * entree;
}