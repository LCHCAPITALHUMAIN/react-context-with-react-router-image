/*import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home, RemoveBackground, Users } from "./page/";
import axios from "axios";
import "./styles.css";
import { ResponseAPI } from "./api";
import { createPost } from "./utils";
import Modal from "./page/Modal";
const data = {
  name: " Text context react router v6",
  onClick: () => {
    console.log("this event onclick from context");
  }
};

export const ContextData = React.createContext();

export default function App() {
  const [state, setState] = useState({
    data: data,
    cart: [],
    removebg: "",
    nav: 0,
    fileObject: ""
  });
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [file, setfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [nav, setNav] = useState(0);
  const setnav = (value) => {
    setState({
      ...state,
      nav: value
    });
  };
  const setmodal = (state) => {
    setmodalIsOpen(state);
  };

  const removebg = async (file) => {
    console.log({ app_removebg: "start" });
    setmodalIsOpen(true);
    const newPost = await createPost(file);
    setPosts((prev) => [newPost, ...prev]);

    setState({
      ...state,
      removebg: "data:image/png;base64," + newPost
    });
    setmodalIsOpen(false);
    return newPost;
  };

  const addToCart = (book) => {
    setmodalIsOpen(true);
    setState({
      ...state,
      removebg: book
    });
  };
  const addToStack = async (file_Object) => {
    // history.push('/cart');
    setfile(file_Object);
    setState({
      ...state,
      fileObject: file_Object
    });
    // setmodalIsOpen(false);
  };
  return (
    <BrowserRouter>
      <div>
        <Modal show={modalIsOpen}>
          <div>Loading</div>
        </Modal>
        <Routes>
          <Route
            path="/remove-background"
            element={
              <ContextData.Provider
                value={{
                  state: state,
                  addToCart,
                  removebg,
                  setPosts,
                  setmodal,
                  modalIsOpen,
                  setNav,
                  nav,
                  addToStack,
                  file
                }}
              >
                <RemoveBackground />
              </ContextData.Provider>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route
            path="/"
            element={
              <ContextData.Provider
                value={{
                  state: state,
                  addToCart,
                  removebg,
                  setPosts,
                  setmodal,
                  modalIsOpen,
                  setNav,
                  nav,
                  addToStack
                }}
              >
                <Home />
              </ContextData.Provider>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
*/
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate as useHistory } from "react-router-dom";
import Modal from "./Modal";
import './RemoveBackground.css'
import { createPost } from "../utils"; 


