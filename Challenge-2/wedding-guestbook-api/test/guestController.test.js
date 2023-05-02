const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');
const sinon = require('sinon');
const Guest = require('../models/Guest');
const guestController = require('../controllers/guestController');

describe('Guest Controller', function () {
  describe('GET /guests', function () {
    it('should return a list of guests', function (done) {
      request(app)
        .get('/api/guests')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /guests', function () {
    it('should create a new guest', function (done) {
      const guest = {
        name: 'John Doe',
        address: '123 Main St',
        phone: '555-555-5555',
        note: 'Thanks for inviting me!'
      };
      request(app)
        .post('/api/guests')
        .send(guest)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal(guest.name);
          expect(res.body.address).to.equal(guest.address);
          expect(res.body.phone).to.equal(guest.phone);
          expect(res.body.note).to.equal(guest.note);
          done();
        });
    });
  });
});

