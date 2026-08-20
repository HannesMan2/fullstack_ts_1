export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;

  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight range";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight range";
  } else if (bmi < 40) {
    return "Obese (Class 1&2) range";
  } else {
    return "Obese (Class 3) range";
  }
};

if (process.argv[1] === import.meta.filename) {
  const bmiArgs = process.argv.slice(2);

  const height = Number(bmiArgs[0]);

  const weight = Number(bmiArgs[1]);

  if (isNaN(height) || height <= 0) {
    console.log("Please give a valid height.");
  } else if (isNaN(weight) || weight <= 0) {
    console.log("Please give a valid weight.");
  } else {
    console.log(calculateBmi(height, weight));
  }
}