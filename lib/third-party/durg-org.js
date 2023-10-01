

const axios = require('axios');
const https = require('https');

const agent = new https.Agent({ rejectUnauthorized: false });

const { drugExtracter } = require('../../utils/html-parser');
async function getDrugById(id){
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://dmp.sante.gov.ma/getmedecinedata/${id}`,
            headers: { 
              'Cookie': 'bonneannee2022=1; cookiesession1=678A3E0D23456789801234ABCDEF59AA; dmp_dist_session=eyJpdiI6IndiMVVuSW9QSW95R09WamlHZTRIc3c9PSIsInZhbHVlIjoidDhJZkhjaWpXbmllRm5IeUU4aVd3XC9VODZqRTloc2JwMnBTQUNCMGZRbFlDSUxVUFBWa1pmT3FVNDE4SU43bUdBRVpRYTBlNklselwvS24xRGw1YkJ1eDlRRFlkcVJpOXVIS1RFbXgzbllYQjB5UVdDNnh1cjU2U0x0MG5ZVW1GeSIsIm1hYyI6ImRhNWYxOTRmMjJjYzcxMTI0MjljMzcxYWE3Y2MxYzlkMmNlNzZlNDBhZDgwMjI2ZGU3YjgwOTQwMzg2ZDEwZDUifQ%3D%3D'
            },
             httpsAgent: agent 
          };
        const { data } = await axios.request(config);
        if(data){
            const res =  drugExtracter(data);
            console.log('res', res)
        }
    }catch(error){
        console.error('Error :', error);
        return [];
    }
};
getDrugById(2)

//module.exports = {getDrugById}