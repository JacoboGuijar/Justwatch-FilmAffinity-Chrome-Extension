
console.log("background running...");

// chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
// 	if (request.message === 'fetch_pls'){
// 		fetch('https://www.justwatch.com/es/pelicula/origen')
// 			.then(function (response){
// 				return response.text();
// 			})
// 			.then(function (html){
// 				console.log(html);
// 			})
// 			.catch(function (err){
// 				 console.log("could not fetch " + err);			
// 			})
// 	}
// });