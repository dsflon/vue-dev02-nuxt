// import React from 'react';

const ChangeTimeString = (n) => {
    if(!n) return null;
    let _n = Number(n);
        _n = _n > 2400 ? (_n - 2400) : _n;
        // _n = _n < 1000 ? "0" + _n : _n;

    let t = String(_n).split("");

    if(_n < 1000) {
        t = t[0] + ":" + t[1] + t[2];
        return n > 2400 ? <span><em className="a-txt_s">翌 </em> {t}</span> : t;
    } else {
        return t[0] + t[1] + ":" + t[2] + t[3];
    }

}

export default ChangeTimeString
