const express = require('express');
const router = express.Router()
const Task = require('./../models/Task');
const Card = require('./../models/Card');


// ----- CRUD TASKS ----- 
router.post('/', async (req, res) => {
    try {
        const {taskTitle, taskId, completed, parentId} = req.body;
        const newTask = await Task.create({
            taskId: taskId,
            taskTitle: taskTitle,
            completed: completed,
            parentId: parentId,
        });
        
        res.json(newTask);
    }
    catch (error) {
        console.error(error.message)
    }
});

// ALL
router.get('/:target', async (req, res) => {
    const {target} = req.params
    try {
        const allTasks = await Task.find({
            parentId: {
              $in: await Card.distinct('cardId', { 'user_id': target }),
            },
          }).sort({updatedAt: 1});
        
        res.json(allTasks);
    } 
    catch (error) {
        console.error(error.message)  
    }
});

// By ID
router.get("/:target", async (req, res) => {
    try {
        const { target } = req.params;
        const task = await Task.find({ taskId: target });
        
        res.json(task);
    } 
    catch (error) {
        console.error(error.message)  
    }
});

router.put("/:target", async (req, res) => {
    try {
        const {target} = req.params;
        const {taskTitle} = req.body;
        await Task.findOneAndUpdate({ taskId: target }, { taskTitle: taskTitle });
        
        res.json("Todo updated")
    }
    catch (error) {
        console.error(error);    
    }
});

router.put("/completed/:target", async (req, res) => {
    try {
        const {target} = req.params;
        const {completed} = req.body;
        await Task.findOneAndUpdate({ taskId: target }, { $set: { completed: completed }  });

        res.json("Todo updated")
    }
    catch (error) {
        console.error(error);    
    }
});

router.delete("/:target", async (req, res) => {
    try {
        const {target} = req.params;
        await Task.deleteOne({ taskId: target });

        res.json("Todo deleted");
    }
    catch (error) {
        console.error(error);    
    }
});

module.exports = router
 