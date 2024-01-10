function traduzir() {
    const language = window.navigator.language;
    buscarArquivo(language);
}

function buscarArquivo(lang) {
    fetch("./js/traducao/lang/"+lang+".json")
        .then(response => response.json())
        .then(json => {
            mudarTextos(json);            
        })
        .catch(err => {
            fetch("./js/traducao/lang/en-US.json")
                .then(response => response.json())
                .then(json => {
                    mudarTextos(json);            
                });
        });    
}

function mudarTextos(frases){
    let txtCidade = document.getElementById("txtCidade");
    let lblTemp = document.getElementById("lblTemp");
    let lblMax = document.getElementById("lblMax");
    let lblMin = document.getElementById("lblMin");
    let lblFeel = document.getElementById("lblFeel");
    let lblHumidity = document.getElementById("lblHumidity");
    let lblAtmPress = document.getElementById("lblAtmPress");
    let lblVisibility = document.getElementById("lblVisibility");
    let lblWind = document.getElementById("lblWind");
    let lblWindSpeed = document.getElementById("lblWindSpeed");
    let lblCloud = document.getElementById("lblCloud");
    

    txtCidade.setAttribute("placeholder",frases.site.txtSearch);
    lblTemp.innerHTML = frases.site.lblTemp;
    lblMax.innerHTML = frases.site.lblMax;
    lblMin.innerHTML = frases.site.lblMin;
    lblFeel.innerHTML = frases.site.lblFeel;
    lblHumidity.innerHTML = frases.site.lblHumidity;
    lblAtmPress.innerHTML = frases.site.lblAtmPress;
    lblVisibility.innerHTML = frases.site.lblVisibility;
    lblWind.innerHTML = frases.site.lblWind;
    lblWindSpeed.innerHTML = frases.site.lblWindSpeed;
    lblCloud.innerHTML = frases.site.lblCloud;

    setTimeout( () => {
        mudarCondicao(frases) 
    },5);
    
}

function mudarCondicao(frases) {
    let lblCondition = document.getElementById("lblCondition");
    if(frases.site[lblCondition.textContent] !== undefined){
        lblCondition.innerHTML = frases.site[lblCondition.textContent];
    }
}