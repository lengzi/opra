//  Helper JavaScript created for the voting page (detail.html)
var record = '[]'; //for recording two col behaviors
var temp_data;
var one_record = '{"one_column":[]}';
var swit = ""; //for recording users' action on swritching between voting interfaces
var slider_record = '{"slider":[]}';
var star_record = '{"star":[]}';
var submissionURL = "";
var order1 = "";
var order2 = "";
var flavor = "";
var startTime = 0;
var allowTies = true;
var commentTime = "";
var method = 1; //1 is twoCol, 2 is oneCol, 3 is Slider
var methodIndicator = "two_column";
var init_star = false;

var top_tier_layer = 0;

function select(item){
	var d = (Date.now() - startTime).toString();
	temp_data = {"item":$(item).attr("id")};
	temp_data["time"] = [d];
	temp_data["rank"] = [dictYesNo()];
	if($(item).children()[0].checked){
		$(item).css('border-color', 'green');
		$(item).css('border-width', '5px');
		$(item).css('margin-top', '1px');
		$(item).css('margin-bottom', '1px');
		$($(item).children()[1]).removeClass('glyphicon-unchecked');
		$($(item).children()[1]).addClass('glyphicon-check');
		$($(item).children()[1]).css('color', "green");
	}
	else{
		$(item).css('border-color', 'grey');
		$(item).css('border-width', '1px');
		$(item).css('margin-top', '5px');
		$(item).css('margin-bottom', '9px');
		$($(item).children()[1]).removeClass('glyphicon-check');
		$($(item).children()[1]).addClass('glyphicon-unchecked');
		$($(item).children()[1]).css('color', "grey");
	}
	var temp = JSON.parse(record);
	temp.push(temp_data);
	record = JSON.stringify(temp);
	//console.log(record);
}

function select2(item){
	var d = (Date.now() - startTime).toString();
	temp_data = {"item":$(item).attr("id")};
	temp_data["time"] = [d];
	temp_data["rank"] = [dictYesNo2()];
	if($(item).children()[0].checked){
		$(item).css('border-color', 'green');
		$(item).css('border-width', '5px');
		$(item).css('margin-top', '1px');
		$(item).css('margin-bottom', '1px');
		$($(item).children()[1]).removeClass('glyphicon-unchecked');
		$($(item).children()[1]).addClass('glyphicon-check');
		$($(item).children()[1]).css('color', "green");
	}
	else{
		$(item).css('border-color', 'grey');
		$(item).css('border-width', '1px');
		$(item).css('margin-top', '5px');
		$(item).css('margin-bottom', '9px');
		$($(item).children()[1]).removeClass('glyphicon-check');
		$($(item).children()[1]).addClass('glyphicon-unchecked');
		$($(item).children()[1]).css('color', "grey");
	}
	var temp = JSON.parse(record);
	temp.push(temp_data);
	record = JSON.stringify(temp);
	//console.log(record);
}

//Get order of one or two column
function orderYesNo(num){
	if(num == 5){ list = '#yesNoList'; }
	if(num == 6){ list = '#singleList'; }
	var arr = $(list).children();
	var order = [];
	var yes = [];
	var no = [];
	$.each(arr, function( index, value ){
		if(!(typeof $(value).children()[0] === "undefined")){
			if($(value).children()[0].checked){ yes.push($(value).attr("type")); }
			else{ no.push($(value).attr("type")); }
		}
	});
	if(yes.length != 0){ order.push(yes); }
	if(no.length != 0){ order.push(no); }
	return order;
}

function orderCol(num){
	var arr;
	if(num == 0){ arr = [$('#left-sortable')]; }
	if(num == 1){ arr = [$('#left-sortable'), $('#right-sortable')]; }
	else if(num == 2){ arr = [$('#one-sortable')]; }
	var order = [];
	$.each(arr, function( index, value ){
		value.children().each(function( index ){
			if( $( this ).children().size() > 0 ){
				var inner = [];
				$( this ).children().each(function( index ){
					inner.push($( this ).attr('type'));
				});
				order.push(inner);
			}
		});
	});
	return order;
}

function orderSlideStar(str){
	var arr = [];
	var values = [];
	$('.' + str).each(function(i, obj){
		if(str == 'slide'){ 
			var score = $( this ).slider("option", "value");
		}
		else if(str == 'star'){ 
			var score = parseFloat($( this ).rateYo("option", "rating")); 
		}
		else{ return false; }
		var type = $( this ).attr('type')
		var bool = 0;
		$.each(values, function( index, value ){
			if(value < score){
				values.splice(index, 0, score);
				arr.splice(index, 0, [type]);
				bool = 1;
				return false;
			}else if(value == score){
				arr[index].push(type);
				bool = 1;
				return false;
			}
		});
		if(bool == 0){ values.push(score); arr.push([type]); }
	});
	return arr;
}

function dictSlideStar(str){
	var arr = [];
	var values = [];
	var item_type = ".li_item";
	$('.' + str).each(function(i, obj){
		if(str == 'slide'){ 
			var score = $( this ).slider("option", "value");
			item_type = ".slider_item";
		}
		else if(str == 'star'){ 
			var score = parseFloat($( this ).rateYo("option", "rating")); 
			item_type = ".star_item";
		}
		else{ return false; }
		var type = $( this ).attr('type');
		var bool = 0;
		//console.log($(item_type + "[type='" + type + "']").attr('id'));
		$.each(values, function( index, value ){
			if(value < score){
				var temp = {};
				temp["name"] = $(item_type + "[type='" + type + "']").attr('id');
				temp["score"] = score;
				temp["ranked"] = 0;
				values.splice(index, 0, score);
				arr.splice(index, 0, [temp]);
				bool = 1;
				return false;
			}else if(value == score){
				var temp = {};
				temp["name"] = $(item_type + "[type='" + type + "']").attr('id');
				temp["score"] = score;
				temp["ranked"] = 0;
				arr[index].push(temp);
				bool = 1;
				return false;
			}
		});
		if(bool == 0){ 
			var temp = {};
			temp["name"] = $(item_type + "[type='" + type + "']").attr('id');
			temp["score"] = score;
			temp["ranked"] = 0;
			values.push(score); 
			arr.push([temp]); 
		}
	});
	var i;
	for(i = 0; i < arr.length; i++){
		var j;
		for(j = 0; j < arr[i].length; j++){
			arr[i][j]["tier"] = i+1;
		}
	}
	return arr;
}

