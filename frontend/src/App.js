import "./App.css";
// import Signup from "./components/Signup";
import { BrowserRouter, Route , Router, Routes } from 'react-router-dom';
import Tabs from "./components/profile/profiletabs";
import Login from "./components/Login/login"; 
// import Profile from "./components/Profile";
import TeamInfo from "./components/tinfo/Teaminfo";
import Todo from "./components/todo/Todo";
import Homepage from "./components/home/homepage";
import ForgetPassword from "./components/settings/ForgetPassword";
import Home from "./components/mainpage/mainpage";
import Test from "./components/compiler/Test";
import ProgrammingQuestionForm from "./components/compiler/ProgrammingQuestionForm";
import PQuestion from "./components/compiler/PQuestion";
import Calendar from "./components/calender/Calendar";
import Course from "./components/courses/course"
import Reactelearn from "./components/courses/Reactlearn";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" exact element={<Home/>}></Route> 
    <Route path="/login" exact element={<Login/>}></Route> 
    <Route path="/home" exact element={<Homepage/>}></Route>    
    <Route path="/profile" exact element={<Tabs/>}></Route>   
    <Route path="/teaminfo" exact element={<TeamInfo/>}></Route>   
    <Route path="/todo" exact element={<Todo/>}></Route>   
    <Route path="/fp" exact element={<ForgetPassword/>}></Route> 
    <Route path="/Test/:id" element={<Test />} />
    <Route path="/que/add" element={<ProgrammingQuestionForm />}/>
    <Route path="/que" element={<PQuestion />} />
    <Route path="/calender" exact element={<Calendar/>}></Route>
    <Route path="/course" exact element={<Reactelearn />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );  
  }
export default App;
