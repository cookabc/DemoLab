<template>
  <el-dialog title="Create Combo Kit" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form :model="form" ref="form" label-position="left" label-width="160px" @submit.native.prevent>
      <el-form-item label="Reference No." prop="suiteNo">
        <el-input v-model="form.suiteNo" clearable></el-input>
      </el-form-item>
      <el-form-item label="Product Description" prop="suiteName" required>
        <el-input v-model="form.suiteName" clearable></el-input>
      </el-form-item>
      <el-form-item label="Item" prop="programBelong">
        <el-input v-model="form.programBelong" clearable></el-input>
      </el-form-item>
      <el-form-item label="Safety Storage" prop="safeNumber">
        <el-input v-model="form.safeNumber" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createSuite">Create</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
   props: {
    visible: Boolean,
  },
  data() {
    return {
      form: {
        suiteNo: '',
        suiteName: '',
        programBelong: '',
        safeNumber: '',
      },
    }
  },
 methods: {
    async createSuite() {
      const valid = await this.$refs['form'].validate()
      if(!valid) {
        return
      }
      try {
        const payload = {
          suiteNo: this.form.suiteNo,
          suiteName: this.form.suiteName,
          programBelong: this.form.programBelong,
          safeNumber: this.form.safeNumber || null,
        }
        await this.$http.post('/createSuite', payload)
        this.$refs.form.resetFields()
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
