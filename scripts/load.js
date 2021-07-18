
const cryptoList = [
  {
    name: "Bitcoin",
    ticker: "BTC",
    image : "Bitcoin.png"
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    image : "Ethereum.png"
  },
  {
    name: "Cardano",
    ticker: "ADA",
    image : "Cardano.png"
  }  
]

//document.addEventListener("onpageload", showContent())

function showContent() {
  const templateElement = document.querySelector(".card-item-template");
  const cryptoContentContainer = document.querySelector(".content-container");
  if (!templateElement || !cryptoContentContainer) return;
  cryptoList.forEach(crypto => {
    var templateContent = templateElement.content.cloneNode(true);
    if (!templateContent) return;
    const title = templateContent.querySelector(".crypto-title");
    const ticker = templateContent.querySelector(".crypto-sub-title");
    const logoImage = templateContent.querySelector(".crypto-logo");
    ticker.textContent = crypto.ticker;
    title.textContent = crypto.name;
    logoImage.src = "img/" + crypto.image;

    cryptoContentContainer.appendChild(templateContent);
    console.log(crypto);
  });
  }