function dictYesNo(){
	var arr = $('#yesNoList').children();
	var order = [];
	var yes = [];
	var no = [];
	$.each(arr, function( index, value ){
		if(!(typeof $(value).children()[0] === "undefined")){
			temp = {};
			temp["name"] = $(value).attr("id");
			temp["ranked"] = 0;
			if($(value).children()[0].checked){temp["tier"] = 1; yes.push(temp); }
			else{temp["tier"] = 2; no.push(temp); }
		}
	});
	if(yes.length != 0){ order.push(yes); }
	if(no.length != 0){ order.push(no); }
	return order;
}

function dictYesNo2(){
	var arr = $('.checkbox');
	var order = [];
	var yes = [];
	var no = [];
	var i = 0;
	$.each(arr, function( index, value ){
		if(!(typeof $(value).children()[0] === "undefined")){
			temp = {};
			temp["name"] = $(value).attr("id");
			temp["ranked"] = 0;
			if(i == 0) { temp["position"] = "(1,1)";}
			else if (i == 1){temp["position"] = "(1,2)";}
			else if (i == 2){temp["position"] = "(2,1)";}
			else{temp["position"] = "(2,2)";}
			if($(value).children()[0].checked){temp["tier"] = 1; yes.push(temp); }
			else{temp["tier"] = 2; no.push(temp); }
			i++;
		}
	});
	if(yes.length != 0){ order.push(yes); }
	if(no.length != 0){ order.push(no); }
	return order;
}

function dictCol(num){
	var arr;
	if(num == 0){ arr = [$('#left-sortable')]; }
	if(num == 1){ arr = [$('#left-sortable'), $('#right-sortable')]; }
	else if(num == 2){ arr = [$('#one-sortable')]; }
	var order = [];
	var tier = 1;
	var item_type = ".li_item";
	$.each(arr, function( index, value ){
		value.children().each(function( i1 ){
			if( $( this ).children().size() > 0  && $( this ).attr("class") != "top_tier"){
				var inner = [];
				$( this ).children().each(function( i2 ){
					var temp = {};
					temp["name"] = $(item_type + "[type='" + $( this ).attr('type') + "']").attr('id');
					temp["utility"] = $(item_type + "[type='" + $( this ).attr('type') + "']").attr('title');
					temp["tier"] = tier;
					temp["ranked"] = index;
					inner.push(temp);
				});
				order.push(inner);
				tier++;
			}
		});
	});
	return order;
}

function twoColSort( order ){
	var html = "<ul class=\"choice1 empty\"></ul>";
	$.each(order, function(index, value){
		html += "<ul class=\"choice1\"><div class=\"tier\">" + index.toString() + "</div>";
		$.each(value, function(i, v){
			html += "<li class=\"li_item\" id=\"" + $(".li_item[type='" + v.toString() + "']").attr('id') + "\" type=" + v.toString() + ">";
			html += $(".li_item[type='" + v.toString() + "']").html();
			html += "</li>";
		});
		html += "</ul><ul class=\"choice1 empty\"></ul>";
	});
	$('#left-sortable').html(html);
	$('#right-sortable').html("");
}

function oneColSort( order ){
	var html = "<ul class=\"choice2 empty\"></ul>";
	$.each(order, function(index, value){
		html += "<ul class=\"choice2\"><div class=\"tier\">" + index.toString() + "</div>";
		$.each(value, function(i, v){
			html += "<li class=\"li_item\" id=\"" + $("#oneColSection .li_item[type='" + v.toString() + "']").attr('id') + "\" title=\""+ $("#oneColSection .li_item[type='" + v.toString() + "']").attr('title') +"\" type=" + v.toString() + ">";
			html += $("#oneColSection .li_item[type='" + v.toString() + "']").html();
			html += "</li>";
		});
		html += "</ul><ul class=\"choice2 empty\"></ul>";
	});
	$('#one-sortable').html(html);
}

function sliderSort( order ){
	$.each(order, function(index, value){
		$.each(value, function(i, v){
			$(".slide[type='" + v.toString() + "']").slider("value", Math.round(100 - (100 * index / order.length)));
			$("#score" + $(".slide[type='" + v.toString() + "']").attr("id")).text(Math.round(100 - (100 * index / order.length)));
		});
	});
}

function sliderZeroSort( order ){
	$.each(order, function(index, value){
		$.each(value, function(i, v){
			$(".slide[type='" + v.toString() + "']").slider("value", 0);
			$("#score" + $(".slide[type='" + v.toString() + "']").attr("id")).text(0);
		});
	});
}

function starSort( order ){
	init_star = true;
	$.each(order, function(index, value){
		$.each(value, function(i, v){
			if(index >= 10){ $(".star[type='" + v.toString() + "']").rateYo("option", "rating", 0); }
			else{ $(".star[type='" + v.toString() + "']").rateYo("option", "rating", Math.round(10 - (10 * index / Math.min(order.length, 10))) / 2); }
		});
	});
	init_star = false;
}

