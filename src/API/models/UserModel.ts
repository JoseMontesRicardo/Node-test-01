import {Database, Model} from 'mongorito';


class UserModel extends Model {
    // constructor(a){
    //     super();
    // }

    // static findOne(o){}
}

global.Connections.connectionsStarted[0].connection.register(UserModel);
//     constructor() {
//         super();
//         this.db = global.Connections.connectionsStarted[0].connection;
//         db.register(User);
//     }


// }

export default UserModel;   