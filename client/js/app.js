var myApp = angular.module("myApp",[]);

myApp.controller("myController",function($scope, $http, $httpParamSerializerJQLike){

	console.log("in my controller");

	function init(){

		$scope.newUser = {};
		$scope.clickedUser ={};
		$scope.message="";

		//$scope.users = [
			//{username: "Moin", fullName:"Moin Mahmud", email:"tanvee@uleth.ca"},
			//{username: "Rayhana", fullName:"Rayhana Sharmin", email:"sharmin@uleth.ca"},
			
		//];
	
		$http.get("http://127.0.0.1:3000/read/").then(function(response){

			$scope.users = response.data;
			console.log($scope.users);
		});
	}

	init();

	
	$scope.saveUser = function(){

		//console.log($scope.newUser);
		//$scope.users.push($scope.newUser);
		$http({
			url: 'http://127.0.0.1:3000/create/',
			method: 'POST',
			data: $httpParamSerializerJQLike($scope.newUser),
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}

		}).then(function successCallback(response){
		//.success(function(response){

			console.log(response);
			init();
			$scope.message = "New User Added successfully!";
		});

		//console.log("waht is happening!!!");
	};

	$scope.selectedUser = function(user){

		console.log(user);
		$scope.clickedUser=user;
	};
	$scope.updateUser = function(){

		//$scope.message="user updated successfully";

		$http({
			url: 'http://127.0.0.1:3000/update/',
			method: 'POST',
			data: $httpParamSerializerJQLike($scope.clickedUser),
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}

		}).then(function successCallback(response){
		//.success(function(response){

			console.log(response);
			init();
			$scope.message = "User Updated successfully!";
		});

		
	};
	$scope.deleteUser = function(){

		//$scope.users.splice($scope.users.indexOf($scope.clickedUser),1);
		//$scope.message="User deleted successfully";

		$http({
			url: 'http://127.0.0.1:3000/delete/',
			method: 'POST',
			data: $httpParamSerializerJQLike({'_id': $scope.clickedUser._id}),
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}

		}).then(function successCallback(response){
		//.success(function(response){

			console.log(response);
			init();
			$scope.message = "User Deleted successfully!";
		});
	};
	$scope.clearMessage = function(){

		$scope.message="";
	};
}

	);