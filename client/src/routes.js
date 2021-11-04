import SongView from "@/components/SongView";
import EditSong from "@/components/EditSong";

export default [
    // Insert additional routes here
    { name: 'editSong', path: '/editSong/:song', component: EditSong, props: true },
    { name: 'info', path: '/info', component: { name: 'InfoView', render: h => h('div', 'Info view') }, props: true },
    { name: 'default', path: '*', component: SongView, props: true }
    // { name: 'default', path: '*', component: { name: 'DefaultView', render: h => h('div', 'Default view') }, props: true }
]
