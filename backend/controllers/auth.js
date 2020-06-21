const User = require('../models/user');
const {  generateToken,hashPassword,comparePassword } = require('../helpers/helper');



module.exports.signup = async (req, res) => {
    try {
        let requestData = req.body;
        let userFound = await User.findOne({ email: requestData.email })
        if (userFound) {
            throw { message: "Email Already Exist", code: 400 }

        } else {
            let _hashPassword = hashPassword(requestData.password);
            let accessToken = await generateToken();
            let data = {
                email: requestData.email.toLowerCase(),
                firstName: requestData.firstName,
                lastName: requestData.lastName,
                role: requestData.role,
                password:_hashPassword,
                access_token: accessToken
            }
            let user = await new User(data).save();
            console.log(user);
            user.password = null;
            res.status(200).json({
                message: 'Signup Successfully',
                data: user
            })
        }
    } catch (error) {
        res.status(error.code || 400).json({
            message: error.message,
            success: false
        })
    }
}


module.exports.login = async (req, res) => {
    try {
        let requestData = req.body;
        let userFound = await User.findOne({ email: requestData.email.toLowerCase() ,role: requestData.role })
        if (!userFound) {
            throw { message: "Invalid Email", code: 400 }
        } else {
            let comparePwd = await comparePassword(requestData.password,userFound.password);
            if(comparePwd){
                let accessToken = await generateToken();
                let user = await User.findOneAndUpdate({ email: requestData.email }, { access_token: accessToken }, { new: true })
                console.log(user);
                user.password = null;
                res.status(200).json({
                    message: 'Signup Successfully',
                    data: user
                })
            }else{
                throw { message: "Invalid Password", code: 400 }
            }
        }
    } catch (error) {
        res.status(error.code||400).json({
            message: error.message,
            success: false
        })
    }
}

module.exports.checkSession = async (req, res, next) => {
    try {
        if (req.headers) {
            let access_token = req.headers.authorization;
            if (access_token) {
                let userFound = await User.findOne({ access_token: access_token },{password:0});
                if (userFound) {
                    res.status(200).json({
                        message:'Get user Profile',
                        data:userFound
                    })
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
        res.status(error.code || 401).json({
            message: error.message
        })
    }
}