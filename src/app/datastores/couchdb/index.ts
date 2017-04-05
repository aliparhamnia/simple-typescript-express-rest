import * as nano from 'nano';

export class CouchdbClient {
    public client:any;
    private readHandler:any;
    private writeHandler:any;
    constructor() {
        this.init();
    }
    public read(dbName:string) {
        if(typeof(dbName)=='undefined') return this.readHandler.db;
        return this.readHandler.use(dbName);
    }
    public write(dbName:string) {
        if(typeof(dbName)=='undefined') return this.writeHandler.db;
        return this.writeHandler.use(dbName);
    }
    init() {
        this.readHandler = nano(process.env.COUCHDB_READ_URL);
        this.writeHandler = nano(process.env.COUCHDB_WRITE_URL);
    }
}

const couchdbClient = new CouchdbClient();
// couchdbClient.init();

export default couchdbClient;