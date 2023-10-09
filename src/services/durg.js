const { nanoid } = require('nanoid');

const { Drug } = require('../models');


async function create({id,name,producer,dose,type,presentation,makretStatus,publicPrice,privatePrice}){
    return Drug.create({
        uuid: nanoid(),
        id,
        name,
        naming:{
            french:name,
        },
        producer,
        dose,
        type,
        presentation,
        makretStatus,
        publicPrice,
        privatePrice,
        price:{
            amount:publicPrice,
            currency:'DH'
        },
        country:'Morocco',
        version:'0.0.1'
    })
};



async function isDrugCreationPermitted(id){
    const query = { id }
    const count = await Drug.count(query);
    if(count===0){
        return true
    }
};

async function add({id,name,producer,dose,type,presentation,makretStatus,publicPrice,privatePrice}){
    const isPremitted = await isDrugCreationPermitted(id);
    console.log('isPremitted', isPremitted, '>>>>> ', id)
    if(isPremitted){
        return create({id,name,producer,dose,type,presentation,makretStatus,publicPrice,privatePrice})
    }
   
};

module.exports = { add };