var invamt;
var DataList;

function fetchval(identifier){ 
    //This function finds the exact time stamp and the settleprice of the symbols. and Tries to plot it
            Time =[] 
            sp =[]   
            // alert(identifier); 
            console.log(identifier)
            $.ajax({
                url:'https://raw.githubusercontent.com/PJCIP/futures_recommendation/master/data/futures.json',
                dataType:'json',
                type:'get',
                cache:false,
                success: function(data){
                    $(data.Futures).each(function(index,value)
                    {
                        // console.log(invamt)
                        // console.log(value.SETTLE_PR)
                        if (value.SYMBOL == identifier) {
                            Time.push(value.TIMESTAMP); 
                            sp.push(value.SETTLE_PR) 
                        }
                        
                            
                    });  
                    console.log(Time)
                    console.log(sp)  

                    const chart = document.getElementById("linechart");
                    var myChart = new Chart(chart, {
                        type: 'line',
                        data: {
                            labels: Time,
                            datasets: [{
                                label: 'Settle Price(2019)',
                                data: sp,
                                backgroundColor: "RGBA(255,255,255,1)",
                                pointBorderColor:"RGBA(95,160,234,1)",
                                borderColor:"RGBA(95,160,234,1)",
                            }]
                        },
                        options: {
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        drawOnChartArea: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        drawOnChartArea: false
                                    }
                                }]
                            }
                        }
                     
                    });
                

                
        }
    });
}
$(document).ready(function(){
    // Get value on button click and show alert
    $("#myBtn").click(function(){
        $('#outer').empty();
        DataList=[];
        var str = $("#invstamt").val();
        invamt=parseInt(str);
        // alert(invamt);
        console.log("Loading...");

        

        function removeDuplicates(data)
        {
            //This function returns a unique set of symbols
            return [...new Set(data)]
        }
        //This below ajax finds the symbols that are less than the amount that could be invested
        $.ajax({
                url:'https://raw.githubusercontent.com/PJCIP/futures_recommendation/master/data/futures.json',
                dataType:'json',
                type:'get',
                cache:false,
                success: function(data){
                    $(data.Futures).each(function(index,value)
                    {
                        if (value.SETTLE_PR < invamt) {
                            DataList.push(value.SYMBOL);  
                        }
                            
                    });
                        
                    console.log(DataList);
                    console.log("The unique futures are:");
                    console.log(removeDuplicates(DataList))
                    $.each(removeDuplicates(DataList), function(index, value){
                       
                        //Create an Button dynamically.
                        var element = document.createElement("button");

                        //Assign different attributes to the element.
                        element.setAttribute("type", "button");
                        element.setAttribute("value", value);
                        element.setAttribute("name", value);
                        element.setAttribute("id", value);
                        element.setAttribute("class", "btn-symbols");
                        // onclick="goDoSomething(this)
                        element.setAttribute("onclick","fetchval(this.id);")
                        var t = document.createTextNode(value); 
                        element.appendChild(t);


                        var container = document.getElementById("outer");

                        //Append the element in page (in span).
                        container.appendChild(element);


                    });
                }

            });
    });
});