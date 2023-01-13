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
import { useParams, useLocation, useNavigate as useHistory } from "react-router-dom";

function Processing() {
  const [previewImage, setPreviewImage] = useState(null);
  const [receivedImage, setReceivedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  
  const image = location.state.image;
  console.log(location);
  const history = useHistory();
  useEffect(() => {
    if (image){
        setPreviewImage(URL.createObjectURL(image)); // Perform the API call
    setIsLoading(true);
    const data = new FormData();
    data.append("file", image);
    axios
      .post("https://inpixio-remove-bg-zceht2uy2q-ey.a.run.app/api/upload", data)
      .then((response) => {
        setReceivedImage(response.data.url);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, []);
  const handleDownload = () => {
    // Download the received image
    const link = document.createElement("a");
    link.href = receivedImage;
    link.download = "image.jpg";
    link.click();
  };
  const handleBuy = () => {
    // Perform any necessary actions for purchasing the image, such as sending a request to a payment gateway // and updating the user's account //...
    history.push("/cart", { image: receivedImage });
  };
  return (
    <div>
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
      {previewImage && <img src={previewImage} alt="Preview" />}
    </div>
  );
}
export default Processing;
