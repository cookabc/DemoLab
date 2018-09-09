<template>
  <el-dialog title="Update" :visible="visible" @update:visible="$emit('update:visible', $event)" @close="$emit('resetRow')">
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
        <el-button type="primary" @click="saveItem">Update</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    rowData: Object,
  },
  data() {
    return {
      form: {
        storePosition: this.rowData.store_position || '',
        storeNumber: this.rowData.store_number || '',
        expiredDate: this.rowData.expired_date || '',
        note: this.rowData.note || '',
      },
    }
  },
  methods: {
    async saveItem() {
      const valid = await this.$refs['form'].validate()
      if(!valid) {
        return
      }
      try {
        const payload = {
          id: this.rowData.id,
          storePosition: this.form.storePosition,
          storeNumber: this.form.storeNumber,
          expiredDate: this.form.expiredDate,
          note: this.form.note,
        }
        await this.$http.post('/updateItemStorage', payload)
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

