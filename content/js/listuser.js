document.getElementById("search").addEventListener('click', search);
document.getElementById("full_name").addEventListener('click', sort);
document.getElementById("name_level").addEventListener('click', sort);
document.getElementById("end_date").addEventListener('click', sort);

document.addEventListener("DOMContentLoaded", function (e) {
    showUser("", 0, "full_name", "ASC", 1);
});

function showUser(fullName, groupId, sortType, sortValue, page) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        try {
            var tableUserHtml = "";
            var pageHtml = "";
            var table = document.getElementById("user");
            var tablePage = document.getElementById("page");
            var groupIdSelect = document.getElementById("groupid");
            var groupIdSelect2 = document.getElementById("groupID");
            var code_level = document.getElementById("codeLevel");
            while (table.rows.length > 1) {
                table.deleteRow(-1);
            }
            while (tablePage.rows.length > 0) {
                tablePage.deleteRow(-1);
            }
            while (groupIdSelect.length > 1) {
                groupIdSelect.remove(groupIdSelect.length - 1);
            }
            if (this.readyState == 4 && this.status == 200) {
                var str = this.responseText;
                var lData = JSON.parse(str);
                var userInfor = lData["luser"];
                var lPage = lData["lpage"];
                var listGroup = lData["lgroup"];
                var listJapan = lData["ljapan"];
                var listPage = lPage.listpage;
                var totalPage = lPage.totalpage;
                for (var i = 0; i < length(userInfor); i++) {
                    tableUserHtml = "";
                    var elm = document.createElement("tr");
                    tableUserHtml += "<td>" + eval("userInfor[\"" + i + "\"].UserID") + "</td>";
                    tableUserHtml += "<td>" + eval("userInfor[\"" + i + "\"].fullName") + "</td>";
                    tableUserHtml += "<td>" + eval("userInfor[\"" + i + "\"].birthday") + "</td>";
                    tableUserHtml += "<td>" + eval("userInfor[\"" + i + "\"].groupName") + "</td>";
                    tableUserHtml += "<td>" + eval("userInfor[\"" + i + "\"].email") + "</td>";
                    tableUserHtml += "<td>" + eval("userInfor[\"" + i + "\"].tel") + "</td>";
                    tableUserHtml += "<td>" + eval("userInfor[\"" + i + "\"].nameLevel") + "</td>";
                    tableUserHtml += "<td>" + eval("userInfor[\"" + i + "\"].endDate") + "</td>";
                    tableUserHtml += "<td>" + eval("userInfor[\"" + i + "\"].total") + "</td>";
                    elm.innerHTML = tableUserHtml;
                    table.appendChild(elm);
                }

                elmPage = document.createElement("tr");
                var firstPage = listPage["1"];
                var lastPage = eval("listPage[\"" + length(listPage) + "\"]");
                if (parseInt(firstPage) > 1) {
                    pageHtml += "<td><a href=\"#\" id=" + (parseInt(firstPage) - 1) + " onclick=\"paging()\">" + "<<" + "&nbsp;" + "</a></td>";
                }
                for (var i = 1; i <= length(listPage); i++) {
                    var x = eval("listPage[\"" + i + "\"]");
                    pageHtml += "<td><a href=\"#\" id=" + x + " onclick=\"paging()\">" + x + "&nbsp;" + "</a></td>";
                }
                if (parseInt(lastPage) < parseInt(totalPage)) {
                    pageHtml += "<td><a href=\"#\" id=" + (parseInt(lastPage) + 1) + " onclick=\"paging()\">" + ">>" + "&nbsp;" + "</a></td>";
                }
                elmPage.innerHTML = pageHtml;
                tablePage.appendChild(elmPage);


                for (var i = 0; i < length(listGroup); i++) {
					var g = eval("listGroup[\"" + i + "\"].group_name");
					var gId = eval("listGroup[\"" + i + "\"].group_id");
                    var opt = document.createElement("option");
                    opt.value = i + 1;
					opt.text = g;
					if (String(gId) == String(groupId)) {
						opt.selected = true;
					}
                    groupIdSelect.appendChild(opt);
                    
                }
                for (var i = 0; i < length(listGroup); i++) {
                    var g = eval("listGroup[\"" + i + "\"].group_name");
                    var gId = eval("listGroup[\"" + i + "\"].group_id");
                    var opt = document.createElement("option");
                    opt.value = i + 1;
                    opt.text = g;
                    if (String(gId) == String(groupId)) {
                        opt.selected = true;
                    }
                    groupIdSelect2.appendChild(opt);
                }
                for (var i = 0; i < length(listJapan); i++) {
                    var g = eval("listJapan[\"" + i + "\"].code_level");
                    var gId = eval("listJapan[\"" + i + "\"].name_level");
                    var opt = document.createElement("option");
                    opt.value = i + 1;
                    opt.text = g;
                    if (String(gId) == String(code_level.value)) {
                        opt.selected = true;
                    }
                    code_level.appendChild(opt);
                }
                document.getElementById("search").disabled = false;
            }
        } catch (ex) {
            location.replace("SystemError.asp");
        }
    };
    try {
        xmlhttp.open("GET", "default.asp?controller=userlist&action=searchtest&fullname=" + fullName + "&groupid=" + groupId + "&sorttype=" + sortType + "&sortvalue=" + sortValue + "&page=" + page);
        xmlhttp.send();
    } catch (e) {
        location.replace("SystemError.asp");
    }
}


