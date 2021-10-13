<template>
  <div>
    <song :song="{ title: 'Foo', artist: 'Bar', genre: 'Baz' }" />
  </div>
</template>

<script>
import Song from '@/components/Song'

export default {
    name: 'SongView',
    components: {
        Song,
    },
}
</script>

<style scoped>

</style>