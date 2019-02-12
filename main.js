
//Make Request to API and get all symbols then push into array.
var validationList = []
$.get("https://api.iextrading.com/1.0/tops",function(data){
    
    for(let i=0; i<data.length; i++) {
       
        validationList.push(data[i].symbol)
    }
        console.log(validationList)
})

var buttons = ["AAPL", "MSFT"]

function displayButtons() {
    $("#stockButtons").empty()
    for (let i = 0; i < buttons.length; i++) {
        var newButton = $("<button>")
        newButton.text(buttons[i])
        newButton.addClass("stock-button")
        $("#stockButtons").append(newButton)
    }
}
displayButtons()

const addButton = function (event) {
    event.preventDefault()
    var stock = $("#stockInput").val()
    console.log("Hello")
    if(validationList.includes(stock.toUpperCase())){
        buttons.push(stock.toUpperCase())
       
    }
    else{
        alert("Error, not a stock symbol.")
    }
    displayButtons()

}








$('#addStock').on('click', addButton);

const render = function (response) {
    console.log("JustInsideRenderData", response)
    let companyName = response.quote.companyName
    let symbol = response.quote.symbol
    let price = response.quote.latestPrice
    let news = response.news

    $('#companyName').text(companyName)  

    $('#companySymbol').text(symbol)

    $('#latestPrice').text(price)
    $("#news").empty()
    for (let i=0; i<news.length; i++){
        $("#news").append(news[i].headline+"<br><br>")
    }
    

}

// Click event for stock buttons.
$(document).on("click", ".stock-button", function () {
    var stock = $(this).text()

    console.log(stock)

    $.get(`https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,chart&range=1m&last=10`, function (data) {
        console.log("justInsideAjaxCallData", data)
        console.log(data.quote.companyName)

    }).then(render)
})