import {Component} from "react"
import axios from 'axios'
import "./course.css"

class Course extends Component{
    state = {
        subjectList: [],
        subjectlink : ""
    }
//     GetSubjects= async  ()=>{
    
//     const token=localStorage.getItem('token');
//     console.log(token)
//     const response = await axios.get(`http://localhost:5000/getallcourses`, {
//     headers: {
//             "x-access-token": token,
//         },
//         });
//         let newList= []
//         newList= response.data 
//         this.setState({subjectList: newList})
//         return response.data
// }
GetSubjects = async () => {
  const response = await axios.get(`http://localhost:5000/getallcourses`);
  let newList = [];
  newList = response.data;
  this.setState({ subjectList: newList });
  return response.data;
};

    list= this.GetSubjects()
    
    render(){
        const { subjectList } = this.state;
        return (
          <div className="gridItems">
            <div className="Introduction">
              <h2>Learn the most popular courses!</h2>
            </div>
            {subjectList.map((item) => (
              <div className="course-card">
                <img
                  src={`${item.imageURL}`}
                  alt="https://tse3.mm.bing.net/th?id=OIP.ROABoliqXSqqS1L8JtjNWwHaHa&pid=Api&P=0"
                  aria-hidden="true"
                ></img>
                <h3>{item.subject}</h3>
                <p>Learn {item.subject} zero to mastery</p>
                <a href={`${item.link}`} target="_blank" rel="noreferrer"> CLICK HERE</a>
    
              </div>
            ))}
            
              </div>
            
        )    
      }
      
  }
    
    export default Course;