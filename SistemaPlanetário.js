import * as THREE from 'three'


var TerraSemiEixoMaior = 1;
var TerraExcentricidade = 0.0167;
var TerraInclinacao = 0;
var TerraPeriodo = 365.25;
var TerraNoLongitude = 0;
var TerraPeriapsis = 0;
var Tempo = 0.0;

var 		scene,
		camera,
		renderer;

function main(){
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000);
camera.position.z=5;
  
//Cria o sol
var SolGeometry = new THREE.SphereGeometry(1,32,32);
var SolMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
var Sol = new THREE.Mesh(SolGeometry, SolMaterial);
Sol.name = "Sol"
scene.add(Sol)

//Cria a Terra :)
var TerraGeometry = new THREE.SphereGeometry(0.5,32,32);
var TerraMaterial = new THREE.MeshBasicMaterial({color:0x0000ff});
var Terra = new THREE.Mesh(TerraGeometry, TerraMaterial);
Terra.name = "Terra"
scene.add(Terra)

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
animate(scene,renderer, camera)
}

function animate(scene,renderer, camera){
    Tempo += 1.0
    var AnomaliaMedia = (2 * Math.PI * Tempo)/TerraPeriodo;
    var Anomalia = AnomaliaMedia + 2*TerraExcentricidade * Math.sin(AnomaliaMedia);
    var distancia = (TerraSemiEixoMaior*(1-TerraExcentricidade*TerraExcentricidade))/(1 + TerraExcentricidade * Math.cos(Anomalia));

    var x = distancia * Math.cos(Anomalia);
    var y = 0;
    var z = distancia * Math.sin(Anomalia);

    var cosInclinacao = Math.cos(TerraInclinacao)
    var sinInclinacao = Math.sin(TerraInclinacao)
    var cosNo = Math.cos(TerraNoLongitude)
    var sinNo = Math.sin(TerraNoLongitude)
    var cosPeriapsis = Math.cos(TerraPeriapsis)
    var sinPeriapsis = Math.sin(TerraPeriapsis)

    var xFinal = (cosNo*cosPeriapsis-sinNo*sinPeriapsis*cosInclinacao)*x+(-cosNo*sinPeriapsis-sinNo*cosPeriapsis*cosInclinacao)*y;
    var yFinal = (sinNo*cosPeriapsis+cosNo*sinPeriapsis*cosInclinacao)*x+(-sinNo*sinPeriapsis+cosNo*cosPeriapsis*cosInclinacao)*y;
    var zFinal = z //(sinPeriapsis*sinInclinacao)* x + (cosPeriapsis*cosPeriapsis)*y;

    var Terra = scene.getObjectByName("Terra");
    Terra.position.set(xFinal, yFinal, zFinal);
    requestAnimationFrame(() => animate(scene,renderer, camera));
    renderer.render(scene,camera);
}
main()