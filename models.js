import mongoose from 'mongoose';

let models = {};

console.log("Connecting to mongodb");

await mongoose.connect("mongodb+srv://ydodo:mDB-info441@ydcluster.qe5g6ov.mongodb.net/websharer");

console.log("Successfully connected to MongoDB");

const postSchema = new mongoose.Schema({
    url: String,
    description: String,
    created_date: Date,
    username: String
});

models.Post = mongoose.model('Post', postSchema);
console.log('mongoose models created');

export default models;