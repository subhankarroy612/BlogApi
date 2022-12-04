const { Schema, model } = require('mongoose');

const commSchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    blogId:{
        type: Schema.Types.ObjectId,
        ref: 'blogs',
        required: true
    }

})

const commModel = model('comments', commSchema);

module.exports = commModel;