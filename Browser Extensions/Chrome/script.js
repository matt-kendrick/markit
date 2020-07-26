function bookmark(){
	//hide code form by default
	document.getElementById('codeForm').style.display = 'none';
	
	//get current tab url
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

		//update the url span
		spUrl.innerHTML = tabs[0].url;

		const userCode = getCode();
		
		if(userCode !== null && userCode != ''){
			fetch('http://pastepad.mattkendrick.com/?code='+userCode+'&paste='+encodeURIComponent(tabs[0].url));
			setTimeout(() => { window.close(); }, 2000);
		}
		else
		{
			//show the code form with message for the user to provide their code
			document.getElementById('codeForm').style.display = 'block';
		}
	});
}

//saves user code to Local Storage
function setCode(code){
	localStorage.setItem('code',code);
	window.close();
}

//gets user code from Local Storage
function getCode(){
	return localStorage.getItem('code');
}

//setup event handlers once DOM is loaded
document.addEventListener('DOMContentLoaded', function(event) {
	var btnSetCode = document.getElementById('btnSetCode');
	var txtCode = document.getElementById('txtCode');
	var spUrl = document.getElementById('spUrl');

	txtCode.value = getCode();

	//setup listener for btnSetCode Button
	btnSetCode.addEventListener('click',function(){
		setCode(txtCode.value);
	});

	//try and bookmark it
	bookmark();
});