$(function () {
    var Control = function () {
        return {
            empName: $("#empName"),
            empdate: $("#empdate"),
            ddldepartment: $("#ddldepartment"),
            ddldesignation: $("#ddldesignation"),
            ddlgender: $("#ddlgender"),
            mobileno: $("#mobileno"),
            empaddress: $("#empaddress"),
            isactive: $("#isactive"),
            hdnCollegeID: $("#hdnCollegeID"),
        };
    };
    var objServer = {
        Add_Update_CollegeStudent: function (data, callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: JSON.stringify(data),
                dataType: 'json',
                async: false,
                url: '/CollegeStudent/Add_Update_CollegeStudent',
                success: function (responce) {
                    $(".loading-overlay").hide();
                    callback(responce);
                },
                error: function () {
                    $(".loading-overlay").hide();
                    callback('error');
                }
            });
        },
        Get_Department: function (callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: '',
                dataType: 'json',
                async: false,
                url: '/EmployeeDetails/Get_Department',
                success: function (responce) {
                    $(".loading-overlay").hide();
                    callback(responce);
                },
                error: function () {
                    $(".loading-overlay").hide();
                    callback('error');
                }
            });
        },
        Get_Designation: function (callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: '',
                dataType: 'json',
                async: false,
                url: '/EmployeeDetails/Get_Designation',
                success: function (responce) {
                    $(".loading-overlay").hide();
                    callback(responce);
                },
                error: function () {
                    $(".loading-overlay").hide();
                    callback('error');
                }
            });
        },
        Get_AllCollegeStudent: function (data, callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: JSON.stringify(data),
                dataType: 'json',
                async: false,
                url: '/CollegeStudent/Get_AllCollegeStudent',
                success: function (responce) {

                    $(".loading-overlay").hide();
                    callback(responce);
                },
                error: function () {
                    $(".loading-overlay").hide();
                    callback('error');
                }
            });
        },
        GetDataForEditByID: function (data, callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: JSON.stringify(data),
                dataType: 'json',
                async: false,
                url: '/CollegeStudent/GetDataForEditByID',
                success: function (responce) {
                    $(".loading-overlay").hide();
                    callback(responce);
                },
                error: function () {
                    $(".loading-overlay").hide();
                    callback('error');
                }
            });
        },
    }
    var objClient = {
        Initialization: function () {
            objClient.Events.Click();
            objClient.Events.OnLoad();
            objClient.Events.KeyPress();
            objClient.Events.Blur();
            objClient.Events.Changed();
            objClient.Events.KeyUp();
            objClient.Events.AutoComplete();
        },
        Events: {
            OnLoad: function () {
                objClient.CommonMethods.Get_Department();
                objClient.CommonMethods.Get_Designation();
                $('#ddldepartment').select2();
               /* alertify.success("Please Select")*/
               /* $("#empdate").datepicker();*/
                alert("message");
               /* $("#empdate").datepicker();*/
            },
            Click: function () {
                $(document).on('click', '#btnSave', function () {
                    alert("Testing Click Events");
                    /*objClient.CommonMethods.Add_Update_CollegeStudent();*/

                });
                $(document).on('click', '#btnRefresh', function () {
                    location.reload();
                });
             
                $("#tblcollegestu").on('click', '.btnEditOnline', function () {
                    objClient.CommonMethods.GetDataForEditByID($(this).closest('tr').find('td:eq(0)').text());

                });

            },
            Blur: function () {
            },
            Changed: function () {

            },
            KeyPress: function () {

                $("#empName").keypress(function (e) {
                    var regex = new RegExp(/^[a-zA-Z\s]+$/);
                    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                    if (regex.test(str)) {
                        return true;
                    }
                    else {
                        e.preventDefault();
                        return false;
                    }
                });
                $("#empaddress").keypress(function (e) {
                    var regex = new RegExp(/^[a-zA-Z\s]+$/);
                    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                    if (regex.test(str)) {
                        return true;
                    }
                    else {
                        e.preventDefault();
                        return false;
                    }
                });
                $("#mobileno").keypress(function (e) {
                    var charCode = (e.which) ? e.which : e.keyCode;
                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        return false;
                    }
                });

            },
            KeyUp: function () {
                $("#collegecode").keyup(function () {
                    var input_val = $(this).val();
                    var inputRGEX = /^[a-zA-Z0-9]*$/;
                    var inputResult = inputRGEX.test(input_val);
                    if (!(inputResult == true)) {
                        this.value = this.value.replace(/[^a-z0-9\s]/gi, '');
                        alert(" Use sepical charcter and Number");
                    }

                });
            },
            AutoComplete: function () {

            }
        },
        CommonMethods: {
            Get_Department: function () {
                objServer.Get_Department(function (response) {
                    if (response.Status === 200) {
                        Control().ddldepartment.empty();
                        var ddlHtml = '<option value="">--select-- </option>';
                        $.each(response.Data, function (index, value) {
                            ddlHtml += '<option value="' + value.Id + '">' + value.DepartmentName + '</option>';
                        });
                        Control().ddldepartment.append(ddlHtml);
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            Get_Designation: function () {
                objServer.Get_Designation(function (response) {
                    if (response.Status === 200) {
                        Control().ddldesignation.empty();
                        var ddlHtml = '<option value="">--select-- </option>';
                        $.each(response.Data, function (index, value) {
                            ddlHtml += '<option value="' + value.Id + '">' + value.DesignationName + '</option>';
                        });
                        Control().ddldesignation.append(ddlHtml);
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            Add_Update_CollegeStudent: function () {
                if (objClient.CommonMethods.Validate_Flied() == true) {
                    var reqObj = {
                        //CollegeID: Control().hdnCollegeID.val(),
                        CollegeID: Control().hdnCollegeID.val() == "" ? 0 : Control().hdnCollegeID.val(),
                        CollegeCode: Control().collegecode.val(),
                        CollegeName: Control().collegename.val(),
                        CollegeAddress: Control().collegeaddress.val(),
                        Mobile: Control().mobileno.val(),
                        Email: Control().email.val(),
                        Website: Control().website.val(),
                        ContactPerson: Control().contactperson.val(),
                        ExamCenterName: Control().examcname.val(),
                        IsActive: Control().isactive.is(":checked"),
                    };
                }
                else {
                    return false;
                }
                objServer.Add_Update_CollegeStudent(reqObj, function (response) {
                    if (response.Status == 200) {
                        if (response.Data.code == 1) {
                            alertify.success(response.Data.Msg);
                            objClient.CommonMethods.Claer_Fields();
                        }
                        if (response.Data.code == 2) {
                            alertify.success(response.Data.Msg);
                            objClient.CommonMethods.Claer_Fields();

                        }

                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            Get_AllCollegeStudent: function () {

                objServer.Get_AllCollegeStudent(null, function (response) {
                    if (response.Status == 200) {
                        var data = response.Data;
                        $('#tblcollegestu').DataTable({
                            dom: 'Bfrtip',
                            destroy: true,
                            data: data,
                            responsive: false,
                            columns: [
                                { title: "<span>CollegeID</span>", data: 'CollegeID' },
                                { title: "<span>College Name</span>", data: 'CollegeName' },
                                { title: "<span>College Address </span>", data: 'CollegeAddress' },
                                { title: "<span>College Code</span>", data: 'CollegeCode' },
                                { title: "<span>Exam Center Name</span>", data: 'ExamCenterName' },
                                { title: "<span>Email Address </span>", data: 'Email' },
                                { title: "<span>Mobile No</span>", data: 'Mobile' },
                                { title: "<span>Contact Person</span>", data: 'ContactPerson' },
                                { title: "<span> IsActive </span>", data: 'IsActive' },
                                { title: "<span>Action</span>", data: '' },
                            ],
                            columnDefs: [
                                {

                                    "targets": 0,
                                    "visible": true,
                                    "className": "text-center hide_column"
                                },
                                {
                                    "targets": 1,
                                    "visible": true,
                                    "className": "text-center",
                                },
                                {
                                    "visible": true,
                                    "targets": 2,
                                    "className": " text-center"
                                },
                                {
                                    "targets": 3,
                                    "visible": true,
                                    "className": "text-center",
                                },
                                {
                                    "visible": true,
                                    "targets": 4,
                                    "className": " text-center"
                                },

                                {
                                    "visible": true,
                                    "targets": 5,
                                    "className": " text-center"
                                },
                                {
                                    "visible": true,
                                    "targets": 6,
                                    "className": "text-center",

                                },
                                {
                                    "visible": true,
                                    "targets": 7,
                                    "className": " text-center"
                                },
                                {
                                    "visible": true,
                                    "targets": 8,
                                    "className": "text-center",
                                    "render": function (data, a, row) {
                                        return row.IsActive === true ? "Yes" : "No";
                                    },
                                },

                                {
                                    "targets": 9,
                                    "className": "text-center",
                                    'visible': true,
                                    "render": function (data, a, row) {

                                        return '<button class="btn btn-primary btn-xs btnEditOnline" style="width:50px">Edit</button>';
                                    },
                                },
                            ],

                            dom: 'Bfrtip',
                            buttons: [
                                'copy',
                                'csv',
                                {
                                    extend: 'excel',
                                    messageTop: "excel",
                                    messageBottom: null
                                },
                                {
                                    extend: 'pdf',
                                    messageBottom: null
                                },
                                {
                                    extend: 'print',
                                    messageTop: "print",
                                    messageBottom: null
                                }
                            ]
                        });
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });

            },
            GetDataForEditByID: function (CollegeID) {
                var reqObj = {
                    CollegeID: CollegeID
                };
                objServer.GetDataForEditByID(reqObj, function (response) {
                    if (response.Status == 200) {
                        var data = response.Data;
                        $("#hdnCollegeID").val(data.CollegeID);
                        Control().collegename.val(data.CollegeName);
                        Control().collegeaddress.val(data.CollegeAddress);
                        Control().collegecode.val(data.CollegeCode);
                        Control().examcname.val(data.ExamCenterName);
                        Control().email.val(data.Email);
                        Control().mobileno.val(data.Mobile);
                        Control().website.val(data.Website);
                        Control().contactperson.val(data.ContactPerson);
                        Control().isactive.attr('checked', data.IsActive);
                        $("#btnSave").text("Update");
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            Validate_Flied: function () {

                if (Control().collegecode.val() == '') {
                    alertify.error('Please Enter College Code'); return false;
                }
                if (Control().collegename.val() == '') {
                    alertify.error('Please Enter College  Name:'); return false;
                }
                if (Control().collegeaddress.val() == '') {
                    alertify.error('Please Enter College Address'); return false;
                }
                if (Control().mobileno.val() == '') {
                    alertify.error('Please Enter Mobile No'); return false;
                }

                $("#mobileno").focusout(function () {
                    var mobileNum = $(this).val();
                    var validateMobNum = /^\d*(?:\.\d{1,2})?$/;
                    if (validateMobNum.test(mobileNum) && mobileNum.length === 10) {
                    }
                    else {
                        $(this).val("");
                        alertify.error("Invalid Phone Number");
                    }
                });


                $("#email").focusout(function () {
                    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (!regex.test($(this).val())) {
                        $(this).val("");
                        alertify.error("Please enter valid Email");
                    }
                });
                return true;
            },
            Claer_Fields: function () {
                $("#hdnCollegeID").val(''),
                    Control().collegename.val(''),
                    Control().collegeaddress.val(''),
                    Control().collegecode.val(''),
                    Control().examcname.val(''),
                    Control().email.val(''),
                    Control().mobileno.val(''),
                    Control().website.val(''),
                    Control().contactperson.val(''),
                    Control().isactive.prop("checked", false);
                    $("#btnSave ").text('Save');

            },
        }
    };
    objClient.Initialization();
});