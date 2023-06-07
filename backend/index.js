const express = require('express');
const cors = require('cors');
const app = express();
require('./src/db/conn');
const {admin,Vcatagory,vendor} = require('./src/models/register');
const port = 5000;
app.use(cors());
app.use(express.json());


app.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    const user = await admin.findOne({username:username});
    const u_pass = await admin.findOne({password:password});
    
    if(user && u_pass){
        res.send('true');
    }
    else{
        res.send('false');
    }
})
app.post("/addcatagory", async (req, res) => {
    const { catagory,desc,img} = req.body;
    const data =new Vcatagory({
                catagory: catagory,desc:desc,img:img
            });
            const user = await Vcatagory.findOne({catagory:catagory});
            // const d = await Vcatagory.find();

            if(user){
                res.send('true');
            }
            else{
                await data.save();
                res.send('false');
            }
})
app.get("/addcatagory", async (req, res) => {
            const d = await Vcatagory.find();
            console.log(d)
            res.json(d);            
})


app.listen(port, () => {
    console.log("server start:5000");
});