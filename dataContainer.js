/*
_container = [
	key:[
		0:dataVer0
		1:dataVer1
		2:dataVer2
	]
]

*/

var dataContainer = (function() {
	
	var _container= [];

	var publicMethods = {};

	publicMethods.addData = function(key, data){
		var dataUnit = []
		if(this.isKeyExist(key)){
			dataUnit = _container[key];
		}
		dataUnit.push(data);
		_container[key] = dataUnit;
	}

	publicMethods.getData = function(key, version){
		if(version === undefined){
			version = _container[key].length-1;
		}
		if(!this.isDataExist(key, version)){
			return null;
		}
		return _container[key][version];
	}

	publicMethods.getLatestVersion = function(key){
		if(!this.isKeyExist(key)){
			return -1;
		}
		return _container[key].length-1;
	}

	publicMethods.deployVal = function(id,key,version){
		var data = this.getData(key, version);
		$('#'+selectId).val(data);
	}

	publicMethods.deployOptions = function(selectId, key, version){
		var data = this.getData(key, version);
		if(Array.isArray(data) && data.length > 0){
			data.each(function(keyVal , text){
				$('#'+selectId).append($("<option/>", {
			        value: keyVal,
			        text: text
		    	}));
			})
		}
	}

	publicMethods.deployInput = function(key, inputId, version){
		var data = this.getData(key, version);
		if( typeof data === "string" || 
			typeof data === "number" ||  
			typeof data === "boolean" ){
			$('#'+inputId).val(data);
		}
	}

	publicMethods.isKeyExist = function(key){
		return _container[key] !== undefined;
	}

	publicMethods.isDataExist = function(key,version){
		if(this.isKeyExist(key)){
			return _container[key] !== undefined;
		}
		return false;
	}

	return publicMethods;
}());


dataContainer.addData('key1',{'a':10,'b':20});
dataContainer.addData('key1',{'a':100,'b':200});
dataContainer.addData('key1',{'a':1000,'b':2000});

dataContainer.addData('key2',{'c':'c1','d':'d1'});
dataContainer.addData('key2',{'c':'c2','d':'d2'});
dataContainer.addData('key2',{'c':'c3','d':'d3'});

console.log(dataContainer.getData('key1'))
console.log(dataContainer.getData('key1',0))