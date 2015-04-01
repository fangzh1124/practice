function CompareLength(){
	this.isSameLength = function(length1, length2){
		var num1 = convertLengthToCM(length1),
			  num2 = convertLengthToCM(length2);

		if(num1 == num2){
			return true;
		}
		return false;
	}

	function convertLengthToCM(length){
		var num;

		if(length.indexOf('cm') > -1){
			num = parseFloat(length.slice(0,length.length-2));
		}else if(length.indexOf('dm') > -1){
			num = parseFloat(length.slice(0,length.length-2)) * 10;
		}else{
			num = parseFloat(length.slice(0,length.length-1)) * 100;
		}
		return num;
	}
}

module.exports = CompareLength;