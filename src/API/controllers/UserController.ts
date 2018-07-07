import { BaseController } from '../../@core/base';
import UserModel from '../models/UserModel';
import * as Lodash from 'lodash';

class UserController extends BaseController {

	constructor() {
		super();
	}

	index() {
		return async (req, res) => {
			res.send(`Hi i'm a resource store ${JSON.stringify(req.body)}`);
		}
	}

	show() {
		return (req, res) => {
			res.send(`Hi i'm a resource show >> ${req.params.id}`);
		}
	}

	store() {
		return async (req, res) => {
			try {
				let newUser:any;
				let result:any;
				newUser = new UserModel({
					name: req.body.name,
					email: req.body.email
				});
				result = await newUser.save();
				result = newUser.get('_id');
				res.send({_id: result});
			} catch (error) {
				console.error(error);
				res.status(500).json(error);
			}
		}
	}

	update() {
		return async (req, res) => {
			let userFound = req.user;
			userFound.set('heroUrl', req.body.heroUrl);
			userFound.set('heroName', req.body.heroName);
			await userFound.save();
			res.send(userFound);
		}
	}


	destroy() {
		return (req, res) => {
			res.send(`Hi i'm a resource destroy >> ${JSON.stringify(req.params.id)}`);
		}
	}

}

export default UserController;