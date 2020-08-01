const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
{
    'userCode':{
        type: String,
        required: [true, 'Bookmarks must be associated with a user code.']
    },
    'title':{
        type: String,
        required: [true, 'Bookmarks must have a title/description.']
    },
    'url':{
        type: String,
        required: [true, 'Bookmarks must have a url.'],
        validate: {
            validator: function(val){
                return val.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
            },
            message: 'Invalid url.'
        }
    },
    'category':{
        type: String,
        default: 'Uncategorized'
    },
    'createdAt':{
        type: Date,
        default: Date.now()
    }
});

const Bookmark = mongoose.model('Bookmark',bookmarkSchema);

module.exports = Bookmark;