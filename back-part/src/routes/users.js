const express = require('express');
const usersOriginal = require('../data/users');
const { check, validationResult } = require('express-validator/check');

module.exports = app => {
  let usersCopy = [ ...usersOriginal ];
  let userCount = usersCopy.length;

  const router = express.Router();
  router.delete('/food',[check('id').exists()], (req, res) => {
    try {
      validationResult(req).throw();
      const id = req.body.id
      const userIndex = usersCopy.findIndex((item) => item.id === id);
      usersCopy.splice(userIndex, 1);
      res.send({
        success: true,
        id
      })
    } catch (err) {
      res.status(422).send(err.toString());
    }
  });

  router.get('/foods', (req, res) => {
    const sorted = usersCopy.sort((a, b) => a.id - b.id);

    var reduceSorted = [...usersCopy]
    reduceSorted.forEach((item, index, array) => {
        var newMegoHerouFood = reduceSorted.filter((megoItem)=> (
            item.hero_name === megoItem.hero_name &&
            item.first_name === megoItem.first_name &&
            item.last_name === megoItem.last_name &&
            item.id !== megoItem.id
        ))

        if (newMegoHerouFood.length) {
            newMegoHerouFood.push(item)
            reduceSorted.push({
                hero_name: item.hero_name,
                first_name: item.first_name,
                last_name: item.last_name,
                favorite_food: newMegoHerouFood.map((item)=>({id: item.id, food: item.favorite_food}))
            })

            newMegoHerouFood.forEach((item) => {
                reduceSorted.splice(reduceSorted.findIndex((reduceSortedItem)=>item.id === reduceSortedItem.id), 1);
            })
        }
    })

    res.send(reduceSorted);
  });

  router.post('/food', [
    check('hero_name').exists(),
    check('first_name').exists(),
    check('last_name').exists()
  ],(req, res) => {
    try {
      validationResult(req).throw();
      userCount += 1;
      usersCopy.push({
        id: userCount,
        ...req.body
      })
      res.json({
        success: userCount
      })
    } catch (err) {
      res.status(422).send(err.toString());
    }
  });

  app.use('/users', router);
}
