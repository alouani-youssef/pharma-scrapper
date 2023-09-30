const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MODEL_NAME = "pharmacy";
const DEFAULT_VALUES = {
    VERSION:'0.0.1',
    COUNTRY:'Morocco'
} 

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});



const pharmacySchema = new Schema({
    uuid: { type: String, required: true ,unique:true, sparse: true},
    name:{type:String,required:true,sparse: true},
    phone: {type:String,required:true,sparse: true},
    longitude:{type:String,required:true,sparse: true},
    latitude:{type:String,required:true,sparse: true},
    location:{type:locationSchema,require:true},
    address: {type:String,required:true},
    addressDetails: {type:String,required:true,},
    zone:{type:String,required:true,sparse: true},
    zoneID: { type: Schema.Types.ObjectId, sparse: true,required:true, ref: 'zone'},
    regoin:{type:String,required:true,sparse: true},
    country:{type:String,required:true,sparse: true, default: DEFAULT_VALUES.COUNTRY},
    versin:{type:String,required:true,default: DEFAULT_VALUES.VERSION },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
      },
    },

  }
);

const Pharmacy = mongoose.model(MODEL_NAME, pharmacySchema);
module.exports = Pharmacy;