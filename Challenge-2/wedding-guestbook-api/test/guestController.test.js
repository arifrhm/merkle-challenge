const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');
const Guest = require('../models/Guest');

describe('Guest Controller', function () {
  describe('POST /guests', function () {
    it('should create a new guest', function (done) {
      const guest = {
        name: 'John Doe',
        address: '123 Main St',
        phone: '555-555-5555',
        note: 'Thanks for inviting me!'
      };
      request(app)
        .post('/guests')
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

  describe('GET /guests', function () {
    it('should return a list of guests', function (done) {
      request(app)
        .get('/guests')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /guests/:id', function () {
    it('should return a single guest', function (done) {
      const guest = new Guest({
        name: 'Jane Doe',
        address: '456 Main St',
        phone: '555-555-5555',
        note: 'Looking forward to the party!'
      });
      guest.save(function (err, savedGuest) {
        if (err) return done(err);
        request(app)
          .get('/guests/' + savedGuest._id)
          .expect(200)
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

  describe('PUT /guests/:id', function () {
    it('should update a guest', function (done) {
      const guest = new Guest({
        name: 'Jane Doe',
        address: '456 Main St',
        phone: '555-555-5555',
        note: 'Looking forward to the party!'
      });
      guest.save(function (err, savedGuest) {
        if (err) return done(err);
        const updatedGuest = {
          name: 'Jane Smith',
          address: '789 Main St',
          phone: '555-555-5555',
          note: 'Can\'t wait for the party!'
        };
        request(app)
          .put('/guests/' + savedGuest._id)
          .send(updatedGuest)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).to.be.an('object');
            expect(res.body.name).to.equal(updatedGuest.name);
            expect(res.body.address).to.equal(updatedGuest.address);
            expect(res.body.phone).to.equal(updatedGuest.phone);
            expect(res.body.note).to.equal(updatedGuest.note);
            done();
          });
      });
    });
  });

  describe('DELETE /guests/:id', function () {
    it('should delete a guest', function (done) {
      const guest = new Guest({
        name: 'Jane Doe',
        address: '456 Main St',
        phone: '555-555-5555',
        note: 'Looking forward to the party!'
      });
      guest.save(function (err, savedGuest) {
        if (err) return done(err);
        request(app)
          .delete('/guests/' + savedGuest._id)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Guest successfully deleted');
            done();
          });
      });
    });
  });
});