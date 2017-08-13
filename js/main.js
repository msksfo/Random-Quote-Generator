var newQuoteButton = document.getElementById('newQuoteButton');
var paragraph = document.getElementById('paragraph');
var footer = document.getElementById('footer');
var tweet = document.getElementById('tweet');

var quoteText;
var quoteAuthor;
var currentQuote;

var myRequest = new XMLHttpRequest();
/*------------------------------------------------------------------------*/



newQuoteButton.addEventListener('click', function(){

	resetHTML();

	myRequest.open('GET', 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');

	
	myRequest.onload = function(){
		if (myRequest.status >= 200 && myRequest.status < 400){

			var quoteData = JSON.parse(myRequest.responseText);
			
			quoteText = quoteData.quoteText;

			if (quoteData.quoteAuthor == ''){
				quoteAuthor = 'Anonymous'
			} else {
				quoteAuthor = quoteData.quoteAuthor;
			}
			

			renderHTML(quoteData);

		} else {
			console.log('Server error');
		}
	
	} //closes request.onload
	myRequest.send();
}) //closes button click event function

tweet.addEventListener('click', function(){
	document.getElementById('tweet').href = 'https://twitter.com/intent/tweet?text=' + currentQuote;
})


function renderHTML(data){
	var footersymbol = '~ ';
	var footerstring = footersymbol + quoteAuthor;
	var quotes = '\"';
	var paragraphstring = quotes + quoteText + quotes;

	paragraph.insertAdjacentHTML('beforeend', paragraphstring);
	footer.insertAdjacentHTML('beforeend', footerstring);

	currentQuote = paragraphstring + ' ' + footerstring;
} 

function resetHTML(){
	paragraph.innerHTML = '';
	footer.innerHTML = '';
}





