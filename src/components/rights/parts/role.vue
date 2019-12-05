<template>
    <tbody @dragover.prevent @drop.prevent="drop(newRole.name, $event)">
        <tr id="hello" class="role">
            <td @click="chose"><i class="fas fa-angle-double-down" style="font-size:20px;margin-top:10px"></i></td>
            <td><input class="form-control" @change="changeRole" @keyup.prevent.enter ="changeRole" v-model="newRole.name"></td>
            <td><input class="form-control" @change="changeRole" @keyup.prevent.enter ="changeRole" v-model="newRole.description"></td>
            <td><i v-if="can('superadmin')" @click="dropRight" class="fas fa-trash"></i></td>
        </tr>
        <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
        <children v-if="chosen" style="margin-top:15px" v-for="(child, idx) in children" :key="idx" :child="child" :parent="newRole.name" @updateChildren="deleteChild($event, array)"/>
    </tbody>
</template>
   
<script>
    import Http from '../../../utils/http'
    import Children from './children'
    import Acl from '../../../utils/acl'

    export default {
        mixins: [Acl],
        props: ['role'],
        data() {
            return {
                newRole: {
                    description: null,
                    name: null,
                    oldName: null
                },
                chosen: false,
                children: {},
                array: {}
            }
        },
        components: {
            Children
        },
        computed: {
            apiUrl () {
                return this.$store.state.app.apiUrl
            },
        },
        methods: {
            chose () {
                this.chosen = !this.chosen
                if (this.chosen === true) {
                    this.setChild()
                }
            },
            drop(parent, e){
                var child = e.dataTransfer.getData('child')
                this.createChild(parent, child)
            },
            createChild(parent, child) {
                var that = this
                Http.post(that.apiUrl + 'role/addchild', {"parent": parent, "child": child})
                    .then(function () {
                        that.setChild()
                    })
            },
            setChild() {
                var that = this
                Http.post(that.apiUrl + 'role/getchild', {name: this.newRole.name})
                    .then(function (response) {
                        that.children = response.data
                    })
            },
            deleteChild(array) {
                var that = this
                if (!confirm('Вы действительно хотите удалить дочернюю роль ' + array.child + '?')) {
                    return
                }
                Http.post(that.apiUrl + 'role/removechild', {"parent": array.parent, "child": array.child})
                    .then(function () {
                        that.setChild()
                    })
            },
            setRole(){
                this.newRole.description = this.role.description
                this.newRole.name = this.role.name
                this.newRole.oldName = this.role.name
            },
            dropRight() {
                if(!confirm('Вы действительно хотите удалить запись ' + this.newRole.name + '?')) {
                    return;
                }
                this.$store.dispatch('app/deleteRole', this.newRole.name)
            },
            changeRole(){
                this.$store.dispatch('app/updateRole', this.newRole)
            }
        },
        created(){
            this.setRole()
        }
    }
</script>

