<template>
    <footer id="footer">
        <ul id="footer_inner">

            <li><router-link to="/search"><i class="a-icon a-icon-search"></i></router-link></li>
            <li><router-link to="/" exact><i class="a-icon a-icon-list"></i></router-link></li>
            <li><router-link to="/message"><i class="a-icon a-icon-mail"></i></router-link></li>
            <li><router-link to="/timeline"><i class="a-icon a-icon-time"></i></router-link></li>
            <li><router-link to="/notification"><i class="a-icon a-icon-bell"></i></router-link></li>

        </ul>
    </footer>
</template>


<script>
export default {
    components: {
    }
}
</script>
