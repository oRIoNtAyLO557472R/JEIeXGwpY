// 代码生成时间: 2025-10-14 03:33:17
// Function to deduplicate and merge two arrays
function deduplicateAndMerge(array1, array2) {
  // Check if inputs are arrays
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new Error('Both arguments must be arrays.');
  }

  // Combine the arrays
  const combinedArray = [...array1, ...array2];

  // Remove duplicates by converting to Set and back to an array
  const uniqueArray = [...new Set(combinedArray)];

  return uniqueArray;
}

// Example usage:
try {
  const array1 = [1, 2, 3, 4];
  const array2 = [3, 4, 5, 6];
  const mergedArray = deduplicateAndMerge(array1, array2);
  console.log('Merged and De-duplicated Array:', mergedArray);
} catch (error) {
  console.error('Error:', error.message);
}