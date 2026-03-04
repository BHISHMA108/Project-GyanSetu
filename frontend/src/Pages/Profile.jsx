import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase.js";
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://gyansetu-backend-latest.onrender.com";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const id = currentUser.uid;
          setUid(id);

          const res = await axios.get(`${API_URL}/api/user/${id}`);

          setUser(res.data.data);
          setFormData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Update User
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API_URL}/api/updateuser/${uid}`, formData);

      setUser(res.data.data);
      setEditMode(false);
      alert("Profile Updated Successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-white text-center mt-10">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <div className="text-red-500 text-center mt-10">User Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8 flex flex-col items-center">
      {/* Go Back */}
      <div
        className="w-full max-w-2xl mb-6 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/main")}
      >
        <ArrowBackIcon className="text-blue-400" />
        <p className="text-blue-400 hover:underline">Go back</p>
      </div>

      {/* Profile Card */}
      <div className=" max-w-3xl bg-gray-800 rounded-2xl shadow-xl p-6">
        {/* Profile Image */}
        <div className="w-full flex justify-center items-center h-64 rounded-2xl overflow-hidden mb-6">
          <img
            src={user.profilePicture || "/user.jpg"}
            alt="Profile"
            className="w-full h-full object-fill "
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          {editMode ? (
            <input
              type="text"
              name="name"
              placeholder="Your Holy Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700"
            />
          ) : (
            <h1 className="text-2xl font-bold text-cyan-400">{user.name}</h1>
          )}
        </div>

        {/* Religion */}
        <div className="mb-4">
          {editMode ? (
            <input
              type="text"
              placeholder="Religion"
              name="religion"
              value={formData.religion || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700"
            />
          ) : (
            <p className="text-gray-300">{user.religion || "Not specified"}</p>
          )}
        </div>

        {/* Bio */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-cyan-300">Bio</h2>
          {editMode ? (
            <textarea
              name="bio"
              placeholder="Enter Bio"
              value={formData.bio || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 mt-2"
            />
          ) : (
            <p className="text-gray-300 mt-2">
              {user.bio || "No bio available"}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="px-6 py-2 rounded bg-green-500 hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 rounded bg-red-500 hover:bg-red-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 rounded bg-cyan-500 hover:bg-cyan-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
