const fs = require('fs');

var urlData = JSON.parse(fs.readFileSync('./url-data.json','utf8')),
	writeURLs=(()=>{
		var perhaps=JSON.parse(fs.readFileSync('./url-data.json','utf8'));
		if(urlData == perhaps)return false;
		fs.writeFileSync('./url-data.json', JSON.stringify(urlData, null, '\t'), 'utf-8');
	}),
	reloadURLs = (()=>urlData = JSON.parse(fs.readFileSync('./url-data.json', 'utf8'))),
	urlExpire=10800000;

setInterval(()=>{
	reloadURLs();
	
	urlData.forEach((e,i)=>{
		var expires = e.time + urlExpire,
			timeLeft = expires - Date.now(),
			expired = timeLeft <= 0;
		
		if(expired){ // short for expired==true
			urlData.splice(i,1); // remove value from array then write
			writeURLs(); // magic url writing here
		}
	});
},2000);