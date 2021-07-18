let lastPrice = null;
let cryptoArray = [
    {
        element: 'btc-price',
        ticker: 'btc',
        link: 'wss://stream.binance.com:9443/ws/btcusdt@trade',
        change: 'wss://stream.binance.com:9443/ws/btcusdt@ticker'
    },
    {
        element: 'eth-price',
        ticker: 'eth',
        link: 'wss://stream.binance.com:9443/ws/ethusdt@trade',
        change: 'wss://stream.binance.com:9443/ws/ethusdt@ticker',
    },
    {
        element: 'bnb-price',
        ticker: 'bnb',
        link: 'wss://stream.binance.com:9443/ws/bnbusdt@trade',
        change: 'wss://stream.binance.com:9443/ws/bnbusdt@ticker'
    },
    {
        element: 'ada-price',
        ticker: 'ada',
        link: 'wss://stream.binance.com:9443/ws/adausdt@trade',
        change: 'wss://stream.binance.com:9443/ws/adausdt@ticker'
    },
    {
        element: 'doge-price',
        ticker: 'doge',
        link: 'wss://stream.binance.com:9443/ws/dogeusdt@trade',
        change: 'wss://stream.binance.com:9443/ws/dogeusdt@ticker'
    },
    {
        element: 'xrp-price',
        ticker: 'xrp',
        link: 'wss://stream.binance.com:9443/ws/xrpusdt@trade',
        change: 'wss://stream.binance.com:9443/ws/xrpusdt@ticker'
    },
    {
        element: 'ltc-price',
        ticker: 'ltc',
        link: 'wss://stream.binance.com:9443/ws/ltcusdt@trade',
        change: 'wss://stream.binance.com:9443/ws/ltcusdt@ticker'
    },
    {
        element: 'dot-price',
        ticker: 'dot',
        link: 'wss://stream.binance.com:9443/ws/dotusdt@trade',
        change: 'wss://stream.binance.com:9443/ws/dotusdt@ticker'
    },
]

async function getCryptoPrices(cryptoArray){
    cryptoArray.forEach(cryptoObject => {
        let cryptoChange = new WebSocket(cryptoObject.change);
        let webSocket = new WebSocket(cryptoObject.link);
    
        webSocket.onmessage = (event) => {
            const priceElement = document.getElementById(cryptoObject.element)
    
            let responseObject = JSON.parse(event.data);
            let price = parseFloat(responseObject.p).toFixed(2);
            if (!price || !priceElement) return;
            if (price && priceElement) priceElement.innerHTML = price+" $ ";
            if (price>lastPrice) priceElement.style.color = "#03da81"; 
            if (price<lastPrice) priceElement.style.color = "#cf6679"; 
            lastPrice = price   
        }
    
        cryptoChange.onmessage = (event) =>{
            const changeElement = document.querySelector("."+cryptoObject.element)
            const cryptoLogoElement = document.querySelector("."+cryptoObject.ticker+"-logo")
            let responseObject = JSON.parse(event.data);
            let change = parseFloat(responseObject.P).toFixed(2);
            if (!change || !changeElement || !cryptoLogoElement) return;
            changeElement.innerText = " "+change +"%";
            if (change>0){
                cryptoLogoElement.style.borderColor = "#03da81"; 
                changeElement.style.color = "#03da81"; 
            }
            if (change<0){
                cryptoLogoElement.style.borderColor = "#cf6679"; 
                changeElement.style.color = "#cf6679"; 
            }
        }
    });
}



window.onload = function() {
    getCryptoPrices(cryptoArray);
};


window.onscroll = function() {
    scrollFunction()
};

function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function scrollFunction() {
    const navBar = document.querySelector(".nav-bar");
    const bannerElement = document.querySelector(".banner-section");
    const bannerTranslate = (-document.documentElement.scrollTop)/2;
    if (!navBar) return;
    if (document.body.scrollTop > 380 || document.documentElement.scrollTop > 380) {
        navBar.style.background = "#3b04db";
        navBar.style.height = "72px";
        navBar.classList.add("shadow-bottom");
    } else {
        navBar.style.background = "transparent";
        navBar.style.height = "100px";
        navBar.classList.remove("shadow-bottom");
    }
    if (bannerTranslate<0) bannerElement.style.transform = "translateY("+bannerTranslate+"px)";
}