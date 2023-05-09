import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
// import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-xcode";
import "./compiler.css";

export default function Compiler({ testCases, toggle, sampleInput }) {
  const [code, setCode] = useState("# write python program here ");
  const [youtput, setYoutput] = useState("");
  const [compile, setCompile] = useState(false);
  const [run, setRun] = useState(false);
  const input = sampleInput;

  //  console.log(eoutput)
  const handlerun = async () => {
    const body = {
      code: code,
      input: input,
    };
    await fetch("http://localhost:5000/py", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      // console.log(response.json())
      .then((response) => response.json())
      .then((value) => {
        if (!value.output) {
          setYoutput(value.error);
        } else {
          setYoutput(value.output);
          // let s = value.output.replace(/[\r\n]+/g, "")
          // if(eoutput === s){
          //   toggle()
          // }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    setCompile(false);
    setRun(true);
  };
  const handlecompile = async () => {
    for (let i in testCases) {
      const body = { code: code, input: testCases[i].input };
      await fetch("http://localhost:5000/py", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        // console.log(response.json())
        .then((response) => response.json())
        .then((value) => {
          const obj = testCases[i];
          if (!value.output) {
            obj.yout = value.error;
          } else {
            let s = value.output.replace(/[\r\n]+/g, "");
            obj.yout = s;
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    let pop = 0;
    for (const i in testCases) {
      if (testCases[i].output === testCases[i].yout) {
        pop += 1;
      }
    }
    if (pop === Object.keys(testCases).length) {
      toggle();
    }
    setCompile(true);
    setRun(false);
  };

  return (
    <>
      <div className="container-fluid body">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-end">
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Warning
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Your writen code will be erased.
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{setCode("# write python program here ");setRun(false);setCompile(false);}}>
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-warning mx-2 my-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                ><i className="bi bi-arrow-clockwise"></i> Reset
                </button>
              </div>
              <div className="text-code-editor">
                <div className="code-editor">
                  <AceEditor
                    mode="python"
                    theme="xcode"
                    value={code}
                    onChange={setCode}
                    name="python-editor"
                    width="100%"
                    height="350px"
                    fontSize={17}
                    style={{ border: "1px solid gray" }}
                  />
                  {/* <textarea id="code" className=" code-input form-control" rows="10" placeholder="Enter your code here" onChange={}></textarea> */}
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  id="compile-btn"
                  className="btn btn-info mx-2 my-3 "
                  onClick={handlerun}
                ><i className="bi bi-send"></i> Run
                </button>
                <button
                  id="compile-btn"
                  className="btn btn-info mx-2 my-3 "
                  onClick={handlecompile}
                ><i className="bi bi-terminal"></i> Compile
                </button>
              </div>
            </div>
            <hr />
            {run && (
              <div>
                <div className="card-header fw-bolder">Your Output: </div>
                <div className="card-body text-dark">
                  <p className="card-text">{youtput}</p>
                </div>
              </div>
            )}

            {compile && (
              <div>
                <h1 className="h4 fw-bolder">Test Cases: </h1>
                <table className="table">
                  <thead>
                    <tr className="text-dark">
                      <th>S/NO</th>
                      <th>Input</th>
                      <th>Expected Output</th>
                      <th>Your Output</th>
                      {/* <th>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                </svg>
                                Test cases
                              </th> */}
                    </tr>
                  </thead>
                  <tbody className="fw-bolder">
                    {testCases.map((testcase, i) => {
                      return (
                        <tr
                          key={i}
                          className={
                            testcase.output === testcase.yout
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          <td>{(i += 1)}</td>
                          <td>
                            {testcase.input}
                          </td>
                          <td>{testcase.output}</td>
                          <td>{testcase.yout}</td>
                        </tr>
                      );
                    })}
                    {/* <td>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                              </svg>
                              pass
                            </td> */}

                    {/* <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                                fail
                          </td> */}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
