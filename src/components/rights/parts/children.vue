<template>
    <tr style="border-bottom:1px solid #dee2e6">
        <td></td>
        <td><p style="font-size:12px;margin-bottom:0px">{{ child.name }}</p></td>
        <td><p style="font-size:12px;margin-bottom:0px">{{ child.description }}</p></td>
        <td v-if="can('superadmin')" @click="deleteChild(parent, child.name)"><i class="fas fa-times"></i></td>
    </tr>
</template>
<script>
    import Acl from '../../../utils/acl'

    export default {
        mixins: [Acl],
        props: ['child', 'parent'],
        computed: {
            apiUrl () {
                return this.$store.state.app.apiUrl
            },
        },
        methods: {
            deleteChild(parent, child) {
                this.$emit('updateChildren', {"parent": parent, "child": child})
            },
        },
    }
</script>