function search() {
    document.getElementById("search").disabled = true;
    var fullName = document.getElementById("fullname").value;
    var groupId = document.getElementById("groupid").value;
    var sortTypeDefault = "full_name";
    var sortValueDefault = "ASC";
    var pageDefault = 1;
    var classSort = document.getElementsByClassName("sort");
    classSort[0].innerHTML = "▲▽";
    classSort[0].name = "ASC";
    classSort[1].innerHTML = "▲▽";
    classSort[1].name = "ASC";
    classSort[2].innerHTML = "△▼";
    classSort[2].name = "DESC";

    document.getElementById("hiddenfullname").value = fullName;
    document.getElementById("hiddengroupid").value = groupId;

    showUser(fullName, groupId, sortTypeDefault, sortValueDefault, pageDefault);
}

function sort() {
    var fullName = document.getElementById("hiddenfullname").value;
    var groupId = document.getElementById("hiddengroupid").value;
    var hiddenSortType = document.getElementById("hiddensorttype");
    var hiddenSortValue = document.getElementById("hiddensortvalue");
    var page = document.getElementById("hiddenpage").value;
    var classSort = document.getElementsByClassName("sort");
    var elm = event.target;
    if (elm.textContent == "▲▽") {
        elm.innerHTML = "△▼";
        elm.name = "DESC";
    } else if (elm.textContent == "△▼") {
        elm.innerHTML = "▲▽";
        elm.name = "ASC"
    }
    switch (elm.id) {
        case "full_name":
            classSort[1].innerHTML = "▲▽";
            classSort[1].name = "ASC";
            classSort[2].innerHTML = "△▼";
            classSort[2].name = "DESC";
            break;
        case "name_level":
            classSort[0].innerHTML = "▲▽";
            classSort[0].name = "ASC";
            classSort[2].innerHTML = "△▼";
            classSort[2].name = "DESC";
            break;
        case "end_date":
            classSort[0].innerHTML = "▲▽";
            classSort[0].name = "ASC";
            classSort[1].innerHTML = "▲▽";
            classSort[1].name = "ASC";
            break;
    }
    sortType = elm.id;
    sortValue = elm.name;
    hiddenSortType.value = sortType;
    hiddenSortValue.value = sortValue;

    showUser(fullName, groupId, sortType, sortValue, page);
}

function paging() {
    var fullName = document.getElementById("hiddenfullname").value;
    var groupId = document.getElementById("hiddengroupid").value;
    var sortType = document.getElementById("hiddensorttype").value;
    var sortValue = document.getElementById("hiddensortvalue").value;
    var elm = event.target;
    var page = elm.id;
    document.getElementById("hiddenpage").value = page;

    showUser(fullName, groupId, sortType, sortValue, page);
}

function length(obj) {
    return Object.keys(obj).length;
}


