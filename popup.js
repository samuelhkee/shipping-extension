var buttonTemp = document.getElementById('button1');
var coll = document.getElementsByClassName("collapsible");
var descrip = document.getElementsByClassName("content");


coll[0].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
});

buttonTemp.onclick = function(){
    var input = document.getElementById('trackingNumInput');
    var trackingNum = document.getElementById('trackingNum');
    var trackingSummary = document.getElementById('trackingSummary');


    var url = `http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<?xml version="1.0" encoding="UTF-8" ?> <TrackRequest USERID="128CHROM2182"><TrackID ID="${input.value}"></TrackID></TrackRequest>`;

    console.log(url);

    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();

    req.onreadystatechange=(e)=>{
        xmlDoc = req.responseXML;
        if (xmlDoc != null) {
            // Clear all elements
            trackingNum.textContent = "";
            trackingSummary.textContent = "";

            // Handle response
            summary = xmlDoc.getElementsByTagName("TrackSummary")[0];
            lengthA = xmlDoc.getElementsByTagName("TrackDetail").length;
            coll[0].textContent = 'Tracking number: ' + input.value;
            if (summary == null) { // Invalid tracking number
                descrip[0].textContent = input.value + ' is an invalid tracking number!'
            }
            else {
                descrip[0].textContent = summary.textContent;

                var i;
                var text = "";

                for (i = 0; i < lengthA; i++){
                    detail = xmlDoc.getElementsByTagName("TrackDetail")[i];
                    text += detail.textContent + "<br>";
                }
                
                descrip[0].innerHTML = text;
            }
        }
    }

}