const express = require('express');
const router = express.Router()
const Card = require('./../models/Card');
const Task = require('./../models/Task');


// ----- CRUD CARDS ----- 
router.post('/', async (req, res) => {
    try {
        const {cardTitle, cardId, user_id} = req.body;
        const newCard = await Card.create({ cardId, cardTitle, user_id });

        res.json(newCard);
    }
    catch (error) {
      console.error(error.message)
    }
});

// All
router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const allCards = await Card.find({user_id}).sort({ updatedAt: 1 });

        res.json(allCards);
    } 
    catch (error) {
      console.error(error.message)  
    }
});


// By ID
router.get("/:target", async (req, res) => {
    try {
        const { target } = req.params;
        const card = await Card.find({ cardId: target });

        res.json(card);
    } 
    catch (error) {
      console.error(error.message)  
    }
});

router.put("/:target", async (req, res) => {
    try {
        const {target} = req.params;
        const {cardTitle} = req.body;
        await Card.findOneAndUpdate({ cardId: target }, { cardTitle: cardTitle });

        res.json("Card updated");
    }
    catch (error) {
        console.error(error);    
    }
});

router.delete("/:target", async (req, res) => {
    try {
        const {target} = req.params;
        await Card.deleteOne({ cardId: target });
        await Task.deleteMany({ parentId: target });

        res.json("Card deleted");
    }
    catch (error) {
        console.error(error);    
    }

});

module.exports = router