function yesNoSort( num, order ){
	$.each(order, function(index, value){
		$.each(value, function(i, v){
			var cb;
			if(num == 5){ cb = ".checkbox[type='"; }
			if(num == 6){ cb = ".checkbox_single[type='"; }
			if(index == 0){
				$($(cb + v.toString() + "']").children()[0]).attr('checked', 'checked');
				$($(cb + v.toString() + "']").children()[1]).removeClass('glyphicon-unchecked');
				$($(cb + v.toString() + "']").children()[1]).addClass('glyphicon-check');
				$($(cb + v.toString() + "']").children()[1]).css('color', "green");
				$(cb + v.toString() + "']").css('border-color', 'green');
				$(cb + v.toString() + "']").css('border-width', '5px');
				$(cb + v.toString() + "']").css('margin-top', '1px');
				$(cb + v.toString() + "']").css('margin-bottom', '1px');
			}
			else{
				$($(cb + v.toString() + "']").children()[0]).removeAttr('checked');
				$($(cb + v.toString() + "']").children()[1]).removeClass('glyphicon-check');
				$($(cb + v.toString() + "']").children()[1]).addClass('glyphicon-unchecked');
				$($(cb + v.toString() + "']").children()[1]).css('color', "grey");
				$(cb + v.toString() + "']").css('border-color', 'grey');
				$(cb + v.toString() + "']").css('border-width', '1px');
				$(cb + v.toString() + "']").css('margin-top', '5px');
				$(cb + v.toString() + "']").css('margin-bottom', '9px');
			}
		});
	});
}

function yesNoZeroSort( order ){
	$.each(order, function(index, value){
		$.each(value, function(i, v){
			$($(".checkbox[type='" + v.toString() + "']").children()[0]).removeAttr('checked');
			$($(".checkbox[type='" + v.toString() + "']").children()[1]).removeClass('glyphicon-check');
			$($(".checkbox[type='" + v.toString() + "']").children()[1]).addClass('glyphicon-unchecked');
			$($(".checkbox[type='" + v.toString() + "']").children()[1]).css('color', "grey");
			$(".checkbox[type='" + v.toString() + "']").css('border-color', 'grey');
			$(".checkbox[type='" + v.toString() + "']").css('border-width', '1px');
			$(".checkbox[type='" + v.toString() + "']").css('margin-top', '5px');
			$(".checkbox[type='" + v.toString() + "']").css('margin-bottom', '9px');
		});
	});
}

function changeMethod (value){
	var order;
	var d = Date.now() - startTime;
	if(method == 1){ 
		swit += d + ";1";
		order = orderCol(method);
		
	}else if(method == 2){
		swit += d + ";2";
		order = orderCol(method);
	}
	else if(method == 3){
		swit += d + ";3";
		order = orderSlideStar('slide');
	}
	else if(method == 4){
		swit += d + ";4";
		order = orderSlideStar('star');
	}
	else if(method == 5 || method == 6){
		order = orderYesNo(method);
	}
	method = value;
	if(method == 1){ swit += ";1;;"; methodIndicator = "two_column"; twoColSort(order); }
	else if(method == 2){ swit += ";2;;"; methodIndicator = "one_column"; oneColSort(order); }
	else if(method == 3){ swit += ";3;;"; methodIndicator = "slider"; sliderSort(order); }
	else if(method == 4){ swit += ";4;;"; methodIndicator = "star"; init_star = true; starSort(order); init_star = false;}
	else if(method == 5 || method == 6){ yesNoSort(method, order); }

	VoteUtil.checkStyle();
};

