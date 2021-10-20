<template>
    <div class="md-layout md-alignment-center-center">
        <md-button class="md-icon-button md-raised md-dense">
            <md-icon>first_page</md-icon>
        </md-button>
        <md-button class="md-icon-button md-raised md-dense">
            <md-icon>chevron_left</md-icon>
        </md-button>
        <div>Seite x/y</div>
        <md-button class="md-icon-button md-raised md-dense">
            <md-icon>chevron_right</md-icon>
        </md-button>
        <md-button class="md-icon-button md-raised md-dense">
            <md-icon>last_page</md-icon>
        </md-button>
    </div>
</template>

<script>
import Page from '@/models/Page'

export default {
    name: 'PageNav',

    props: {
        page: {
            type: Page,
            required: true,
        },
    },
}
</script>

<style scoped>

</style>