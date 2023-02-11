const {RequestPromise} = require ('../../common/RequestPromise');

const Get_Candidate = testData =>
    new Promise( (resolve, reject) => {

        var options = {
            method: 'GET',
            uri: testData,
            time:true,
            resolveWithFullResponse: true           
        };

    
        RequestPromise( options )
        .then(function (response) {
            resolve(response);
        })
        .catch(function (err) {
            reject(err);
            console.log("Error Inside Get_Candidate module: "+err);
        });
    });

module.exports = {Get_Candidate};