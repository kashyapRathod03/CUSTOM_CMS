const express = require('express');
const cors = require('cors');
const app = express();
require('./src/db/conn');
const { admin, Vcatagory, vendor } = require('./src/models/register');
const port = 5000;
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    const user = await admin.findOne({ username: username });
    const u_pass = await admin.findOne({ password: password });

    if (user && u_pass) {
        res.send('true');
    }
    else {
        res.send('false');
    }
})
app.post("/addcatagory", upload.single('image'), async (req, res) => {
    const catagory = req.body.catagory;
    const desc = req.body.desc;
    const check = req.body.check;
    const imgurl = req.file.path;
    const data = new Vcatagory({
        catagory: catagory, desc: desc, check: check, img: imgurl
    });
    const cat = await Vcatagory.findOne({ catagory: catagory });
    // const d = await Vcatagory.find();

    if (cat) {
        res.send('true');
    }
    else {
        await data.save();
        res.send('false');
    }
})
app.get("/addcatagory", async (req, res) => {
    const d = await Vcatagory.find({});
    res.send(d);
})
app.delete("/deletecat/:id", async (req, res) => {
    const {id} =req.params;
    console.log(id);
    console.log(req.method);
    // let i = JSON.stringify(id);
    var d = await Vcatagory.deleteOne({ _id: id });
    console.log(d);
    if(d.acknowledged){
        res.send("true");
    }
})


app.listen(port, () => {
    console.log("server start:5000");
});