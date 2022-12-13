// const express = require("express");
// const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
// const app = express();

// app.set('view engine', 'ejs');

// let items = [];
// let workItems = [];

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));

// app.get("/",function(req,res){
//     let day = date();
//     res.render("list",{listTitle: day,newListItems: items})
    
// })


// app.post("/",function(req,res){
//     let item = req.body.newItem;
//     if (req.body.list === "Work") {
//         workItems.push(item);
//         res.redirect("/work");
//     }
//     else{
//         items.push(item);
//         res.redirect("/");

//     }

// })

// app.get("/work",function(req,res){
//     res.render("list",{listTitle:"Work List",newListItems:workItems})
// })

// app.post("/work",function(req,res){
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// })




// app.listen(3000,(req,res) => {
//     console.log("port started on 3000");
// })

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser:true});

const itemsSchema = new mongoose.Schema({
    name:String
});

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item({
    name: "Apple"
});

const item2 = new Item({
    name: "Banana"
});

const item3 = new Item({
    name: "Car"
});



const defaultItems = [item1,item2,item3];



//DELETION
// Item.deleteOne({
//     name:"Welcome to our ToDolist"
// },function(err) {
//     if (err) {
//         console.log(err);
//     }
//     else{
//         console.log("deleted item1");
//     }
// })



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    let day = date();
    Item.find({},function(err,foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err){
                if (err) {
                    console.log(err);
                }else{
                    console.log("success added to database");
                }
            });
            res.redirect("/");
        }else{
            res.render("list",{listTitle: day,newListItems: foundItems});
        }
    });
    
})


app.post("/",function(req,res){
    const itemName = req.body.newItem;
    
    const item  = new Item({
        name:itemName
    });
    item.save(); 
    res.redirect("/");

})


app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId,function(err){
        if (!err) {
            console.log("successfully deleted");
            res.redirect("/");
        }
    });
});


app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newListItems:workItems})
})

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})





app.listen(3000,(req,res) => {
    console.log("port started on 3000");
})