


function o_regform(){
	reg.style.display = 'block';
	setTimeout("regform.classList.add('animate');", 20);
	}
function c_regform(){
	regform.classList.remove('animate');	
	reg.style.display = 'none';
	}


function o_page(elemtId){
	document.getElementById(elemtId).style.display = 'block';
	}	
function c_page(elemtId){
	document.getElementById(elemtId).style.display = 'none';
	}

