<template>
    <section class="container">
        <Button type="primary" @click="info">显示普通提醒</Button>
        <Button type="primary" @click="modal1 = true">显示对话框</Button>
        <Modal v-model="modal1" title="普通的Modal对话框标题" @on-ok="ok" @on-cancel="cancel">
            <p>对话框内容</p>
            <p>对话框内容</p>
            <p>对话框内容</p>
        </Modal>
        <h1 class="title">
            Universal Vue.js Aspplication Frameworks
        </h1>
    </section>
</template>
<script lang="ts">
import Vue,{ComponentOptions} from "vue";
import iviewtype from "../../util/types/iview";
let index: ComponentOptions<iviewtype> = {
    data() {
        return {
            modal1: false
        }
    },
    methods: {
        info() {
            this.$Message.info('这是一条普通的提醒');
        },
        ok() {
            this.$Message.info('点击了确定');
        },
        cancel() {
            this.$Message.info('点击了取消');
        }
    }
};
export default index;
</script>
<style scoped>
.title {
    margin: 50px 0;
}
</style>
