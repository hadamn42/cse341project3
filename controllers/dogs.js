const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Dogs']
    try{
        const result = await mongodb.getDatabase().db('dogs').collection('dogs').find();
        result.toArray().then((doggos) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(doggos);
        });
    }catch (error) {
        res.status(400).json(error);
    }
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Dogs']
    const breedId = new objectId(req.params.id);
    try{
        const result = await mongodb.getDatabase().db('dogs').collection('dogs').find({ _id: breedId });
        result.toArray().then((doggos) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(doggos[0]);
        });        
    }catch (error) {
        res.status(400).json(error);
    }
};

const createDog = async(req, res) => {
    //#swagger.tags=['Dogs']
    try{
        const breed = {
            breed: req.body.breed,
            breedType: req.body.breedType,
            origin: req.body.origin,
            popularity: req.body.popularity,
            temperament: req.body.temperament,
            hypoallergenic: req.body.hypoallergenic,
            intelligence: req.body.intelligence,
            photo: req.body.photo
        };
        const response = await mongodb.getDatabase().db('dogs').collection('dogs').insertOne(breed);
        if (response.acknowledged){
            res.status(204).send();
        }else{
            res.status(500).json(response.error || 'Some error occured while creating the breed.');
        }
    }catch (error) {
        res.status(400).json(error);
    }

};

const updateDog = async(req, res) => {
    //#swagger.tags=['Dogs']
    const breedId = new objectId(req.params.id); 
    try{
        const breed = {
            breed: req.body.breed,
            breedType: req.body.breedType,
            origin: req.body.origin,
            popularity: req.body.popularity,
            temperament: req.body.temperament,
            hypoallergenic: req.body.hypoallergenic,
            intelligence: req.body.intelligence,
            photo: req.body.photo
        };
        const response = await mongodb.getDatabase().db('dogs').collection('dogs').replaceOne({_id: breedId}, breed);
        if (response.modifiedCount > 0){
            res.status(204).send();
        }else{
            res.status(500).json(response.error || 'Some error occured while updating the breed.');
        }   
    }catch (error) {
        res.status(400).json(error);
    }

};

const deleteDog = async(req, res) => {
    //#swagger.tags=['Dogs']
    const breedId = new objectId(req.params.id);
    try{
        const response = await mongodb.getDatabase().db('dogs').collection('dogs').deleteOne({_id: breedId});
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
    createDog,
    updateDog,
    deleteDog
};