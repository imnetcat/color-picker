'use strict';

class ColorPalete {

    static paletes = [];

    static Init(paletes) {
        ColorPalete.paletes = paletes;
        for (const palete of ColorPalete.paletes) {

            const cp = ColorPicker(palete.form.querySelector('.pcr-wrapper > .pcr'), palete.form.querySelector('.picker-wrapper > .picker'),
                (hex, hsv, rgb, mousePicker, mousepcr) => {
                    ColorPicker.positionIndicators(
                        palete.form.querySelector('.pcr-wrapper > .pcr-indicator'),
                        palete.form.querySelector('.picker-wrapper > .picker-indicator'),
                        mousepcr, mousePicker);

                    palete.form.querySelector('.hex').innerHTML = hex;
                    // for rgb color
                    //document.getElementById('rgb').innerHTML = 'rgb(' + rgb.r.toFixed() + ',' + rgb.g.toFixed() + ',' + rgb.b.toFixed() + ')';
                    // for hsv color
                    //document.getElementById('hsv').innerHTML = 'hsv(' + hsv.h.toFixed() + ',' + hsv.s.toFixed(2) + ',' + hsv.v.toFixed(2) + ')';

                    palete.form.querySelectorAll('.color-values')[0].style.backgroundColor = hex;
                    palete.form.querySelectorAll('.color-values')[1].style.backgroundColor = hex;
                    palete.unsubmit = hex;
                    console.log(`Palete '${palete.name}' lazy change color to ${palete.unsubmit}`);
                });

            palete.form.querySelector('.submit-btn').addEventListener('click', (event) => {
                event.preventDefault();
                palete.color = palete.unsubmit;
                cp.setHex(palete.color);
                ColorPalete.Close(palete.name);
                console.log(`Palete '${palete.name}' changed color to ${palete.color}`);
            });
            palete.form.querySelector('.cancel-btn').addEventListener('click', (event) => {
                event.preventDefault();
                palete.unsubmit = palete.color;
                cp.setHex(palete.color);
                ColorPalete.Close(palete.name);
                palete.form.querySelectorAll('.color-values')[0].style.backgroundColor = palete.color;
                palete.form.querySelectorAll('.color-values')[1].style.backgroundColor = palete.color;
                console.log(`Palete '${palete.name}' stay with ${palete.color} color, changes cancel`);
            });
            palete.form.querySelector('.pick-lable').addEventListener('click', (event) => {
                ColorPalete.Open(palete.name);
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
        document.forms[name].querySelector('.pick-lable').hidden = true;
        document.forms[name].querySelector('.kat').style.marginTop = "0";
    }

    static Close(name) {
        document.forms[name].querySelector('.pick-lable').hidden = false;
        document.forms[name].querySelector('.kat').style.marginTop = "-25000px";
    }
};

document.addEventListener('DOMContentLoaded', () => {
    class Palete {
        constructor(n, d, f) {
            this.name = n;
            this.color = d;
            this.unsubmit = d;
            this.form = f;
        }
    }
    const picker1 = new Palete('picker1', '#238932', 
        document.forms.picker1);
    const picker2 = new Palete('picker2', '#590f7a',
        document.forms.picker2);
    ColorPalete.Init([
        picker1,
        picker2
    ]);
    ColorPalete.Close('picker1');
    ColorPalete.Close('picker2');
});
