const express = require('express');
const router = express.Router();

const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => {
    delete req.body._id; //le front envoie en mauvais ID creer automatiquement par mongodb, on retire ce champs avant qu'il ne soit copié
    const thing = new Thing({
      ...req.body  //copie les champs de la requete
    });
    thing.save() //enregistre l'objet dans la base
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
     //chercher en fonction de l'id
     Thing.findOne({ _id: req.params.id }) //ce qui equivaut a req.params.id
     .then(thing => res.status(200).json(thing))
     .catch(error => res.status(404).json({ error }));
};

exports.modifyThing  = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //on prends l'id de l'élément qui doit être modifier et on le met à jour
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteThing  = (req, res, next) => {
    
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getAllStuff  = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
};