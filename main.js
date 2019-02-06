var buttons =["aapl","msft"]

function displayButtons(){
    $("#stockButtons").empty()
    for (let i=0; i<buttons.length; i++){
        var newButton= $("<button>")
        newButton.text(buttons[i])
        newButton.addClass("stock-button")
        $("#stockButtons").append(newButton)
    }
}
    displayButtons()

const addButton = function(event) {
    event.preventDefault()
    var stock= $("#stockInput").val()
    console.log ("Hello")
    buttons.push(stock)
    displayButtons()
   
}













$('#addStock').on('click', addButton);



// Click event for stock buttons.
$(document).on("click", ".stock-button", function(){
    var stock=$(this).text()


    console.log(stock)

   $.get(`https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,chart&range=1m&last=10`,function(data){
       console.log(data)
   })
})