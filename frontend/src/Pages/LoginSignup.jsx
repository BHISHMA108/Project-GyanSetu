import React, { useState } from "react";
import axios from "axios";
import { auth } from "../Firebase/Firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginVideo from "../Components/LoginVideo"; // Import video component
import Aurora from "../Components/Aurora/Aurora.jsx";
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://gyansetu-backend-latest.onrender.com";
// const API_URL = "https://gyansetu-backend-latest.onrender.com"; // Backend URL
const LoginSignup = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState("Sign up");
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneno: "",
    religion: "",
    bio: "",
    profilePicture: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showVideo, setShowVideo] = useState(false); // NEW STATE

const handleSignup = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const firebaseUser = userCredential.user;

    const defaultProfile = {
      uid: firebaseUser.uid,
      name,
      email,
      phoneno: "",
      religion: "",
      bio: "New seeker on GyanSetu 🌿",
      profilePicture: "",
    };

    const res = await axios.post(
      `${API_URL}/api/adduser/${firebaseUser.uid}`,
      defaultProfile
    );

    // localStorage.setItem("uid", firebaseUser.uid);
    alert("Signup successful!");
    setShowVideo(true);

  } catch (error) {
    setError(error.message);
  }
};

  const handleLogin = async () => {
    try {
      const credintials = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = credintials.user;

      setShowVideo(true); // SHOW VIDEO
    } catch (error) {
      setError(error.message.replace("Firebase:", ""));
    }
  };

  if (showVideo) {
    return <LoginVideo setShowVideo={setShowVideo} />; // SHOW VIDEO COMPONENT
  }

  return (
    <div>
      <div className="z-[50]">
        <Aurora />
      </div>

      <div className="flex items-center justify-center min-h-screen bg-transperant from-yellow-100 to-orange-200 z-[10] -translate-y-[100px]">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg z-[100]">
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-3xl font-bold text-orange-600 mb-1">
              Welcome to GyanSetu
            </h1>
            <p className="text-gray-600">{action}</p>
            <div className="h-1 w-16 bg-orange-500 rounded-full mt-2"></div>
          </div>

          {action === "Sign up" && (
            <div className="flex items-center bg-gray-100 rounded-md p-3 mb-4">
              <PersonIcon className="text-orange-500 mr-2" />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-orange-500 outline-none w-full"
              />
            </div>
          )}

          <div className="flex items-center bg-gray-100 rounded-md p-3 mb-4">
            <EmailIcon className="text-orange-500 mr-2" />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-orange-500 outline-none w-full"
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-md p-3 mb-4">
            <LockIcon className="text-orange-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-orange-500 outline-none w-full"
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="flex flex-col space-y-3">
            {action === "Sign up" ? (
              <button
                onClick={handleSignup}
                className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
              >
                Sign Up
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
              >
                Login
              </button>
            )}

            <button
              onClick={() =>
                setAction(action === "Sign up" ? "Login" : "Sign up")
              }
              className="border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-100 transition"
            >
              {action === "Sign up" ? "Switch to Login" : "Switch to Sign Up"}
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            🕉️ Peace • Love • Spirituality 🕉️
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
