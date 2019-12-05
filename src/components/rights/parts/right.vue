<template>
    <tr :id="permission.name" class="right" :draggable="draggable" @dragstart="dragStart(permission.name, $event)" @dragover.stop> 
        <td><input class="form-control" @change="changeRight" @keyup.prevent.enter ="changeRight" v-model="permission.name"></td>
        <td><input class="form-control" @change="changeRight" @keyup.prevent.enter ="changeRight" v-model="permission.description"></td>
        <td><i v-if="can('superadmin')" @click="dropRight" class="fas fa-trash"></i></td>
    </tr> 
</template>
   
<script>
    import Acl from '../../../utils/acl'

    export default {
        mixins: [Acl],
        props: ['right', 'draggable'],
        data() {
            return {
                permission: {
                    description: null,
                    name: null,
                    oldName: null
                },
            }
        },
        methods: {
            dragStart(name, e){
                var rightName = e.target.id
                e.dataTransfer.setData('child', rightName)
            },
            dropRight() {
                if(!confirm('Вы действительно хотите удалить запись ' + this.permission.name + '?')) {
                    return;
                }
                this.$store.dispatch('app/deletePermission', this.right.name)
            },
            setRights(){
                this.permission.description = this.right.description
                this.permission.name = this.right.name
                this.permission.oldName = this.right.name
            },
            changeRight(){
                this.$store.dispatch('app/updatePermission', this.permission)
            }
        },
        created(){
            this.setRights()
        }
    }
</script>

