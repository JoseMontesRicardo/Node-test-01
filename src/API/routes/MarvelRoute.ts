
import { BaseRoute } from '../../@core/base'
class MarvelRoute extends BaseRoute {
	/**
	  * construct for TestRoute
	  *
	  * @param {json} router instance of ExpressJS router
	  */
	constructor(router) {
		super(router);
	}

	/**
	* main method, init all routes for TestRoute here!
	*/
	routesInit() {
		this.get('/marvel/heros', 'MarvelController->index');
	}
}

export default MarvelRoute;