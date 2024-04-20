/**
 *	Neon Calendar Script
 *
 *	Developed by Arlind Nushi - www.laborator.co
 */

var neonCalendar = neonCalendar || {};

;(function($, window, undefined)
{
	"use strict";

	$(document).ready(function()
	{
		neonCalendar.$container = $(".calendar-env");

		$.extend(neonCalendar, {
			isPresent: neonCalendar.$container.length > 0
		});

		// Mail Container Height fit with the document
		if(neonCalendar.isPresent)
		{
			neonCalendar.$sidebar = neonCalendar.$container.find('.calendar-sidebar');
			neonCalendar.$body = neonCalendar.$container.find('.calendar-body');


			// Checkboxes
			var $cb = neonCalendar.$body.find('table thead input[type="checkbox"], table tfoot input[type="checkbox"]');

			$cb.on('click', function()
			{
				$cb.attr('checked', this.checked).trigger('change');

				calendar_toggle_checkbox_status(this.checked);
			});

			// Highlight
			neonCalendar.$body.find('table tbody input[type="checkbox"]').on('change', function()
			{
				$(this).closest('tr')[this.checked ? 'addClass' : 'removeClass']('highlight');
			});


			// Setup Calendar
			if($.isFunction($.fn.fullCalendar))
			{
				var calendar = $('#calendar');
				$(".fc-event-inner").attr("style", "text-align:center;");
				$(".fc-event").attr("id", "fc-event");
				var ele = document.getElementsByClassName("fc-event");
				for (var i = 0; i < ele.length; i++) {
					ele[i].style.width = "25px";
					ele[i].style.backgroundColor = "#ed5565";
					var Left = ele[i].style.left;
					Left = Left.match(/(\d+)/);
					var finalLeft = parseInt(Left[0]) + 76;
					ele[i].style.left = finalLeft + 'px';
					ele[i].style.borderRadius = '20px';
					var Top = ele[i].style.top;
					Top = Top.match(/(\d+)/);
					var finalTop = parseInt(Top[0]) + 10;
					ele[i].style.top = finalTop + 'px';
				}
				calendar.fullCalendar({
					header: {
						left: 'title',
						right: ' today prev,next'
					},

					//defaultView: 'basicWeek',
					eventClick: function (calEvent, jsEvent, view) {
						var dt = calEvent.start;
						var date = new Date(dt),
							mnth = ("0" + (date.getMonth() + 1)).slice(-2),
							day = ("0" + date.getDate()).slice(-2);
						var CurrentDate = [day, mnth, date.getFullYear() ].join("/");
					
						var payload = {
							YearMonth: '',
							ExamDate: CurrentDate,
							Type: 'D',
							DashboardCallingType: 'E',
							ActivityID: '',
							ScheduleID: '',
						}
						$.postJson("/admins/AnalyticDashbord/GetEvantDataDetails", payload, function (r) {
							if (r.Status === 200) {
								DayWiseSchedule(r.Data, CurrentDate);
							} else {
								alertify.error(r.Message);
							}
						}, function (r) {
							alertify.error(r.Message);
						});
					},
					editable: false,
					firstDay: 1,
					height: 600,
					droppable: false,
					drop: function(date, allDay) {

						var $this = $(this),
							eventObject = {
								title: $this.text(),
								start: date,
								allDay: allDay,
								className: $this.data('event-class')
							};

						calendar.fullCalendar('renderEvent', eventObject, true);

						$this.remove();
					}
				});

				$("#draggable_events li a").draggable({
					zIndex: 999,
					revert: true,
					revertDuration: 0
				}).on('click', function()
				{
					return false;
				});
			}
			else
			{
				alert("Please include full-calendar script!");
			}


			$("body").on('submit', '#add_event_form', function(ev)
			{
				ev.preventDefault();

				var text = $("#add_event_form input");

				if(text.val().length == 0)
					return false;

				var classes = ['', 'color-green', 'color-blue', 'color-orange', 'color-primary', ''],
					_class = classes[ Math.floor(classes.length * Math.random()) ],
					$event = $('<li><a href="#"></a></li>');

				$event.find('a').text(text.val()).addClass(_class).attr('data-event-class', _class);

				$event.appendTo($("#draggable_events"));

				$("#draggable_events li a").draggable({
					zIndex: 999,
					revert: true,
					revertDuration: 0
				}).on('click', function()
				{
					return false;
				});

				fit_calendar_container_height();

				$event.hide().slideDown('fast');
				text.val('');

				return false;
			});
		}
	});

})(jQuery, window);

