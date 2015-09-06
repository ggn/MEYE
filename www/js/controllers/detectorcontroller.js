$PortalApp.controller('detectorcontroller', function ($scope, $http) {
    var angles = {
        alpha: 0,
        leftEye: 0,
        rightEye: 0,
        calibration: 0
    };

    $scope.init = function () {

        $(document).foundation('slider', 'reflow');
        $('#sliderOutputLeft').val($('#sliderLeft').attr('data-slider'));
        $('#sliderOutputRight').val($('#sliderRight').attr('data-slider'));
        $('#sliderLeft').on('change.fndtn.slider', function () {
            $('#sliderOutputLeft').val($(this).attr('data-slider'));
        });
        $('#sliderRight').on('change.fndtn.slider', function () {
            $('#sliderOutputRight').val($(this).attr('data-slider'));
        });

        //Find our div containers in the DOM
        var dataContainerOrientation = document.getElementById('dataContainerOrientation'),
            dataContainerMotion = document.getElementById('dataContainerMotion');

        //Check for support for DeviceOrientation event
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function (event) {
                var temp = Math.ceil(event.alpha);
                angles.alpha = temp - (temp % 10);
                showCalibratedAngle();
                if (angles.calibration >= 0 && ((angles.alpha === angles.leftEye) || (angles.alpha === angles.rightEye))) {
                    $('#rotationachived').css('background-color', 'green');
                    startVibrate(1000);
                } else {
                    $('#rotationachived').css('background-color', 'red');
                }
            }, false);
        } else {
            showError("Unable to get rotation data");
        }
    };

    $scope.calibrate = function () {
        var obj = $("#btnCalibrator");
        if (obj.hasClass('calibrated')) {
            angles.calibration = 0;
            angles.leftEye = 0;
            angles.rightEye = 0;
            $("#btnCalibrator").removeClass('success calibrated').addClass('alert').text("Point & Calibrate");
        } else {
            angles.calibration = Math.ceil(alpha);
            angles.leftEye = (calibration + $('#sliderLeft').attr('data-slider')) % 360;
            var tempRightEye = calibration - $('#sliderRight').attr('data-slider');
            angles.rightEye = tempRightEye > 0 ? tempRightEye : 360 + tempRightEye;
            $("#btnCalibrator").removeClass('alert').addClass('success calibrated').text("Stop Calibration");
        }
    };

    $scope.vibrate = function () {
        startVibrate(1000);
    };

    var startVibrate = function (level) {
            navigator.vibrate(level);
        },
        showError = function (msg) {
            var error = '<div id="errorMessages" data-alert class="alert-box secondary">' + msg + '<a href="" class="close">×</a></div>';
            $('#errorMessages').html(error);
        },
        showCalibratedAngle = function () {
            $('#alphaValue').html(angles.alpha);
            $('#leftValue').html(angles.leftEye);
            $('#rightValue').html(angles.rightEye);
            $('#calibration').html(angles.calibration);
        };
});