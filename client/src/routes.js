import SongView from "@/components/SongView";
import SongEditor from "@/components/SongEditor";

export default [
    // Insert additional routes here
    { name: 'default', path: '*', component: SongView, props: true },
    { name: 'SongEditor', path: '/songEditor/:data', component: SongEditor, props: true }
]
