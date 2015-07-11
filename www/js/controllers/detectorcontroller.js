$PortalApp.controller('detectorcontroller', function ($scope, $http) {
    var calibrated = false;
    var calibration = 0;
    var alpha, leftEye, RightEye;
    var beta;
    var gamma;
    var x;
    var y;
    var z;
    var r;
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
                $('#alphaValue').html(alpha);
                if (calibration > 0 && ((alpha == tempLeft) || (alpha == RightEye))) {
                    //showCalibratedAngle();
                    startVibrate(1000);
                } else {
                    $('#alphaValue').html(0);
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
            //beta = 0;
            //gamma = 0;
            $("#btnCalibrator").removeClass('success calibrated').addClass('alert').text("Point & Calibrate");
        } else {
            calibrated = true;
            calibration = Math.ceil(alpha);
            //beta = event.beta;
            //gamma = event.gamma;
            var tempLeftEye = calibration - $('#sliderLeft').attr('data-slider') 
            leftEye = tempLeftEye > 0 ? tempLeftEye : 360 + tempLeftEye;
            RightEye = (calibration + $('#sliderRight').attr('data-slider')) % 360;
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
        var calibratedAngleToDisplay = 0;
        var leftSetting = $('#sliderLeft').attr('data-slider');
        var rightSetting = $('#sliderRight').attr('data-slider');
        if (calibration - leftSetting < 0 && alpha > calibration) {
            calibratedAngleToDisplay = calibration + (360 - alpha);
            $('#alphaValue').html(calibratedAngleToDisplay);
            return false;
        }
        if (calibration + rightSetting > 360 && alpha < calibration) {
            calibratedAngleToDisplay = (360 - calibration) + alpha;
            $('#alphaValue').html(calibratedAngleToDisplay);
            return false;
        }
        calibratedAngleToDisplay = (calibration > alpha) ? calibration - alpha : alpha - calibration;
        $('#alphaValue').html(calibratedAngleToDisplay);
    }
});


