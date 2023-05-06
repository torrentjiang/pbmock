/**
 * @description async debounce
 * @example
 * const debounced = debounceRequest(() => Promise.resolve().then(() => console.log(1)));
 * debounced(); // log 1
 * debounced(); // no log
 */
export const debounceRequest = <T extends Array<any>, U = any>(fn: (...data: T) => Promise<U>) => {
    let isPedding = false;
    let lastPromise!: Promise<U>;
    return function(this: any, ...data: T): Promise<U> {
        if (isPedding) return lastPromise;
        isPedding = true;
        lastPromise = fn.call(this, ...data);
        const done = (res: U) => {
            isPedding = false;
            return res;
        }
        return lastPromise.then(done, done);
    };
};