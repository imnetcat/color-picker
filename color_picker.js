'use strict';

class ColorPalete {
    static Init(paletes) {
        for (const palete of paletes) {
            console.log(document.forms[palete.name])
            console.log(document.forms[palete.name].querySelector('.picker-wrapper > .picker'))
            const form = document.forms[palete.name];
            const cp = ColorPicker(form.querySelector('.pcr-wrapper > .pcr'), form.querySelector('.picker-wrapper > .picker'),
                (hex, hsv, rgb, mousePicker, mousepcr) => {
                    ColorPicker.positionIndicators(
                        form.querySelector('.pcr-wrapper > .pcr-indicator'),
                        form.querySelector('.picker-wrapper > .picker-indicator'),
                        mousepcr, mousePicker);

                    form.querySelector('.hex').innerHTML = hex;
                    // for rgb color
                    //document.getElementById('rgb').innerHTML = 'rgb(' + rgb.r.toFixed() + ',' + rgb.g.toFixed() + ',' + rgb.b.toFixed() + ')';
                    // for hsv color
                    //document.getElementById('hsv').innerHTML = 'hsv(' + hsv.h.toFixed() + ',' + hsv.s.toFixed(2) + ',' + hsv.v.toFixed(2) + ')';

                    form.querySelector('.color-values').style.backgroundColor = hex;
                });
            cp.setHex(palete.defColor);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    class Palete {
        constructor(n, d) {
            this.name = n;
            this.defColor = d;
        }
    }
    const picker1 = new Palete('picker1', '#238932');
    const picker2 = new Palete('picker2', '#590f7a');
    ColorPalete.Init([
        picker1,
        picker2
    ]);
});
