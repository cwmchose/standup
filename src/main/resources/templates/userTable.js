$(document).ready( function() {
	var table = $('user_table').DataTable({
		"sAjaxSource": "/user",
		"sAjaxDataProp": "",
		"order": [[0, "asc"]],
		"aoColumns": [ {"mData": "userID"}, {"mData": "first_name"}, {"mData": "last_name"}, {"mData": "email"} ]
	})
});
