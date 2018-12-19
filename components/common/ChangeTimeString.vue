<!-- const ChangeTimeString = (n) => {
    if(!n) return null;

    let _n = Number(n);
        _n = _n > 2400 ? (_n - 2400) : _n;

    let t = String(_n).split("");

    if(_n < 1000) {
        t = t[0] + ":" + t[1] + t[2];
        return n > 2400 ? (`<span><em class="a-txt_s">翌 </em>${t}</span>`) : t;
    } else {
        return t[0] + t[1] + ":" + t[2] + t[3];
    }

} -->


<template>

    <span v-if=" GetTimeNum(num)._n < 1000 && GetTimeNum(num).n > 2400 ">
        <em class="a-txt_s">翌 </em>{{ GetTimeNum(num).t }}
    </span>

    <span v-else-if=" GetTimeNum(num)._n < 1000 && GetTimeNum(num).n <= 2400 ">
        {{ GetTimeNum(num).t }}
    </span>

    <span v-else>
        {{ GetTimeNum(num).t }}
    </span>

</template>

<script>
export default {
    props: [
        "num"
    ],
    computed: {
        GetTimeNum() {
            return (n) => {

                if(!n) return null;

                let _n = Number(n);
                    _n = _n > 2400 ? (_n - 2400) : _n;

                let t = String(_n).split("");

                if(_n < 1000) {
                    t = t[0] + ":" + t[1] + t[2];
                } else {
                    t = t[0] + t[1] + ":" + t[2] + t[3];
                }

                return {
                    n: n,
                    _n: _n,
                    t: t
                }
            }
        }
    }

}
</script>
