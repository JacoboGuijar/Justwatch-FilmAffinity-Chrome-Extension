let titulo = "titulo";
let url = "url";
let justwatchurl = "https://www.justwatch.com/es/";


getMovie();

//chrome.runtime.sendMessage({message:"fetch_pls"}, () =>console.log("cool"));

function getMovie() {
    console.log("Obtaining Filmaffinity and justwatch url and movie title");

    let params = {
      active: true,
      currentWindow: true
    }

    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
      console.log("got tabs");

      titulo = tabs[0].title;
      url = tabs[0].url;

      console.log("TITLE: " + titulo);
      
      console.log("URL: " + url);

      console.log(titulo.slice(-34,-29));
      isAMovieORaSeries(titulo);
      
      
    }
  }

function isAMovieORaSeries(titulo){
	//The justwatch url changes depending on if it is a show or a movie.
	//With this in mind we need to differentiate them
 	console.log("Is it a movie or a show?");

 	if (titulo.slice(-34,-29) === "Serie"){

 		console.log("It's a show:" + titulo.slice(0,-15));
 		document.getElementById("demo").innerHTML = titulo.slice(0,-15);
 		document.getElementById("isTvORSerie").innerHTML = "It's a show";

 		justwatchurl = justwatchurl.concat("serie/", depurate(titulo.slice(0,-36)));
 		getJustwatchUrl(justwatchurl);


 	}
 	else if(titulo.slice(-24,-23)==="C"){

 		console.log("Es un cortometraje" + titulo.slice(0,-15));
 		document.getElementById("demo").innerHTML = titulo.slice(0,-15);
 		document.getElementById("isTvORSerie").innerHTML = "It's a short.";
 		

 		console.log("Currently justwatch does not support shorts in it's search options");
 		document.getElementById("justurl").innerHTML = "Currently justwatch does not support shorts in it's search options";
 	}
 	else{

 		console.log("It's a movie" + titulo.slice(0,-15));
 		document.getElementById("demo").innerHTML = titulo.slice(0,-15);
 		document.getElementById("isTvORSerie").innerHTML = "It's a movie";


 		justwatchurl = justwatchurl.concat("pelicula/", depurate(titulo.slice(0,-22)));
 		console.log(justwatchurl);
 		getJustwatchUrl(justwatchurl);
 	}

}

function getJustwatchUrl(url){
	
	//Write the url so we can easily find it in case any errors appear
	console.log(url);
	document.getElementById("justurl").innerHTML = url;
	document.getElementById("justurl").href = url

    //This call generates an alert and does not seem I can bypass it: https://stackoverflow.com/questions/58270663/samesite-warning-chrome-77
    document.getElementById("webframe").src = url;
    console.log(document.getElementById("webframe").innerHTML);
 
}


function depurate(text){
//In Spanish there are multiple characters that are not in the ascii code
//As well as many other symbols that are avoided in the justwatch url naming scheme
//If more characters where discovered to generate errors in the url generation they will be added here


	//All possible vowels with accents.
	text = text.replace(/\u00C1/g , "A");
	text = text.replace(/\u00E1/g , "a");
	text = text.replace(/\u00C9/g , "E");
	text = text.replace(/\u00E9/g , "e");
	text = text.replace(/\u00CD/g , "I");
	text = text.replace(/\u00ED/g , "i");
	text = text.replace(/\u00D3/g , "O");
	text = text.replace(/\u00F3/g , "o");
	text = text.replace(/\u00DA/g , "U");
	text = text.replace(/\u00FA/g , "o");

	//Ñ and ñ.
	text = text.replace(/\u00F1/g , "n");
	text = text.replace(/\u00D1/g , "n");

	//All punctation characters.
	text = text.replace(/!/g,"");
	text = text.replace(/¡/g,"");
	text = text.replace(/\u003F/g,"");// ?
	text = text.replace(/\u00bf/g,""); // ¿
	text = text.replace(/\u002C/g,"");//coma
	text = text.replace(/\u002E/g,"");//dots
	text = text.replace(/\u003A/g,"");//colon
	text = text.replace(/\u003B/g,"");//semicolon
	text = text.replace(/\u0028/g,"");//(
	text = text.replace(/\u0029/g,"");//)

	//Last thing, substitute any spaces.
	text = text.replace(/ /g, "-");

	return text;


}