function CompareLength(){
	var parameters = Array.prototype.slice.call(arguments);

	this.isSameLength = function(length1, length2){
		var lengthDetail1 = lengthParser(length1),
			  lengthDetail2 = lengthParser(length2),
				result = true;

		if(lengthDetail1[0] != lengthDetail2[0] || lengthDetail1[1] != lengthDetail2[1]){
			lengthDetail1 = convertLength(lengthDetail1);
			lengthDetail2 = convertLength(lengthDetail2);
			if(lengthDetail1[0] != lengthDetail2[0]){
				result = false;
			}
		}

		return result;
	}

	function lengthParser(length){
		var digit, unit;
		if(length.indexOf('cm') > -1 || length.indexOf('dm') > -1){
			digit = length.slice(0,length.length-2);
			unit = length.slice(length.length-2);
		}else{
			digit = length.slice(0,length.length-1);
			unit = length.slice(length.length-1);
		}
		digit = parseFloat(digit);

		return [digit,unit];
	}

	function convertLength(lengthDetail){
		if(lengthDetail[1] == 'dm'){
			lengthDetail[0] *= 10; 
		}else if(lengthDetail[1] == 'm'){
			lengthDetail[0] *= 100; 
		}
		return lengthDetail;
	}
}

module.exports = CompareLength;