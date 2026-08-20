import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(height) ||
    isNaN(weight)
  ) {
    res.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  if (
    body.daily_exercises === undefined ||
    body.target === undefined
  ) {
    res.status(400).json({
      error: "parameters missing"
    });
    return;
  }

  const dailyExercises = body.daily_exercises;
  const target = Number(body.target);

  if (
    !Array.isArray(dailyExercises) ||
    isNaN(target) ||
    dailyExercises.some(
      (exercise: unknown) => typeof exercise !== "number"
    )
  ) {
    res.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  res.json(calculateExercises(dailyExercises, target));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
