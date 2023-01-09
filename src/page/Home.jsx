import React, { useState } from "react";
import { ContextData } from "../App";
import { useNavigate } from "react-router-dom";
import { readFileAsync , resizeImage} from '../utils';
const Home = () => {
  const data = React.useContext(ContextData);
  const navigate = useNavigate();
  const handleClick = () => navigate("/remove-background");

  const handleImageChange = async ({ currentTarget: { files } }) => {
    data.setmodal(true);
    if (files && files.length) {
      data.addToStack(files[0]);
      const result = await readFileAsync(files[0]);
      const resizedImage = await resizeImage(result);
      data.addToCart(resizedImage);
      data.setNav(1);
      handleClick();
    }
  };
  return (
    <main id="page">
      <div className="container v2 container-main flex">
        <div className="page-col_left">
          <h1>
            The <span>#1</span>​ One-Click​ Background Remover​
          </h1>
          <img
            src="https://www.inpixio.com/remove-background/images/new/example.png"
            width="769"
            height="505"
            alt="Remove background"
          />
          <div className="ratings">
            <div className="rating">
              <a
                href="https://www.trustpilot.com/review/inpixio.com"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="145"
                  height="68"
                  src="https://www.inpixio.com/remove-background/images/new/logo-trustpilot.svg"
                  alt="Trustpilot"
                />
              </a>
            </div>
            <div className="rating">
              <a
                href="https://www.capterra.com/p/213175/inPixio-Photo-Studio/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="145"
                  height="53"
                  src="https://www.inpixio.com/remove-background/images/new/logo-capterra.svg"
                  alt="Capterra"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="page-col_mid">
          <img
            src="https://www.inpixio.com/remove-background/images/new/icon-arrow.svg"
            width="150"
            height="80"
            alt="background eraser"
          />
        </div>
        <div className="page-col_right">
          <div className="loading">
            <div className="loading__wrap">
              <div className="c-upload">
                <div className="c-upload__local">
                  <p className="c-upload__drag file-drop">
                    <img
                      src="https://www.inpixio.com/remove-background/images/new/icon-file.svg"
                      width="479"
                      height="277"
                      alt="Upload"
                    />
                  </p>
                  <div className="c-upload__choose">
                    <label className="upload__button">
                      <b className="plus"></b>
                      <span>UPLOAD YOUR PHOTO</span>
                      <input
                        type="file"
                        className="file-choose"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <p>Or drag and drop a file</p>
              <div className="default-images flex">
                <div className="default-images_label">
                  No image? <br />
                  Try one of these :
                </div>
                <div className="default-images_select">
                  <a
                    href="https://www.inpixio.com/remove-background/images/new/examples/portrait.jpg"
                    className="example-image"
                  >
                    <img
                      src="https://www.inpixio.com/remove-background/images/new/example-portrait.jpg"
                      width="60"
                      height="60"
                      alt="example portrait"
                    />
                  </a>
                  <a
                    href="https://www.inpixio.com/remove-background/images/new/examples/product.jpg"
                    className="example-image"
                  >
                    <img
                      src="https://www.inpixio.com/remove-background/images/new/example-products.jpg"
                      width="60"
                      height="60"
                      alt="example product"
                    />
                  </a>
                  <a
                    href="https://www.inpixio.com/remove-background/images/new/examples/car.jpg"
                    className="example-image"
                  >
                    <img
                      src="https://www.inpixio.com/remove-background/images/new/example-car.jpg"
                      width="60"
                      height="60"
                      alt="example car"
                    />
                  </a>
                  <a
                    href="https://www.inpixio.com/remove-background/images/new/examples/dog.jpg"
                    className="example-image"
                  >
                    <img
                      src="https://www.inpixio.com/remove-background/images/new/example-dog.jpg"
                      width="60"
                      height="60"
                      alt="example dog"
                    />
                  </a>
                </div>
              </div>
              <p id="error-message"></p>
            </div>
            <div className="loading__overlay">
              <span></span>
            </div>
          </div>
          <small>
            By uploading an image you agree to our Terms of Serviceand{" "}
            <a href="/privacy-policy/" target="_blank">
              Privacy Policy
            </a>
            .
          </small>
        </div>
      </div>
    </main>
  );
};
export default Home;
