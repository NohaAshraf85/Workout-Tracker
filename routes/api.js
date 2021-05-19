const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

//   router.put("/api/workouts", ({ body }, res) => {
//     Workout.create(body)
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.status(400).json(err);
//       });
//   });

  router.put('/api/workouts/:id', async (req, res) => {

    console.log("From Put:"+req.params.id);

    Workout.updateOne(
        { _id: req.params.id },
        { $push: { exercises: req.body } },
        (error, edited) => {
          if (error) {
            console.log(error);
            res.send(error);
          } else {
            console.log(edited);
            res.send(edited);
          }
        }
      )

    
   
  });

  router.get("/api/workouts", (req, res) => {
    Workout.find({})
      .sort({ date: -1 })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
  router.get("/api/workouts/range", (req, res) => {

    Workout.aggregate([
        { $addFields: {
          totalDuration: {
            $sum: "$exercises.duration"
          }
        }}
      ]).sort( {
        _id: -1
      })
        .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.status(400).json(err);
          });
});

  router.get('/api/workouts/:id', async (req, res) => {
    // find one category by its `id` value
    Workout.findById(req.params.id).then(function(workoutData) {
        res.json(workoutData);
      });
  });

 
  module.exports = router;
