var sourceArr = [];
$(document).ready(function() {
	// This command is used to initialize some elements and make them work properly
	$.material.init();

});

$('#return').bootstrapMaterialDatePicker({
	format : 'DD/MM/YYYY',
	lang : 'en',
	weekStart : 1,
	time : false
});

$('#depart').bootstrapMaterialDatePicker({
	format : 'DD/MM/YYYY',
	lang : 'en',
	weekStart : 1,
	time : false
}).on('change', function(e, date) {
	$('#return').bootstrapMaterialDatePicker('setMinDate', date);
})

$('#depart').bootstrapMaterialDatePicker().on('dateSelected',
		function(e, date) {
			$('#return').bootstrapMaterialDatePicker('setMinDate', date);
		});

$('#depart').bootstrapMaterialDatePicker('setMinDate', moment());
$('#return').bootstrapMaterialDatePicker('setMinDate', moment());

var substringMatcher = function(strs) {
	return function findMatches(q, cb) {
		var matches, substringRegex;

		// an array that will be populated with substring matches
		matches = [];

		// regex used to determine if a string contains the substring `q`
		substrRegex = new RegExp(q, 'i');

		// iterate through the pool of strings and for any string that
		// contains the substring `q`, add it to the `matches` array
		$.each(strs, function(i, airport) {
			if (substrRegex.test(airport.name)
					|| substrRegex.test(airport.iata)) {
				matches.push(airport);
			}
		});

		cb(matches);
	};
};

$("#from").typeahead(
		{
			source : substringMatcher(airportdata),
			sorter : function(items) {
				return items.sort();
			},
			updater : function(item) {
				return item.iata;
			},
			matcher : function(it) {
				item = it.name;
				if (item !== null
						&& item.toLowerCase().indexOf(
								this.query.trim().toLowerCase()) != -1) {
					return true;
				}
			},
			displayText : function(item) {
				return item.name;
			}
		});

$("#to").typeahead(
		{
			source : substringMatcher(airportdata),
			sorter : function(items) {
				return items.sort();
			},
			updater : function(item) {
				return item.iata;
			},
			matcher : function(it) {
				item = it.name;
				if (item !== null
						&& item.toLowerCase().indexOf(
								this.query.trim().toLowerCase()) != -1) {
					return true;
				}
			},
			displayText : function(item) {
				return item.name;
			}
		});


