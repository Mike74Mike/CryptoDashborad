/**
 * @author Mike T. <mikesbcmike@gmail.com>
 * @constant
 * @type {DOM SELECTION}
 * @default
 * @description: A Crypto dashboard using a 2 free apis links to the apis will be placed in the repository
 */
const primary = document.querySelector('#Primary-currency');
const secondary = document.querySelector('#Secondary-currency');
const submit = document.querySelector('.submit');
const number = document.querySelector('.cryptoNumber');
const CryptoCurrency = document.querySelector('#Crypto-currency')
const money = document.querySelector('#real-currency');
const para = document.querySelector('.enlarge');
secondary.disabled = true;
/**
 * @constructor
 * @functino {}
 * @description: An XMLHTTPREQUEST to utilize the API an convert USD to any Crypto Currency
 */
function conversion(){
    para.textContent = `${CryptoCurrency.value} to USD`

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });
    
   xhr.onload = function(){
    if(this.status === 200){
        var user = JSON.parse(this.responseText);
        /* If any digit is inputed into the primary input it will output the crypto value */
        if(/\d/g.test(primary.value)){
            secondary.value = user["Realtime Currency Exchange Rate"][ "5. Exchange Rate"] * primary.value;
            number.textContent = user["Realtime Currency Exchange Rate"][ "5. Exchange Rate"] * primary.value
        }
        
        
    }
   } 
    xhr.open("GET", `https://alpha-vantage.p.rapidapi.com/query?to_currency=${money.value}&function=CURRENCY_EXCHANGE_RATE&from_currency=${CryptoCurrency.value}`);
    xhr.setRequestHeader("x-rapidapi-host", "alpha-vantage.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "13f69135b2msh658acea140bd912p12e773jsn94dd3bcd5afe");
    
    xhr.send(data);
    
}
/**
 * @fetch 
 * @description: Used a fetch api to give news articles and information on crypto
 */
fetch("https://crypto-news-live3.p.rapidapi.com/news", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "crypto-news-live3.p.rapidapi.com",
		"x-rapidapi-key": "13f69135b2msh658acea140bd912p12e773jsn94dd3bcd5afe"
	}
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for(let i = 0; i < 6; i++){
            const news = document.querySelectorAll('a')[i]
            news.innerHTML = data[i].title
            news.href = data[i].url
        }
    })
    .catch(err => {
        console.error(err);
    });

submit.addEventListener('click', conversion)