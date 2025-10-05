const taskSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    published_year: Number, 
    price: Number,
    in_stock: Boolean,
    pages: Number, 
    publisher: String,
}, { timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task }