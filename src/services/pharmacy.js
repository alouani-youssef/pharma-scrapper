const { nanoid } = require('nanoid');

const { Pharmacy } = require('../models');


async function create({name,region,phone,longitude,latitude,address,addressDetails,zone,zoneID}){
    return Pharmacy.create({
        uuid: nanoid(),
        name,
        phone,
        longitude,
        latitude,
        location:{
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        address,
        addressDetails,
        zone,
        zoneID,
        region,
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

async function add({name,region,phone,longitude,latitude,address,addressDetails,zone,zoneID}){
    const isAllowToCreate = await isZoneCreationPermitted(longitude,latitude);
    if(isAllowToCreate){
        return create({name,region,phone,longitude,latitude,address,addressDetails,zone,zoneID})
    }else{
        throw new Error('Zone Already Created')
    }
};

module.exports = { add };