<template>
    <ul class="lists_filterbox">
        <li class="lists_filter">
            <span class="ttl">絞り込み</span>
            <span class="val">{{FilteredText.f}}</span>
        </li>
        <li class="lists_sort">
            <span class="ttl">並べ替え</span>
            <span class="val">{{FilteredText.s}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    computed: {
        FilteredText() {
            let filterData = this.$store.state.home.filterData;
            let minPrice = filterData.min_price && filterData.min_price.t != "指定なし" ? "¥" + filterData.min_price.t : "",
                maxPrice = filterData.max_price && filterData.max_price.t != "指定なし" ? "¥" + filterData.max_price.t : "",
                startTime  = filterData.start_time && filterData.start_time.t != "指定なし" ? filterData.start_time.t : "",
                endTime  = filterData.end_time && filterData.end_time.t != "指定なし" ? filterData.end_time.t : "",
                sort = filterData.sort && filterData.sort.text ? filterData.sort.text : "指定なし"

            let price = minPrice || maxPrice ? `${minPrice} ~ ${maxPrice}` : "",
                time = startTime || endTime ? `${startTime} ~ ${endTime}` : "";

            let filterTxt = price || time ? `${price}${price&&time?"｜":""}${time}` : "指定なし"

            return { f: filterTxt, s: sort }
        }
    }
}
</script>
