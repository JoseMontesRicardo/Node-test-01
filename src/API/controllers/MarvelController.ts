import { BaseController } from '../../@core/base';
import UserModel from '../models/UserModel';
import * as Request from 'request';
import * as Md5 from 'md5';
import * as Lodash from 'lodash';

class MarvelController extends BaseController {

	constructor() {
		super();
	}

	// get heros from marvel's API
	index() {
		return async (req, res) => {
			try {
				let response : any;
				let ts = new Date().getTime();
				let privateKey = global.marvelKeys.privatekey;
				let publicKey = global.marvelKeys.publickey;
				let hash = Md5(`${ts}${privateKey}${publicKey}`).toString();
				response = await this.triggerEvent({
					// will be ignored
					method: 'GET',
					uri: `http://gateway.marvel.com:80/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${ts}`,
				})
				response = JSON.parse(response.body);
				// response = Lodash.filter(response.data.results, (o) => { return o.description !== '' });
				response = response.data.results;
				for (let index = 0; index < response.length; index++) {
					response[index].thumbnail.path = response[index].thumbnail.path + '/standard_xlarge.jpg';
				}
				res.send(response);
			} catch (error) {
				console.error(error);
				res.status(500).json(error);
			}
		}
	}

	triggerEvent(jsonParams) {
		return new Promise(async (resolve, reject) => {
			try {
				Request(jsonParams, (err, response, body) => {
					if (err) return reject(err);
					if (response.statusCode !== 200 && response.statusCode !== 304) return reject({ status: response.statusCode, body });
					return resolve({ status: response.statusCode, body });
				})
			} catch (error) {
				console.error(error);
				return reject(error);
			}
		})
	}

	show() {
		return (req, res) => {
			res.send(`Hi i'm a resource show >> ${req.params.id}`);
		}
	}

	store() {
		return (req, res) => {
			res.send(`Hi i'm a resource store ${JSON.stringify(req.body)}`);
		}
	}

	update() {
		return (req, res) => {
			res.send(`Hi i'm a resource update >> ${JSON.stringify(req.params.id)} ${JSON.stringify(req.body)}`);
		}
	}


	destroy() {
		return (req, res) => {
			res.send(`Hi i'm a resource destroy >> ${JSON.stringify(req.params.id)}`);
		}
	}

}

export default MarvelController;