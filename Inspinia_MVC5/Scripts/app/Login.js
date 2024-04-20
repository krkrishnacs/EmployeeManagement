$(function () {
    var Control = function () {
        return {
            txtemail: $("#txtemail"),
            txtpasword: $("#txtpasword"),
        };
    };
    var objServer = {
        Login: function (data, callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: JSON.stringify(data),
                dataType: 'json',
                async: false,
                url: '/Account/Login',
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
            },
            Click: function () {
                //$(document).on('click', '#btnlogin', function () {
                //    objClient.CommonMethods.Login();

                //});
                $(document).ready(function () {
                    $("#emailaddress").focusout(function () {
                        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                        if (!regex.test($(this).val())) {
                            $(this).val("");
                            alertify.error("Please enter valid Email");
                        }
                    });
                    $("#mobile").focusout(function () {
                        var mobileNum = $(this).val();
                        var validateMobNum = /^\d*(?:\.\d{1,2})?$/;
                        if (validateMobNum.test(mobileNum) && mobileNum.length === 10) {
                        }
                        else {
                            $(this).val("");
                            alertify.error("Invalid Phone Number");
                        }
                    });
                });
            },
            Blur: function () {
            },
            Changed: function () {

            },
            KeyPress: function () {

                //$("#collegename").keypress(function (e) {
                //    var regex = new RegExp(/^[a-zA-Z\s]+$/);
                //    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                //    if (regex.test(str)) {
                //        return true;
                //    }
                //    else {
                //        e.preventDefault();
                //        return false;
                //    }
                //});
                //$("#collegeaddress").keypress(function (e) {
                //    var regex = new RegExp(/^[a-zA-Z\s]+$/);
                //    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                //    if (regex.test(str)) {
                //        return true;
                //    }
                //    else {
                //        e.preventDefault();
                //        return false;
                //    }
                //});
                //$("#contactperson").keypress(function (e) {
                //    var regex = new RegExp(/^[a-zA-Z\s]+$/);
                //    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                //    if (regex.test(str)) {
                //        return true;
                //    }
                //    else {
                //        e.preventDefault();
                //        return false;
                //    }
                //});
                //$("#examcname").keypress(function (e) {
                //    var regex = new RegExp(/^[a-zA-Z\s]+$/);
                //    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                //    if (regex.test(str)) {
                //        return true;
                //    }
                //    else {
                //        e.preventDefault();
                //        alertify.error("Use Character Only !")
                //        return false;
                //    }
                //});
                //$("#mobileno").keypress(function (e) {
                //    var charCode = (e.which) ? e.which : e.keyCode;
                //    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                //        return false;
                //    }
                //});

            },
            KeyUp: function () {
                $("#collegecode").keyup(function () {
                    var input_val = $(this).val();
                    var inputRGEX = /^[a-zA-Z0-9]*$/;
                    var inputResult = inputRGEX.test(input_val);
                    if (!(inputResult == true)) {
                        this.value = this.value.replace(/[^a-z0-9\s]/gi, '');
                        alertify(" Use sepical charcter and Number");
                    }

                });
            },
            AutoComplete: function () {

            }
        },
        CommonMethods: {
            Login: function () {
                if (objClient.CommonMethods.Validate_Flied() == true) {
                    var reqObj = {
                        //Id: Control().hdnID.val(),
                        //Id: Control().hdnID.val() == "" ? 0 : Control().hdnID.val(),
                        EmailAddress: Control().txtemail.val(),
                        Password: Control().txtpasword.val(),
                    };
                }
                else {
                    return false;
                }
                objServer.Login(reqObj, function (response) {
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
            Validate_Flied: function () {
              
                if (Control().txtemail.val() == '') {
                    alertify.error('Please Enter Email Address'); return false;
                }
                if (Control().txtpasword.val() == '') {
                    alertify.error('Please Enter Password'); return false;
                }
                return true;
            },
            Claer_Fields: function () {
                $("#hdnID").val(''),
                    Control().firstname.val(''),
                    Control().lastname.val(''),
                    Control().emailaddress.val(''),
                    Control().password.val(''),
                    Control().confirmpassword.val(''),
                    Control().mobile.val(''),
                    Control().address.val(''),
                    Control().isactive.prop("checked", false);
                $("#btnSaveReg ").text('Save');

            },
        }
    };
    objClient.Initialization();
});