function recordCommentTime(){
	if(commentTime == ""){
		var d = Date.now() - startTime  ;
		commentTime += d;
	}
	
}
// the VoteUtil object contains all the utility functions for the voting UI
var VoteUtil = (function () {
	// returns true if the user is on a mobile device, else returns false
	function isMobileAgent () {
		return /Android|webOS|iPhone|iPod|greyBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
	
	// clears all items from the left side and returns the right side to its default state
	function clearAll () {
		var d = (Date.now() - startTime).toString();
		temp_data = {"item":""};
		temp_data["time"] = [d];
		temp_data["rank"] = [dictCol(1)];
		if(method == 1){
			// move the left items over to the right side
			$("#left-sortable").children().each(function(index){
				if($(this).children().size() > 0){
					var tier = 1;
					$(this).children().each(function(index){
						var temp = $("#right-sortable" ).html();
						$("#right-sortable" ).html( temp + "<ul class=\"choice2 empty\"></ul>"
							+ "<div class=\"tier\">" + tier + "</div>"
							+ "<ul class=\"choice2\" onclick =\"VoteUtil.moveToPref(this)\">" + $(this)[0].outerHTML + "</ul>" );
					});
				}
			});
			
			// clear the items from the left side
			$( '#left-sortable' ).html("");
			
			checkStyle();
			disableSubmission();
			// add the clear action to the record
			//var d = Date.now() - startTime;
			//record += d + "||";
			d = (Date.now() - startTime).toString();
			temp_data["time"].push(d);
			temp_data["rank"].push(dictCol(1));
			var temp = JSON.parse(record);
			temp.push(temp_data);
			//temp["star"].push({"time":d, "action":"set", "value":rating.toString(), "item":$(this).parent().attr("id") });
			record = JSON.stringify(temp);

			/*
			if(methodIndicator == "two_column")
			{
				var temp = JSON.parse(record);
				temp["two_column"].push({"method":methodIndicator,"time":d, "action":"clear", "rightOrder":order });
				record = JSON.stringify(temp);
			}
			else
			{
				var temp = JSON.parse(one_record);
				temp["one_column"].push({"method":methodIndicator,"time":d, "action":"clear", "rightOrder":order });
				one_record = JSON.stringify(temp);
			}
			*/

		}
	}
	
	function insideEach(t, id, tier){
		if( $( t ).children().size() < 1 ){
			$( t ).remove();
		}else{
			$( t ).attr("id", id.toString());
			id += 1;
			$( t ).before("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
			if( $( t ).attr('class').indexOf('empty')>-1 ){ $( t ).removeClass('empty').addClass('choice1'); }
			if( $( t ).children().size() < 2 || isMobileAgent() ){
				$( t ).children().css( "width", "93%" );
			}else{
				$( t ).children().css( "width", "45%" ).css("display","inline-block").css("vertical-align","top");
			}
			$( t ).before("<div class=\"tier\" style=\"padding-top:" + ($( this )[0].scrollHeight / 3).toString() + "px;\">" + tier + "</div>");
			$( t ).children().each(function(index){$(this).attr("alt",tier.toString()); });
			tier += 1;
			id += 1;
		}
		return [id, tier]
	}
	
	function checkStyle () {
		if(method < 3){
			newItem = "<ul class=\"choice1 empty\"></ul>";
			var tier = 1;
			var id = 0;
			if(method == 1){ submission = $("#left-sortable"); }
			else{ submission = $("#one-sortable"); }
			$( ".tier" ).each(function( index ) {
				$( this ).remove();
			});
			submission.children().each(function( index ) {
				arr = insideEach(this, id, tier);
				id = arr[0];
				tier = arr[1];
				if($(this).children().size() >=1 ){
					$(this).attr("class","choice1");
				}
			});
			submission.children().last().after("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
			if(method == 1){
				tier = 1;
				$( "#right-sortable" ).children().each(function( index ) {
					arr = insideEach(this, id, tier);
					id = arr[0];
					tier = arr[1];
				});
				if($( "#right-sortable" ).children().size() > 0){
					$( "#right-sortable" ).children().last().after("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
				}
				if( $( "#left-sortable" ).children().size() != 0 ){ enableSubmission(); }
			}
		}
	}
	
	// submits the current left side preferences	
	function submitPref() {
		var order;
		var order_list;
		var final_list;
		var item_type = ".li_item";
		var record_data = {};
		$(".top_tier").remove();
		if(method == 1){order_list = orderCol(0); final_list = dictCol(1);}
		else if(method == 2){ order_list = orderCol(method); final_list = dictCol(2);}
		else if(method == 3){ order_list = orderSlideStar('slide'); item_type = ".slider_item"; final_list = dictSlideStar('slide');}
		else if(method == 4){ order_list = orderSlideStar('star'); item_type= ".star_item";final_list = dictSlideStar('star');}
		else if(method == 5){ order_list = orderYesNo(method); item_type= ".checkbox"; final_list = dictYesNo();}
		else if(method == 6){ order_list = orderYesNo(method); item_type= ".checkbox_single";}
		else{location.reload(); }
		var final_order = [];
		for (var i = 0; i < order_list.length; i++) {
			var sametier = [];
			for (var j = 0; j < order_list[i].length; j++) {
				sametier.push($(item_type + "[type='" + order_list[i][j].toString() + "']").attr('id'));
			}
			final_order.push(sametier);
		}
		order = JSON.stringify(final_order);
		//var d = Date.now() - startTime;
		//record += "S" + d;
		var record_final = JSON.stringify(final_list);
		var d = (Date.now() - startTime).toString();

		record_data["data"] = JSON.parse(record);
		record_data["submitted_ranking"] = final_list;
		if(order1 != ""){
			record_data["initial_ranking"] = JSON.parse(order1);
		}
		else{
			record_data["initial_ranking"] = [];
		}
		record_data["time_submission"] = d;
		record_data["platform"] = flavor;
		var record_string = JSON.stringify(record_data);
		$('.record_data').each(function(){
			$(this).val(record_string);
		});

		$('.pref_order').each(function(){
			$(this).val(order);
		});

		/*
		$.ajax({
			url: submissionURL,
			type: "POST",
			data: {'data': record, 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val(), 'order1':order1,'final':record_final,'device':flavor,'commentTime':commentTime,'swit':swit,'submit_time':d,'ui':methodIndicator},
			success: function(){}
		});
		*/
		$('.submitbutton').css( "visibility","hidden");
		$('.submitting').css("visibility","visible");
		$('#pref_order').submit();
	};
	
	// moves preference item obj from the right side to the bottom of the left side
	function moveToPref(obj) {

		var time = 100
		var prefcolumn = $('#left-sortable');
		var currentli = $(obj);
		var tier = currentli.children().first().attr("alt");
		var item = currentli.children().first().attr("id");

		var d = (Date.now() - startTime).toString();
		temp_data = {"item":item};
		temp_data["time"] = [d];
		temp_data["rank"] = [dictCol(1)];

		prefcolumn.append(currentli);
		//record += d+ "::clickFrom::" + item + "::"+ tier+";;";
		var prev_tier = tier;
		VoteUtil.checkStyle();
		tier = currentli.children().first().attr("alt");
		if ($('#left-sortable').children().size() != 0) { enableSubmission(); }
		$('#left-sortable').children().each(function(){
			$(this).removeAttr('onclick');
		});
		d = (Date.now() - startTime).toString();
		temp_data["time"].push(d);
		temp_data["rank"].push(dictCol(1));
		var temp = JSON.parse(record);
		temp.push(temp_data);
		record = JSON.stringify(temp);
		//d = Date.now() - startTime;
		//record += d+ "::clickTo::" + item + "::"+ tier+";;;";
		/*
		if(methodIndicator == "two_column")
		{
			var d = (Date.now() - startTime).toString();
			var temp = JSON.parse(record);
			temp["two_column"].push({"method":methodIndicator,"time":d, "action":"click", "from":prev_tier,"to": tier, "item":item });
			record = JSON.stringify(temp);
		}
		else
		{
			var d = (Date.now() - startTime).toString();
			var temp = JSON.parse(one_record);
			temp["one_column"].push({"method":methodIndicator,"time":d, "action":"click", "from":prev_tier,"to": tier, "item":item });
			one_record = JSON.stringify(temp);
		}
		*/
	};
	
	// moves all items from the right side to the bottom of the left, preserving order
	function moveAll() {
		var d = (Date.now() - startTime).toString();
		temp_data = {"item":""};
		temp_data["time"] = [d];
		temp_data["rank"] = [dictCol(1)];
		$( '#left-sortable' ).html( $( '#left-sortable' ).html() + $( '#right-sortable' ).html() );
		$( '#right-sortable' ).html("");
		VoteUtil.checkStyle();
		enableSubmission();
		$('#left-sortable li').each(function(){
			$(this).removeAttr('onclick');
		});
		//var d = Date.now() - startTime;
		//record += d + ";;;";
		/*
		if(methodIndicator == "two_column")
		{
			var d = (Date.now() - startTime).toString();
			var temp = JSON.parse(record);
			temp["two_column"].push({"method":methodIndicator,"time":d, "action":"moveAll" });
			record = JSON.stringify(temp);
		}
		else
		{
			var d = (Date.now() - startTime).toString();
			var temp = JSON.parse(one_record);
			temp["one_column"].push({"method":methodIndicator,"time":d, "action":"moveAll" });
			one_record = JSON.stringify(temp);
		}
		*/
		d = (Date.now() - startTime).toString();
		temp_data["time"].push(d);
		temp_data["rank"].push(dictCol(1));
		var temp = JSON.parse(record);
		temp.push(temp_data);
		record = JSON.stringify(temp);
	};
	
	// enables the submit button
	function enableSubmission() {
		if( VoteUtil.isMobileAgent() ){
			$(".submitbutton").css("display", "inline");
		}else{
			$(".submitbutton").prop("disabled",false);
		}
	}
	
	function disableSubmission(){
		if( VoteUtil.isMobileAgent() ){
			$(".submitbutton").css("display", "none");
		}else{
			$(".submitbutton").prop("disabled",true);
		}
	}
	// returns the public members of the VoteUtil class
	return {
		isMobileAgent: isMobileAgent,
		clearAll: clearAll,
		checkStyle: checkStyle,
		submitPref: submitPref,
		moveToPref: moveToPref,
		moveAll: moveAll	
	}
	
})()




$( document ).ready(function() {
	!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

	// Google Analytics
	// -----------------------------------------------------------------------
	//	 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	//	 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	//	 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	//	 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	//	 ga('create', 'UA-81006265-1', 'none');
	//  //ga('create', 'UA-81006265-1', 'none','DetailTracker');
	//	 ga('send', 'pageview');
	//  ga('send', 'event', 'Button', 'click', 'left-sortable');
	//  //ga('DetailTracker.send', 'pageview');
	// ga(function(tracker) {
	//	 // Logs the tracker created above to the console.
	//	 console.log(tracker);
	// });
	//		 var form=document.getElementById('left-sortable');
	//		 form.addEventListener('submit', function(event) {

	//	 // Prevents the browser from submiting the form
	//	 // and thus unloading the current page.
	//	 event.preventDefault();

	//	 // Sends the event to Google Analytics and
	//	 // resubmits the form once the hit is done.
	//	 ga('send', 'event', 'Left Form', 'submit', {
	//		 hitCallback: function() {
	//			 form.submit();
	//		 }
	//	 });
	// });
	//	 // -----------------------------------------------------------------------
	//	 // Google Tag Manager
	// (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	// '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	// })(window,document,'script','dataLayer','GTM-59SLDM');
	// -----------------------------------------------------------------------

	/*
	var wholeHeight1 = $('#left-sortable')[0].scrollHeight;
	var wholeHeight2 = $('#right-sortable')[0].scrollHeight;
	if (wholeHeight1 > wholeHeight2) {
		$('#right-sortable').css("height", wholeHeight1);
	} else {
		$('#left-sortable').css("height", wholeHeight2);
	}
	*/
	// $('#left-sortable').sortable('refresh');
	// $('#right-sortable').sortable('refresh');
		  
	$('.hide1').mouseover(function(){
		$('.ept',this).show();
	});
	VoteUtil.checkStyle();

	
	
	function enableSubmission() {
		$('.submitbutton').css("display", "inline");
	}
	
	// var type_num = 1, alt_num = 0;
	// $('#one-sortable').children().each(function(index, value){
	// 	var string = "";
	// 	if($(value).children().length > 0){ console.log(alt_num); alt_num += 1; }
	// 	$(value).children().each(function(i, v){
	// 		string += "<li class=\"li_item\" id=\"" + $(v).attr("id") + "\" type=\"" + type_num.toString() + "\" alt=\"" + alt_num.toString() + "\">";
	// 		string += $(v).html();
	// 		string += "</li>\n";
	// 		type_num += 1;
	// 	});
	// 	//console.log($(value).html());
	// 	//console.log(string);
	// 	console.log("string " + string);
	// 	$(value).html(string);
	// 	console.log(value);
	// });
	// $('#one-sortable').children().each(function(index, value){
	// 	//console.log(value);
	// });
	
	var oldList, newList, item;
	
	window.setInterval(function(){
		// $("#left-sortable").sortable({
		//	 start: function(event, ui){
		//		 $( ".empty" ).each(function( index ) { $( this ).remove(); });
		//		 $( ".tier" ).each(function( index ) { $( this ).css("display", "none"); }); //get rid of the tier divs
		//	 },
			
		//	 stop: function(event, ui) {
		//		 var len = $(".choice1").length;
		//		 newItem = "<ul class=\"choice1 empty\"></ul>";
		//		 var tier = 1;
		//		 var id = 0;
		//		 $( ".tier" ).each(function( index ) {
		//			 $( this ).remove();
		//		 });
		//		 $( "#left-sortable" ).children().each(function( index ) {
		//			 if( $( this ).children().size() < 1 ){
		//				 $( this ).remove();
		//			 }else{
		//				 $( this ).attr("id", id.toString());
		//				 id += 1;
		//				 $( this ).before("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
		//				 if( $( this ).attr('class').indexOf('empty')>-1 ){ $( this ).removeClass('empty').addClass('choice1'); }
		//				 if( $( this ).children().size() < 2  
		//					 || ( /Android|webOS|iPhone|iPod|greyBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )){
		//					 $( this ).children().css( "width", "93%" );
		//				 }else{
		//					 $( this ).children().css( "width", "45%" ).css("display","inline-block").css("vertical-align","top");
		//				 }
		//				 $( this ).before("<div class=\"tier\" style=\"padding-top:" + ($( this )[0].scrollHeight / 3).toString() + "px;\">" + tier + "</div>");
		//				 tier += 1;
		//				 id += 1;
		//			 }
		//		 });
		//		 $( "#left-sortable" ).children().last().after("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
		//		 $( "#right-sortable" ).children().each(function( index ) {
		//			 if( $( this ).children().size() < 1 ){
		//				 $( this ).remove();
		//			 }else{
		//				 $( this ).attr("id", id.toString());
		//				 id += 1;
		//				 $( this ).before("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
		//				 if( $( this ).attr('class').indexOf('empty')>-1 ){ $( this ).removeClass('empty').addClass('choice1'); }
		//				 if( $( this ).children().size() < 2 
		//					 || ( /Android|webOS|iPhone|iPod|greyBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )){
		//					 $( this ).children().css( "width", "93%" );
		//				 }else{
		//					 $( this ).children().css( "width", "45%" ).css("display","inline-block").css("vertical-align","top");
		//				 }
		//				 $( this ).before("<div class=\"tier\" style=\"padding-top:" + ($( this )[0].scrollHeight / 3).toString() + "px;\">" + tier + "</div>");
		//				 tier += 1;
		//				 id += 1;
		//			 }
		//		 });
		//		 if($( "#right-sortable" ).children().size() > 0){
		//			 $( "#right-sortable" ).children().last().after("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
		//		 }
		//		 if( $( "#right-sortable" ).children().size() == 0 ){ document.getElementById('submitbutton').disabled = false; }
		//	 },

		//	 change: function(event, ui) {  
		//		 if(ui.sender){
					
		//			 //variables
		//			 newList = ui.placeholder.parent(); //the list the item is hovering over
		//			 var newListId = parseInt($( newList ).attr("id")); //the id of the list
		//			 var oldListId = parseInt($( oldList ).attr("id")); //the id of the old list
		//			 var listId;
		//			 var prevEmpty = false;
					
					
		//			 newItem = "<ul class=\"choice1 empty line\"></ul>";
		//			 var tier = 1;

		//			 $( ".tier" ).each(function( index ) { $( this ).remove(); }); //get rid of the tier divs
		//			 $( ".line" ).each(function( index ) { $( this ).remove(); }); //get rid of placeholder uls

		//			 $( "ul.choice1" ).each(function(index){
		//				 console.log("this");
		//				 if($( this ).children().size() != 0){
		//					 console.log("hi");
		//					 $( this ).before(newItem);
		//				 }
		//			 });
					
		//			 ui.placeholder.css("width", "93%");
		//			 ui.placeholder.height(ui.item.height());
		//		 }
		//	 },
		//	 placeholder: "ui-state-highlight",
		//	 items: "ul:not(.empty)"
		// });
		
		//$("ul.choice1").sortable({
		
		if(method == 1){
			var sortableSelector = 'ul#left-sortable';
			var submission = $("#left-sortable");
		}else if(method == 2){
			var sortableSelector = 'ul#one-sortable';
			var submission = $("#one-sortable");
		}
		
		if (allowTies)
			sortableSelector = 'ul.choice1'
		else
			$('ul.choice1.empty').remove()
		
		
		$(sortableSelector).sortable({
		   
			start: function(event, ui) {
				ui.placeholder.height(ui.item.height());
				item = ui.item;
				$(".top_tier").remove();
				
				if ( item.parent().children().size() < 3 || VoteUtil.isMobileAgent() ){
					ui.placeholder.css("width", "93%");
					ui.item.width(ui.placeholder.width());
				} else if (allowTies) {
					ui.placeholder.css("width", "45%").css("display","inline-block").css("vertical-align","top");
					ui.item.width(ui.placeholder.width());
				};
				//newList = oldList = oL = ui.item.parent();
				//var d = Date.now() - startTime;
				//record += d+ "::start::" + item.attr("id") + "::"+ item.attr("alt")+";;";
				/*
				if(methodIndicator == "two_column")
				{
					var d = (Date.now() - startTime).toString();
					var temp = JSON.parse(record);
					temp["two_column"].push({"method":methodIndicator,"time":d, "action":"start", "tier":item.attr("alt"), "item":item.attr("id") });
					record = JSON.stringify(temp);
				}
				else
				{
					var d = (Date.now() - startTime).toString();
					var temp = JSON.parse(one_record);
					temp["one_column"].push({"method":methodIndicator,"time":d, "action":"start", "tier":item.attr("alt"), "item":item.attr("id") });
					one_record = JSON.stringify(temp);
				}
				
				$.ajax({
					url: "{% url 'polls:record' question.id%}",
					type: "POST",
					data: {'time': Data.now(), 'status':"start",'item': item.attr("id"), 'position': item.parent().children().first().html(), 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()},
					success: function(){}
				});
				*/
				var d = (Date.now() - startTime).toString();
				temp_data = {"item":item.attr("id")};
				//console.log(item.children());
				if(!allowTies){
					item.children().each(function(){
						temp_data["item"] = $(this).attr("id")
					});
				}
				temp_data["time"] = [d];
				temp_data["rank"] = [dictCol(method)];
				
				if (!allowTies) {
					ui.placeholder.css("width", "84%");
					ui.placeholder.css("margin-left", "35px");
					ui.item.width(ui.placeholder.width());
				}
			},
			
			stop: function(event, ui) {
				var len = $(".choice1").length;
				newItem = "<ul class=\"choice1 empty\"></ul>";
				var tier = 1;
				var id = 0;
				$( ".tier" ).each(function( index ) {
					$( this ).remove();
				});
				
				submission.children().each(function( index ) {
					if( $( this ).children().size() < 1 ){
						$( this ).remove();
					}else{
						$( this ).attr("id", id.toString());
						$( this ).children().each(function( index ) {
							$( this ).attr("alt", tier.toString());
						});
						id += 1;
						if (allowTies)
							$( this ).before("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
						
						if( $( this ).attr('class').indexOf('empty')>-1 ){ $( this ).removeClass('empty').addClass('choice1'); }
						if( $( this ).children().size() < 2 || VoteUtil.isMobileAgent() ){
							$( this ).children().css( "width", "93%" );
						}else{
							$( this ).children().css( "width", "45%" ).css("display","inline-block").css("vertical-align","top");
						}
						$( this ).before("<div class=\"tier\" style=\"padding-top:" + ($( this )[0].scrollHeight / 3).toString() + "px;\">" + tier + "</div>");
						tier += 1;
						id += 1;
					}
				});
				if (allowTies)
					submission.children().last().after("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
					if(method == 1){
						$( "#right-sortable" ).children().each(function( index ) {
							if( $( this ).children().size() < 1 ){
								$( this ).remove();
							}else{
								$( this ).attr("id", id.toString());
								id += 1;
								$( this ).before("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
								if( $( this ).attr('class').indexOf('empty')>-1 ){ $( this ).removeClass('empty').addClass('choice1'); }
								if( $( this ).children().size() < 2 || VoteUtil.isMobileAgent() ){
									$( this ).children().css( "width", "93%" );
								}else{
									$( this ).children().css( "width", "45%" ).css("display","inline-block").css("vertical-align","top");
								}
								$( this ).before("<div class=\"tier\" style=\"padding-top:" + ($( this )[0].scrollHeight / 3).toString() + "px;\">" + tier + "</div>");
								tier += 1;
								id += 1;
							}
						});
						if($( "#right-sortable" ).children().size() > 0){
							$( "#right-sortable" ).children().last().after("<ul class=\"choice1 empty\" id=\"" + id.toString() + "\"></ul>");
						}
						if( $( "#right-sortable" ).children().size() == 0 ){ document.getElementById('submitbutton-twocol').disabled = false; }
					}
				var t = parseInt(item.attr("alt"));
				var count = 0;
				var itemsSameTier = "";
				submission.children().each(function(index){
					if($(this).children().size()>=1){
						count++;
					}
					if(count == t){
						$(this).children().each(function(index){
							itemsSameTier += $(this).attr("id") + "||";
						});
						return false;
					}
				});
				if(!allowTies && top_tier_layer != 0)
				{
					
					submission.children().eq(top_tier_layer*2-1).after("<div class=\"top_tier\" style=\"height:4px;border:none;color:green;background-color:green;\"><hr></div>");
				}
				//var d = Date.now() - startTime;
				//record += d+ "::stop::" + item.attr("id") + "::"+ item.attr("alt") + "||" + itemsSameTier +";;;";
				/*
				if(methodIndicator == "two_column")
				{
					var d = (Date.now() - startTime).toString();
					var temp = JSON.parse(record);
					temp["two_column"].push({"method":methodIndicator,"time":d, "action":"stop", "tier":item.attr("alt"), "item":item.attr("id"), "itemsSameTier":itemsSameTier });
					record = JSON.stringify(temp);
				}
				else
				{
					var d = (Date.now() - startTime).toString();
					var temp = JSON.parse(one_record);
					temp["one_column"].push({"method":methodIndicator,"time":d, "action":"stop", "tier":item.attr("alt"), "item":item.attr("id"), "itemsSameTier":itemsSameTier });
					one_record = JSON.stringify(temp);
				}
				*/
				var d = (Date.now() - startTime).toString();
				temp_data["time"].push(d);
				temp_data["rank"].push(dictCol(method));
				var temp = JSON.parse(record);
				temp.push(temp_data);
				record = JSON.stringify(temp);
			},

			change: function(event, ui) {
				if(ui.sender || !allowTies){
						
					//variables
					newList = ui.placeholder.parent(); //the list the item is hovering over
					var newListId = parseInt($( newList ).attr("id")); //the id of the list
					var oldListId = parseInt($( oldList ).attr("id")); //the id of the old list
					var listId;
					var prevEmpty = false;
					
					newItem = "<ul class=\"choice1 empty line\"></ul>";
					var tier = 1;

					$( ".tier" ).each(function( index ) { $( this ).remove(); }); //get rid of the tier divs
					$( ".line" ).each(function( index ) { $( this ).remove(); }); //get rid of placeholder uls

					//go through each list from the top
			 
					$( ".choice1" ).each(function( index ) {
						listId = parseInt($( this ).attr("id"));
						if( $( this ).children().size() < 1 ){
							// if this list does not have contain any alternative, then mark it to be "empty"
							$( this ).addClass('empty');
							// if there are two empty lists next to each other, then remove the current one	 
							if(prevEmpty){
								$( this ).remove();
							}else{
								prevEmpty = true;
							}	 
						}else if((listId == oldListId && listId != newListId
							&& $( oldList ).children().size() == 1)){
							$( this ).css("height", "0");
							prevEmpty = true;
						}else if($( this ).height()>0){
							
							//current list contains at least one alternative but is marked "empty"
							if( $( this ).attr('class').indexOf('empty')>-1 ){
								$( this ).removeClass('empty');
								//should remove empty and add new "empty" lists around it
								$( this ).after(newItem);							
								//if($( oldList ).children().size() != 1 || newListID != oldListId+3)
								
								if (index >0){
									//previoius = $( ".choice1" )[index-1].size();
									previoussize = $($( '#left-sortable ul' )[index-1]).size();
									//alert(index+" "+previous);
									//if (previoussize>1)
									{
										
									$( this ).before(newItem);
								}
								}
								else{
									$( this ).before(newItem);
								}
								
									
							}
							if( $( this ).children().size() < 2 || VoteUtil.isMobileAgent() || ! allowTies){
								$( this ).children().css( "width", "93%" );
							}else{
								$( this ).children().css( "width", "45%" ).css("display","inline-block").css("vertical-align","top");
							}
							//if (allowTies && left)
							//if (allowTies || !$(this).hasClass("ui-sortable-helper")) {
							if (allowTies)
								$( this ).before("<div class=\"tier\" style=\"padding-top:" + ($( this )[0].scrollHeight / 3).toString() + "px;\">" + tier + "</div>");
								tier += 1;
							//}
							prevEmpty = false;
						}
					}
					
					);
					
					if (!allowTies)
						$('#left-sortable > ul:not(.ui-sortable-helper)').each(function (i) {
							$( this ).before("<div class=\"tier\" style=\"padding-top:" + ($( this )[0].scrollHeight / 3).toString() + "px;\">" + (i + 1) + "</div>");
						})
					
					//second scan to remove the double "empty" bars
					prevEmpty = false;
					
					$( ".choice1" ).each(function( index ) {
						if( $( this ).children().size() < 1 ){
							// if this list does not have contain any alternative, then mark it to be "empty"
							$( this ).addClass('empty');
							// if there are two empty lists next to each other, then remove the current one	 
							if(prevEmpty){
								$( this ).remove();
							}else{
								prevEmpty = true;
							}	 
						}
						else if($( this ).height()>0){
							prevEmpty = false;
						}
							
					}
					);
					
					if( $(newList).children().size() > 1 && !VoteUtil.isMobileAgent() && allowTies){
						ui.placeholder.css("width", "45%").css("display","inline-block").css("vertical-align","top");
						ui.item.width(ui.placeholder.width());
					}else{
						ui.placeholder.css("width", "93%");
						ui.item.width(ui.placeholder.width());
					}
					
					if (!allowTies) {
						ui.placeholder.css("width", "84%");
						ui.placeholder.css("margin-left", "35px");
						ui.item.width(ui.placeholder.width());
					}
					
				}
				
			},
			placeholder: "ui-state-highlight",
			connectWith: "ul.choice1, ul.empty",
		}).disableSelection();
	}, 1000);
	
	//if the user updates existing preferences, the submit button should be shown
	if ($('#right-sortable li').length == 0) {
		enableSubmission();
	}
	VoteUtil.checkStyle();

	$(".slide").each(function(){
		$(this).slider({
			step: 1,
			slide: function( event, ui ) {
				$("#score" + this.id).text(ui.value);
			},
			start: function (event, ui){
				var d = (Date.now() - startTime).toString();
				temp_data = {"item":$(this).parent().attr("id")};
				temp_data["time"] = [d];
				temp_data["rank"] = [dictSlideStar("slide")];
			},
			stop: function (event, ui){
				var d = (Date.now() - startTime).toString();
				temp_data["time"].push(d);
				temp_data["rank"].push(dictSlideStar("slide"));
				var temp = JSON.parse(record);
				temp.push(temp_data);
				//temp["slider"].push({"time":d, "action":"stop", "value":ui.value.toString(), "item":$(this).parent().attr("id") });
				record = JSON.stringify(temp);
			}
		});
	});
	$(".star").each(function(){
		$(this).rateYo({
			numStars: 10,
			fullStar: true,
			onSet: function (rating, rateYoInstance) {
				if(init_star == false)
				{
					var d = (Date.now() - startTime).toString();
					temp_data = {"item":$(this).parent().attr("id")};
					temp_data["time"] = [d];
					temp_data["rank"] = [dictSlideStar("star")];
					var temp = JSON.parse(record);
					temp.push(temp_data);
					//temp["star"].push({"time":d, "action":"set", "value":rating.toString(), "item":$(this).parent().attr("id") });
					record = JSON.stringify(temp);
				}
			}
		});
	});
	var t = 1
	$("#twoColSection .li_item").each(function(){
		$(this).attr({type:t.toString()});
		t += 1;
	});
	t = 1
	$("#oneColSection .li_item").each(function(){
		$(this).attr({type:t.toString()});
		t += 1;
	});

	if(deviceFlavor == "mobile" && firstTime){
		VoteUtil.moveAll();
	}
	var limit = 1;
	$('.checkbox_single').on('change', function(evt) {
		if($(this).children()[0].checked){
			$(this).siblings().each(function(){
				$(this).children()[0].checked = false;
				select(this);
			});
		}else{
			var ver = false;
			$(this).siblings().each(function(){
				select(this);
				if($(this).children()[0].checked == true){
					ver = true;
				}
			});
			if(!ver){
				$(this).children()[0].checked = true;
				select(this);
			}
		}
	});
});