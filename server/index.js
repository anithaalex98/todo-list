const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const ToDoAppModel = require('./models/listofitems')

app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/todoapp?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
    { useNewUrlParser: true });

app.post('/insert', async (req, res) => {
    const currdate = new Date().toLocaleDateString() + "";
    const currtime = new Date().toLocaleTimeString() + "";
    const currdatetime = currdate + " " + currtime;

    const name = req.body.name;
    const items = req.body.items;
    const starred = req.body.starred;

    const todoitem = new ToDoAppModel({ name: name, items: items, currdate: currdatetime, starred: starred });
    await todoitem.save();
    res.send("Sucessfully Inserted Data");
});

app.get('/read', async (req, res) => {
    ToDoAppModel.find({}, (error, result) => {
        if (error) {
            res.send(error);
        }
        else {
            res.send(result);
        }

    }).sort({ starred: -1});
});

app.put('/update', async (req, res) => {
    const d = new Date().toLocaleDateString();
    const t = new Date().toLocaleTimeString();
    const currdate = d + " " + t;

    const id = req.body.id;
    const name = req.body.name;
    const updateditems = req.body.items;
    const starred = req.body.starred;

    try {
        await ToDoAppModel.findById(id, (error, updateToDoList) => {
            updateToDoList.name = name;
            updateToDoList.starred = Boolean(starred);
            updateToDoList.currdate = currdate;
            if (updateditems != []) {
                updateToDoList.items.push.apply(updateToDoList.items, updateditems);
            }
            updateToDoList.save();
            res.send("Sucessfully Updated Data");
        });
    }
    catch (err) {
        console.log(err);
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await ToDoAppModel.findByIdAndRemove(id).exec();
    res.send("ToDoList deleted sucessfully");
});

app.listen(5000, () => {
    console.log("Conencted to server")
});