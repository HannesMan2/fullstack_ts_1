interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyExerciseHours.length;

  const trainingDays = dailyExerciseHours.filter(
    (hours) => hours > 0
  ).length;

  const total = dailyExerciseHours.reduce(
    (sum, hours) => sum + hours,
    0
  );

  const average = total / periodLength;

  const success = average >= target;

  let rating = 1;
  let ratingDescription = "bad";

  if (average >= target) {
    rating = 3;
    ratingDescription = "good";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (process.argv[1] === import.meta.filename) {
  const exerciseArgs = process.argv.slice(2);

  const target = Number(exerciseArgs[0]);
  const dailyExerciseHours = exerciseArgs.slice(1).map(Number);

  if (isNaN(target) || target <= 0) {
    console.log("Please give a valid target.");
  } else if (dailyExerciseHours.length === 0) {
    console.log("Please give at least one exercise hour.");
  } else if (
    dailyExerciseHours.some(
      (hours) => isNaN(hours) || hours < 0
    )
  ) {
    console.log("Please give valid exercise hours.");
  } else {
    console.log(calculateExercises(dailyExerciseHours, target));
  }
}