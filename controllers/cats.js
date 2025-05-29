const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Cats']
    try{
        const result = await mongodb.getDatabase().db('dogs').collection('cats').find();
        result.toArray().then((kitties) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(kitties);
        });
    }catch (error) {
        res.status(400).json(error);
    }    
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Cats']
    const breedId = new objectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db('dogs').collection('cats').find({ _id: breedId });
        result.toArray().then((kitties) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(kitties[0]);
            });
    }catch (error) {
        res.status(400).json(error || 'Invalid ID');
    }
};

const createCat = async(req, res) => {
    //#swagger.tags=['Cats']
    try{
        const breed = {
            Breed: req.body.Breed,
            Age: req.body.Age,
            Weight: req.body.Weight,
            Color: req.body.Color,
            Gender: req.body.Gender
        };
        const response = await mongodb.getDatabase().db('dogs').collection('cats').insertOne(breed);
        if (response.acknowledged){
            res.status(204).send();
        }else{
            res.status(500).json(response.error || 'Some error occured while creating the breed.');
        }
    }catch (error) {
        res.status(400).json(error);
    }

};

const updateCat = async(req, res) => {
    //#swagger.tags=['Cats']
    const breedId = new objectId(req.params.id); 
    try{
        const breed = {
            Breed: req.body.Breed,
            Age: req.body.Age,
            Weight: req.body.Weight,
            Color: req.body.Color,
            Gender: req.body.Gender
        };
        const response = await mongodb.getDatabase().db('dogs').collection('cats').replaceOne({_id: breedId}, breed);
        if (response.modifiedCount > 0){
            res.status(204).send();
        }else{
            res.status(500).json(response.error || 'Some error occured while updating the breed.');
        } 
    }catch (error) {
        res.status(400).json(error);
    }  
};

const deleteCat = async(req, res) => {
    //#swagger.tags=['Cats']
    const breedId = new objectId(req.params.id);
    try{
        const response = await mongodb.getDatabase().db('dogs').collection('cats').deleteOne({_id: breedId});
        if (response.deletedCount > 0){
            res.status(204).send();
        }else{
            res.status(500).json(response.error || 'Some error occured while deleting the breed.');
        } 
    }catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    getAll,
    getSingle,
    createCat,
    updateCat,
    deleteCat
};