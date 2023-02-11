
const expect = require("chai").expect;
const tv4 = require('tv4');
const {Get_Candidate} = require("../apiModules/CANDIDATE_API/Get_Candidate");
const testData = require('../resource/testData/testData.json');


describe('Verify Candidate Response Schema - Test Suite', function() {
this.timeout(30000);

        it('Verify Candidate Response JSON Schema using chai Assertions',async function(){
                
            let readData = `${testData.BaseURL}/api/candidate`
            
            currentResponse = await Get_Candidate(readData);

            expect(currentResponse.statusCode).to.equal(200);
            
            currentResponseBody = JSON.parse(currentResponse.body);
            
            expect(currentResponseBody).to.be.an('array');
            expect(currentResponseBody[0]).to.have.property("plateNo");
            expect(currentResponseBody[0]).to.have.property("driverName");
            expect(currentResponseBody[0]).to.have.property("lat");
            expect(currentResponseBody[0]).to.have.property("lng");
            expect(currentResponseBody[0]).to.have.property("location");
            expect(currentResponseBody[0]).to.have.property("lastUpdated");
        });

        it('Verify JSON Schema Api using tv4 dependency' , async function() {

            let readData = `${testData.BaseURL}/api/candidate`
            
            currentResponse = await Get_Candidate(readData);

            expect(currentResponse.statusCode).to.equal(200);
            
            currentResponseBody = JSON.parse(currentResponse.body);
            
            expect(currentResponseBody).to.be.an('array');

            var schema = {
                "type": "object",
                "properties": {
                    "plateNo": { "type": "string" },
                    "driverName": { "type": "string" },
                    "lat":  {"type":"number"},
                    "lng":  {"type":"number"},
                    "location":{"type":"string"},
                    "imageURL":{"type":"string"},
                    "lastUpdated": {"type": "string", "format": "date-time"}
                },
                "required": ["plateNo", "driverName", "lat","lng","location","lastUpdated"]
            };

            expect(currentResponseBody).to.be.an('array');
            for (var i = 0; i < currentResponseBody.length; i++) {
                var result = tv4.validate(currentResponseBody[i], schema);
                expect(result).to.be.true;
            }
                    
            //expect(currentResponseBody.data[0]).to.include.any.keys( 'state_code');

        });

        it('Verify Candidate Response JSON Schema using chai Assertions - Negative Test Case',async function(){
                
            let readData = `${testData.BaseURL}/api/candidate`
            
            currentResponse = await Get_Candidate(readData);

            expect(currentResponse.statusCode).to.equal(200);
            
            currentResponseBody = JSON.parse(currentResponse.body);
            
            expect(currentResponseBody).to.be.an('array');
            expect(currentResponseBody[0]).to.not.have.property("id");
            expect(currentResponseBody[0]).to.not.have.property("name");
            expect(currentResponseBody[0]).to.not.have.property("@#$@");
            expect(currentResponseBody[0]).to.not.have.property("////");
            expect(currentResponseBody[0]).to.not.have.property("/");
            expect(currentResponseBody[0]).to.not.have.property("^");
        });


    });