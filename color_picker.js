'use strict';

class ColorPalete {

    static paletes = [];

    static Init(paletes) {
        ColorPalete.paletes = paletes;
        for (const palete of paletes) {
            const form = document.forms[palete.name];
            form.querySelector('.submit-btn').addEventListener('click', (event) => {
                event.preventDefault();
                ColorPalete.SubmitPalete(palete.name);
                console.log(`Palete '${palete.name}' changed color to ${palete.color}`);
            });
            form.querySelector('.cancel-btn').addEventListener('click', (event) => {
                event.preventDefault();
                ColorPalete.CancelChanges(palete.name);
                console.log(`Palete '${palete.name}' stay with ${palete.color} color, changes cancel`);
            });
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
                    ColorPalete.ChangeColor(palete.name, hex);
                    console.log(`Palete '${palete.name}' lazy change color to ${palete.unsubmit}`);
                });
            cp.setHex(palete.color);
        }
    }

    static DeletePalete(name) {
        ColorPalete.paletes = paletes.filter(p => p.name != name);
    }

    static ChangeColor(name, color) {
        for (const palete of ColorPalete.paletes) {
            if (palete.name === name) {
                palete.unsubmit = color;
                break;
            }
        }
    }

    static SubmitPalete(name) {
        for (const palete of ColorPalete.paletes) {
            if (palete.name === name) {
                palete.color = palete.unsubmit;
                break;
            }
        }
    }

    static CancelChanges(name) {
        for (const palete of ColorPalete.paletes) {
            if (palete.name === name) {
                palete.unsubmit = palete.color;
                break;
            }
        }
    }

    static Open(name) {
        document.forms[name].hidden = false;
    }

    static Close(name) {
        document.forms[name].hidden = true;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    class Palete {
        constructor(n, d) {
            this.name = n;
            this.color = d;
            this.unsubmit = d;
        }
    }
    const picker1 = new Palete('picker1', '#238932');
    const picker2 = new Palete('picker2', '#590f7a');
    ColorPalete.Init([
        picker1,
        picker2
    ]);
    ColorPalete.Close('picker1');
    ColorPalete.Close('picker2');
});
