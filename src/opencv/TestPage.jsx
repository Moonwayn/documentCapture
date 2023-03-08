import React from "react";
import cv from "@techstark/opencv-js";
import { loadHaarFaceModels, detectHaarFace } from "./haarFaceDetection";
import "./style.css";

window.cv = cv;

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.inputImgRef = React.createRef();
    this.grayImgRef = React.createRef();
    this.cannyEdgeRef = React.createRef();
    this.haarFaceImgRef = React.createRef(); 
    this.state = {
      imgUrl: null,
    };
  }

  componentDidMount() {
    loadHaarFaceModels();
  }
  //
  // imagen procesada por opencv
  //
  
  processImage(imgSrc) {
    const img = cv.imread(imgSrc);



    // deteccion de rostro (solo ojos)
    const haarFaces = detectHaarFace(img);
    cv.imshow(this.haarFaceImgRef.current, haarFaces);

    
    img.delete();
    haarFaces.delete();
  }

  render() {
    const { imgUrl } = this.state;
    return (
      <div>
        <div style={{ marginTop: "30px" }}>
          <span style={{ marginRight: "10px" }}>subir:</span>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                this.setState({
                  imgUrl: URL.createObjectURL(e.target.files[0]),
                });
              }
            }}
          />
        </div>

        {imgUrl && (
          <div className="images-container">
            <div className="image-card">
              <div style={{ margin: "10px" }}>Imagen original</div>
              <img
                alt="Original input"
                src={imgUrl}
                onLoad={(e) => {
                  this.processImage(e.target);
                }}
              />
            </div>

            <div className="image-card">
              <div style={{ margin: "10px" }}>
                reconocimiento facial ojos
              </div>
              <canvas ref={this.haarFaceImgRef} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TestPage;
