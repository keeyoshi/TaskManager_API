const express = require('express');
const Task = require('../models/tasks');

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Task.find({})
            .then((tasks) => {
                res.json(tasks);
            }).catch((err) => next(err));
    })
    .post((req, res, next) => {
        Task.create(req.body)
            .then((task) => {
                res.statusCode = 201;
                res.json(task);
            }).catch(next);
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .delete((req, res, next) => {
        Task.deleteMany({})
            .then((reply) => {
                res.json(reply);
            }).catch(next);
    });

router.route('/:id')
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                if (task == null) throw new Error("Task not found!")
                res.json(task);
            }).catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .put((req, res, next) => { 
        Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((reply) => {
                if (reply == null) throw new Error("Task not found!");
                res.json(reply);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Task.findByIdAndDelete(req.params.id)
            .then((task) => {
                if (task == null) throw new Error("Task not found!");
                res.json(task);
            }).catch(next);
    });

router.route('/:id/notes')
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                res.json(task.notes);
            })
            .catch(next);
    })
    .post((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes.push(req.body);
                task.save()
                    .then((task) => {
                        res.json(task.notes);
                    })
                    .catch(next);
            })
            .catch(next);
    })
    
    .delete((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes = [];
                task.save()
                    .then((task) => {
                        res.json(task.notes);
                    })
                    .catch(next);
            })
            .catch(next);
    });

router.route('/:id/notes/:nid')
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                let note = task.notes.id(req.params.nid);
                res.json(note);
            })
            .catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .put((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                let note = task.notes.id(req.params.nid);
                note.note = req.body.note;
                task.save()
                    .then(() => {
                        res.json(note);
                    })
                    .catch(next);
            })
            .catch(next);
    })
    .delete((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes.pull(req.params.nid);
                task.save()
                    .then((task) => {
                        res.json(task.notes);
                    })
                    .catch(next);
            })
            .catch();
    });


    router.route('/:id/notes')
    .get((req,res,next)=>{
        Task.findById(req.params.id)
        .then((task)=>{
            res.json(task.notes);
        })
        .catch(next);
    })

    .post((req,res,next)=>{
        Task.findById(req.params.id)
        .then((task)=>{
            task.notes.push(req.body);
            task.save()
            .then((task)=>{
                res.json(task.notes);
            })
            .catch(next);
        })
    })
    .put((req,res)=>{
        res.statuscode=405;
        res.json({message:"Method Not Allowed"});
    })

    .delete((req,res,next)=>{
        Task.findById(req.params.id)
        .then((task)=>{
            task.notes=[];
            task.save()
            .then((task)=>{
                res.json(task.notes);
            })
            .catch(next);
        })
    }) ;

    router.route(/:id/noteId)
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                let note = task.notes.id(req.params.nid);
                res.json(note);
            })
            .catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .put((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                let note = task.notes.id(req.params.nid);
                note.note = req.body.note;
                task.save()
                    .then(() => {
                        res.json(note);
                    })
                    .catch(next);
            })
            .catch(next);
    })
    .delete((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes.pull(req.params.nid);
                task.save()
                    .then((task) => {
                        res.json(task.notes);
                    })
                    .catch(next);
            })
            .catch();
    });
module.exports = router;