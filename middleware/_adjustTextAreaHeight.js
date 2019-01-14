const AdjustTextAreaHeight = (ta) => {

    console.log(ta);

	const initial_height = parseFloat(getComputedStyle(ta).height)

	// height と clientHeight の差分 px
	// padding 量だけど box-sizing で変わるので実際の差分から取得
	const diff = ta.clientHeight - initial_height

	// height を 0 にした状態の scrollHeight が必要な高さ
	setHeightPx(0)
	const noscroll_height = ta.scrollHeight - diff
	setHeightPx(noscroll_height)

	// Firefox は高さ 0 のときにスクロールバーなしの高さなのでここで終わり
	// 続けるとちゃんと動かない
	if (navigator.userAgent.includes("Firefox")) return

	// Chrome はスクロールバーあり状態の必要高さなので右端折返しがあるとその分隙間がある
	// scrollHeight と clientHeight が異なるところまで縮める
	let height = noscroll_height
	while (ta.scrollHeight === ta.clientHeight) {
		setHeightPx(--height)
	}
	const final_height = height + 1

	// いったんスクロールバーない状態にしないと折り返しあり状態になっている
	setHeightPx(noscroll_height)

	// 再計算
	ta.scrollHeight
	setHeightPx(final_height)

    function setHeightPx(height) {
        ta.style.height = height + "px"
    }

}

export default AdjustTextAreaHeight;
