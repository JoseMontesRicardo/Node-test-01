
import { BaseRoute } from '../../@core/base';
import UserMiddleware from '../middlewares/UserMiddleware';

class UserRoute extends BaseRoute {
	/**
	  * construct for TestRoute
	  *
	  * @param {json} router instance of ExpressJS router
	  */
	constructor(router) {
		super(router);
	}

	/**
	* main method, init all routes for userRoute here!
	*/
	routesInit() {
		this.post(
			'/user', // route
			'UserController->store', // controller actions
			// middlewares
			[
				UserMiddleware.createParams
			]
		);

		this.put(
			'/user/:id', // route
			'UserController->update', // controller actions
			// middlewares
			[
				UserMiddleware.validateId,
				UserMiddleware.validateUser,
				UserMiddleware.updateParams
			]
		);
	}
}

export default UserRoute;