<template>

    <div class="m-box_confirm">

        <div class="m-box_confirm_inner">
            <p>{{confirmText}}</p>
            <div class="m-box_confirm_btns">
                <button class="is_no" type="button" @click="ConfirmNo">いいえ</button>
                <button class="is_yes" type="button" @click="ConfirmYes">はい</button>
            </div>
        </div>

    </div>

</template>


<script>
export default {
    props: [
        'confirmText',
        'ConfirmYes',
        'ConfirmNo'
    ]
}
</script>
