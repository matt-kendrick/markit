const bookmarkModel = require('../models/bookmarkModel');

exports.create = async (req, res) => {
    
    try{
        const bookmark = await bookmarkModel.create(req.body);

        res.status(201).json({
            status: 'success',
            bookmark
        });
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}

exports.getAll = async (req, res) => {
    
    try{
        const bookmarks = await bookmarkModel.find({userCode:req.params.userCode});

        res.status(200).json({
            status: 'success',
            bookmarks
        });
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}

exports.get = async (req, res) => {
    
    try{
        const bookmark = await bookmarkModel.findById(req.params.id).find({userCode:req.params.userCode});

        if(bookmark.length != 0){
            res.status(200).json({
                status: 'success',
                bookmark
            });
        }
        else{
            res.status(400).json({
                status: 'fail',
                error: "Bookmark not found."
            });
        }
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}

exports.update = async (req, res) => {

    try{
        const bookmark = await bookmarkModel.findOneAndUpdate({'_id':req.params.id,'userCode':req.params.userCode},req.body,{new: true,runValidators: true});

        if(bookmark.length != 0){
            res.status(200).json({
                status: 'success',
                bookmark
            });
        }
        else{
            res.status(400).json({
                status: 'fail',
                error: "Bookmark not found."
            });
        }
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}

exports.delete = async (req, res) => {

    try{
        const bookmark = await bookmarkModel.findOneAndDelete({'_id':req.params.id,'userCode':req.params.userCode});

        if(bookmark.length != 0){
            res.status(200).json({
                status: 'success',
                bookmark: bookmark
            });
        }
        else{
            res.status(400).json({
                status: 'fail',
                error: "Bookmark not found."
            });
        }
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}

exports.getUserCategories = async (req, res) => {
    
    try{
        const bookmarks = await bookmarkModel.aggregate(
            [
                {
                    $match: {userCode: req.params.userCode}
                },
                {
                    $group: {
                        _id: '$category',
                        lastCreatedAt: {$max: '$createdAt'},
                        count: {$sum: 1}
                    }
                },
                {
                    $sort: {'_id':1}
                }
            ]
        );

        res.status(200).json({
            status: 'success',
            bookmarks
        });
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}