const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const Task = require("../models/Task");


router.get("/test", auth, (req, res) => {
  res.json({
    message:"Task routes are working!",
    user: req.user});
});

//CRUD tasks

router.post('/add/task', auth, async (req, res) => {
    try{
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save();
        res.status(201).json({task, message: "Task Created Successfully"})
    }catch(err){
        res.status(400).send({error: err})
    }
})

router.get('/user/tasks', auth, async (req,res) => {
    try{
        const tasks = await Task.find({
            owner: req.user._id
        })
        res.status(200).json({tasks, count: tasks.length, message: "Tasks Fetched Successfully"})
    }catch(err){
        res.status(500).send({error:error.message})
    }
})

router.get('/:id', auth, async (req, res) =>{
    const taskid = req.params.id;

    try{
        const task = await Task.findOne({
            _id: taskid,
            owner: req.user._id
        });
        if(!task) {
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({task, message: "Task Fetched Successfully"})
    }catch(err){
        res.status(500).send({error: error.message})
    }
})

router.put('/:id', auth, async (req, res) =>{
    const taskid = req.params.id;
    const updates = Object.keys(req.body);

    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({error: 'Invalid Updates'})
    }
    try{
        const task = await Task.findOne({
            _id: taskid,
            owner: req.user._id
        });
        if(!task) {
            return res.status(404).json({message: "Task not found"});
        }
        updates.forEach(update => task[update] = req.body[update])
        await task.save();
        res.status(200).json({task, message: "Task Updated Successfully"})
    }catch(err){
        res.status(500).send({error: error.message})
    }
})

router.put(':/id/finish', async (req, res)=> {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndUpdate(taskId,
            {completed: true},
            {new: true}
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task completed', task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', auth, async (req, res) =>{
    const taskid = req.params.id;

    try{
        const task = await Task.findByIdAndDelete({
            _id: taskid,
            owner: req.user._id
        });
        if(!task) {
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({message: "Task Deleted Successfully"})
    }catch(err){
        res.status(500).send({error: error.message})
    }
})

module.exports = router;
