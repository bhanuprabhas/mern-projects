import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [name, setName] = useState("");
  const [mail, setEmail] = useState("");
  const [rollno, setRollNum] = useState("");
  const [mobile, setMobile] = useState("");
  const [branch, setBranch] = useState("");
  const [college, setCollege] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRollNum, setNewRollNum]=useState("");
  const [newMobile,setNewMobile]=useState("");
  const [newBranch,setNewBranch]=useState("");
  const [newCollege,setNewCollege]=useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/student-profile", {
        headers: { token: token },
      })
      .then((response) => {
        const { fullname, mail,rollno,mobile,branch,campus } = response.data;
        setName(fullname);
        setEmail(mail);
        setRollNum(rollno);
        setMobile(mobile);
        setBranch(branch);
        setCollege(campus);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setNewName(name);
    setNewEmail(mail);
    setNewRollNum(rollno);
    setNewMobile(mobile);
    setNewBranch(branch);
    setNewCollege(college);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    let data = { fullname: newUserName, mail: newEmail, rollno:newRollNum,branch:newBranch,campus:newCollege };
    axios
      .put("http://localhost:5000/student-profile", data, {
        headers: { token: token },
      })
      .then((response) => {
        const { fullname, mail, rollno, branch, campus, mobile } =
          response.data;
        setNewName(fullname);
        setEmail(mail);
        setNewRollNum(rollno);
        setNewMobile(mobile);
        setNewBranch(branch);
        setNewCollege(campus);

        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="user-info">
  {isEditing ? (
    <div className="user-edit">
      <label>
        Name:
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Rollnum:
        <input
          type="text"
          value={newRollNum}
          onChange={(e) => setNewRollNum(e.target.value)}
        />
      </label>
      <br />
      <label>
        Mobile
        <input
          type="text"
          value={newMobile}
          onChange={(e) => setNewMobile(e.target.value)}
        />
      </label>
      <br />
      <label>
        College
        <input
          type="text"
          value={newCollege}
          onChange={(e) => setNewCollege(e.target.value)}
        />
      </label>
      <br />
      <label>
        Branch
        <input
          type="text"
          value={newBranch}
          onChange={(e) => setNewBranch(e.target.value)}
        />
      </label>
      <br />
      <button className="btn" onClick={handleSave}>Save</button>
      <button className="btn" onClick={handleCancel}>Cancel</button>
    </div>
  ) : (
    <div className="user-view">
      <p>Name: {username}</p>
      <p>Email: {mail}</p>
      <p>Rollnum:{rollno}</p>
      <button className="btn" onClick={handleEdit}>Edit</button>
    </div>
  )}
</div>
  );
}

export default Profile;
