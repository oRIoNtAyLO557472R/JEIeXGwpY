// 代码生成时间: 2025-07-31 23:35:00
// Importing necessary modules
const util = require('util');

/**
 * Performs a bubble sort on an array of numbers.
 * @param {number[]} array - The array to be sorted.
 * @returns {number[]} - The sorted array.
 */
function bubbleSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array.');
  }
  if (array.some(isNaN)) {
    throw new Error('Array can only contain numbers.');
  }

  let len = array.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

/**
 * Performs a quick sort on an array of numbers.
 * @param {number[]} array - The array to be sorted.
 * @returns {number[]} - The sorted array.
 */
function quickSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array.');
  }
  if (array.some(isNaN)) {
    throw new Error('Array can only contain numbers.');
  }

  if (array.length < 2) {
    return array;
  }
  let pivot = array[array.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Exporting the sorting functions for use
module.exports = {
  bubbleSort,
  quickSort,
};