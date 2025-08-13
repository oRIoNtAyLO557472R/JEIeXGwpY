// 代码生成时间: 2025-08-14 00:00:19
 * Interactive Chart Generator
 * This program allows users to create and customize interactive charts.
 * It uses Node.js and a suitable charting library such as Chart.js or D3.js.
 */

// Import necessary modules
const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');
const inquirer = require('inquirer');
const Chart = require('chart.js');

// Initialize a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the Chart configuration and data
const chartConfig = {
  type: 'line',
  data: {
    labels: [], // Labels for the chart
    datasets: [] // Datasets for the chart
  },
  options: {} // Chart options
};

// Function to prompt user for chart data
function askForData() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'label',
      message: 'Enter a label for the chart (press enter to finish):',
      validate: (input) => { return input.length > 0; }
    },
    {
      type: 'input',
      name: 'value',
      message: 'Enter a value for the chart (press enter to finish):',
      validate: (input) => { return !isNaN(input) || input === ''; }
    }
  ]);
}

// Function to add data to the chart
function addDataToChart() {
  askForData()
    .then(answers => {
      if (answers.label) {
        chartConfig.data.labels.push(answers.label);
        chartConfig.data.datasets[0].data.push(Number(answers.value) || 0);
        // Ask for more data or finalize the chart
        return inquirer.prompt([
          {
            type: 'confirm',
            name: 'addMore',
            message: 'Would you like to add more data?',
            default: true
          }
        ]);
      }
    })
    .then(answers => {
      if (answers.addMore) {
        addDataToChart();
      } else {
        // Finalize chart configuration
        finalizeChart();
      }
    })
    .catch(error => {
      console.error(chalk.red('Error:', error));
    });
}

// Function to finalize chart configuration and generate the chart
function finalizeChart() {
  // You can add more chart configuration here as needed

  // Save the chart configuration to a file
  fs.writeFileSync('chartConfig.json', JSON.stringify(chartConfig, null, 2), 'utf8');

  // Inform the user that the chart configuration is saved
  console.log(chalk.green('Chart configuration saved to chartConfig.json'));

  // Close the readline interface
  rl.close();
}

// Start the chart generation process
addDataToChart();