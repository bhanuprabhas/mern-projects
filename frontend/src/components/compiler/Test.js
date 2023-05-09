import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import Compiler from "./Compiler";
import { useParams } from "react-router-dom";

function Test() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [items, setItems] = useState([]);
  const params = useParams();
  let confetiRef = useRef(null);

  const childToParent = () => {
    setShowConfetti(true)
    setTimeout(() => {
        setShowConfetti(false);
      }, 7000);
  }
  useEffect(() => {
    const id  = params.id;
    fetch(`http://localhost:5000/user/test/${id}`,{method:'GET'})
       .then((response) => response.json())
       .then((data) => {
          setItems(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);
//  console.log(items.testCases["0"]);
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setShowConfetti(false);
//     }, 7000);
//     return () => clearTimeout(timeoutId);
//   }, []);
  return (
    <div ref={confetiRef}>
      <div className="container">
        <div className=" mb-5">
          <div className="">
            <h1 className="text-center">{items.title}</h1>
          </div>

          <div className="">
            <div className="row">
              <div className="col-md-6">
                <h2>Question</h2>
                <p>
                  {items.question}
                </p>
              </div>

              <div className="col-md-6">
                <h2>Content</h2>
                <p>
                  {items.description}
                </p>
              </div>
            </div>

            <hr />

            <div className="row mt-5">
              <div className="col-md-6">
                <h2>Sample Input</h2>
                <pre>
                  <code>{items.sampleInput}</code>
                </pre>
              </div>

              <div className="col-md-6">
                <h2>Sample Output</h2>
                <pre>
                  <code>{items.sampleOutput}</code>
                </pre>
              </div>
            </div>

            <hr />
            <div className="row mt-5">
              <div className="col-md-12">
                <Compiler toggle={childToParent} testCases = {items.testCases} sampleInput={items.sampleInput}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfetti && (
        <Confetti
          width={confetiRef.current.clientWidth}
          height={confetiRef.current.clientHeight}
          numberOfPieces={1000}
          colors={[
            "#f44336",
            "#e91e63",
            "#9c27b0",
            "#673ab7",
            "#3f51b5",
            "#2196f3",
            "#03a9f4",
            "#00bcd4",
            "#009688",
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFEB3B",
            "#FFC107",
            "#FF9800",
            "#FF5722",
            "#795548",
          ]}
          shapes={["square", "circle"]}
        />
      )}
    </div>
  );
}

export default Test;
