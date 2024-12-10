const { sort } = require('./code');

async function runTests() {
    const data = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
    console.log('Original:', data);

    const sortedData = await sort(data);
    console.log('Sorted:', sortedData);

    const expected = [...data].sort((a, b) => a - b);
    console.assert(
        JSON.stringify(sortedData) === JSON.stringify(expected),
        'Test failed: Sorting does not match expected result'
    );

    if (JSON.stringify(sortedData) === JSON.stringify(expected)) {
        console.log('Test passed!');
    } else {
        console.error('Test failed!');
    }
}

runTests().catch(console.error);
