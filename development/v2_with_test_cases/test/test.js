var should = require("should");
var expect = require("chai").expect;
var assert = require("assert");

describe('file should exist ', function() {
    it('should exist', function() {
        var myFile = require('./../validator.js');
        expect(myFile).to.not.be.undefined;
    });
});

describe(' test functions should pass', function() {
    it('library should validate data (key:value) and sub data (array of key:value) in a json file', function() {
        var myFile = require('./../validator.js');
        // console.log(myFile,Object.getPrototypeOf(myFile))
        expect(myFile).to.equal(true);
    });
});

describe('test should fail if test case changed', function() {
    it('should return false when test function fail on json data', function() {
        var myFile = require('./../test_case2/validator.js');
        expect(myFile).to.equal(false);
    });
});
