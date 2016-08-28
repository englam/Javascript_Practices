function caculate(r){
	var area;
	if (r <=0){
		return 0;
	}
	else{
		area = Math.PI *r *r;
		return area;
	}
}

var radius = 5.2;
var theArea = caculate(radius);

console.log ("The area is :" + theArea);