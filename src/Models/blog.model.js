const { Schema, model } = require('mongoose');

const blogSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }

})

const blogModel = model('blogs', blogSchema);

module.exports = blogModel;