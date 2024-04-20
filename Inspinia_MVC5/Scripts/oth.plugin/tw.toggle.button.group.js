$(function () {
    (function (alias) {
        var ToggleButtonGroup = function (defaultStatus, _$cntr) {
            var statuses;
            var initStatus;
            var _p = this;
            var eventBox = new EventBox(_p);
            this.reset = function () {
                _p.setValue(initStatus);
            };
            this.getValue = function () {
                return _$cntr.data('selected');
            };
            this.setValue = function (val, callback) {
                if (statuses.indexOf(val) !== -1) {
                    _$cntr.data('selected', val);
                    _$cntr.attr('data-selected', val);
                    _$cntr.find('button').addClass('btn-white').removeClass('btn-primary').removeClass('selected');
                    _$cntr.find('button[value="' + val + '"]').addClass('selected').addClass('btn-primary').removeClass("btn-white");
                    if (typeof callback === "function") {
                        callback(val);
                    }
                }
            };
            var publishEvents = function () {
                eventBox._register("beforeChange");
                eventBox._register("changed");
            };
            var bindEvents = function () {
                _$cntr.on('click', "button", function (e) {
                    var status = $(this).val();
                    var firstArg = { old: _p.getValue(), new: status, abort: false };
                    if (firstArg.old === firstArg.new) {
                        return;
                    }
                    _p._trigger("beforeChange", firstArg);
                    if (!firstArg.abort) {
                        _p.setValue(status, function (st) {
                            _p._trigger("changed", { selected: st });
                        });
                    }
                });
            };
            var init = function () {
                statuses = _$cntr.find('button')
                    .map(function () {
                        return $(this).val();
                    }).get();
                if (defaultStatus) {
                    _p.setValue(defaultStatus);
                    initStatus = defaultStatus;
                } else if (_$cntr.find('button.selected').length > 0) {
                    var status = _$cntr.find('button.selected').val();
                    if (status) {
                        _p.setValue(status);
                        initStatus = status
                    }
                }
            };
            (function () {
                init();
                publishEvents();
                bindEvents();
            }());
        };
        window[alias] = ToggleButtonGroup;
    }("ToggleButtonGroup"));
    
});