<template>
  <el-dialog title="Update Ship Record" :visible="visible" @update:visible="$emit('update:visible', $event)" @close="$emit('resetRow')">
    <el-form :model="form" ref="form" label-position="left" label-width="80px" @submit.native.prevent>
      <el-form-item label="Note" prop="note">
        <el-input v-model="form.note" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateRecord">Update</el-button>
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
        note: this.rowData.note || '',
      },
    }
  },
  methods: {
    async updateRecord() {
      const valid = await this.$refs['form'].validate()
      if(!valid) {
        return
      }
      try {
        const payload = {
          id: this.rowData.id,
          note: this.form.note,
        }
        await this.$http.post('/updateShipRecord', payload)
        this.$emit('success')
      } catch (error) {
        console.warn(error)
      }
    },
  },
};
</script>

<style scoped>
</style>
