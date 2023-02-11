
var expect = require("chai").expect;
var {Get_Candidate} = require("../apiModules/CANDIDATE_API/Get_Candidate");
const testData = require('../resource/testData/testData.json');


describe('Sorting and Validating the Candidate API response using lastUpdated descending', function() {
this.timeout(30000);

    it('Verify Sorting and Validating the Candidate API', async function() {

        let readData = `${testData.BaseURL}/api/candidate`
            
        currentResponse = await Get_Candidate(readData);

        expect(currentResponse.statusCode).to.equal(200);
            
        currentResponseBody = JSON.parse(currentResponse.body);
        var candidates = currentResponseBody;
        candidates = Array.from(candidates);
        candidates.sort(function (a, b) {
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });

        for (let i = 0; i < candidates.length - 1; i++) {
            const current = candidates[i];
            const next = candidates[i + 1];
            expect(new Date(current.lastUpdated)).to.be.at.least(new Date(next.lastUpdated));
        }

    });

});