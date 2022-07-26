export function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * max + min);
}

export function randFloat(min: number, max: number): number {
    return Math.random() * max + min;
}

export function range(start: number, end: number): number[] {
    let newRange = [];
    for (let i = start; i <= end; i++) {
        newRange.push(i);
    }
    return newRange;
}

export function sleep(ms: number): any {
    return new Promise((resolve: Function) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export function chunkEvery(array: any[], size: number): any[][] {
    let chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
