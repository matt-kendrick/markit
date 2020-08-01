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
        const bookmarks = await bookmarkModel.find();

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
        const bookmark = await bookmarkModel.findById(req.params.id);

        res.status(200).json({
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

exports.update = async (req, res) => {

    try{
        const bookmark = await bookmarkModel.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true});

        res.status(200).json({
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

exports.delete = async (req, res) => {

    try{
        const bookmark = await bookmarkModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            bookmark: null
        });
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
                        _id: "$category",
                        lastCreatedAt: {$max: "$createdAt"},
                        count: {$sum: 1}
                    }
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