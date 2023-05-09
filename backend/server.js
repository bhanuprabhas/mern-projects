const express = require("express");
const mongoose = require("mongoose");
const Registeruser = require("./model");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const Questions = require("./model/ProgramQ");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const app = express();
const Student = require("./studentInfo");
const Task = require("./TodoSchema");
const { db } = require("./studentInfo");
const Event = require("./calendarschema");
const cors = require("cors");
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/Scb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {console.log("DB Connection established");
}).catch((err) => {
    console.error(err);
    process.exit(1);

  });


app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));

app.post("/register", async (req, res) => {
  try {
    const {
      name,
      lastname,
      email,
      phone,
      rollnum,
      city,
      teamno,
      github,
      linkedin,
      hackerrank,
      edyst,
      password,
      confirmpassword,
    } = req.body;
    let exist = await Registeruser.findOne({ email });
    if (exist) {
      return res.status(400).send("User Already Exist");
    }
    if (password !== confirmpassword) {
      return res.status(400).send("Passwords are not matching");
    }
    let newUser = new Registeruser({
      name,
      lastname,
      email,
      phone,
      rollnum,
      city,
      teamno,
      github,
      linkedin,
      hackerrank,
      edyst,
      password,
      confirmpassword,
    });
    await newUser.save();
    res.status(200).send("Registered Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internel Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let exist = await Registeruser.findOne({ email });
    if (!exist) {
      return res.status(400).send("User Not Found");
    }
    if (exist.password !== password) {
      return res.status(400).send("Invalid credentials");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.get("/myprofile", middleware, async (req, res) => {
  try {
    let User = await Registeruser.findOne({ _id: req.user.id });
    return res.json(User);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

app.put("/profile-edit", middleware, async (req, res) => {
  try {
    let User = await Registeruser.findOneAndUpdate(
      { _id: req.user.id },
      req.body,
      { new: true }
    );
    res.send(User);
  } catch (error) {
    res.status(500).send(err);
  }
});

app.get("/student-profile", middleware, async (req, res) => {
  let exist = await Registeruser.findById(req.user.id);
  let user = await Student.findOne({ mail: exist.email }).select(
    "-password -confirmpasswword"
  );
  return res.json(user);
});

// app.put('/myprofile',middleware, async (req, res) => {
//     try {

//       const { username, email, password,confirmpassword} = req.body;
//       const updatedUser = await Registeruser.findByIdAndUpdate(req.user.id, { username, email, password,confirmpassword },{ new: true, omitUndefined: true }); // Update the user and get the updated document back

//       if (!updatedUser) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       res.json(updatedUser);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

app.put("/student-profile", middleware, async (req, res) => {
  try {
    let exist = await Registeruser.findById(req.user.id);
    const { fullname, mail, rollno, branch, campus } = req.body;
    const updatedUser = await Student.findOneAndUpdate(
      exist.email,
      { fullname, mail, rollno, branch, campus },
      { new: true, omitUndefined: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// app.post('/addtask',async(req,res)=>{
//     const {todo} = req.body;
//     try{
//         const newData = new ToDo({
//             todo : todo
//         });
//         await newData.save();
//         return res.json(await ToDo.find())
//     }
//     catch(err){
//         console.log(err)
//     }
// })

// app.get('/gettask',async(req,res) => {
//     try{
//         return res.json(await ToDo.find()) ;
//     }
//     catch(err){
//         console.log(err)
//     }
// })

// app.delete('/delete/:task._id',async(req,res) => {
//     try{
//         await ToDo.findByIdAndDelete(req.params.id);
//         return res.json(await ToDo.find())
//     }
//     catch(err){
//         console.log(err)
//     }
// })

app.post("/", async (req, res) => {
  try {
    const data = await req.body;
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

app.post("/py", (req, res) => {
  const { code, input } = req.body;
  // console.log(req.body)
  const python = spawn("python", ["-c", code]);

  let output = "";
  let error = "";

  python.stdin.write(input);
  python.stdin.end();

  python.stdout.on("data", (data) => {
    output += data;
  });

  python.stderr.on("data", (data) => {
    error += data;
  });

  python.on("close", (code) => {
    if (code !== 0 || error) {
      res.status(500).send({ error: error });
    } else {
      res.send({ output: output });
    }
  });
});

app.post("/admin/question/add", async (req, res) => {
  try {
    let admin = await Questions.findOne({ title: req.body.title });
    if (admin) {
      return res
        .status(400)
        .json({ errors: "Sorry the program is already exists" });
    }
    // console.log(req.body)
    await Questions.create({
      title: req.body.title,
      description: req.body.description,
      question: req.body.question,
      sampleInput: req.body.sampleInput,
      sampleOutput: req.body.sampleOutput,
      testCases: req.body.testCases,
    });
    res.status(200).send("Success");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/admin/question/fetch", async (req, res) => {
  try {
    let admin = await Questions.find();
    if (admin) {
      res.status(200).send(admin);
    } else {
      res.status(200).send("DATABASE EMPTY");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/user/test/:id", async (req, res) => {
  try {
    let question = await Questions.findById(req.params.id);
    if (question) {
      res.status(200).send(question);
    } else {
      res.status(500).send("wrond id");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//calemder
app.get("/", (req, res) => {
  return res.send("<h1>COORDINATOR DASHBOARD</h1>");
});

app.post("/calendarschema", async (req, res) => {
  try {
    const { title, start, end } = req.body;
    const newEvent = await Event.create({
      title,
      start,
      end,
    });
    return res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

app.get("/calendarschema", async (req, res) => {
  try {
    const calendarschema = await Event.find();
    return res.status(200).json(calendarschema);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

app.put("/calendarschema/:id", async (req, res) => {
  try {
    const { title, start, end } = req.body;
    const existingCalender = await Event.findByIdAndUpdate(
      req.params.id,
      { title, start, end },
      { new: true }
    );
    if (!existingCalender) {
      return res.status(404).send("Events not found");
    }
    return res.status(200).json(existingCalender);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

app.delete("/calendarschema/:id", async (req, res) => {
  try {
    const existingCalender = await Event.findByIdAndDelete(req.params.id);
    if (!existingCalender) {
      return res.status(404).send("Events not found");
    }
    return res.status(200).send("Events deleted successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

//todoooooo

// Create a new task
app.post("/post-tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tasks
app.get("/get-tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

// Get a single task by ID
app.get("/get-tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

// Update a task by ID
app.patch("/patch-tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a task by ID
app.delete("/delete-tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
});











//courses



const MyCourses =require('./MyCourses')
app.post('/newcourse/',async (req, res) => {
  const {subject,imageURL,link} = req.body;
  console.log(req.body+"this is from new course router")
  try {
    // Find the document with the specifiedsubject
    const doc12 = await MyCourses.findOne({subject });
    if (!doc12) {
      // If the document doesn't exist, create a new one
      const newDoc12 = new MyCourses({ subject, imageURL, link});
      console.log(newDoc12, "newDoc12");
      await newDoc12.save();
      res.status(201).json(newDoc12);
    } else {
      // If the document exists, update its link field and imageURL field
      doc12.link = link;
      doc12.imageURL=imageURL;
      await doc12.save();
      res.json(doc12);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
app.get('/getallcourses/',  async (req, res) => {
  try {
    const courses = await MyCourses.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve courses' });
  }
});
app.delete('/delcard/:subject',async(req,res)=>{
  try {
    const doc13 = await MyCourses.findOneAndDelete({ subject: req.params.subject });
    
  }catch (err) {
    res.status(500).send(err)
  }
});











app.listen(5000, () => {
  console.log("Server running...");
});
