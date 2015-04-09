// Test Part
var should = require('chai').should();

describe("ParkingLot", function() {
	var parkingLot = new ParkingLot(1);
	var car1 = new Car();
	var car2 = new Car();
	var ticket = new Ticket();
	var parkingBoy = new ParkingBoy();

	
	it('should pick the same car when stored a car', function(){
		parkingLot.pickCar(parkingLot.storeCar(car1)).should.equals(car1);
	});

	it('should return nothing given a car when parkingLot is full', function(){
		parkingLot.storeCar(car1);
		parkingLot.storeCar(car2).should.equals('');
	});

	it('should return nothing given a ticket when ticket is not valid', function(){
		parkingLot.pickCar(ticket).should.equals('');
	});

	//ParkingBoy
	it('should pick the same car when stored a car by a parkingBoy', function(){
		var parkingBoy = new ParkingBoy();
		var parkingLot1 = new ParkingLot(1);
		var parkingLot2 = new ParkingLot(1);
		parkingBoy.addParkingLot(parkingLot1);
		parkingBoy.addParkingLot(parkingLot2);
		var car = new Car();

		parkingBoy.pickCar(parkingBoy.storeCar(car)).should.equals(car);

	});
});

// Solution Part
function ParkingBoy(){
	this.parkingLots = [];

	this.addParkingLot = function(parkingLot){
		this.parkingLots.push(parkingLot);
	}
	this.storeCar = function(car){
		var ticket = '';
		for (var i = 0; i < this.parkingLots.length; i++) {
			if(ticket = this.parkingLots[i].storeCar(car)){
				break;
			}
		}
		return ticket;
	}

	this.pickCar = function(ticket){
		var car = '';
		for (var i = 0; i < this.parkingLots.length; i++) {
			if(car = this.parkingLots[i].pickCar(ticket)){
				break;
			}
		}
		return car;
	}
}

function ParkingLot(size){
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
		var results = this.cars.filter(function (carWithTicket, i) {
	    return carWithTicket[0] === ticket;
	  });

	  if (results.length > 0) {
	    var index = this.cars.indexOf(results[0]);
	    return this.cars.splice(index, 1)[0][1];
	  }
	  return '';
	}
};

function Car(){};

function Ticket(){};