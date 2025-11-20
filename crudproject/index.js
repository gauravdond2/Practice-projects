import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import chat from './models/chat.js';
import user from './models/user.js';
import { fileURLToPath } from 'url';
import methodoverride from 'method-override';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set ('view engine', 'ejs');
const __filename =fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodoverride('_method'));

const uri = process.env.MONGO_URI;

async function startApp() {
    await mongoose.connect(uri).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    }); 
}

app.get('/createuser', async (req, res) => {
    let user1 = new user({
        name : 'John Doe',
        email : 'john@gmail.com',
        password: "12345"
    });
    await user1.save();
    console.log('User saved');      
});


app.get('/new-chat', async (req, res) => {
    let chat1 = new chat({
        from : 'jaan',
        to : 'Bob',
        message: "Hello",   
        created_at : new Date()
    });
    await chat1.save().then(() => {
        console.log('Chat message saved');
    }).catch(err => {
        console.error('Error saving chat message:', err);
    });
});

app.get('/chats', async (req, res) => {
    let chats = await chat.find();
    res.render('index', {chats});
});

app.get('/chats/:id/edit', async (req, res) => {
    let chatToEdit = await chat.findById(req.params.id);
    res.render('edit', { chatToEdit});
});


app.get("/", (req, res) => {
    res.send("working");
});

app.put('/chats/:id', async (req, res) => {
    let {id} = req.params;
    let {message:newmsg} = req.body;
    let updatedchat = await chat.findByIdAndUpdate(id,{message : newmsg},{runValidators:true, new:true});
    console.log(updatedchat);
    res.redirect('/chats');
});

app.delete('/chats/:id/delete', async (req, res) => {
    let id = req.params.id;
    let deletedchat = await chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect('/chats');
});


app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
startApp();