function Processing() {
  const [previewImage, setPreviewImage] = useState(null);
  const [receivedImage, setReceivedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleDragOver = (event) => {

    setIsOverlayVisible(true);
    setIsLoading(true);
    setIsOverlayVisible(1);
    event.preventDefault();
    console.log(isOverlayVisible)
  };
  
  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    console.log(files)
    if (files && files.length) {
      // onUpload(files);
      setPreviewImage(URL.createObjectURL(files[0]));
      setIsOverlayVisible(false);
      setIsOverlayVisible(0);
   
    setIsLoading(true);
    setmodalIsOpen(true);
    createPost(files[0])
      .then( (response) => {
       // setPreviewImage(null); 
       // setReceivedImage("data:image/png;base64," + response.data.image);
       setPreviewImage("data:image/png;base64," + response.data.image);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
        setmodalIsOpen(false);
        //setIsSubmitting(false);
      });
    }   
  };
  const handleDragEnter = (event) => {
    console.log(event);
    event.preventDefault();
    setIsOverlayVisible(true);
  };
  const preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const highlight = () => {
    setIsOverlayVisible(true);
    setIsOverlayVisible(1);
    const ele = document.querySelector(".upload-label");
    if (ele) {
      ele.style.backgroundColor = "#e9e9e9";
      ele.style.border = "2px dotted #999";
    }
  };
  const unHightLight = () => {
    const ele = document.querySelector(".upload-label");
    if (ele) {
      ele.style.backgroundColor = "#f6f6f6";
      ele.style.border = "unset";
    }
  };
  const handleDropn = e => {
    const dt = e.dataTransfer;
    const { files } = dt;
    this.handleFiles(files);
  };

  const handleFiles = files => {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = function () {
      let img = document.createElement("img");
      img.src = reader.result;
      img.className = "image";
      document.getElementById("drop-area").appendChild(img);
    };
  };
  useEffect(() => {
    return () => {
      if (previewImage) {
        setPreviewImage(previewImage);
      }
      if (isOverlayVisible) {
        setIsOverlayVisible(isOverlayVisible);
      }
    };
  }, [receivedImage]);


  useEffect(() => {
   
    if (!location.state?.image) {
      history('/',
        { state: { message: 'please chose a file' } }
      );
    } else {
      setPreviewImage(URL.createObjectURL(location.state.image)); // Perform the API call
      setmodalIsOpen(true);
      createPost(location.state.image)
        .then((response) => {
          setReceivedImage("data:image/png;base64," + response.data.image);
          setPreviewImage("data:image/png;base64," + response.data.image);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setmodalIsOpen(false);
        });
    }
   
    const dropArea = document;
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false);
    });

    ["dragleave", "drop"].forEach(eventName => {
      dropArea.addEventListener(eventName, unHightLight, false);
    });

    dropArea.addEventListener("drop", handleDrop, false);

    return () => {
      const dropArea = document;
      ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropArea.removeEventListener(eventName, preventDefaults, false);
      });
  
      ["dragenter", "dragover"].forEach(eventName => {
        dropArea.removeEventListener(eventName, highlight, false);
      });
  
      ["dragleave", "drop"].forEach(eventName => {
        dropArea.removeEventListener(eventName, unHightLight, false);
      });
  
      dropArea.removeEventListener("drop", handleDrop, false);
    

    };
  }, [receivedImage]);

  const handleUpload = async e => {
    setError(null); // Reset any previous errors
    // Show the loading spinner 
    setmodalIsOpen(true);
    setIsLoading(true);
    const file = e.target.files[0];
    try {
      if (!file) {
        setError("Please select an image");
      } else if (!file.type.startsWith("image")) {
        setError("Invalid file type. Please select an image file");
      } else if (file.size > 5000000) {
        setError("File is too large. Please select an image smaller than 5MB");
      } else {
        setPreviewImage(URL.createObjectURL(file));
        setIsLoading(true);
        createPost(file)
          .then((response) => {
            setReceivedImage("data:image/png;base64," + response.data.image);
            setPreviewImage("data:image/png;base64," + response.data.image);
          })
          .catch((error) => {
            setError(error.message);
          })
          .finally(() => {
            setIsLoading(false);
            setmodalIsOpen(false);
            //setIsSubmitting(false);
          });
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while uploading the image");
    } finally {
      setIsLoading(false);
      setIsSubmitting(false); // Hide the loading spinner 
    }
  };
  const handleDownload = () => {
    // Download the received image
    const link = document.createElement("a");
    link.href = previewImage;
    link.download = "image.jpg";
    link.click();
  };
  const handleBuy = () => {
    // Perform any necessary actions for purchasing the image, such as sending a request to a payment gateway // and updating the user's account //...
    history('/cart',
      { state: { image: receivedImage } }
    );
  };
  const styles = {
    popup: {
      display: modalIsOpen ? "inline-block" : "none",
      opacity: modalIsOpen ? "1" : "0"
    },
    dragover: {
      display: isOverlayVisible == 1 ? "block" : "none",
      opacity: isOverlayVisible == 1 ? "1" : "0"
    }
  };


  return (
    <>
      <Modal show={modalIsOpen}>
        <div>Loading</div>
      </Modal>

 
      <div className={`dragover-overlay ${isOverlayVisible == 1 ? 'over' : 'hide'}`}
       onDrop={handleDrop}
       onDragOver={handleDragOver}
       onDragLeave={() => setIsOverlayVisible(false)}
       onDragEnter={handleDragEnter}
       style={styles.dragover}>
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
      </div>   <main id="page">
        <div className="upload-another">
          <label className="upload__button">
            <b className="plus"></b>
            <span>UPLOAD YOUR PHOTO {isOverlayVisible}</span>
            <input
              type="file"
              className="file-choose"
              onChange={handleUpload}
              disabled={isLoading}
            />
          </label>
          <small>or drop a file, paste an image from a link.</small>
        </div>
        <div className="container v2 container-main flex uploaded-container">
          <div className="page-col_left">
            <h1>
              The <span>#1</span> One-Click  Background Remover {isLoading}
            </h1>
          </div>
          <div className="page-col_right">
            <div className="uploaded-result_wrap">
              <div className="uploaded-result_image">
                {previewImage && (
                  <img src={previewImage} alt="" id="my-image-without-background" />

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
                <button className="result-btn outline" onClick={handleBuy}>
                    Download HD
                  </button>
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


      </main>

    </>
  );
}
export default Processing;
