function showMentions(data) {
	//if(data.count == 0) return;
	var wb_span = document.getElementById("mdl-wb_sum");
	wb_span.innerHTML = data.count + " Mention(s)";
}