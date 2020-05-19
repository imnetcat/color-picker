'use strict';

class ColorPalete {
    static Init() {
        const cp = ColorPicker(document.getElementById('pcr'), document.getElementById('picker'),
            function (hex, hsv, rgb, mousePicker, mousepcr) {
                const currentColor = hex;
                ColorPicker.positionIndicators(
                    document.getElementById('pcr-indicator'),
                    document.getElementById('picker-indicator'),
                    mousepcr, mousePicker);

                document.getElementById('hex').innerHTML = hex;
                // for rgb color
                //document.getElementById('rgb').innerHTML = 'rgb(' + rgb.r.toFixed() + ',' + rgb.g.toFixed() + ',' + rgb.b.toFixed() + ')';
                // for hsv color
                //document.getElementById('hsv').innerHTML = 'hsv(' + hsv.h.toFixed() + ',' + hsv.s.toFixed(2) + ',' + hsv.v.toFixed(2) + ')';

                document.getElementById('color-values').style.backgroundColor = hex;
            });
        cp.setHex('#D4EDFB');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ColorPalete.Init();
});
