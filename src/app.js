const express = require('express');
const app = express();

app.use(express.json());
//app.use(express.urlencoded({extended: true}));

const PORT = 3000;
const SL = require ('./StudentList.js');

app.get('/', (req, res) => {
    res.send("Welcome!");
    console.log("Get Request on Home")
});

app.get('/students', (req, res) => {
    res.json(SL);
    console.log("Get Request on /students")
});

app.put('/students/:StudentID', (req, res) => {
    
  const StudentID = Number(req.params.StudentID);
  const item = SL.find((item) => item.StudentID === StudentID);

  if (!item) {
    return res.status(404).json({ message: "item not found" });
  }

  // Update the existing student with the new data from req.body
  Object.assign(item, req.body);

  res.json({ message: "item updated", item });
});


app.post('/students', (req, res) => {
    const temp = req.body;
    SL.push(temp);
    res.json({message:"Student Added", NewStudent: temp});
    console.log(temp);
});

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});