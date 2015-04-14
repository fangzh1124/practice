// Test Part
var should = require('chai').should();

describe("ParkingLot", function() {
	var parkingLot = new ParkingLot(1);
	var car1 = new Car();
	var car2 = new Car();
	var ticket = new Ticket();
	var parkingBoy = new ParkingBoy();

	// Parking Lot Tests
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

	// Parking Boy Tests
	it('should pick the same car when stored a car by a parkingBoy', function(){
		var parkingBoy = new ParkingBoy([new ParkingLot(1)]);
		var car = new Car();

		parkingBoy.pickCar(parkingBoy.storeCar(car)).should.equals(car);
	});

	// Smart Parking Boy Tests
	it('should pick the same car when stored a car by a smart parking Boy', function(){
		var smartParkingBoy = new SmartParkingBoy([new ParkingLot(1)]);
		var car = new Car();

		smartParkingBoy.pickCar(smartParkingBoy.storeCar(car)).should.equals(car);
	});	

	it('should park in a more avaible parkinglot Given two parkinglots with different size When store a car by smart Parking boy', function(){
		var smartParkingBoy = new SmartParkingBoy([new ParkingLot(1), new ParkingLot(2)]);
		smartParkingBoy.storeCar(new Car());

		smartParkingBoy.parkingLots[1].availableSpace().should.equals(1);
	});	

	it('should not store a car Given a full parkinglot When store a car by smart Parking boy', function(){
		var smartParkingBoy = new SmartParkingBoy([new ParkingLot(1)]);
		smartParkingBoy.storeCar(new Car());

		smartParkingBoy.storeCar(new Car()).should.equals('');
	});			
});


// Solution Part

// Smart Parking Boy
function SmartParkingBoy(parkinglots){
	this.parkingLots = parkinglots;

	this.getMostAvailableParkingLot = function(){
		var mostAvailableParkingLot = '';
		var freeSpace = 0;
		for (var i = 0; i < this.parkingLots.length; i++) {
			if(this.parkingLots[i].availableSpace() > freeSpace){
				mostAvailableParkingLot = this.parkingLots[i];
				freeSpace = this.parkingLots[i].availableSpace();
			}
		}
		return mostAvailableParkingLot;
	}

	this.storeCar = function(car){
		var ticket = '';
		var mostAvailableParkingLot = this.getMostAvailableParkingLot();
		if(mostAvailableParkingLot){
			ticket = mostAvailableParkingLot.storeCar(car);
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

// Parking Boy
function ParkingBoy(parkinglots){
	this.parkingLots = parkinglots;

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

// Parking Lot
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

	this.availableSpace = function(){
		return this.size - this.cars.length;
	}
};

function Car(){};

function Ticket(){};