import React, { useState, useEffect, useRef } from "react";
import { ContextData } from "../App";
import './RemoveBackground.css'
import { readFileAsync , resizeImage} from '../utils';

export default function RemoveBackground() {
  const data = React.useContext(ContextData);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [file, setfile] = useState([]);
  const [isNav, setIsnav] = useState(0);
  const fileInput = useRef(null);
  const downloadLink = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const handleImageChange = async ({ target: { files } }) => {
    console.log(files);
    if (files.length > 0) {
      const result = await readFileAsync(files[0]);
      const resizedImage = await resizeImage(result);
      data.addToCart(resizedImage);
      data.removebg(files[0]).then((data) => handleChange(data));
    }
  };

  useEffect(() => {
    console.log("File input value changed");
    if (data.file) {
      console.log({ data_handleChange: data.file });
      data.removebg(data.file).then((datar) => handleChange(datar));
    }
    // data.removebg(data.file).then((datar) => handleChange(datar));
  }, [fileInput.current]);

  const handle_Change = (event) => {
    console.log(event.target.files[0]);
  };

  const handleClick = () => {
    fileInput.current = data.file;
  };
  function handleDownload() {
    const imageData = "image/png;base64," + data.state.removebg;
    const image = document.getElementById("my-image-without-background");

    fetch(image.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "inpixio-my-removebg-image.png";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      });
  }

  if (data.nav === 1 && isNav === 0) {
    console.log({ datanv: data, isNav: isNav });
    setIsnav(1);
    handleClick();
  }
  function handleLoad() {
   /* const image = imageRef.current;
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext('2d');

    const maxWidth = 320;
    let width = image.offsetWidth;
    let height = image.offsetHeight;

    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.current.drawImage(image, 0, 0, width, height);*/
  }
  const handleChange = (datavalue) => {
    setImagePreviewUrl("image/png;base64," + data.state.removebg);
    console.log({ imagePreviewUrl: datavalue });
    console.log({ data_handleChange: datavalue });
    data.setmodal(false);
  };
  const styles = {
    popup: {
      display: data.modalIsOpen ? "block" : "none",
      opacity: data.modalIsOpen ? "1" : "0"
    }
  };

  return (
    <main id="page">
      <div className="upload-another">
        <label className="upload__button">
          <b className="plus"></b>
          <span>UPLOAD YOUR PHOTO</span>

          <input
            type="file"
            className="file-choose"
            onChange={handleImageChange}
            ref={fileInput}
          />
        </label>
        <small>or drop a file, paste an image from a link.</small>
      </div>
      <div className="container v2 container-main flex uploaded-container">
        <div className="page-col_left">
          <h1>
            The <span>#1</span> One-Click  Background Remover
          </h1>
        </div>
        <div className="page-col_right">
          <div className="uploaded-result_wrap">
            <div className="uploaded-result_image">
              {data.state.removebg && (
                <img src={data.state.removebg} alt="" id="my-image-without-background" ref={imageRef} onLoad={handleLoad} />
                
              )}

              <div className="loading-spinner" style={styles.popup}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="uploaded-result_actions">
              <div className="uploaded-result_actions-block">
                <button className="result-btn" onClick={handleDownload}>
                  Download
                </button>
                <small>Preview Image Low resolution</small>
              </div>
              <div className="uploaded-result_actions-block">
                <a
                  href="https://store.inpixio.com/clickgate/join.aspx?ref=inpixio.upclick.com%2F1&ujid=R8bije3CCAU%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="result-btn outline"
                >
                  Download HD
                </a>
                <small>Full resolution image 2572 × 2248 pixels</small>
              </div>
            </div>
          </div>
          <div className="uploaded-legal">
            <small>
              By uploading an image you agree to our Terms of Service and{" "}
              <a href="/privacy-policy/" target="_blank">
                Privacy Policy
              </a>
              .
            </small>
          </div>
        </div>
      </div>
      <div className="dragover-overlay">
        <div className="dragover-overlay_wrap">
          <div className="dragover-overlay_inner">
            <img
              src="https://www.inpixio.com/rb-tool/assets/img/icon-file.svg"
              width="100"
              height="125"
              alt="Add  Icon"
            />
            <h4 className="label">
              Drop one image <br />
              anywhere in the screen
            </h4>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} />
      {" "}
      {error && <p className="error">{error}</p>}
      {isLoading && <p>Loading...</p>}
      {receivedImage && (
        <div>
          <img src={receivedImage} alt="Received" width={200} height={200} />
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleBuy}>Buy</button>{" "}
        </div>
      )}
      {previewImage && <img src={previewImage} alt="Preview" />}main>
  );
}
