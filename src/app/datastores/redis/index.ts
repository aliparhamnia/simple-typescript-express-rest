import * as redis from 'redis';

export class RedisClient {
    client: redis.RedisClient

    constructor() {
        this.init();
    }
    init() {
        this.client = redis.createClient({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASS
        });
        this.client.on("error", function (err) {
            console.log("Error " + err);
        });
    }
}

const redisClient = new RedisClient();
redisClient.init();

export default redisClient.client;