const { parse } = require('node-html-parser');
function drugExtracter(html,id){
    try{
        const root = parse(html);
        const listItems = root.querySelectorAll('.icon-list.bullet-primary li');
        const result = listItems.map(item => {
            const spans = item.querySelectorAll('span');
            return {
                field: spans[1].text.trim(),
                value: spans[2].text.trim()
            };
        });
        return { 
            id:id,
            name: result[0].value,
            producer: result[1].value,
            dose: result[2].value,
            type: result[3].value,
            presentation: result[4].value,
            makretStatus: result[5].value,
            publicPrice: result[6].value,
            privatePrice: result[7].value,
         };

    }catch(error){
        console.log('error :', error);
        return null;
    }
};


module.exports = { drugExtracter }