var should = require('chai').should();
var LengthComparator = require('../src/LengthComparator');

describe("LengthComparator", function() {
	var lengthComparator = new LengthComparator();

	it('should be the Same given 100cm and 100cm', function(){
		lengthComparator.isSameLength('100cm','100cm').should.equals(true);
	});

	it('should be the Same given 100cm and 10dm', function(){
		lengthComparator.isSameLength('100cm','10dm').should.equals(true);
	});

	it('should be the Same given 100cm and 1m', function(){
		lengthComparator.isSameLength('100cm','1m').should.equals(true);
	});

	it('should Not be the Same given 10cm and 11cm', function(){
		lengthComparator.isSameLength('10cm','11cm').should.equals(false);
	});

	it('should Not be the Same given 10cm and 10dm', function(){
		lengthComparator.isSameLength('10cm','10dm').should.equals(false);
	});

	it('should Not be the Same given 10cm and 1m', function(){
		lengthComparator.isSameLength('10cm','1m').should.equals(false);
	});
});