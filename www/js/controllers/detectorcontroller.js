$PortalApp.controller('detectorcontroller', function ($scope, $http) {
    var calibrated = false,
        calibration = 0,
        alpha, leftEye, RightEye,
        beta, gamma, x, y, z, r;

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
        var dataContainerOrientation = document.getElementById('dataContainerOrientation');
        var dataContainerMotion = document.getElementById('dataContainerMotion');

        //Check for support for DeviceOrientation event
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function (event) {
                var temp = Math.ceil(event.alpha);
                alpha = temp - (temp % 10);
                showCalibratedAngle();
                if (calibration <= 0 && ((alpha == leftEye) || (alpha == RightEye))) {
                    $('#rotationachived').css('background-color', 'green');
                    startVibrate(1000);
                } else {
                    $('#rotationachived').css('background-color', 'red');
                }
            }, false);
        } else {
            showError("Unable to get rotation data")
        }

        // Check for support for DeviceMotion events
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', function (event) {
                x = event.accelerationIncludingGravity.x;
                y = event.accelerationIncludingGravity.y;
                z = event.accelerationIncludingGravity.z;
                r = event.rotationRate;
            });
        }
    };

    $scope.calibrate = function () {
        var obj = $("#btnCalibrator");
        if (obj.hasClass('calibrated')) {
            calibrated = false;
            calibration = 0;
            leftEye = 0;
            RightEye = 0;
            $("#btnCalibrator").removeClass('success calibrated').addClass('alert').text("Point & Calibrate");
        } else {
            calibrated = true;
            calibration = Math.ceil(alpha);
            LeftEye = (calibration + $('#sliderLeft').attr('data-slider')) % 360;
            RightEye = calibration - $('#sliderRight').attr('data-slider');
            RightEye = RightEye > 0 ? RightEye : 360 + RightEye;
            $("#btnCalibrator").removeClass('alert').addClass('success calibrated').text("Stop Calibration");
        }
    };

    $scope.vibrate = function () {
        startVibrate(1000);
    }

    function startVibrate(level) {
        navigator.vibrate(level);
    }

    var showError = function (msg) {
        var error = '<div id="errorMessages" data-alert class="alert-box secondary">' + msg + '<a href="" class="close">×</a></div>';
        $('#errorMessages').html(error);
    }

    var showCalibratedAngle = function () {
        $('#alphaValue').html(alpha);
        $('#leftValue').html(leftEye);
        $('#rightValue').html(RightEye);
        $('#calibration').html(calibration);
    }
});