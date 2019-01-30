
const setTimeOptions = {

    for: () => {

        let data = [];
        for (var i = 1; i <= 24; i++) {
            let n = i*100,
                _n = String(i*100),
                t = _n.split("");
                t = n < 1000 ? (t[0]+":"+t[1]+t[2]) : (t[0]+t[1]+":"+t[2]+t[3]);
            data.push({ "n": n, "t": t })
        }
        return data;

    },

    text: (opnData,val) => {
        return opnData.n <= val ? "翌 " + opnData.t : opnData.t;
    },

    endTimeVal: (opnData,val) => {
        return opnData.n <= Number(val) ? (24*100) + opnData.n : opnData.n;
    }

}

export default setTimeOptions;
