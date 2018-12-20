<template>

    <div class="header_user">
        <button
            id={userId}
            class="a-btn_header"
            onClick={Follow.bind(this,this.props.actions,false)}>
            <i class="a-icon a-icon-friends_check a-icon-1_75x f-txt_pink"></i>
        </button>
    </div>

</template>


<script>
export default {

}
</script>
