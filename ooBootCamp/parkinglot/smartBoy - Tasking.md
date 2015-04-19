Given a car and a smart Parking Boy and a parkinglot
When store a car and pick the car by smart Parking boy
Then pick the same car


Given a car and a smart Parking Boy and two parkinglots
When store a car and pick the car by smart Parking boy
Then pick the same car


Given a car and a smart Parking Boy 
			and a parkinglot with 2 free space out of 2
			and anther parkinglot with 1 free space out of 2
When store a car by smart Parking boy
Then two parking lots have the same number of free space


Given a car and a smart Parking Boy and a full parking lot
When store a car by smart Parking boy
Then could not store a car


<- Given a car and a smart Parking Boy and two full parking lots
When store a car by smart Parking boy
Then could not store a car -> 


Given a car and a smart Parking Boy and an empty parking lot
When pick a car by smart Parking boy
Then could not pick a car








