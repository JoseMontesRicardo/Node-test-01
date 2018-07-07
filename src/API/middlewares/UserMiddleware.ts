import * as joi from 'joi';
import * as validate from 'express-validation';
import * as joiObjectId from 'joi-objectid';
import UserModel from '../models/UserModel';
import { ObjectId } from 'mongorito';

joi.objectId = joiObjectId(joi)

class UserMiddleware {

    static createParams(req, res, next) {
        return validate({
            body: {
                name: joi.string().max(45).required(),
                email: joi.string().email().required()
            }
        })(req, res, next)
    }

    static updateParams(req, res, next) {
        return validate({
            body: {
                heroUrl: joi.string().required(),
                heroName: joi.string().max(50).required()
            }
        })(req, res, next)
    }

    static validateId(req, res, next) {
        return validate({
            params: {
                id: joi.objectId().required()
            }
        })(req, res, next)
    }

    static async validateUser(req, res, next) {
        let userFound;
        userFound = await UserModel.findOne({ _id: ObjectId(req.params.id) });
        if (!userFound) {
            console.error('user does not exist!');
            return res.status(404).json({message: 'user does not exist!'});
        }
        req.user = userFound;
        next();
    }
}

export default UserMiddleware;