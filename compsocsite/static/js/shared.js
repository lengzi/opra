function submitPref() {
	var prefcolumn = $('#left-sortable');
	var order = prefcolumn.sortable("toArray");
	$('#pref_order').val(order.join(","));
	$('#pref_order').submit();
};

function enableSubmission() {
	$('#submitbutton').css("display", "inline");
}

function moveToPref(obj) {
	var time = 100
	var prefcolumn = $('#left-sortable');
	var currentli = document.getElementById(obj.id);
	jQuery("#" + obj.id).addClass("greybackground");
	setTimeout(function() {
		prefcolumn.append(currentli);
		jQuery("#" + obj.id).removeClass("greybackground", time * 2);
		prefcolumn.sortable('refresh');
		if ($('#right-sortable li').length == 0) {
			enableSubmission();
		}
	}, time);

};

function moveAll() {
	var time = 100;
	var ul = document.getElementById('right-sortable');
	var items = ul.getElementsByTagName("li");
	var len = items.length;
	var prefcolumn = $('#left-sortable');
	for (var i = 0; i < len; i++) {
		jQuery("#" + items[i].id).addClass("greybackground");
	}
	setTimeout(function() {
		for (var i = 0; i < len; i++) {
			prefcolumn.append(items[0]);
		}
		setTimeout(function() {
			var ul = document.getElementById('left-sortable');
			var items = ul.getElementsByTagName("li");
			var len = items.length;

			for (var i = 0; i < len; i++) {
				jQuery("#" + items[i].id).removeClass("greybackground", time);
			}
			prefcolumn.sortable('refresh');
		}, time)
	}, time)
	enableSubmission();
};

$(function() {
	$("#left-sortable").sortable({
		placeholder : "ui-state-highlight",
		containment : "parent",
		update : function(event, ui) {
			var order = $("#left-sortable").sortable("toArray");
			$('#pref_order').val(order.join(","));
			enableSubmission();
		}
	});

	$("ul.droptrue").sortable({
		connectWith : "ul"
	});

	$("#left-sortable, #right-sortable").disableSelection();
});
