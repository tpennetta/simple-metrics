var mocha = require('mocha'),
    chai = require('chai'),
    should = require('chai').should(),
    uuid = require('uuid');

var testMetrics = require('../src/Metrics.js')

describe('Metrics', function() {
  describe('Sync', function() {
    var guid = null;
    var elapsed = null;
    it('should start a new metric measurement', function() {
      guid = testMetrics.start();
      guid.should.be.a('string');
    });
    it('should stop the current metric and record elapsed time', function() {
      elapsed = testMetrics.stop(guid);
      elapsed.should.be.a('number');
    });
    it('should add another new metric measurement', function() {
      guid = null;
      guid = testMetrics.start(uuid.v4());
      guid.should.be.a('string');
    });
    it('should stop new metric measurement and record elapsed time', function() {
      elapsed = testMetrics.stop(guid);
      elapsed.should.be.a('number');
    });
    it('should get elapsed time by guid', function() {
      testMetrics.getElapsedTime(guid).should.be.a('number');
    });
    it('should get average time', function() {
      testMetrics.getAverage().should.be.a('number');
    });
    it('should clear metric by guid', function() {
      testMetrics.clear(guid);
      (function() { testMetrics.getElapsedTime(guid); }).should.throw();
    });
    it('should clear all metrics', function() {
      testMetrics.clear();
      Object.keys(testMetrics.getAllMetrics()).length.should.equal(0);
    });
  });

  describe('Async', function() {
    var guid = null;
    var elapsed = null;
    it('should start a new metric measurement', function(done) {
      testMetrics.start(function(err, res) {
        if (err) {
          throw err;
        }
        guid = res;
        res.should.be.a('string');
        done();
      });
    });
    it('should stop the current metric and record elapsed time', function(done) {
      testMetrics.stop(guid, function(err, res) {
        if (err) {
          throw err;
        }
        elapsed = res;
        res.should.be.a('number');
        done();
      });
    });
    it('should add another new metric measurement', function(done) {
      guid = null;
      testMetrics.start(uuid.v4(), function(err, res) {
        if(err) {
          throw err;
        }
        guid = res;
        res.should.be.a('string');
        done();
      });
    });
    it('should stop new metric measurement and record elapsed time', function(done) {
      testMetrics.stop(guid, function(err, res) {
        if(err) {
          throw err;
        }
        elapsed = res;
        res.should.be.a('number');
        done();
      });
    });
    it('should get elapsed time by guid', function(done) {
      testMetrics.getElapsedTime(guid, function(err, res) {
        if(err) {
          throw err;
        }
        elapsed = res;
        res.should.be.a('number');
        done();
      });
    });
    it('should clear metric by guid', function(done) {
      testMetrics.clear(guid, function(err, res) {
        if(err) {
          throw err;
        }
        (function() { testMetrics.getElapsedTime(guid); }).should.throw();
        res.should.equal(true);
        done();
      });
    });
    it('should clear all metrics', function(done) {
      testMetrics.clear(function(err, res) {
        if(err) {
          throw err;
        }
        Object.keys(testMetrics.getAllMetrics()).length.should.equal(0);
        res.should.equal(true);
        done();
      });
    });
  });
});
