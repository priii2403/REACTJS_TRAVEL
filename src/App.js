import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMeetups from "./Pages/AllMeetups";
import NewMeetup from "./Pages/NewMeetup";
import Favourites from "./Pages/Favourites";
import MainNavigatation from "./components/layout/MainNavigatation";
import Login from "./components/Login/Login";
import SIgnUp from "./components/Login/SignUp";
import "./components/meetups/card.css";
import { Provider as StoreProvider } from "react-redux";
import { AuthContextProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPass from "./components/Login/ForgotPass";
import store from "./components/store/createStore";
import ChatScreen from "./Pages/ChatScreen";
function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <StoreProvider store={store}>
            <header>
              <div className="logo">Voyage Vault</div>
            </header>
            <MainNavigatation className="navigation" />
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route
                path="/all-meetup"
                element={<ProtectedRoute>{<AllMeetups />}</ProtectedRoute>}
              />
              <Route path="/new-meetup" element={<NewMeetup />} />
              <Route path="/sign-up" element={<SIgnUp />} />
              <Route path="/favourite" element={<Favourites />} />
              <Route path="/forgotPassward" element={<ForgotPass />} />
              <Route path="/chatScreen" element={<ChatScreen />} />
            </Routes>
          </StoreProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
