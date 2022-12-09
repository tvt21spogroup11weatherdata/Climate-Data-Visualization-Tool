const chai = require('chai')
const assert = require('assert')
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('Data structure test', function() {
    

// COLLECTIONS TESTS
    describe('Collections', function() {
        it('Response should match expected data', function(done) {
           //send http request
           chai.request('http://localhost:3001')
           .get('/collections/test/datatest')
           //check response status
           .end(function(err, res) {
               //check for error
               expect(err).to.be.null
               //check response status
               expect(res).to.have.status(200)
               //check response data structure
               let found = false
               if (
                   (res.body._id == "6391c769d4a23604970d8ca3") &&
                   (res.body.formatType == "2column") &&
                   (res.body.visualizations != null) &&
                   (res.body.createdBy == "raitokomniak") &&
                   (res.body.__v == 0)
                   ) found = true
               if(found == false) assert.fail('Data did not match expected')
               done()
           })
       })
    })
// GLOBAL GHG EMISSIONS TESTS
    describe('Global GHG Emissions', function() {
        describe('Global GHG Emissions by Sector', function() {
            it('Response should match expected data', function(done) {
                //send http request
                chai.request('http://localhost:3001')
                .get('/ghg_global_sector/datatest')
                //check response status
                .end(function(err, res) {
                    //check for error
                    expect(err).to.be.null
                    //check response status
                    expect(res).to.have.status(200)
                    //check response data structure
                    let found = false
                    if (
                        (res.body._id == "637a1884af7a7960a66fae22") &&
                        (res.body.SectorID == 3) &&
                        (res.body.Sector == "Agriculture, Forestry & Land Use (AFOLU)") &&
                        (res.body.ghg_percentual == 18.4) 
                        ) found = true
                    if(found == false) assert.fail('Data did not match expected')
                    done()
                })
            })
        })
        describe('Global GHG Emissions by Subsector', function() {
            it('Response should match expected data', function(done) {
                //send http request
                chai.request('http://localhost:3001')
                .get('/ghg_global_subsector/datatest')
                //check response status
                .end(function(err, res) {
                    //check for error
                    expect(err).to.be.null
                    //check response status
                    expect(res).to.have.status(200)
                    //check response data structure
                    let found = false
                    if (
                        (res.body._id == "637a16ec9feb9d1eaed83d06") &&
                        (res.body.SectorID == 1) &&
                        (res.body.Subsector == "Transport") &&
                        (res.body.ghg_percentual == 16.2) 
                        ) found = true
                    if(found == false) assert.fail('Data did not match expected')
                    done()
                })
            })
        })
    })
// HADCRUT TESTS
    describe('HadCRUT', function() {
        describe('HadCRUT Global Annual', function() {
            it('Response should match expected data', function(done) {
                //send http request
                chai.request('http://localhost:3001')
                .get('/hadcrutglobalannual/datatest')
                //check response status
                .end(function(err, res) {
                    //check for error
                    expect(err).to.be.null
                    //check response status
                    expect(res).to.have.status(200)
                    //check response data structure
                    let found = false
                    if (
                        (res.body._id == "6370f36c29af1e91b0510428") &&
                        (res.body.Year == 1850) &&
                        (res.body.Anomaly == -0.41765878) &&
                        (res.body.Lower_confidence_limit == -0.589203) &&
                        (res.body.Upper_confidence_limit == -0.24611452)
                        ) found = true
                    if(found == false) assert.fail('Data did not match expected')
                    done()
                })
            })
        })
        describe('HadCRUT Global Monthly', function() {
            it('Response should match expected data', function(done) {
                //send http request
                chai.request('http://localhost:3001')
                .get('/hadcrutglobalmonthly/datatest')
                //check response status
                .end(function(err, res) {
                    //check for error
                    expect(err).to.be.null
                    //check response status
                    expect(res).to.have.status(200)
                    //check response data structure
                    let found = false
                    if (
                        (res.body._id == "6370dc7325c6ce9a9c765c7e") &&
                        (res.body.Year == 1850) &&
                        (res.body.Month == 3) &&
                        (res.body.Anomaly == -0.59132266) &&
                        (res.body.Upper_confidence_limit == -0.2487262) &&
                        (res.body.Lower_confidence_limit == -0.9339191)
                        ) found = true
                    if(found == false) assert.fail('Data did not match expected')
                    done()
                })
            })
        })
        describe('HadCRUT Northern Hemisphere Annual', function() {
            it('Response should match expected data', function(done) {
                //send http request
                chai.request('http://localhost:3001')
                .get('/hadcrutnorthernhemisphereannual/datatest')
                //check response status
                .end(function(err, res) {
                    //check for error
                    expect(err).to.be.null
                    //check response status
                    expect(res).to.have.status(200)
                    //check response data structure
                    let found = false
                    if (
                        (res.body._id == "6370f45f06e5659bea7fa319") &&
                        (res.body.Year == 1852) &&
                        (res.body.Anomaly == -0.23570205) &&
                        (res.body.Upper_confidence_limit == -0.013715232) &&
                        (res.body.Lower_confidence_limit == -0.45768887)
                        ) found = true
                    if(found == false) assert.fail('Data did not match expected')
                    done()
                })
            })
        })
        describe('HadCRUT Northern Hemisphere Monthly', function() {
            it('Response should match expected data', function(done) {
                //send http request
                chai.request('http://localhost:3001')
                .get('/hadcrutnorthernhemispheremonthly/datatest')
                //check response status
                .end(function(err, res) {
                    //check for error
                    expect(err).to.be.null
                    //check response status
                    expect(res).to.have.status(200)
                    //check response data structure
                    let found = false
                    if (
                        (res.body._id == "6370f4643cd818611ebd2b7d") &&
                        (res.body.Year == 1850) &&
                        (res.body.Month == 1) &&
                        (res.body.Anomaly == -0.9006187) &&
                        (res.body.Lower_confidence_limit == -1.3157626) &&
                        (res.body.Upper_confidence_limit == -0.48547474)
                        ) found = true
                    if(found == false) assert.fail('Data did not match expected')
                    done()
                })
            })
        })
        describe('HadCRUT Southern Hemisphere Annual', function() {
            it('Response should match expected data', function(done) {
                //send http request
                chai.request('http://localhost:3001')
                .get('/hadcrutsouthernhemisphereannual/datatest')
                //check response status
                .end(function(err, res) {
                    //check for error
                    expect(err).to.be.null
                    //check response status
                    expect(res).to.have.status(200)
                    //check response data structure
                    let found = false
                    if (
                        (res.body._id == "6370f45aff87f88ce6956907") &&
                        (res.body.Year == 1851) &&
                        (res.body.Anomaly == -0.24745059) &&
                        (res.body.Lower_confidence_limit == -0.49331915) &&
                        (res.body.Upper_confidence_limit == -0.0015820131)
                        ) found = true
                    if(found == false) assert.fail('Data did not match expected')
                    done()
                })
            })
        })
        describe('HadCRUT Southern Hemisphere Monthly', function() {
            it('Response should match expected data', function(done) {
                //send http request
                chai.request('http://localhost:3001')
                .get('/hadcrutsouthernhemispheremonthly/datatest')
                //check response status
                .end(function(err, res) {
                    //check for error
                    expect(err).to.be.null
                    //check response status
                    expect(res).to.have.status(200)
                    //check response data structure
                    let found = false
                    if (
                        (res.body._id == "6370f45480836882d4c857d9") &&
                        (res.body.Year == 1850) &&
                        (res.body.Month == 2) &&
                        (res.body.Anomaly == -0.5161171) &&
                        (res.body.Upper_confidence_limit == -0.19472893) &&
                        (res.body.Lower_confidence_limit == -0.8375053)
                        ) found = true
                    if(found == false) assert.fail('Data did not match expected')
                    done()
                })
            })
        })
    })
// HUMAN EVOLUTION TESTS
    describe('Human Evolution', function() {
        it('Response should match expected data', function(done) {
        //send http request
        chai.request('http://localhost:3001')
        .get('/human_evolution/test/datatest')
        //check response status
        .end(function(err, res) {
            //check for error
            expect(err).to.be.null
            //check response status
            expect(res).to.have.status(200)
            //check response data structure
            let found = false
            if (
                (res.body._id == "637c9426f7cc027fc120dc0d") &&
                (res.body.BP == 176000) &&
                (res.body.event == "earliest built constructions: underground edifices made from broken stalagmites by Neanderthals (Bruniquel Cave, France) → material culture")
                ) found = true
            if(found == false) assert.fail('Data did not match expected')
            done()
        })
    })
    })
// ICE CORE 800Kyr CO2 TESTS
    describe('Ice Core 800Kyr CO2', function() {
        it('Response should match expected data', function(done) {
        //send http request
        chai.request('http://localhost:3001')
        .get('/icecore800kco2/datatest')
        //check response status
        .end(function(err, res) {
            //check for error
            expect(err).to.be.null
            //check response status
            expect(res).to.have.status(200)
            //check response data structure
            let found = false
            if (
                (res.body._id == "637655f5a4003011f8ef098e") &&
                (res.body.age_gas_calBP == -51.03) &&
                (res.body.co2_ppm == 368.02) &&
                (res.body.co2_1s_ppm == 0.06) &&
                (res.body.years_before_2016 == 15)
                ) found = true
            if(found == false) assert.fail('Data did not match expected')
            done()
            })
        })
    })
// LAWDOME TESTS
    describe('Ice Core 800Kyr CO2', function() {
        it('Response should match expected data', function(done) {
        //send http request
        chai.request('http://localhost:3001')
        .get('/lawdome/test/datatest')
        //check response status
        .end(function(err, res) {
            //check for error
            expect(err).to.be.null
            //check response status
            expect(res).to.have.status(200)
            //check response data structure
            let found = false
            if (
                (res.body._id == "637e0ce9899ca2fdfc9a2e6d") &&
                (res.body.Ice_Sample_Code == "DE08") &&
                (res.body.Sample_Number == 235) &&
                (res.body.Analysis_Date == "12-Aug-93") &&
                (res.body.Mean_Ice_Depth_m == 83.98) &&
                (res.body.Ice_Age_year_AD == 1938) &&
                (res.body.Mean_Air_Age_year_AD == 1968) &&
                (res.body.CO2_Mixing_Ratio_ppm == 323.7)
                ) found = true
            if(found == false) assert.fail('Data did not match expected')
            done()
            })
        })
    })
// MAUNA LOA CO2 TESTS
    describe('Mauna Loa CO2', function() {
        describe('Mauna Loa CO2 Annual', function() {
            it('Response should match expected data', function(done) {
            //send http request
            chai.request('http://localhost:3001')
            .get('/maunaloaco2annual/datatest')
            //check response status
            .end(function(err, res) {
                //check for error
                expect(err).to.be.null
                //check response status
                expect(res).to.have.status(200)
                //check response data structure
                let found = false
                if (
                    (res.body._id == "6374cc2e0a80c228cf471b17") &&
                    (res.body.year == 1959) &&
                    (res.body.mean == 315.98) &&
                    (res.body.unc == 0.12)
                    ) found = true
                if(found == false) assert.fail('Data did not match expected')
                done()
                })
            })
        })
        describe('Mauna Loa CO2 Monthly', function() {
            it('Response should match expected data', function(done) {
            //send http request
            chai.request('http://localhost:3001')
            .get('/maunaloaco2monthly/datatest')
            //check response status
            .end(function(err, res) {
                //check for error
                expect(err).to.be.null
                //check response status
                expect(res).to.have.status(200)
                //check response data structure
                let found = false
                if (
                    (res.body._id == "6374cc570a80c228cf471b5a") &&
                    (res.body.year == 1958) &&
                    (res.body.month == 3) &&
                    (res.body.deseasonalized == 314.43) &&
                    (res.body.ndays == -1) &&
                    (res.body.sdev == -9.99) &&
                    (res.body.unc == -0.99)
                    ) found = true
                if(found == false) assert.fail('Data did not match expected')
                done()
                })
            })
        })
    })
// NATIONAL CARBON EMISSIONS TESTS
    describe('National Carbon Emissions', function() {
        it('Response should match expected data', function(done) {
        //send http request
        chai.request('http://localhost:3001')
        .get('/national_carbon_emissions/datatest')
        //check response status
        .end(function(err, res) {
            //check for error
            expect(err).to.be.null
            //check response status
            expect(res).to.have.status(200)
            //check response data structure
            let found = false
            if (
                (res.body._id == "63836c207057c43aeafbdd88") &&
                (res.body.Finland == 14) &&
                (res.body.France == 262) &&
                (res.body.USA == 2832) 
                ) found = true
            if(found == false) assert.fail('Data did not match expected')
            done()
            })
        })
    })
// NORTHERN HEMISPHERE TEMPERATURE RECONSTRUCTION TESTS
    describe('Northern Hemisphere Temperature Reconstruction', function() {
        it('Response should match expected data', function(done) {
        //send http request
        chai.request('http://localhost:3001')
        .get('/northerntempreconstruction/datatest')
        //check response status
        .end(function(err, res) {
            //check for error
            expect(err).to.be.null
            //check response status
            expect(res).to.have.status(200)
            //check response data structure
            let found = false
            if (
                (res.body._id == "6374cbc10a80c228cf47135a") &&
                (res.body.Year == 1) &&
                (res.body.T == -0.393)
                ) found = true
            if(found == false) assert.fail('Data did not match expected')
            done()
            })
        })
    })
// SNYDER TEMPERATURE EVOLUTION TESTS
    describe('Snyder Temperature Evolution', function() {
        it('Response should match expected data', function(done) {
        //send http request
        chai.request('http://localhost:3001')
        .get('/snyder_temperature_evolution/datatest')
        //check response status
        .end(function(err, res) {
            //check for error
            expect(err).to.be.null
            //check response status
            expect(res).to.have.status(200)
            //check response data structure
            let found = false
            if (
                (res.body._id == "6378be0fc38132e1848e8a02") &&
                (res.body.kyr_BP == 1) &&
                (res.body.l_2p5 == -1.48) &&
                (res.body.l_50 == -0.17) &&
                (res.body.l_97p5 == 1.01)
                ) found = true
            if(found == false) assert.fail('Data did not match expected')
            done()
            })
        })
    })
// VOSTOK ICE CORE CO2 TESTS
    describe('Snyder Temperature Evolution', function() {
        it('Response should match expected data', function(done) {
        //send http request
        chai.request('http://localhost:3001')
        .get('/vostokicecoreco2/datatest')
        //check response status
        .end(function(err, res) {
            //check for error
            expect(err).to.be.null
            //check response status
            expect(res).to.have.status(200)
            //check response data structure
            let found = false
            if (
                (res.body._id == "6376113a8da9f52c2d54884b") &&
                (res.body.Depth == 149.1) &&
                (res.body.Age_of_the_ice == 5679) &&
                (res.body.Mean_age_of_the_air == 2342) &&
                (res.body.CO2 == 284.7)
                ) found = true
            if(found == false) assert.fail('Data did not match expected')
            done()
            })
        })
    })
})