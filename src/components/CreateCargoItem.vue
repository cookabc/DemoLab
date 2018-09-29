<template>
  <el-dialog title="Create Product" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form :model="form" ref="form" label-position="left" label-width="160px" @submit.native.prevent>
      <el-form-item label="Reference No." prop="itemNo">
        <el-input v-model="form.itemNo" clearable></el-input>
      </el-form-item>
      <el-form-item label="Product Description" prop="itemName" required>
        <el-input v-model="form.itemName" clearable></el-input>
      </el-form-item>
      <el-form-item label="Item" prop="programBelong">
        <el-input v-model="form.programBelong" clearable></el-input>
      </el-form-item>
      <el-form-item label="Storage Temperature" prop="storeTemperature">
        <el-input v-model="form.storeTemperature" clearable></el-input>
      </el-form-item>
      <el-form-item label="Safety Storage" prop="safeNumber">
        <el-input v-model="form.safeNumber" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createItem">Create</el-button>
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
        itemNo: '',
        itemName: '',
        programBelong: '',
        storeTemperature: '',
        safeNumber: '',
      },
    }
  },
  methods: {
    async createItem() {
      const valid = await this.$refs['form'].validate()
      if(!valid) {
        return
      }
      try {
        const payload = {
          itemNo: this.form.itemNo,
          itemName: this.form.itemName,
          programBelong: this.form.programBelong,
          storeTemperature: this.form.storeTemperature,
          safeNumber: this.form.safeNumber,
        }
        await this.$http.post('/createItem', payload)
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
