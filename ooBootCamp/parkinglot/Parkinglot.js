// Test Part
var should = require('chai').should();

describe("Parkinglot", function() {
	var parkinglot = new Parkinglot(1);
	var car1 = new Car();
	var car2 = new Car();
	var ticket = new Ticket();

	it('should store a car when given a car', function(){
		parkinglot.pickCar(parkinglot.storeCar(car1)).should.equals(car1);
	});

	it('should return nothing given a car when parkinglot is full', function(){
			parkinglot.storeCar(car2).should.equals('');
		});

	it('should return nothing given a ticket when ticket is not valid', function(){
		parkinglot.pickCar(ticket).should.equals('');
	});
});


// Solution Part
function Parkinglot(size){
	this.size = size;
	this.cars = [];

	this.storeCar = function(car){
		if(this.size > this.cars.length){
			var ticket = new Ticket();
			this.cars.push([ticket, car]);
			return ticket;
		}
		return '';
	}

	this.pickCar = function(ticket){
		return '';
	}
};

function Car(){};

function Ticket(){};