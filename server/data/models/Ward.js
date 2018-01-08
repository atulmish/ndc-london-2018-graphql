import db from '../db';

export default class Ward {
    constructor(props) {
        this.wardId = props.wardId;
        this.name = props.name;
        this.code = props.code;
    }

    static getByCode(id) {
        return db.getWard(id);
    }
}
