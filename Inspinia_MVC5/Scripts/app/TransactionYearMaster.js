$(function () {
    var Control = function () {
        return {
            transactionYear: $("#transactionYear"),
            fromyear: $("#fromyear"),
            fromonth: $("#fromonth"),
            ToYear: $("#ToYear"),
            ToMonth: $("#ToMonth"),
            Status: $("#Status"),
            hdnID: $("#hdnID"),
        };
    };
    var objServer = {
        AddTransactionMaster: function (data, callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: JSON.stringify(data),
                dataType: 'json',
                async: false,
                url: '/TransactionMaster/AddTransactionMaster',
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
        Get_TransactionYear: function (callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: '',
                dataType: 'json',
                async: false,
                url: '/TransactionMaster/Get_TransactionYear',
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
        GetToYear: function (callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: '',
                dataType: 'json',
                async: false,
                url: '/TransactionMaster/GetToYear',
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
        GetFromYear: function (callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: '',
                dataType: 'json',
                async: false,
                url: '/TransactionMaster/GetFromYear',
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
        GetFromMonth: function (callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: '',
                dataType: 'json',
                async: false,
                url: '/TransactionMaster/GetFromMonth',
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
        GetToMonth: function (callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: '',
                dataType: 'json',
                async: false,
                url: '/TransactionMaster/GetToMonth',
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
                objClient.CommonMethods.Get_TransactionYear();
                objClient.CommonMethods.GetFromYear();
                objClient.CommonMethods.GetToYear();
                objClient.CommonMethods.GetFromMonth();
                objClient.CommonMethods.GetToMonth();
                $(document).ready(function () {
                    $("#myModal").modal();

                    // Show a toaster message when the modal is opened
                    //$("#btnSvae").on("shown.bs.modal", function () {
                    //    toastr.error("This is a toaster message!");
                    //});
                });
                $('#exampleModal').modal('hide');
                //$('#fromonth,#ToMonth').datepicker({
                //    showOtherMonths: true,
                //    selectOtherMonths: true,
                //    changeYear: true,
                //    changeMonth: false,
                //    /*dateFormat: 'dd/mm/yy',*/
                //    /* showOn: 'both',*/
                //    //buttonImage: 'images/calendar_icon.png',
                //    //buttonImageOnly: false,
                //    //closeText: 'X',
                //    //showAnim: 'drop',
                //    //showButtonPanel: false,
                //    //duration: 'slow',
                //    //endDate: '+0d',
                //    //autoclose: true
                //});
               //Jquery Show Month Only
                //$(document).ready(function () {
                //    $("#fromonth,#ToMonth").datepicker({
                //        dateFormat: 'mm',
                //        changeMonth: true,
                //        changeYear: false,
                //        showButtonPanel: true,
                //        onClose: function (dateText, inst) {
                //            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
                //        },
                //        beforeShow: function (input, inst) {
                //            $('#ui-datepicker-div').addClass('hide-calendar');
                //            if ((datestr = $(this).val()).length > 0) {
                //                year = datestr.substring(datestr.length - 4, datestr.length);
                //                month = parseInt(datestr.substring(0, 2));
                //                $(this).datepicker('option', 'defaultDate', new Date( month - 1, 1));
                //                $(this).datepicker('setDate', new Date(month - 1, 1));
                //            }
                //        }
                //    });
                //});
            },
            Click: function () {
                $('#btnSvae').click(function () {
                    var fromYear = parseInt($('#fromyear').val());
                    var toYear = parseInt($('#ToYear').val());

                    if (fromYear >= toYear) {
                        alertify.error("Please select From Year&To Year Correct Way");
                        return false; // Prevent form submission
                    }
                    var fromMonth = parseInt($('#fromonth').val());
                    var toMonth = parseInt($('#ToMonth').val());

                    if (fromMonth >= toMonth) {
                        alertify.error("Please select From Month in  Correct Way");
                        return false; // Prevent form submission
                    }
                    var Text = $("#btnSave").text();
                    if (Text == 'Save') {
                        if (objClient.CommonMethods.Validate_Flied()) {
                            objClient.CommonMethods.AddTransactionMaster();
                        }
                    }
                    else {
                        objClient.CommonMethods.AddTransactionMaster();
                    }
                });
                $(document).on('click', '#btnAddTransaction', function () {
                    $('#exampleModal').modal('show');
                    /*$('#hidetrtbl').modal('hide');*/
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
            Get_TransactionYear: function () {
                objServer.Get_TransactionYear(function (response) {
                    if (response.Status === 200) {
                        Control().transactionYear.empty();
                        var ddlHtml = '<option value="">--select-- </option>';
                        $.each(response.Data, function (index, value) {
                            ddlHtml += '<option value="' + value.Id + '">' + value.Val + '</option>';
                        });
                        Control().transactionYear.append(ddlHtml);
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            GetFromYear: function () {
                objServer.GetFromYear(function (response) {
                    if (response.Status === 200) {
                        Control().fromyear.empty();
                        var ddlHtml = '<option value="">--select-- </option>';
                        $.each(response.Data, function (index, value) {
                            ddlHtml += '<option value="' + value.Id + '">' + value.Val + '</option>';
                        });
                        Control().fromyear.append(ddlHtml);
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            GetToYear: function () {
                objServer.GetToYear(function (response) {
                    if (response.Status === 200) {
                        Control().ToYear.empty();
                        var ddlHtml = '<option value="">--select-- </option>';
                        $.each(response.Data, function (index, value) {
                            ddlHtml += '<option value="' + value.Id + '">' + value.Val + '</option>';
                        });
                        Control().ToYear.append(ddlHtml);
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            GetFromMonth: function () {
                objServer.GetFromMonth(function (response) {
                    if (response.Status === 200) {
                        Control().fromonth.empty();
                        var ddlHtml = '<option value="">--select-- </option>';
                        $.each(response.Data, function (index, value) {
                            ddlHtml += '<option value="' + value.Id + '">' + value.Val + '</option>';
                        });
                        Control().fromonth.append(ddlHtml);
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            GetToMonth: function () {
                objServer.GetToMonth(function (response) {
                    if (response.Status === 200) {
                        Control().ToMonth.empty();
                        var ddlHtml = '<option value="">--select-- </option>';
                        $.each(response.Data, function (index, value) {
                            ddlHtml += '<option value="' + value.Id + '">' + value.Val + '</option>';
                        });
                        Control().ToMonth.append(ddlHtml);
                    }
                    else {
                        alertify.error(response.Message);
                    }
                });
            },
            AddTransactionMaster: function () {
                if (objClient.CommonMethods.Validate_Flied() == true) {
                    var reqObj = {
                        Id: Control().hdnID.val() == "" ? 0 : Control().hdnID.val(),
                        TransactionYear: Control().transactionYear.val(),
                        FromYear: Control().fromyear.val(),
                        FromMonth: Control().fromonth.val(),
                        ToYear: Control().ToYear.val(),
                        ToMonth: Control().ToMonth.val(),
                        Status: Control().Status.is(":checked"),
                    };
                }
                else {
                    return false;
                }
                objServer.AddTransactionMaster(reqObj, function (response) {
                    if (response.Status == 200) {
                        if (response.Data.code == 1) {
                            alertify.success(response.Data.Msg);
                        }
                        if (response.Data.code == 2) {
                            alertify.success(response.Data.Msg);
                            //objClient.CommonMethods.Claer_Fields();
                            //objClient.CommonMethods.Get_AllEmployeeDetails();

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

                if (Control().transactionYear.val() == '') {
                    alertify.error('Please Enter Employee Name'); return false;
                }
                if (Control().fromyear.val() == '') {
                    alertify.error('Please Select From Year:'); return false;
                }
                if (Control().fromonth.val() == '') {
                    alertify.error('Please Select fROM mONTH'); return false;
                }
                if (Control().ToMonth.val() == '') {
                    alertify.error('Please Select TO YEAR'); return false;
                }
                if (Control().ToYear.val() == '') {
                    alertify.error('Please Select To Year'); return false;
                }
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