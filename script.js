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
]

cryptoArray.forEach(cryptoObject => {
    let cryptoChange = new WebSocket(cryptoObject.change);
    let webSocket = new WebSocket(cryptoObject.link);

    webSocket.onmessage = (event) => {
        const priceElement = document.getElementById(cryptoObject.element)

        let responseObject = JSON.parse(event.data);
        let price = parseFloat(responseObject.p).toFixed(2);
        priceElement.innerHTML = price+" $ ";
        if (price>lastPrice){
            priceElement.style.color = "#03da81"; 
        }
        if (price<lastPrice){
            priceElement.style.color = "#cf6679"; 
        }
        lastPrice = price   
    }

    cryptoChange.onmessage = (event) =>{
        const changeElement = document.querySelector("."+cryptoObject.element)
        const cryptoLogoElement = document.querySelector("."+cryptoObject.ticker+"-logo")
        let responseObject = JSON.parse(event.data);
        let change = parseFloat(responseObject.P).toFixed(2);
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


function addOnMessageEvent(element){
    
}
