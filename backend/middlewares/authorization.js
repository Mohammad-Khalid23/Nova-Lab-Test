// const Session = require('../models/session');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try {
        if (req.headers) {
            let access_token = req.headers.authorization;
            if (access_token) {
                let userFound = await User.findOne({ access_token: access_token });
                if (userFound) {
                    req.user = userFound;
                    next();
                } else {
                    throw { message: 'unAuthorize', code: 401 }
                }

            } else {
                throw { message: 'unAuthorize', code: 401 }
            }
        } else {
            throw { message: 'unAuthorize', code: 401 }
        }
    } catch (error) {
        res.status(error.code).json({
            message: error.message
        })
    }
}

module.exports ={
    authenticate
}

// exports.authenticate = (req, res, next) => {
//     console.log(req,"Check Authorized")
//     if (req && req.headers) {
//         let header = req.headers;
//         if (header.authorization) {
//             let token = header.authorization;
//             Session.findOne({ access_token: token }).populate("user_id").then(result => {
//                 console.log(result,"response of session checking")
//                if(result){
//                    req.user = result._doc.user_id;
//                    next()
//                } else {
//                    res.status(401).json({
//                        message: "Unauthorize User"
//                    })
//                }
//             }).catch(err => {
//                     res.status(401).json({
//                         error: err,
//                         message:"Unauthorizes"
//                     })
//                 })
//         } else {
//             res.status(401).json({
//                 message: "Unauthorizes"
//             })
//         }
//     }else{
//         console.log("nosd")
//     }
// }
