import React, { useState } from "react";
import "./PQF.css";

const ProgrammingQuestionForm = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSampleInputChange = (event) => {
    setSampleInput(event.target.value);
  };

  const handleSampleOutputChange = (event) => {
    setSampleOutput(event.target.value);
  };

  const handleTestCaseInputChange = (event, index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index].input = event.target.value;
    setTestCases(updatedTestCases);
  };

  const handleTestCaseOutputChange = (event, index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index].output = event.target.value;
    setTestCases(updatedTestCases);
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleDeleteTestCase = (index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1);
    setTestCases(updatedTestCases);
  };
  const handleSubmit = async()=>{
    const body = {
        title:title,
        question:question,
        description:description,
        sampleInput:sampleInput,
        sampleOutput:sampleOutput,
        testCases: testCases
    }
    await fetch('http://localhost:5000/admin/question/add', {method: 'POST',mode: 'cors',headers: { 'Content-Type': 'application/json' },body:JSON.stringify(body)})
      // console.log(response.json())
           .then((response) => response.json())
           .then((value) => {console.log(value)})
           .catch((err) => {
              console.log(err.message);
           });

           window.location.reload(false);
  }

  return (
    <div className="form-container">
      <h2 className="form-heading">Programming Question Form</h2>
      <div className="form" >
      <div className="form-group">
          <label htmlFor="TITLE">Title:</label>
          <input
            type= "text"
            id="question"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={handleQuestionChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sample-input">Sample Input:</label>
          <textarea
            id="sample-input"
            value={sampleInput}
            onChange={handleSampleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sample-output">Sample Output:</label>
          <textarea
            id="sample-output"
            value={sampleOutput}
            onChange={handleSampleOutputChange}
          />
        </div>
        <div className="form-group">
          <label>Test Cases:</label>
          {testCases.map((testCase, index) => (
            <div key={index} className="test-case">
              <div className="test-case-input">
                <label htmlFor={`test-case-${index}-input`}>
                  Input {index + 1}:
                </label>
                <textarea
                  id={`test-case-${index}-input`}
                  value={testCase.input}
                  onChange={(event) => handleTestCaseInputChange(event, index)}
                />
              </div>
              <div className="test-case-output">
                <label htmlFor={`test-case-${index}-output`}>
                  Output {index + 1}:
                </label>
                <textarea
                                id={`test-case-${index}-output`}
                                value={testCase.output}
                                onChange={(event) => handleTestCaseOutputChange(event, index)}
                              />
                            </div>
                            <button
                              type="button"
                              className="delete-test-case"
                              onClick={() => handleDeleteTestCase(index)}
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="add-test-case"
                          onClick={handleAddTestCase}
                        >
                          Add Test Case
                        </button>
                      </div>
                      <button type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                  </div>
                );
              };
              
export default ProgrammingQuestionForm;
              
                 
