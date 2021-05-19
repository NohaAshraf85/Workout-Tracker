const router = require("express").Router();
const Transaction = require("../models");

router.post("/api/workout", ({ body }, res) => {
    Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  router.post("/api/workout/bulk", ({ body }, res) => {
    Transaction.insertMany(body)
      .then(dbTransaction => {
        res.json(dbTransaction);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });