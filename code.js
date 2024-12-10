const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function merge(left, right) {
    const merged = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            merged.push(left[i]);
            i++;
        } else {
            merged.push(right[j]);
            j++;
        }
    }
    return merged.concat(left.slice(i)).concat(right.slice(j));
}

function mergeSort(data) {
    if (data.length <= 1) {
        return data;
    }
    const mid = Math.floor(data.length / 2);
    const left = data.slice(0, mid);
    const right = data.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}
if (isMainThread) {
    async function parallelMergeSort(data) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, { workerData: data });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }

    async function sort(data) {
        if (data.length <= 1) {
            return data;
        }
        const mid = Math.floor(data.length / 2);
        const left = data.slice(0, mid);
        const right = data.slice(mid);
        const [leftSorted, rightSorted] = await Promise.all([
            parallelMergeSort(left),
            parallelMergeSort(right),
        ]);
        return merge(leftSorted, rightSorted);
    }
    module.exports = { merge, mergeSort, sort };
} else {
    const sorted = mergeSort(workerData);
    parentPort.postMessage(sorted);
}
