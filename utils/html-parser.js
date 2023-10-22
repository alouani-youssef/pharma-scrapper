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


function ListDiseasesExtracter(html){
    const root = parse(html);
    const listItems = root.querySelectorAll('.search-result.border .content');

    const result = listItems.map(item => {
       try{
            const links = item.querySelectorAll('a');
            const url = `https://www.webteb.com${links[0]._attrs.href}`;
            const [span1,span2] = links[0]?.querySelectorAll('span');
            const arabicName = span1.text.trim();
            const englishName = span2.text.trim(); 
            return { 
                name:{
                    ar:arabicName,
                    en: englishName
                },
                link: url
            };
       }catch(error){
        console.error("Error :", er)
       }
    });
    return result
}

function ListDrugsExtracter(html){
    const root = parse(html);
    const columns = root.querySelectorAll('table.drug-names tbody tr');
    return columns.map((column) =>{
        try{
            const elements = column.querySelectorAll('td');
            const englishName = elements[1].querySelectorAll('span')[0].text.trim()
            const aTag = elements[0].querySelectorAll('a')[0];
            const arabicName = aTag.querySelectorAll('span')[0].text.trim();
            const url = aTag?.attrs?.href;
            return { 
                name:{
                    ar:arabicName,
                    en: englishName
                },
                link: url
            };
        }catch(error){
            console.error('error', error);
            process.exit()
        }
    })
}


module.exports = { drugExtracter, ListDiseasesExtracter,ListDrugsExtracter }