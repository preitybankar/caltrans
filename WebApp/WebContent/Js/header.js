/**
 * 
 */
// Loading header and footer using Ajax
fetch("./header.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("header").innerHTML = data;
});

fetch("./footer.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("footer").innerHTML = data;
});
var isLoading = false;
const projectMap = new Map();
const projectNameMap = new Map();
function openProject() {
	//console.log("inside");
	if (!isLoading) {
		//alert(12);
		isLoading = true;
		$.ajax({
			type: 'GET',
			url: 'project',
			async: true,
		}).done(function(resp) {
			//alert(JSON.stringify(resp));
			projectMap.clear();
			projectNameMap.clear();
			var projectNameSet = new Set();
			for (var i = 0; i < resp.length; i++) {
				var project = resp[i];
				projectMap[project.id] = project;
				projectNameMap[project.name] = project;
				projectNameSet.add(project.name);
			}
			projectNameSet.forEach(function(project_name) {
				$("#selectProject").append("<option value='" + project_name + "'>" + project_name + "</option>");
			});
			isLoading = false;
		}).fail(function(response) {
			alert(response.responseText);
		});
	}
}

function onOpenProjectBtnClick() {
	var name = $("#selectProject").val();
	var projectId = projectNameMap[name].id;  
    window.location = 'new_project.html?id=' + projectId;
}