const fileHandler = require("./file-handlers");
const cacheLayer = require("./cache");
const cusrorLayer = require("./cursor");
const { geoClient, pharmaClient, drugOrg, webTabib } = require("./third-party");

const { ZonesServices, PharmacyServices, DrugServices } = require("../src/services");

const country = "Morocco";

async function initStorage() {
  try {
    console.log("START MOVING ELEMENTS FROM JSON TO REDIS");
    const isProcessingFinished = await fileHandler.fileProcessor();
    console.log("isProcessingFinished", isProcessingFinished);
  } catch (error) {
    console.error("Error :", error);
  }
}

async function initZones() {
  const length = await cacheLayer.init();
  for (let i = 0; i <= length; i++) {
    const zone = await cacheLayer.getNext();
    console.log("zone", zone);
    if (zone) {
      const str = `${zone.name}, ${zone.region_name}, ${country}`;
      const text = encodeURIComponent(str);
      const geolocations = await geoClient.getLocationByName(text);
      console.log("geolocations", geolocations);
      if (geolocations) {
        geolocations.map(async (location) => {
          const newZone = await ZonesServices.add({
            name: zone.name,
            region: zone.region_name,
            longitude: location.longitude,
            latitude: location.latitude,
          });
          console.log("newZone", newZone);
        });
      }
    }
  }
}

async function initPharmacies() {
  const length = await cusrorLayer.init();
  for (let i = 0; i <= length; i++) {
    const zone = await cusrorLayer.getNext();
    if (zone) {
      const pharmacies = await pharmaClient.fetchPhamacies(
        zone.longitude,
        zone.latitude
      );
      if (pharmacies) {
        pharmacies.map(async (pharmacy) => {
          const newPharmacy = await PharmacyServices.add({
            name: pharmacy.title,
            region: zone.region,
            phone: pharmacy.Phone,
            longitude: pharmacy.lng,
            latitude: pharmacy.lat,
            address: pharmacy.address,
            addressDetails: pharmacy["Adresse 2"],
            zone: zone.name,
            zoneID: zone._id || zone.id,
          });
        });
      }
    }
  }
};


async function initDrugs() {
  const length = 8945;
  for (let i = 0; i <= length; i++) {
    try{
      const drug = await drugOrg.getDrugById(i);
      if(drug){
       await DrugServices.add(drug);
      }
    }catch(error){

    }
  }
}

async function initWebTabibDiseases(){
  const lists = await webTabib.getDiseasesList();
  lists.map((list) =>{
    fileHandler.fileWriter.addDiseasesList(list);
  })
}

async function initWebTabibDrugs(){
  const lists = await webTabib.getDrugsList();
  lists.map((list) =>{
    fileHandler.fileWriter.addDrugsList(list);
  })
}


module.exports = {initDrugs,initPharmacies,initZones,initWebTabibDiseases,initWebTabibDrugs};
