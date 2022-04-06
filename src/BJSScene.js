import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; 

let weatherProps = undefined;
let sceneG = undefined;

//let box;
let hourlySquareArr = [];
let hourlyMatArr = [];
let hourlyTexture = [];
  
  const onSceneReady = (scene) => {
    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(40, 5, -55), scene);
  
    // This targets the camera to scene origin
    //camera.setTarget(Vector3.Zero());
    camera.setTarget(new Vector3(40, 0, 0))
  
    const canvas = scene.getEngine().getRenderingCanvas();
  
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
  
    // Our built-in 'box' shape.
    //box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  
    // Move the box upward 1/2 its height
    //box.position.y = 1;
  
    // Our built-in 'ground' shape.
    //MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

    for (let boxCnt = 0; boxCnt < 12; boxCnt++) {        
        hourlySquareArr.push(MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene));
        hourlySquareArr[boxCnt].position.x = boxCnt * 7;
        hourlySquareArr[boxCnt].rotation.x = -7.15;        
    }
  };
  
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
      if (sceneG === undefined) {
          sceneG = scene;
          setupMats(weatherProps, sceneG);              
      }
    //if (box !== undefined) {
      //var deltaTimeInMillis = scene.getEngine().getDeltaTime();
  
      //const rpm = 10;
      //box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    //}
  };

  const setupMats = (props, scene) => {

    console.log("setupMats props", props);
    console.log("setupMats scene", scene);

    const timeLineArr = props.weather.hourly.slice(0,12);

    for (let boxCnt = 0; boxCnt < 12; boxCnt++) {            
        hourlyMatArr.push(new StandardMaterial("mat"+boxCnt.toString(), scene));
        hourlyTexture.push(new Texture("http://openweathermap.org/img/w/" + timeLineArr[boxCnt].weather[0].icon + ".png", scene));
        hourlyMatArr[boxCnt].diffuseTexture = hourlyTexture[boxCnt];
        hourlySquareArr[boxCnt].material = hourlyMatArr[boxCnt];
    }
    
  }

  const BJSScene = (props) => {        

    weatherProps = props;

    //setupMats(props, sceneG);

    return (
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    );  
  }

  export default BJSScene;