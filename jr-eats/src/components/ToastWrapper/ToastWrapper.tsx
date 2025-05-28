"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastWrapper = () => {
  return <ToastContainer position="top-center" autoClose={3000} />;
};
export default ToastWrapper;