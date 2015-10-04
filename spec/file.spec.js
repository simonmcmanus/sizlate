// var express = require('../lib/express');
// var cheerio = require("cheerio");
//
// describe('When given a file with partials', function() {
// 	it("it should pull them in properly", function(done) {
//
// 		express('view-a', {
// 			settings : {
// 				views : "/spec/fixtures",
// 				'view engine':"html"
// 			},
// 			selectors : {
// 				'#partials': {
// 					partial: 'partial-a',
// 					data: [
// 						{ h2: 'anna' },
// 						{ h2: 'bob' },
// 						{ h2: 'carol' }
// 					]
// 				}
// 			}
// 		}, function( err, html ){
//
// 			var $domNode,
// 				$ = cheerio.load(html);
//
// 			$domNode = $(".partial.a");
// 			expect($domNode.length).toEqual(3);
//
// 			$domNode = $("#partials");
// 			expect($domNode.length).toEqual(1);
//
// 			$domNode = $(".partial");
//
// 			expect($domNode.eq(0).find("h2").text()).toEqual("anna");
//
// 			expect($domNode.eq(1).find("h2").text()).toEqual("bob");
//
// 			expect($domNode.eq(2).find("h2").text()).toEqual("carol");
//
// 			done();
// 		});
// 	});
// });