//var DayWiseSchedule = function (r, date) {
//	if (r.length == 0) {
//		alertify.error("No Schedule Of This Day!");
//		$('.Div-Schedule-Wise-Summary').hide();
//		$('.Div-Schedule-Wise-Timeline').hide();
//		$('.Div-Schedule-Wise-Summary-Header').text("");
//		$('.Div-Schedule-Wise-Summary-Body').empty();
//		return false;
//	}
//	$('.Div-Schedule-Wise-Summary').removeClass("hidden");
//	$('.Div-Schedule-Wise-Summary').show();
//	$('.Div-Schedule-Wise-Timeline').hide();
//	$('.Div-Schedule-Wise-Summary-Header').text("Date Wise Schedule Summary (" + date + ")");
//	$('.Div-Schedule-Wise-Summary-Body').empty();
//	r.forEach(function (element) {
//		//element.backgroundColor = (element.IsCompleted == true ? '#1ab394' : '#e6ab69');
//		element.backgroundColor = 'linear-gradient(90deg,#1ab394 30%,#066 84%)';//(element.IsCompleted == true ? 'linear-gradient(90deg,#1ab394 30%,#066 84%)' : 'linear-gradient(90deg,#e6ab69 30%,#bf6909 84%)');
//	});
//	r.forEach(function (v, i) {
//		var html = '';
//		html += '<div class="col-sm-3"><div class="panel panel-default" style="height:200px;">';
//		html += '<div class="panel-heading" style="background: ' + v.backgroundColor + ';"><h5 style="font-size: 15px;color:white;text-align:center;">' + v.ExamScheduleName + '<h5></div>';
//		html += '<div class="panel-body" style="background-color:#fff2e491;">';
//		html += '<div class="row" >';
//		html += '<div class="col-md-12">';
//		//html += '<label>Activity Period :</label>';
//		html += '<h4 style="text-align:center;">' + v.LatestStatus + '</h4>';
//		html += '</div>';
//		html += '<div class="col-md-12">';
//		//html += '<label>Activity Period :</label>';
//		html += '<h4 style="text-align:center;">' + v.AcademicSession + '</h4>';
//		html += '</div>';
//		html += '<div class="col-md-12">';
//		//html += '<label>Schedule Name :</label>';
//		html += '<h5 style="text-align:center;">' + v.ExamStartDate + ' - ' + v.ExamEndDate + '</h5>';
//		html += '</div>'
//		html += '<div class="col-md-12" style="text-align:center;">';
//		//html += '<label>Schedule Name :</label>';
//		html += '<a class="btn btn-sm btn-warning btn-Schedule-Timeline" ScheduleID="' + v.ScheduleID + '" style="text-align:center;">Show TimeLine<a>';
//		html += '</div>'
//		html += '</div ></div ></div ></div > ';
//		$('.Div-Schedule-Wise-Summary-Body').append(html);
//		//var html = '';
//		//html += '<div class="col-sm-3"><div class="panel panel-default" style="height: 120px;border-color:#0d6677e0">';
//		//html += '<div class="panel-heading" style="background-color:#0d6677e0"><h5 style="font-size: 10px;color:white;text-align:center;">' + v.ExamScheduleName + '</br>' + v.LatestStatus +'<h5></div>';
//		//html += '<div class="row" style="padding:5px;">';
//		//html += '<div class="col-md-6">';
//		//html += '<label>Exam Period :</label>';
//		//html += '<label><h5 style="font-size: 10px;">' + v.ExamStartDate + ' - ' + v.ExamEndDate +'</h5></label>';
//		//html += '</div>';
//		//html += '<div class="col-md-6">';
//		//html += '<label>AcademicSession :</label>';
//		//html += '<label><h5 style="font-size: 10px;">' + v.AcademicSession +'</h5></label>';
//		//html += '</div></div></div></div>';
//		//$('.Div-Schedule-Wise-Summary-Body').append(html);
//	});
//}
function fit_calendar_container_height()
{
	if(neonCalendar.isPresent)
	{
		if(neonCalendar.$sidebar.height() < neonCalendar.$body.height())
		{
			neonCalendar.$sidebar.height( neonCalendar.$body.height() );
		}
		else
		{
			var old_height = neonCalendar.$sidebar.height();

			neonCalendar.$sidebar.height('');

			if(neonCalendar.$sidebar.height() < neonCalendar.$body.height())
			{
				neonCalendar.$sidebar.height(old_height);
			}
		}
	}
}

function reset_calendar_container_height()
{
	if(neonCalendar.isPresent)
	{
		neonCalendar.$sidebar.height('auto');
	}
}

function calendar_toggle_checkbox_status(checked)
{
	neonCalendar.$body.find('table tbody input[type="checkbox"]' + (checked ? '' : ':checked')).attr('checked',  ! checked).click();
}