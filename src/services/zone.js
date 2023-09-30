const { nanoid } = require('nanoid');

const { Zone } = require('../models');


async function create({name,region,longitude,latitude}){
    return Zone.create({
        uuid: nanoid(),
        name,
        region,
        longitude,
        latitude,
        country:'Morocco',
        version:'0.0.1'
    })
};


async function isZoneCreationPermitted(longitude,latitude){
    const query = { longitude, latitude }
    const count = await Zone.count(query);
    if(count===0){
        return true
    }
};

async function isZoneCreationPermitted(longitude,latitude){
    const query = { longitude, latitude }
    const count = await Zone.count(query);
    if(count===0){
        return true
    }
};

async function add({name,region,longitude,latitude}){
    const isAllowToCreate = await isZoneCreationPermitted(longitude,latitude);
    if(isAllowToCreate){
        return create({name,region,longitude,latitude})
    }else{
        throw new Error('Zone Already Created')
    }
};

module.exports = { add };