<template>
  <el-dialog title="Input" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form :model="form" ref="form" class="form" label-position="left" label-width="160px" @submit.native.prevent>
      <el-form-item label="Store Position" prop="storePosition" required>
        <el-input v-model="form.storePosition" clearable></el-input>
      </el-form-item>
      <el-form-item label="Store Number" prop="storeNumber" required>
        <el-input v-model="form.storeNumber" clearable></el-input>
      </el-form-item>
      <el-form-item label="Expired Date" prop="expiredDate" required>
        <el-date-picker v-model="form.expiredDate" type="date" placeholder="选择日期" value-format="timestamp"></el-date-picker>
      </el-form-item>
      <el-form-item label="Note" prop="note">
        <el-input v-model="form.note" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createItemStorage">Input</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    itemId: String,
  },
  data() {
    return {
      form: {
        storePosition: '',
        storeNumber: '',
        expiredDate: '',
        note: '',
      },
    }
  },
  methods: {
    async createItemStorage() {
      const valid = await this.$refs['form'].validate()
      if(!valid) {
        return
      }
      try {
        const payload = {
          itemId: this.itemId,
          storePosition: this.form.storePosition,
          storeNumber: this.form.storeNumber,
          expiredDate: this.form.expiredDate,
          note: this.form.note,
        }
        console.log(payload)
        await this.$http.post('/createItemStorage', payload)
        this.$refs.form.resetFields()
        this.$emit('success')
      } catch (error) {
        console.warn(error)
      }
    },
  },
}
</script>

<style scoped>
</style>

<style>
.form .el-date-editor.el-input {
  width: 100%;
}
</style>

