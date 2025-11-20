import mongoose  from "mongoose";
import chat from "./models/chat.js";
import dotenv from 'dotenv';
dotenv.config();

const uri= process.env.MONGO_URI;

async function startApp() {
    await mongoose.connect(uri).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    }); 
}
startApp();

let allchats = [
     {
        from: "Alice",
        to: "Bob",
        msg: "Hey Bob, how are you?",
        created_at: new Date()
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "I'm good, thanks! How about you?",
        created_at: new Date()
    },
    {
        from: "Charlie",
        to: "David",
        msg: "Did you finish the report?",
        created_at: new Date()
    },
    {
        from: "David",
        to: "Charlie",
        msg: "Almost, just need to add the conclusion.",
        created_at: new Date()
    },
    {
        from: "Eve",
        to: "Frank",
        msg: "Let's meet for coffee tomorrow.",
        created_at: new Date()
    },
    {
        from: "Frank",
        to: "Eve",
        msg: "Sounds good! What time?",
        created_at: new Date()
    }
];
chat.insertMany(allchats).then(() => {
    console.log('Chats inserted successfully');
}).catch(err => {
    console.error('Error inserting chats:', err);
});