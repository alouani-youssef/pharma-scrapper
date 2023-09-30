const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MODEL_NAME = "zone";
const DEFAULT_VALUES = {
    VERSION:'0.0.1',
    COUNTRY:'Morocco'
} 

const zoneSchema = new Schema({
    uuid: { type: String, required: true ,unique:true, sparse: true},
    name:{type:String,required:true,sparse: true},
    region:{type:String,required:true,sparse: true},
    country:{type:String,required:true,sparse: true, default: DEFAULT_VALUES.COUNTRY},
    longitude:{type:String,required:true,sparse: true},
    latitude:{type:String,required:true,sparse: true},
    version:{type:String,default: DEFAULT_VALUES.VERSION },
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

const Zone = mongoose.model(MODEL_NAME, zoneSchema);
module.exports = Zone;