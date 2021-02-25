interface CounterOptions {
    ttl?: number;
}

export class Counter {
    private options: CounterOptions;

    constructor(options?: CounterOptions) {
        this.options = options || {};
    }
    private count = 0;
    private ttlStarted = false;

    private incrCount = () => this.count++;
    private decrCount = () => this.count--;

    private startTtl = () => {
        if (this.options.ttl && !this.ttlStarted) {
            this.ttlStarted = true;
            setTimeout(() => {
                this.count = 0;
                this.ttlStarted = false;
            }, this.options.ttl);
        }
    };

    public getCount = () => this.count;

    public incr = () => {
        !this.ttlStarted && this.startTtl();
        this.incrCount();
    };

    public decr = () => {
        this.decrCount();
    };
}
