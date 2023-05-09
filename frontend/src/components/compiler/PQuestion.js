import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./PQuestion.css";

export default function PQuestion() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/admin/question/fetch',{method:'GET'})
           .then((response) => response.json())
           .then((data) => {
              setItems(data);
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);
  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center activity">
                    <div className="mx-2"><div className='text-primary'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-terminal" viewBox="0 0 16 16">
                        <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/>
                        <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z"/>
                    </svg>
                    </div>
                    </div>
                    <div><span className="activity-done">Program Questions</span></div>
                    <div className="icons">
                        <div className="input-group">
                            <div className="form-outline mx-1">
                                <input type="search" id="form1" className="form-control h-100" placeholder='Search' />
                            </div>
                                {/* <a href='/que/add' className='btn btn-primary '>Add new</a> */}
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <ul className="list list-inline">
                    {items
                    .map((item) => {return (
                        <li className="d-flex justify-content-between" key={item._id} onClick={()=>{ navigate(`/Test/${item._id}`)}}>
                            <div className="d-flex flex-row align-items-center"><i className="fa fa-check-circle checkicon"></i>
                                <div className="ml-2">
                                    <h6 className="mb-0">{item.title}</h6>
                                    <div className="d-flex flex-row mt-1 text-black-50 date-time">
                                        <div><i className="bi bi-calendar"></i><span className="ml-2">  {new Date(item.date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})} </span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <div className="d-flex flex-column mr-2">
                                    <div className="profile-image"> </div>
                                </div>
                            </div>
                        </li>
                    )})}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
