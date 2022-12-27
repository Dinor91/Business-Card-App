import "./App.css";

import "react-toastify/dist/ReactToastify.css";

import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
//!ToastContainer provide to to Toastify to deal with thw dom

import Navbar from "./Components/navbar";
import Home from "./Components/home";
import About from "./Components/about";
import SignUp from "./Components/signUp";
import SignIn from "./Components/signIn";
import LogOut from "./Components/logOut";
import SignUpBiz from "./Components/signUpBiz";
import MyCards from "./Components/myCards";
import CreateCard from "./Components/createCard";
import DeleteCard from "./Components/deleteCard";
import EditCard from "./Components/editCard";
import Footer from "./Components/Common/footer";
import ProtectedRoute from "./Components/Common/protectedRoute";

function App() {
  return (
    <div className="app d-flex flex-column min-vh-100">
      <ToastContainer />
      <header>
        <Navbar />
      </header>

      <main className="flex-fill container">
        <Routes>
          <Route path="Business-Card-App/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyCards redirect="/create-card" />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-card"
            element={
              <ProtectedRoute onlyBiz>
                <CreateCard redirect="/my-cards" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/delete/:id"
            element={
              <ProtectedRoute onlyBiz>
                <DeleteCard redirect="/my-cards" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/edit/:id"
            element={
              <ProtectedRoute onlyBiz>
                <EditCard redirect="/my-cards" />
              </ProtectedRoute>
            }
          />
          <Route path="sign-up" element={<SignUp redirect="/sign-in" />} />
          <Route path="sign-in" element={<SignIn redirect="/" />} />
          <Route path="log-out" element={<LogOut redirect="/" />} />
          <Route
            path="sign-up-biz"
            element={<SignUpBiz redirect="/create-card" />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
export default App;
//!MyCards is a children of ProtectedRoute