$("#searchBtn").click(function(){
	$.blockUI(
			{
				message: $("#loader"),
				css: { 
		            border: 'none', 
		            padding: '15px', 
		            backgroundColor: '#000', 
		            '-webkit-border-radius': '10px', 
		            '-moz-border-radius': '10px', 
		            opacity: .5, 
		            color: '#fff' 
		        }
				});
	$.post("apicaller/flight", {
		
		"source" : $("#from").val(),
		"destination":$("#to").val(),
		"dateofdeparture":moment($("#depart").val(),'DD/MM/YYYY').format('YYYYMMDD'),
		"dateofarrival": ($("#return").val()!=="")?moment($("#return").val(),'DD/MM/YYYY').format('YYYYMMDD'):"",
		"seatingclass":$("#class").val(),
		"adults":$("#passengers").val(),
		"children":0,
		"infants":0
		
	}, function(data) {
		console.log(data);
		
		var onwardFlights,returnFlights;
		
		if(data.success){
			if(data.data.onwardflights.length==0 && data.data.returnflights.length==0){
				$("#resultRow").html('<h3>No Results for this Query</h3>');
				return;
			}
			
			onwardFlights = data.data.onwardflights;
			returnFlights = data.data.returnflights;
			
			var templateResult = 
				'<div class="col-md-12"><ul class="nav nav-pills" id="resultTabs">'+
				'<li class="active" id="onwardTab"><a data-toggle="tab" href="#resultA">Onward</a></li>'+
				'<li id="returnTab"><a data-toggle="tab" href="#resultB">Return</a></li>'+
				'</ul><div class="tab-content"><br /><div id="resultA" class="tab-pane fade in active">'+
				'<div class="list-group" id="resultListGroupA"></div></div><div id="resultB" class="tab-pane fade in active"><div class="list-group" id="resultListGroupB"></div></div></div>';
			
			$("#resultRow").html(templateResult);
			
			if(returnFlights.length==0)
				$("#returnTab").hide();
			else{
				
				var returnFlightsHtml="";
				
				$.each(returnFlights, function(i, flight) {
					
					returnFlightsHtml+='<div class="list-group-item"><div class="row-action-primary">'+
						'<i class="mdi-device-airplanemode-on"></i></div><div class="row-content">'+
						'<div class="least-content"><i class="fa fa-inr"></i><strong>'+flight.fare.totalfare+'</strong></strong></div><h4 class="list-group-item-heading"><strong>'+flight.airline+' '+flight.aircraftTypecode+'</strong></h4>'+
						'<p class="list-group-item-text">Duration : <strong>'+flight.duration+'</strong>&nbsp;&nbsp; Departure Time : <strong>'+flight.deptime+' IST</strong> </p>'+
						'</div></div><div class="list-group-separator"></div>';
				});
				
				$("#resultListGroupB").html(returnFlightsHtml);
				
			}
			
			if(onwardFlights.length==0)
				$("#resultListGroupA").html("<h3>No Flight Data Found for this Query</h3>");
			else{
				
				var onwardFlightsHtml="";
				
				$.each(onwardFlights, function(i, flight) {
					
					onwardFlightsHtml+='<div class="list-group-item"><div class="row-action-primary">'+
						'<i class="mdi-device-airplanemode-on"></i></div><div class="row-content">'+
						'<div class="least-content"><i class="fa fa-inr"></i><strong>'+flight.fare.totalfare+'</strong></div><h4 class="list-group-item-heading"><strong>'+flight.airline+' '+flight.aircraftTypecode+'</strong></h4>'+
						'<p class="list-group-item-text">Duration : <strong>'+flight.duration+'</strong>&nbsp;&nbsp; Departure Time : <strong>'+flight.deptime+' IST</strong></p>'+
						'</div></div><div class="list-group-separator"></div>';
				});
				
				$("#resultListGroupA").html(onwardFlightsHtml);
				
			}
			
			
				/*<div class="list-group-item">
					<div class="row-action-primary">
						<i class="mdi-device-airplanemode-on"></i></div><div class="row-content">							<div class="least-content">15m</div>
							<h4 class="list-group-item-heading">Tile with a label</h4>
							<p class="list-group-item-text">Donec id elit non mi porta
								gravida at eget metus.</p>
						</div>
					</div>
					<div class="list-group-separator"></div>*/

			
			
				
		}
	});
});

$(document).ajaxStop($.unblockUI);

$(document).ready(function(){ 
    $("#resultTabs li:eq(0) a").tab('show');
});


/*$('#from').typeahead({
           hint: true,
           highlight: true,
           minLength: 1
       },
   {
       source : sourceArr
   source: function (query,process){
       airports = [];
       map = {};

       $.each(airportdata, function (i, airport) {
           map[airport.name] = airport;
           airports.push(airport.name);
       });

       process(airports);
   },
   matcher: function (item) {
   console.log(item);
   if(item!==null && item.toLowerCase().indexOf(this.query.trim().toLowerCase()) != -1) {
       return true;
       }
   },
   sorter: function (items) {
       return items.sort();
   },
   highlighter: function (item) {
       var regex = new RegExp( '(' + this.query + ')', 'gi' );
       return item.replace( regex, "<strong>$1</strong>" );
   },
   updater: function (item) {
       selectedAirport = map[item].iata;
       return item;
   }
   });

$.getJSON('data/airports.json', function(data) {
   console.log("hi");         
   alert(data);
   });*/
