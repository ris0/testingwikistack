var chai = require('chai');
var mocha = require('mocha');
var spies = require('chai-spies');
var expect = require('chai').expect;

var morgan = require('morgan');
var bodyParser = require('body-parser');

var models = require('../models');
var mongoose = require('mongoose');
var Page = models.Page;

var express = require('express');
var router = express.Router();
var app = express();

describe('Page model', function() {
    describe('Validations', function() {
    
    // validation tests using the same document.
    var page;
    beforeEach(function() { page = new Page(); });


    
        // pass done to handle potential async issues
        it('errors without title', function(done) { 
            // .validate is a method that will check to see if page, an instance of new Page, has been constructed correctly in correspondance to the pageSchema
            page.validate(function (err) {
                expect(err.errors).to.have.property('title');
                done();
            });
        });
            
        // check to see if content is required
        it('errors without content', function(done) {
            page.validate(function (err) {
                expect(err.errors).to.have.property('content');
                done();
            });
        });

    });


    describe('Statics', function() {
    // creating test data before each test
    // since Page.create is an async operation we must make certain it finishes before moving on. Mocha allows us to pass 'done' through the callback, which we invoke once the promise is completed.
    beforeEach(function(done) {
        Page.create({
            title: 'foo',
            content: 'bar',
            tags: ['foo', 'bar']
        }, done );
    });

    // afterEach will clear the collections so that we can make certain that we expecting the right output. if we keep doing beforeEach, that collection will continue to grow and it will be difficult to manage expectations
    afterEach(function(done){
        Page.remove({})
        .exec();
        done();
    });

        describe('findByTag', function() {
            it('gets pages with the search tag', function(done) {
                // used the Page.findByTag() aka pageSchema.statics.findByTag() ... this will return an array, of which we can test the length
                Page.findByTag('foo')
                .then(function (pages) {
                    expect(pages).to.have.length(1);
                    done();
                }).then(null, done);
            });

            it('does not get pages without the search tag', function(done) {
                Page.findByTag('falafel')
                .then(function (pages) {
                    expect(pages).to.have.lengthOf(0);
                    done();
                }).then(null, done);                
            });
        });
    });

    describe('Methods', function() {
    
    // the Methods test spec suite requires us to generate 3 collections that we can use to test the methods built by the programmer
    beforeEach(function(done) {
        // we utilize promises to handle asynchronous issues with testing. essentially, we want to make certain that each page has been generated before testing. How can we do this?

        // Page.create({}) => Page defines a model from pageSchema
        // .create is creating a new document that is automatically saved to the DB if valid
        // we store this promise into pagePromise so that we may use Promise.all with the array of promises that will be needed to define these specs
        var pagePromise = Page.create({
            title: 'foo',
            content: 'bar',
            tags: ['foo', 'bar']
        });

        var page2Promise = Page.create({
            title: 'dogs',
            content: 'odie',
            tags: ['dog', 'animal']
        });

        var page3Promise = Page.create({
            title: 'cats',
            content: 'meow',
            tags: ['cat', 'animal']
        });

        // store the output of the promises into this array which we can access later in our tests via myPages[0], etc.

        
        // Promise.all will wait for all 3 promises to resolve before moving on
        // We will store the output of the resolved promises into 'pages'
        Promise.all([pagePromise, page2Promise, page3Promise])
                .then(function(pages) {
                   var myPages = pages;
                }).then(done, done);  
                 
        }); // end of beforeEach

        afterEach(function(done){
            Page.remove({})
            .exec();
            done();
        });


        describe('findSimilar', function() {
            it('never gets itself', function() {
                console.log(Page.findSimilar('dog'));         
            });


            xit('gets other pages with any common tags', function() {});


            xit('does not get other pages without any common tags', function() {});
        });
    });

    describe('Virtuals', function() {
        describe('route', function() {
            xit('returns the url_name prepended by "/wiki/"', function() {});
        });
    });

    describe('Hooks', function() {
        xit('it sets urlTitle based on title before validating', function() {});
    });
});