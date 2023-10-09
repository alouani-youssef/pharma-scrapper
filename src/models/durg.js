const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MODEL_NAME = "drug";
const DEFAULT_VALUES = {
    VERSION:'0.0.1',
    COUNTRY:'Morocco',
    CURRENCY:'DH'
};
 
const namingSchema =  new Schema({
    french:{ type: String,},
    english:{ type: String,},
    arabic:{ type: String,},
});

const priceSchema =  new Schema({
    amount:{ type: String, required: true ,unique:true},
    currency:{ type: String, required: true,default: DEFAULT_VALUES.CURRENCY},
});
const drugSchema = new Schema({
    uuid: { type: String, required: true ,unique:true},
    id: { type: Number, required: true ,unique:true},
    name:{type:String,required:true,sparse: true},
    naming:{type:namingSchema,required:true,sparse: true},
    producer:{type:String,required:true,sparse: true},
    dose:{type:String,required:true,sparse: true},
    type: {type:String,required:true},
    presentation:{type:String,required:true,sparse: true},
    makretStatus:{type:String,required:true,sparse: true},
    price:{type:priceSchema, require:true},
    publicPrice:{type:String,required:true,sparse: true},
    privatePrice:{type:String,required:true,sparse: true},
    country:{type:String,required:true,default: DEFAULT_VALUES.COUNTRY },
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

const Drug = mongoose.model(MODEL_NAME, drugSchema);
module.exports = Drug;