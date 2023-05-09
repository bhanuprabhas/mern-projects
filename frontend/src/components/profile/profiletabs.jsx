import { useState, useEffect } from "react";
import "./profiletabs.css";
import user from "./user.jpg";
import Navbar from "../navbar/navbar";
import axios from "axios";
import Footer from "../footer/Footer";

function Tabs() {

  const [userData, setUserData] = useState({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingTechnical, setIsEditingTechnical] = useState(false);

  const token = localStorage.getItem("token");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditprofile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveprofile = () => {
    // TODO: Save the profile details to the server
    setIsEditingProfile(false);
    axios
      .put("http://localhost:5000/profile-edit", userData, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdittechnical = () => {
    setIsEditingTechnical(true);
  };

  const handleSavetechnical = () => {
    // TODO: Save the profile details to the server
    setIsEditingTechnical(false);
    axios
      .put("http://localhost:5000/profile-edit", userData, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/myprofile", {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div className="whole">
      <Navbar />
      <div className="profile_container">
        <div className="top-part">
          <div className="about_container">
            <img src={user} alt="alternatetext" id="profile-img" />
            {/* <button id="change-button">Change Photo</button> */}
          </div>
          <div className="about_container_side">
            <h3>{userData.name}</h3>
            <h4>{userData.rollnum}</h4>
            <h4>Kakinada institute of eng. and techn.</h4>
          </div>
        </div>

        <div className="down-part">
          <div className="bloc-tabs">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Personal Details
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Technical Details
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              <div>
                <h3>Profile</h3>
              </div>
              <hr />
              <div className="profile-form">
                {/* Profile Form */}
                <form method="post" id="Personalform">
                  <div className="profilerow">
                    <div className="column">
                      <input
                        type="text"
                        name="name"
                        placeholder="First Name"
                        defaultValue={userData.name}
                        onChange={handleInputChange}
                        disabled={!isEditingProfile}
                        autocomplete="off"
                      />
                    </div>

                    <div className="column">
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        defaultValue={userData.lastname}
                        onChange={handleInputChange}
                        disabled={!isEditingProfile}
                        autocomplete="off"
                      />
                    </div>
                  </div>

                  <div className="profilerow">
                    <div className="column">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled={!isEditingProfile}
                        autocomplete="off"
                      />
                    </div>

                    <div className="column">
                      <input
                        type="text"
                        name="phone"
                        id="pno"
                        placeholder="Phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        autocomplete="off"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        maxLength={10}
                        required
                        disabled={!isEditingProfile}
                      />
                    </div>
                  </div>
                  <div className="profilerow">
                    <div className="column">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={userData.city}
                        onChange={handleInputChange}
                        disabled={!isEditingProfile}
                        autocomplete="off"
                      />
                    </div>

                    <div className="column">
                      <input
                        type="Number"
                        name="teamno"
                        placeholder="Teamno"
                        value={userData.teamno}
                        onChange={handleInputChange}
                        disabled={!isEditingProfile}
                        autocomplete="off"
                      />
                    </div>
                  </div>

                  {/* Edit Profile Button */}
                  {!isEditingProfile && (
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn-style"
                        onClick={handleEditprofile}
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}

                  {/* Save Profile Button */}
                  {isEditingProfile && (
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn-style"
                        onClick={handleSaveprofile}
                      >
                        Save Profile
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <div>
                <h3>Technical</h3>
              </div>
              <hr />
              <div className="profile-form">
                {/* Profile Form */}
                <form method="post" id="Personalform">
                  <div className="profilerow">
                    <div className="column">
                      <input
                        type="text"
                        name="github"
                        placeholder="Github"
                        value={userData.github}
                        onChange={handleInputChange}
                        disabled={!isEditingTechnical}
                        autocomplete="off"
                      />
                    </div>
                    <div className="column">
                      <input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn"
                        value={userData.linkedin}
                        onChange={handleInputChange}
                        disabled={!isEditingTechnical}
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div className="profilerow">
                    <div className="column">
                      <input
                        type="text"
                        name="hackerrank"
                        placeholder="Hackerrank"
                        value={userData.hackerrank}
                        onChange={handleInputChange}
                        disabled={!isEditingTechnical}
                        autocomplete="off"
                      />
                    </div>
                    <div className="column">
                      <input
                        type="text"
                        name="edyst"
                        placeholder="Edyst"
                        value={userData.edyst}
                        onChange={handleInputChange}
                        disabled={!isEditingTechnical}
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  {!isEditingTechnical && (
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn-style"
                        onClick={handleEdittechnical}
                      >
                        Edit Technical
                      </button>
                    </div>
                  )}

                  {/* Save Profile Button */}
                  {isEditingTechnical && (
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn-style"
                        onClick={handleSavetechnical}
                      >
                        Save Technical
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Tabs;
