var elasticsearch = require('elasticsearch');
const express1 = require('express');
const fs = require('fs');
const app2 = express1();
const verify=require('./verify')
const searchData=require('./search')

var data=require('./data')

const PORT = 5000;

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
 });

 client.ping({ requestTimeout: 30000 }, function(error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});


const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];
  
    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type,
          _id: item.id
        }
      });
  
      bulkBody.push(item);
    });
  
client.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(
        `Successfully indexed ${data.length - errorCount}
         out of ${data.length} items`
      );
    }).catch(error=>{
        console.log(error)
    })
    
  };

async function indexData() {
    const articles = data
    console.log(`${articles.length} items parsed from data file`);
    bulkIndex('library', 'article', articles);
  };

// indexData();
// verify()
searchData()

app2.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});