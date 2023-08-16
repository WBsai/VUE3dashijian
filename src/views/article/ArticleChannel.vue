<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '../../api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

const channelLiset = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelLiset = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelLiset.value = res.data.data
  loading.value = false
}
getChannelLiset()

const onDelChannel = (row, $index) => {
  console.log(row, $index)
}

// 编辑
const onEditiChannel = (row) => {
  dialog.value.open(row)
}

// 添加
const onAddChannel = () => {
  dialog.value.open({})
}

const onSuccess = () => {
  getChannelLiset()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="channelLiset" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row 就是 channelList 的一项，$index 下标 -->
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="onEditiChannel(row, $index)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
