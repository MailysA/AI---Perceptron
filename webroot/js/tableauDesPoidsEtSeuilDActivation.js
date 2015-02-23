var ctx = $("#chart").get(0).getContext("2d");
var data = {
    labels : ["1","2","3","4","5","6","7", "8", "9"],
    datasets : [
        {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data : [0,0,0,0,0,0,0,0,0]
        }
    ]
}
var options = "";
new Chart(ctx).Bar(data, options);

SEUIL = 1;
function changeSeuil(){
    SEUIL = $('#seuil').val();
}