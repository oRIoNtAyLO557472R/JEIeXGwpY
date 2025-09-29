// 代码生成时间: 2025-09-29 16:21:36
// A simple binary search function to find an element in a sorted array.
// @param {number[]} arr - The sorted array to search in.
// @param {number} target - The element to search for.
// @return {number} The index of the target if found, otherwise -1.
function binarySearch(arr, target) {
    // Check if the array is empty or not
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('Array must not be empty and must be an array of numbers.');
    }

    // Validate if all elements in the array are numbers
    if (!arr.every(Number.isFinite)) {
        throw new Error('All elements in the array must be numbers.');
    }

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const midValue = arr[mid];

        if (midValue === target) {
            // Target found
            return mid;
        } else if (midValue < target) {
            // Search the right half
            left = mid + 1;
        } else {
            // Search the left half
            right = mid - 1;
        }
    }

    // Target not found
    return -1;
}

// A function to optimize the search by sorting the array if not already sorted.
// @param {number[]} arr - The array to be sorted and searched.
// @param {number} target - The element to search for.
// @return {number} The index of the target if found, otherwise -1.
function optimizedSearch(arr, target) {
    // Check if the array is sorted, if not, sort it
    if (!isSorted(arr)) {
        arr.sort((a, b) => a - b);
    }

    // Perform the binary search
    return binarySearch(arr, target);
}

// Helper function to check if an array is sorted in ascending order.
// @param {number[]} arr - The array to check.
// @return {boolean} True if the array is sorted, false otherwise.
function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

// Example usage:
const searchResults = optimizedSearch([1, 3, 4, 6, 8, 9, 11], 6);
console.log(`Target found at index: ${searchResults}`);

// Error handling example:
try {
    const errorResult = optimizedSearch([1, 3, 4, 'x', 8, 9, 11], 6);
    console.log(`Target found at index: ${errorResult}`);
} catch (error) {
    console.error(error.message);
}
