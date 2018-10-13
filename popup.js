var buttonTemp = document.getElementById('button1');

buttonTemp.onclick = function(){
    var input = document.getElementById('trackingNum');
    var output = document.getElementById('track');
    output.textContent = 'Tracking number 1: ' + input.value;
    
    var url = `http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<?xml version="1.0" encoding="UTF-8" ?>
    <TrackRequest USERID="128CHROM2182"><TrackID ID="${input.value}"></TrackID></TrackRequest>`;

    var myTest = new XMLHttpRequest();
    myTest.open('GET', 'ShippingAPI.xml');

    myTest.responseType = 'text';
    console.log(myTest.responseText);
    if (myTest.status === 200) {
        console.log(myTest.responseText);
    }
   
}