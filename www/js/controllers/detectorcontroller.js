$PortalApp.controller('detectorcontroller', function ($scope, $http) {
    var calibrated = false;
    var calibration = 0;
    var alpha;
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
            $('#sliderOutputLeft').val( $(this).attr('data-slider'));
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
                alpha = event.alpha;
                beta = event.beta;
                gamma = event.gamma;
                if (calibration > 0 && alpha == calibration) {
                    vibrate();
                }
            }, false);
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
        calibrated = true;
        calibration = $('#sliderLeft').attr('data-slider');
    };

    var vibrate = function () {
        if (window.navigator && window.navigator.vibrate) {
            navigator.vibrate(1000);
        } else {
            console.log("Unable to vibrate");
        }
    };
});


