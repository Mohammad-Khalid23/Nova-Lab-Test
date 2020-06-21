const User = require('../models/user');



module.exports.getUserDetail = (req, res, next) => {
    console.log(req.params.id, "Id");
    User.findById({ _id: req.params.id }, { password: 0 }).then(result => {
        if (result) {
            res.status(200).json({
                message: 'Get User Successfully',
                data: result
            })
        } else {
            res.status(404).json({
                message: "No Such user Found",
                data: result ,
                success : true
            })
        }

    })
        .catch(err => {
            res.status(404).json({
                message: "No Such user Found",
                erro: err ,
                success : false
            })
        })
}


module.exports.updateUserDetail = (req, res, next) => {
    console.log(req.params.id, "Id");
    User.findByIdAndUpdate({ _id: req.params.id },req.body,{ new : true}).then(result => {
        if (result) {
            result.password = null ;
            res.status(200).json({
                message: 'Update User Successfully',
                data: result,
                success: true
            })
        } else {
            res.status(404).json({
                message: "No Such user Found",
                data: result,
                success: false
            })
        }

    })
        .catch(err => {
            res.status(404).json({
                message: "No Such user Found",
                erro: err
            })
        })
}
