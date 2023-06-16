import * as THREE from 'three'
import DadosPlanetas from "./DadosPlanetas.json" assert {type: 'json'}; 

console.log(DadosPlanetas["Mercurio"]);

var TerraSemiEixoMaior = 3;
var TerraExcentricidade = 0.0167;
var TerraInclinacao = 3.1415*7.155/180;
var TerraPeriodo = 365.25;
var TerraNoLongitude = 3.1415*174.9/180;
var TerraPeriapsis = 3.1415*288.1/180;

let planets = ["Mercurio", "Venus", "Terra", "Marte", "Jupiter", "Saturno", "Urano", "Netuno"]
var Tempo = 0.0;

function main(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000);
    camera.position.z=5;
    
    const luz = new THREE.PointLight(0xffffff, 5, 100);
    luz.position.set(0,0,0)
    scene.add(luz)

    //Cria o sol
    var SolGeometry = new THREE.SphereGeometry(1,32,32);
    var SolMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Assets/Texturas/SistemaSolar/2k_sun.jpg')});
    var Sol = new THREE.Mesh(SolGeometry, SolMaterial);
    Sol.name = "Sol"
    scene.add(Sol)

    //Cria a Mercurio
    var MercurioGeometry = new THREE.SphereGeometry(0.1,32,32);
    var MercurioMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_mercury.jpg")});
    var Mercurio = new THREE.Mesh(MercurioGeometry,MercurioMaterial);
    Mercurio.name="Mercurio";
    scene.add(Mercurio);

    //Cria Venus
    var VenusGeometry = new THREE.SphereGeometry(0.1,32,32);
    var VenusMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_venus_surface.jpg")});
    var Venus = new THREE.Mesh(VenusGeometry,VenusMaterial);
    Venus.name="Venus";
    scene.add(Venus);

    //Cria a Terra :)
    var TerraGeometry = new THREE.SphereGeometry(0.1,32,32);
    var TerraMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_earth_daymap.jpg")});
    var Terra = new THREE.Mesh(TerraGeometry, TerraMaterial);
    Terra.name = "Terra"
    scene.add(Terra)

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    animate(scene,renderer, camera);
}


function calcMovimento(SemiEixoMaior, Excentricidade, Inclinacao, Periodo, NoLongitude, Periapsis, Tempo){
    var AnomaliaMedia = (2 * Math.PI * Tempo)/Periodo;
    var Anomalia = AnomaliaMedia + 2*Excentricidade * Math.sin(AnomaliaMedia);
    var distancia = (SemiEixoMaior*(1-Excentricidade*Excentricidade))/(1 + Excentricidade * Math.cos(Anomalia));
    //console.log(distancia);
    var x = distancia * Math.cos(Anomalia);
    var y = distancia * Math.sin(Anomalia);
    var z = 0;

    var cosInclinacao = Math.cos(Inclinacao)
    var sinInclinacao = Math.sin(Inclinacao)
    var cosNo = Math.cos(NoLongitude)
    var sinNo = Math.sin(NoLongitude)
    var cosPeriapsis = Math.cos(Periapsis)
    var sinPeriapsis = Math.sin(Periapsis)

    var xFinal = (cosNo*cosPeriapsis-sinNo*sinPeriapsis*cosInclinacao)*x+(-cosNo*sinPeriapsis-sinNo*cosPeriapsis*cosInclinacao)*y;
    var yFinal = (sinNo*cosPeriapsis+cosNo*sinPeriapsis*cosInclinacao)*x+(-sinNo*sinPeriapsis+cosNo*cosPeriapsis*cosInclinacao)*y;
    var zFinal = (sinPeriapsis*sinInclinacao)* x + (cosPeriapsis*cosPeriapsis)*y;

    return [xFinal, yFinal, zFinal]
}

function animate(scene,renderer, camera){
    Tempo += 0.1;
    for(let i = 0; i<3;i++){
        
        let planeta = planets[i];
        //console.log(planeta);
        let dados = DadosPlanetas[planeta];
        let curObj = scene.getObjectByName(planeta);
        let fPosition = calcMovimento(2+dados["SemiEixoMaior"], dados["Excentricidade"], 3.1415/180*dados["Inclinacao"],dados["Periodo"], 3.1415/180*dados["NoLongitude"], 3.1415/180*dados["Periapsis"], Tempo);
        curObj.position.set(fPosition[0], fPosition[2], fPosition[1]);
        curObj.rotateY(0.1)
    }
    let Sol = scene.getObjectByName("Sol")
    Sol.rotateY(0.001)
    requestAnimationFrame(() => animate(scene,renderer, camera));
    renderer.render(scene,camera);
}
main()