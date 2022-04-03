$(function () {
    var dialog, form,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        loginName = $("#loginName"),
        groupID = $("#groupID"),
        fullName = $("#fullName"),
        fullNameKana = $("#fullNameKana"),
        dayBirthday = $("#dayBirthday"),
        monthBirthday = $("#monthBirthday"),
        yearBirthday = $("#yearBirthday"),
        email = $("#email"),
        tel = $("#tel"),
        password = $("#password"),
        passwordConfirm = $("#passwordConfirm"),
        codeLevel = $("#codeLevel"),
        dayStartDate = $("#dayStartDate"),
        monthStartDate = $("#monthStartDate"),
        yearStartDate = $("#yearStartDate"),
        dayEndDate = $("#dayEndDate"),
        monthEndDate = $("#monthEndDate"),
        yearEndDate = $("#yearEndDate"),
        total = $("#total"),
        allFields = $([]).add(loginName).add(email),
        tips = $(".validateTips");

    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }
    function checkEmpty(o, n) {
        if (o.val().trim() === "" || o.val() === "0") {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }
    function checkDuplicate(password, passwordConfirm, n) {
        if (password.val() != passwordConfirm.val()) {
            passwordConfirm.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }

    function checkLength(o, n, maxLength) {
        if (o.val() != "") {
            if (o.val().length > maxLength) {
                o.addClass("ui-state-error");
                updateTips(n);
                return false;
            } else {
                return true;
            }
        }
    }

    function isDate(yearBirthday, monthBirthday, dayBirthday, n) {
        var date = new Date(fullDate).isDate();

        if (date) {
            return true;
        } else {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        }
    }

    function addUser() {
        var valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkEmpty(loginName, "Please enter アカウント名");
        valid = valid && checkLength(loginName, "アカウント名 is less than 15 characters ", 15);
        valid = valid && checkRegexp(loginName, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
        valid = valid && checkEmpty(groupID, "Please Choose グループ ");
        valid = valid && checkEmpty(fullName, "Please enter 氏名");
        valid = valid && checkLength(fullName, "氏名 is less than 255 characters", 255);
        if (fullNameKana.val() != "") {
            valid = valid && checkLength(fullNameKana, "カタカナ氏名 is less than 255 characters", 255);
        }

        valid = valid && checkEmpty(email, "Please enter メールアドレス");
        valid = valid && checkLength(email, "メールアドレス is less than 100 characters", 100);
        valid = valid && checkRegexp(email, emailRegex, "eg. ui@jquery.com");

        valid = valid && checkEmpty(tel, "Please enter 電話番号");
        valid = valid && checkLength(tel, "電話番号 is less than 14 characters", 14);
        valid = valid && checkRegexp(tel, /^\(?([0-9]{4})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/, "Tel must be in the format xxxx-xxxx-xxxx");

        valid = valid && checkEmpty(password, "Please enter パスワード");
        valid = valid && checkLength(password, "パスワード is less than 15 characters", 15);
        valid = valid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");

        valid = valid && checkDuplicate(password, passwordConfirm, "パスワード（確認) incorrect");
        if (codeLevel.val() !== "0") {
            valid = valid && checkEmpty(total, "Please enter:点数:");
        }
        if (valid) {
            const formData = new URLSearchParams;
            const url = "Default.asp?controller=user&action=AddUserPost"
            formData.append('loginName', loginName.val());
            formData.append('groupID', groupID.val());
            formData.append('groupID', groupID.val());
            formData.append('groupID', groupID.val());
            formData.append('groupID', groupID.val());
            formData.append('groupID', groupID.val());
            formData.append('groupID', groupID.val());
            dialog.dialog("clos1e");
        }
        return valid;
    }

    function loadYear() {
        year = $(".ddlNam");
        for (i = 0; i < year.length; i++) {
            year[i].length = 0;
            var iYear = 0;
            var today = new Date();
            for (iYear = 1990; iYear <= today.getFullYear(); iYear++) {
                var optYear = document.createElement("option");
                optYear.text = iYear;
                optYear.value = iYear;
                year[i].options.add(optYear);
            }
        }
    }

    function loadMonth() {
        month = document.getElementsByClassName("ddlThang");
        for (i = 0; i < month.length; i++) {
            month[i].length = 0;
            var iMonth = 0;
            for (iMonth = 1; iMonth <= 12; iMonth++) {
                var optMonth = document.createElement("option");
                optMonth.text = iMonth;
                optMonth.value = iMonth;
                month[i].options.add(optMonth);
            }
        }
    }

    function loadDay() {
        day = document.getElementsByClassName("ddlNgay");
        for (i = 0; i < day.length; i++) {
            day[i].length = 0;
            var iDay = 0;
            for (iDay = 1; iDay <= 31; iDay++) {
                var optDay = document.createElement("option");
                optDay.text = iDay;
                optDay.value = iDay;
                day[i].options.add(optDay);
            }
        }
    }

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 700,
        width: 700,
        modal: true,
        buttons: {
            "確認": addUser,
            "戻る": function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        addUser();
    });

    $("#create-user").on("click", function () {
        dialog.dialog("open");
        loadYear();
        loadMonth();
        loadDay();
    });
});