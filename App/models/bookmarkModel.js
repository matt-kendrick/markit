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
        required: [true, 'Bookmarks must have a url.']
    },
    'category':{
        type: String,
        default: 'Uncategorized'
    }
});

const Bookmark = mongoose.model('Bookmark',bookmarkSchema);

module.exports = Bookmark;