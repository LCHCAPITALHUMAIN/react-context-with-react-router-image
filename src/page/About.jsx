import React, { useState, useEffect, useRef } from "react";
import { ContextData } from "../App";

/**
 * Small helper function that allows us to use
 * Async/Await for cleaner more readable code
 * @param {File} file
 */
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

function resizeImage(base64Str, maxWidth = 320, maxHeight = 320) {
  return new Promise((resolve) => {
    console.log(base64Str);
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = img.width;
      let height = img.height;
      let shouldResize = false;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
          shouldResize = true;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
          shouldResize = true;
        }
      }
      if (shouldResize) {
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      } else {
        resolve(base64Str);
      }
    };
  });
}
export default function About() {
  const data = React.useContext(ContextData);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [file, setfile] = useState([]);
  const [isNav, setIsnav] = useState(0);
  const fileInput = useRef(null);
  const downloadLink = useRef(null);

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
    const image = document.getElementById("my-image");

    fetch(image.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "resized-image.jpg";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      });
  }
  const handleChange2 = (file) => {
    console.log({ start_handleChange2: file });
    if (file) {
      console.log({ comefromhome: true });
      console.log({ fileInput: fileInput });
      /*const result_actions = await readFileAsync(file);
      const result_resizedImage = await resizeImage(result_actions);
      data.addToCart(result_resizedImage);*/
      // fileInput.current["value"] = file;
      // data.removebg(file).then((result_wrap) => handleChange(result_wrap));
    }
  };
  if (data.nav === 1 && isNav === 0) {
    console.log({ datanv: data, isNav: isNav });
    setIsnav(1);
    handleClick();
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
            The <span>#1</span> One-Click​ Background Remover​
          </h1>
        </div>
        <div className="page-col_right">
          <div className="uploaded-result_wrap">
            <div className="uploaded-result_image">
              {data.state.removebg && (
                <img src={data.state.removebg} alt="" id="my-image" />
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
                  Download resized image
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
    </main>
  );
}
