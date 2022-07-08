import React from "react";
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const regexp_password = /^(?=.*[a-z])(?=.*\d)(?=.*[0-9]){6,15}/;


export const dateFormatString = (dateString) => {

    let dt = dateString;
    return moment(dt).format('DD/MMM/YYYY')

    return
}

export const darkerHex = (hex, factor, alpha) => {
    let a = 2;
    if (alpha > 0) {
        a = alpha;
    }
    let rgba = hexToRgbA(hex, a).replace("rgba(", "").replace(")", "").split(",");
    return `rgba(${Math.round(parseInt(rgba[0]) * factor)},${Math.round(parseInt(rgba[1]) * factor)},${Math.round(parseInt(rgba[2]) * factor)},${rgba[3]})`;
};

export const hexToRgbA = (hex, alpha) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        if (alpha != null) {
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
        } else {
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',.33)';
        }
    }
    //throw new Error('Bad Hex');
};

export const elevation2 = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
};