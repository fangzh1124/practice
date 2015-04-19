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

	it('should park in more avaible parkinglot Given two parkinglots with different size When store a car by smart Parking boy', function(){
		var smallParkinglot = new ParkingLot(1);
		var bigParkinglot = new ParkingLot(2);
		var smartParkingBoy = new SmartParkingBoy([smallParkinglot, bigParkinglot]);
		var car = new Car();
		var ticket = smartParkingBoy.storeCar(car);

		bigParkinglot.pickCar(ticket).should.equals(car);
	});	

	it('should not store a car Given a full parkinglot When store a car by smart Parking boy', function(){
		var smartParkingBoy = new SmartParkingBoy([new ParkingLot(1)]);
		smartParkingBoy.storeCar(new Car());

		smartParkingBoy.storeCar(new Car()).should.equals('');
	});	



	// Super Parking Boy
	it('should pick the same car when stored a car by a super parking Boy', function(){
		var superParkingBoy = new SuperParkingBoy([new ParkingLot(1)]);
		var car = new Car();

		superParkingBoy.pickCar(superParkingBoy.storeCar(car)).should.equals(car);
	});

	it('should pick the same car given two parkingLots when stored a car to by a super parking Boy', function(){
		var superParkingBoy = new SuperParkingBoy([new ParkingLot(1),new ParkingLot(1)]);
		var car = new Car();

		superParkingBoy.pickCar(superParkingBoy.storeCar(car)).should.equals(car);
	});

	it('should pick the same car from higher free rate parkinglot when stored a car by a super parking Boy', function(){
		var lowFreeRateParkingLot = new ParkingLot(3);
		lowFreeRateParkingLot.storeCar(new Car());
		var highFreeRateParkingLot = new ParkingLot(2);

		var superParkingBoy = new SuperParkingBoy([lowFreeRateParkingLot, highFreeRateParkingLot]);
		var car = new Car();

		highFreeRateParkingLot.pickCar(superParkingBoy.storeCar(car)).should.equals(car);
	});

});




// Solution Part

// Super Parking Boy
function SuperParkingBoy(parkinglots){
	SmartParkingBoy.call(this, parkinglots);

	this.getMostFreeParkingLot = function(){
		var mostFreeParkingLot = '';
		var freeRate = 0;
		for (var i = 0; i < this.parkingLots.length; i++) {
			if(this.parkingLots[i].freeRate() > freeRate){
				mostFreeParkingLot = this.parkingLots[i];
				freeRate = this.parkingLots[i].freeRate();
			}
		}
		return mostFreeParkingLot;
	}

	this.storeCar = function(car){
		var ticket = '';
		var mostFreeParkingLot = this.getMostFreeParkingLot();
		if(mostFreeParkingLot){
			ticket = mostFreeParkingLot.storeCar(car);
		}
		return ticket;
	}
}

// Smart Parking Boy
function SmartParkingBoy(parkinglots){
	ParkingBoy.call(this, parkinglots);

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
}

// Parking Boy
function ParkingBoy(parkinglots){
	this.parkingLots = parkinglots;

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

	this.freeRate = function(){
		return this.availableSpace() / this.size;
	}

};

function Car(){};

function Ticket(){};