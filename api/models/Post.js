const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        unique:true
    }, 
    desc: {
        type:String,
        required:true,
    },
    photo: {
        type:String,
        required:false,
    },
    username: {
        type:String,
        required:true,
    
    },
    profilePic: {
        type:String,
        required:false,
    },
    categories: {
        type:Array,
        required:false,
    },
    popular: {
        type: Boolean,
        required:false,
    },
    header : {
        type: Boolean,
        required:false,
    },
    headerType: {
        type: String,
        required:false,
    }
   
}, 
{ timestamps: true}
);


module.exports = mongoose.model('Post', PostSchema);