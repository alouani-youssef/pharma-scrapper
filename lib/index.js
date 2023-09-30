const fileHandler = require("./file-handlers");
const cacheLayer = require("./cache");
const cusrorLayer = require("./cursor");
const { geoClient, pharmaClient } = require("./third-party");

const { ZonesServices, PharmacyServices } = require("../src/services");

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

async function init() {
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
      console.log('zone', zone);
      const pharmacies = await pharmaClient.fetchPhamacies(
        zone.longitude,
        zone.latitude
      );
      console.log("pharmacies", pharmacies);
      if (pharmacies) {
        pharmacies.map(async (pharmacy) => {
          const newPharmacy = await PharmacyServices.add({
            name: pharmacy.name,
            region: zone.region,
            phone: pharmacy.Phone,
            longitude: pharmacy.lng,
            latitude: pharmacy.lat,
            address: pharmacy.address,
            addressDetails: pharmacy["Adresse 2"],
            zone: zone.name,
            zoneID: zone._id || zone.id,
          });
          console.log("newZone", newPharmacy);
        });
      }
    }
  }
}

module.exports = init;
