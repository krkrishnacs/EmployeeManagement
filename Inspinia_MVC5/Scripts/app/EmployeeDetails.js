$(function () {
    var Control = function () {
        //$('#ddldepartment').select2();
        //$('#ddldesignation').select2();
        //$('#ddlgender').select2();
        return {
            empName: $("#empName"),
            empdate: $("#empdate"),
            ddldepartment: $("#ddldepartment"),
            ddldesignation: $("#ddldesignation"),
            ddlgender: $("#ddlgender"),
            mobileno: $("#mobileno"),
            empaddress: $("#empaddress"),
            isactive: $("#isactive"),
            hdnID: $("#hdnID"),
            tblEmployeeDetails: $("#tblEmployeeDetails"),
        };
    };
    var objServer = {
        Add_UpdateEmployeeDetails: function (data, callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: JSON.stringify(data),
                dataType: 'json',
                async: false,
                url: '/EmployeeDetails/Add_UpdateEmployeeDetails',
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
        Get_AllEmployeeDetails: function (data, callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: JSON.stringify(data),
                dataType: 'json',
                async: false,
                url: '/EmployeeDetails/Get_AllEmployeeDetails',
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
                url: '/EmployeeDetails/GetDataForEditByID',
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
                objClient.CommonMethods.Get_AllEmployeeDetails();
                /*$("#empdate").datepicker();*/
                /*$('#ddldepartment').select2();*/
                $('#empdate').datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    changeYear: true,
                    changeMonth: true,
                    dateFormat: 'dd/mm/yy',
                   /* showOn: 'both',*/
                    //buttonImage: 'images/calendar_icon.png',
                    buttonImageOnly: false,
                    closeText: 'X',
                    showAnim: 'drop',
                    showButtonPanel: false,
                    duration: 'slow',
                    endDate: '+0d',
                    autoclose: true
                });
              
            },
            Click: function () {
                $(document).on('click', '#btnSave', function () {
                    objClient.CommonMethods.Add_UpdateEmployeeDetails();
                });
                $(document).on('click', '#btnRefresh', function () {
                    location.reload();
                });
             
                $("#tblEmployeeDetails").on('click', '.btnEditOnline', function () {
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
                            ddlHtml += '<option value="' + value.DepartmentId + '">' + value.DepartmentName + '</option>';
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
                            ddlHtml += '<option value="' + value.DesignationId + '">' + value.DesignationName + '</option>';
                        });
                        Control().ddldesignation.append(ddlHtml);
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            Add_UpdateEmployeeDetails: function () {
                if (objClient.CommonMethods.Validate_Flied() == true) {
                    var reqObj = {
                        Id: Control().hdnID.val() == "" ? 0 : Control().hdnID.val(),
                        EmployeeName: Control().empName.val(),
                        DateofBirth: Control().empdate.val(),
                        Gender: Control().ddlgender.val(),
                        MobileNumber: Control().mobileno.val(),
                        EmployeeAddress: Control().empaddress.val(),
                        DepartmentId: Control().ddldepartment.val(),
                        DesignationId: Control().ddldesignation.val(),
                        IsActive: Control().isactive.is(":checked"),
                    };
                }
                else {
                    return false;
                }
                objServer.Add_UpdateEmployeeDetails(reqObj, function (response) {
                    if (response.Status == 200) {
                        if (response.Data.code == 1) {
                            alertify.success(response.Data.Msg);
                            objClient.CommonMethods.Claer_Fields();
                            objClient.CommonMethods.Get_AllEmployeeDetails(); 
                        }
                        if (response.Data.code == 2) {
                            alertify.success(response.Data.Msg);
                            objClient.CommonMethods.Claer_Fields();
                            objClient.CommonMethods.Get_AllEmployeeDetails(); 

                        }

                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            Get_AllEmployeeDetails: function () {
                objServer.Get_AllEmployeeDetails(null, function (response) {
                    if (response.Status == 200) {
                        var data = response.Data;
                        $('#tblEmployeeDetails').DataTable({
                            dom: 'Bfrtip',
                            destroy: true,
                            data: data,
                            responsive: false,
                            columns: [
                                { title: "<span>#</span>", data: 'Id' },
                                { title: "<span>Employee Name</span>", data: 'EmployeeName' },
                                { title: "<span>Date of Birth </span>", data: 'DateofBirth' },
                                { title: "<span>Gender</span>", data: 'Gender' },
                                { title: "<span>Mobile Number</span>", data: 'MobileNumber' },
                                { title: "<span>Employee Address</span>", data: 'EmployeeAddress' },
                                { title: "<span>Department Name</span>", data: 'DepartmentId' },
                                { title: "<span>Department Name</span>", data: 'DepartmentName' },
                                { title: "<span>Designation Name</span>", data: 'DesignationId' },
                                { title: "<span>Designation Name</span>", data: 'DesignationName' },
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
                                    "render": function (data) {
                                        if (data === 'M') {
                                            return 'Male';
                                        } else if (data === 'F') {
                                            return 'Female';
                                        } else if (data === 'T') {
                                            return 'Transgender';
                                        } 
                                    }

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
                                    "visible": false,
                                    "targets": 6,
                                    "className": "text-center hide_column",

                                },
                                {
                                    "visible": true,
                                    "targets": 7,
                                    "className": "text-center",

                                },
                                {
                                    "visible": false,
                                    "targets": 8,
                                    "className": " text-center hide_column"
                                },
                                {
                                    "visible": true,
                                    "targets": 9,
                                    "className": " text-center"
                                },
                                {
                                    "visible": true,
                                    "targets": 10,
                                    "className": "text-center",
                                    "render": function (data, a, row) {
                                        return row.IsActive === true ? "Yes" : "No";
                                    },
                                },

                                {
                                    "targets": 11,
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
            GetDataForEditByID: function (Id) {
                var reqObj = {
                    Id: Id
                };
                objServer.GetDataForEditByID(reqObj, function (response) {
                    if (response.Status == 200) {
                        var data = response.Data;
                        $("#hdnID").val(data.Id);
                        Control().empName.val(data.EmployeeName);
                        Control().empdate.val(data.DateofBirth);
                        Control().ddldepartment.val(data.DepartmentId);
                        Control().ddldesignation.val(data.DesignationId);
                        Control().ddlgender.val(data.Gender);
                        Control().mobileno.val(data.MobileNumber);
                        Control().empaddress.val(data.EmployeeAddress);
                        Control().isactive.attr('checked', data.IsActive);
                        $("#btnSave").text("Update");
                        objClient.CommonMethods.Get_AllEmployeeDetails();
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            Validate_Flied: function () {

                if (Control().empName.val() == '') {
                    alertify.error('Please Enter Employee Name'); return false;
                }
                if (Control().empdate.val() == '') {
                    alertify.error('Please Select Employee Date of Birth:'); return false;
                }
                if (Control().ddlgender.val() == '') {
                    alertify.error('Please Select Gender'); return false;
                }
                if (Control().mobileno.val() == '') {
                    alertify.error('Please Enter Mobile No'); return false;
                }
                if (Control().ddldepartment.val() == '') {
                    alertify.error('Please Select Department'); return false;
                }
                if (Control().ddldesignation.val() == '') {
                    alertify.error('Please Select Designation'); return false;
                }
                if (Control().empaddress.val() == '') {
                    alertify.error('Please Enter Employee Address'); return false;
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
                $("#hdnId").val(''),
                    Control().empName.val(''),
                    Control().empaddress.val(''),
                    Control().empdate.val(''),
                    Control().ddldepartment.val(''),
                    Control().ddldesignation.val(''),
                    Control().ddlgender.val(''),
                    Control().mobileno.val(''),
                    Control().isactive.prop("checked", false);
                    $("#btnSave ").text('Save');

            },
        }
    };
    objClient.Initialization();
});