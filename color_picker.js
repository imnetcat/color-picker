'use strict';

// обьект хранящий информацию об одной палитре
class Palete {
    constructor(n, d, f) {
        this.name = n;
        this.color = d;
        this.unsubmit = d;
        this.form = f;
    }

    GetColor() {
        return this.color;
    }

    GetUnsubmitColor() {
        return this.unsubmit;
    }

    SetColor(newColor) {
        this.color = newColor;
    }

    SetUnsubmitColor(newColor) {
        this.unsubmit = newColor;
    }

    SubmitChanges() {
        this.SetColor(this.GetUnsubmitColor());
    }

    CancelChanges() {
        this.SetUnsubmitColor(this.GetColor());
    }
}

// обработчик палитр
class ColorPalete {

    // все палитры
    static paletes = [];

    // обработчик для текущих цветов
    static ChangesHandler(hex, hsv, rgb, palete) {
        palete.form.querySelector('.hex').innerHTML = hex;
        // для получения rgb
        //document.getElementById('rgb').innerHTML = 'rgb(' + rgb.r.toFixed() + ',' + rgb.g.toFixed() + ',' + rgb.b.toFixed() + ')';
        // для получения hsv
        //document.getElementById('hsv').innerHTML = 'hsv(' + hsv.h.toFixed() + ',' + hsv.s.toFixed(2) + ',' + hsv.v.toFixed(2) + ')';

        palete.form.querySelectorAll('.color-values')[0].style.backgroundColor = hex;
        palete.form.querySelectorAll('.color-values')[1].style.backgroundColor = hex;
        palete.unsubmit = hex;
        console.log(`Palete '${palete.name}' lazy change color to ${palete.unsubmit}`);
    }

    // движок для обработки изменений палитры по клику
    // DO NOT CHANGE
    static PickerHandler(mousePicker, mousepcr, palete) {
        ColorPicker.positionIndicators(
            palete.form.querySelector('.pcr-wrapper > .pcr-indicator'),
            palete.form.querySelector('.picker-wrapper > .picker-indicator'),
            mousepcr, mousePicker);
    }

    static Init(paletes) {
        ColorPalete.paletes = paletes;
        for (const palete of ColorPalete.paletes) {

            const cp = ColorPicker(palete.form.querySelector('.pcr-wrapper > .pcr'), 
                palete.form.querySelector('.picker-wrapper > .picker'),
                (hex, hsv, rgb, mousePicker, mousepcr) => {
                    ColorPalete.PickerHandler(mousePicker, mousepcr, palete);
                    ColorPalete.ChangesHandler(hex, hsv, rgb, palete);
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
    
    static GetPalete(name) {
        for (const palete of ColorPalete.paletes) {
            if (palete.name === name)
                return palete;
        }
    }

    // меняет цвет 
    static ChangeColor(name, color) {
        ColorPalete.GetPalete(name).SetUnsubmitColor(color);
    }
    
    // подтверждает изменения данной палитры
    static SubmitPalete(name) {
        ColorPalete.GetPalete(name).SubmitChanges();
    }

    // отменяет изменения данной палитры
    static CancelChanges(name) {
        ColorPalete.GetPalete(name).CancelChanges();
    }

    // открывает форму палитры
    static Open(name) {
        document.forms[name].querySelector('.pick-lable').hidden = true;
        document.forms[name].querySelector('.kat').style.marginTop = "0";
    }

    // закрывает форму палитры
    static Close(name) {
        document.forms[name].querySelector('.pick-lable').hidden = false;
        document.forms[name].querySelector('.kat').style.marginTop = "-25000px";
    }
};

const SetUpPaletes(){
    // создаем одну палитру
    const picker1 = new Palete('picker1', '#238932',
        document.forms.picker1);
    // создаем вторую палитру
    const picker2 = new Palete('picker2', '#590f7a',
        document.forms.picker2);
    // инициализируем все палитры
    ColorPalete.Init([
        picker1,
        picker2
    ]);
    // по умолчанию закрываем к примеру первую палитру
    //   а вторую делаем открытой
    ColorPalete.Close('picker1');
    ColorPalete.Open('picker2');
}

document.addEventListener('DOMContentLoaded', () => {
    SetUpPaletes();
});
