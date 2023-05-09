import { useState } from "react";
import axios from 'axios'
import Course from "./course";
import "./course.css"

const Reactelearn = () => {
  const [link, setLink] = useState("");
  const [subjects, setSubjects] = useState([{}]); 
  const [cards, setCards] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newImage,setnewImage]=useState("");
  const [deleteSubject, setDeleteSubject] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const handleSubjectChange = (event) => {
    setNewSubject(event.target.value);
  };

  const handleLinkChange = (event) => {
    setNewLink(event.target.value);
  };

  const handleImageChange = (event) => {
    setnewImage(event.target.value);
  };

  const handleAddSubject = async () => {
    const newSubjectDoc = { subject: newSubject,imageURL:newImage, link: newLink };
    try {
      const response = await axios.post("http://localhost:5000/newcourse", newSubjectDoc);
      const data = response.data;
      console.log(data);
      const newSubjects = [...subjects, newSubjectDoc];
      setSubjects(newSubjects);
      setNewSubject("");
      setnewImage("");
      setNewLink("");
      if (newSubject && newImage && newLink ) {
        const newCard = {
          subject: newSubject,
          imageURL:newImage,
          link: newLink,
        };
        setCards([...cards, newCard]);
        setNewSubject("");
        setnewImage("");
        setNewLink("");
      };
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubjectNameChange = (event) => {
    setSubjectName(event.target.value);
  };

  const handleRemoveSubject = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/delcard/${subjectName}`);
      console.log(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
    setSubjectName("");
  };
return (    
    <div className="courses-body">
        <div className="dropdown">
          <div className="center">
        <button className="dropbtn">Add Subject</button>
        </div>
        <div id="myDropdown" className="dropdown-content">
          <input type="text"placeholder="Enter subject name"value={newSubject}onChange={handleSubjectChange}/>
          <input type="text"placeholder="Image URL"value={newImage}onChange={handleImageChange}/> 
          <input className="margin-bottom" type="text"placeholder="Enter link"value={newLink}onChange={handleLinkChange}/>
          <button onClick={handleAddSubject}>Add</button>
        </div>
        </div>
      <div className="dropdown right-side" style={{ float: "right" }}>
        <div className="center">
      <button className="dropbtn  right-side">Remove Subject</button>
      </div>
      <div className="dropdown-content">
        <input type="text" placeholder="Enter subject name" value={subjectName} onChange={handleSubjectNameChange}/>
        <button onClick={handleRemoveSubject}>Remove</button>
      </div>
    </div>

      <Course  />
</div>
)
 }
export default Reactelearn