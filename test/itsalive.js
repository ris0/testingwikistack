// var chai = require('chai');
// var spies = require('chai-spies');
// var expect = require('chai').expect;

// chai.use(spies);

// // you can create a "spyable" version of any function by capturing the return value of chai.spy(theFn)
// // you can also "replace" a function with a spy imposter with chai.spy.on

// describe('Testing suite capabilities', function () {
//     it('confirms basic arithmetic', function () {
//         expect(2+2).to.equal(4);
//     });

//     it('confirms setTimeout\'s timer accuracy', function (done) {
//     var start = new Date();
//     setTimeout(function () {
//         var duration = new Date() - start;
//         expect(duration).to.be.closeTo(1000, 50);
//         done();
//     }, 1000);
// 	});
// });

// describe('Learning to use Spy', function (){
// 	it('forEach should invoke the CB FN on each element of the ARR', function(){
// 		var arr = [1,2,3,4,5];
// 		function logNth (val, idx) {
// 			console.log("k and r " + val + idx);
// 		}

// 		var spy = chai.spy(logNth);
// 		arr.forEach(spy);
// 		expect(spy).to.have.been.called(arr.length);


// 	});
// });

