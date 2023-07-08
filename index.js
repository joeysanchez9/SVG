import inquirer from 'inquirer';
import fs from 'fs';

// Define the prompts for user input
const prompts = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters:',
    validate: (input) => input.length <= 3,
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color:',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['circle', 'triangle', 'square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color:',
  },
];

// Generate the SVG code based on user input
function generateSVG(text, textColor, shape, shapeColor) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      <rect width="100%" height="100%" fill="${shapeColor}" />${shape}
      <text x="50%" y="50%" fill="${textColor}" font-size="48px" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `;
}

// Write the SVG file and display the output
function writeSVGFile(fileName, content) {
  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.error('Error creating the SVG file:', err);
    } else {
      console.log('Generated logo.svg');
    }
  });
}

// Main function to run the application
function runApplication() {
  inquirer.prompt(prompts).then((answers) => {
    const { text, textColor, shape, shapeColor } = answers;
    const svgContent = generateSVG(text, textColor, shape, shapeColor);
    const fileName = 'logo.svg';
    writeSVGFile(fileName, svgContent);
  });
}

// Run the application
runApplication();
