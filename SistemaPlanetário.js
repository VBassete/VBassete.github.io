/*
(((((((((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))))))))
((((((((((((((((())))))))))))))))) Feito por Vinícius Barbosa Bassete ((((((((((((((((()))))))))))))))))
(((((((((((((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))))))))))))
*/

import * as THREE from 'three'
import DadosPlanetas from "./DadosPlanetas.json" assert {type: 'json'};
import { GUI } 		from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js';

let planets = ["Mercurio", "Venus", "Terra", "Marte", "Jupiter", "Saturno", "Urano", "Netuno"]
var Tempo = 0.0;
var gui = new GUI();
let vel, comands,fov, scale;
let RevX = true, RevY=true, RevZ=true;
function main(){
    var scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_stars_milky_way.jpg")
    

    var camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 1,2000);
    camera.position.z=6;
    initGUI(camera);
    //Coloca a luz no centro do sol
    const luz = new THREE.PointLight(0xffffff, 0.8, 500);
    luz.position.set(0,0,0)
    scene.add(luz)
    //Cria o sol
    var SolGeometry = new THREE.SphereGeometry(1,32,32);
    var SolMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('Assets/Texturas/SistemaSolar/2k_sun.jpg')});
    var Sol = new THREE.Mesh(SolGeometry, SolMaterial);
    Sol.name = "Sol";
    scene.add(Sol);

    //Cria a Mercurio
    var MercurioGeometry = new THREE.SphereGeometry(0.1,32,32);
    var MercurioMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_mercury.jpg")});
    var Mercurio = new THREE.Mesh(MercurioGeometry,MercurioMaterial);
    Mercurio.name="Mercurio";
    scene.add(Mercurio);

    //Cria Venus
    var VenusGeometry = new THREE.SphereGeometry(0.2,32,32);
    var VenusMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_venus_surface.jpg")});
    var Venus = new THREE.Mesh(VenusGeometry,VenusMaterial);
    Venus.name="Venus";
    scene.add(Venus);

    //Cria a Terra e gruda a lua nela :)
    var TerraGeometry = new THREE.SphereGeometry(0.3,32,32);
    var TerraMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_earth_daymap.jpg")});
    var terra = new THREE.Mesh(TerraGeometry, TerraMaterial);
    var LuaGeometry = new THREE.SphereGeometry(0.1,32,32);
    var LuaMaterial = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_moon.jpg")});
    var lua = new THREE.Mesh(LuaGeometry, LuaMaterial);
    var Terra = new THREE.Group();
    Terra.name="Terra";
    Terra.add(terra);
    Terra.add(lua);
    lua.position.set(0.4,0,0);
    scene.add(Terra);

    //Cria marte
    var MarteGeometry = new THREE.SphereGeometry(0.25,32,32);
    var MarteMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_mars.jpg")});
    var Marte = new THREE.Mesh(MarteGeometry, MarteMaterial);
    Marte.name = "Marte"
    scene.add(Marte);

    //Cria Jupiter
    var JupiterGeometry = new THREE.SphereGeometry(0.6,32,32);
    var JupiterMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_jupiter.jpg")});
    var Jupiter = new THREE.Mesh(JupiterGeometry, JupiterMaterial);
    Jupiter.name = "Jupiter";
    scene.add(Jupiter);

    //Cria saturno e gruda o anel nele
    var Saturno = new THREE.Group();
    var SaturnoGeometry = new THREE.SphereGeometry(0.4,32,32);
    var SaturnoMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_saturn.jpg")});
    var saturno = new THREE.Mesh(SaturnoGeometry, SaturnoMaterial);
    Saturno.add(saturno)
    var sAnelGeometry = new THREE.RingGeometry(0.5,0.6,32);
    var texture = new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_saturn_ring_alpha.png", function (texture) {
        texture.flipY = false;})
    var sAnelMaterial = new THREE.MeshPhongMaterial({map: texture});
    var sAnel = new THREE.Mesh(sAnelGeometry, sAnelMaterial);
    sAnel.rotateX(Math.PI*90/180)
    Saturno.add(sAnel);
    Saturno.name = "Saturno"
    scene.add(Saturno)

    //Cria Urano e gruda o anel nele
    var Urano = new THREE.Group()
    var UranoGeometry = new THREE.SphereGeometry(0.4,32,32);
    var UranoMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_uranus.jpg")});
    var urano = new THREE.Mesh(UranoGeometry, UranoMaterial);
    Urano.add(urano)
    var uAnelGeometry = new THREE.RingGeometry(0.5,0.55,32);
    var uAnelMaterial = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/uranusringcolour.jpg")});
    var uAnel = new THREE.Mesh(uAnelGeometry, uAnelMaterial);
    uAnel.rotateY(Math.PI*90/180);
    Urano.add(uAnel);
    Urano.name = "Urano";
    scene.add(Urano);

    //Cria Netuno
    var NetunoGeometry = new THREE.SphereGeometry(0.4,32,32);
    var NetunoMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("Assets/Texturas/SistemaSolar/2k_neptune.jpg")});
    var Netuno = new THREE.Mesh(NetunoGeometry, NetunoMaterial);
    Netuno.name = "Netuno";
    scene.add(Netuno);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    animate(scene,renderer, camera);
}

