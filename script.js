const quotecontainer = document.getElementById('Quote-container');
const quotetext = document.getElementById('quote');
const authoretext = document.getElementById('Author');
const twiiterbtn = document.getElementById('twitter');
const newQoutebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

// show loading
function loading() {
    loader.hidden = false
    quotecontainer.hidden = true
}

//hide loading 
function complete() {
    if(!loader.hidden) {
        quotecontainer.hidden = false;
        loader.hidden = true;
    }
}
// Get Quote From api
async function getQuote() {
    loading();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor === "") {
            authoretext.innerText = 'Unknown'
        }
        else{
            authoretext.innerText = data.quoteAuthor
        }
        if(data.quoteText.length > 120) {
            quotetext.classList.add('long-quote')
        }
        else {
            quotetext.classList.remove('long-quote')
        }
        quotetext.innerText = data.quoteText
        //stop loader
        complete();

    } catch (error) {
        getQuote();
    }
}

function tweetQuote() {
    const quote = quotetext.innerText
    const author = authoretext.innerText
    const twittUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twittUrl,'_blank')
}
newQoutebtn.addEventListener('click' , getQuote);
twiiterbtn.addEventListener('click' , tweetQuote);


//on Load

getQuote();
