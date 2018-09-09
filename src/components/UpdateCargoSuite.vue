<template>
  <el-dialog title="Update Cargo Suite" :visible="visible" @update:visible="$emit('update:visible', $event)" @close="$emit('resetRow')">
    <el-form :model="form" ref="form" label-position="left" label-width="160px" @submit.native.prevent>
      <el-form-item label="Suite No." prop="suiteNo" required>
        <el-input v-model="form.suiteNo" clearable></el-input>
      </el-form-item>
      <el-form-item label="Suite Name" prop="suiteName" required>
        <el-input v-model="form.suiteName" clearable></el-input>
      </el-form-item>
      <el-form-item label="Item" prop="programBelong">
        <el-input v-model="form.programBelong" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateSuite">Update Cargo Suite</el-button>
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
        suiteNo: this.rowData.suite_no || '',
        suiteName: this.rowData.suite_name || '',
        programBelong: this.rowData.program_belong || '',
      },
    }
  },
 methods: {
    async updateSuite() {
      const valid = await this.$refs['form'].validate()
      if(!valid) {
        return
      }
      try {
        const payload = {
          id: this.rowData.id,
          suiteNo: this.form.suiteNo,
          suiteName: this.form.suiteName,
          programBelong: this.form.programBelong,
        }
        await this.$http.post('/updateSuite', payload)
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