function initGUI(camera) {

	vel = 	{VelTempo : 1};
    fov = {FOV : 110};
    scale = {Escala: 1};
    comands = {RevX:true,RevY:true,RevZ:true};
	gui.add( vel, 'VelTempo',0,10,0.1);
    gui.add(scale, "Escala",1,1.5,0.1);
    gui.add(fov, "FOV", 50,150,10).onChange(value => camera.fov=(value));
    gui.add(comands, 'RevX').onChange(value => RevX = !RevX);
    gui.add(comands, "RevY").onChange(value => RevY = !RevY);
    gui.add(comands, "RevZ").onChange(value => RevZ = !RevZ);
    gui.open();
};

//Movimento dos planetas
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

    if(RevX == true){
        var xFinal = (cosNo*cosPeriapsis-sinNo*sinPeriapsis*cosInclinacao)*x+(-cosNo*sinPeriapsis-sinNo*cosPeriapsis*cosInclinacao)*y;
    }else{
        var xFinal = 0;
    };
    if(RevY == true){
    var yFinal = (sinNo*cosPeriapsis+cosNo*sinPeriapsis*cosInclinacao)*x+(-sinNo*sinPeriapsis+cosNo*cosPeriapsis*cosInclinacao)*y;
    }else{
        var yFinal = 0;
    };
    if(RevZ == true){
    var zFinal = sinPeriapsis * sinInclinacao * x + cosPeriapsis * sinInclinacao * y + cosInclinacao * z; //zFinal = (sinPeriapsis*sinInclinacao)* x + (cosPeriapsis*cosPeriapsis)*y;
    }else{
        var zFinal = 0;
    };
    return [xFinal, yFinal, zFinal]
}

function animate(scene,renderer, camera){
    Tempo += 1*vel.VelTempo;
    for(let i = 0; i<=7;i++){
        
        let planeta = planets[i];
        let dados = DadosPlanetas[planeta];
        let curObj = scene.getObjectByName(planeta);
        let fPosition = calcMovimento(1+dados["SemiEixoMaior"]*scale.Escala, dados["Excentricidade"], 3.1415/180*dados["Inclinacao"],dados["Periodo"], 3.1415/180*dados["NoLongitude"], 3.1415/180*dados["Periapsis"], Tempo);
        curObj.position.set(fPosition[0],fPosition[1],fPosition[2]);
        let Checa0 = (x) => (x === 0 ? 0 : 1 / x);
        curObj.rotateX(2*Math.PI*Checa0(dados["RotateX"])*vel.VelTempo);
        curObj.rotateY(2*Math.PI*Checa0(dados["RotateY"])*vel.VelTempo);
        curObj.rotateZ(2*Math.PI*Checa0(dados["RotateZ"])*vel.VelTempo);
    };
    let Sol = scene.getObjectByName("Sol");
    Sol.rotateY(0.001);
    camera.updateProjectionMatrix();
    requestAnimationFrame(() => animate(scene,renderer, camera));
    renderer.render(scene,camera);
}
main()