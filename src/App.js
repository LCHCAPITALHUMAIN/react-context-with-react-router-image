import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home, About, Users } from "./page/";
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
            path="/about"
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
                <About />
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
