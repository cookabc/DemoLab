<template>
  <el-dialog title="Output" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form :model="form" ref="form" label-position="left" label-width="160px" @submit.native.prevent>
      <el-form-item label="Output Number" prop="shipNumber" required>
        <el-input v-model="form.shipNumber" clearable></el-input>
      </el-form-item>
      <el-form-item label="User Name" prop="initiatorName" required>
        <el-input v-model="form.initiatorName" clearable></el-input>
      </el-form-item>
      <el-form-item label="User Position" prop="initiatorPosDep" required>
        <el-input v-model="form.initiatorPosDep" clearable></el-input>
      </el-form-item>
      <el-form-item label="User Purpose" prop="initiatorUsage" required>
        <el-input v-model="form.initiatorUsage" clearable></el-input>
      </el-form-item>
      <el-form-item label="Note" prop="note" required>
        <el-input v-model="form.note" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="shipItem">Output</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    id: String,
    itemId: String,
  },
  data() {
    return {
      form: {
        shipNumber: null,
        initiatorName: '',
        initiatorPosDep: '',
        initiatorUsage: '',
        note: '',
      },
    }
  },
  methods: {
    async shipItem() {
      const valid = await this.$refs['form'].validate()
      if(!valid) {
        return
      }
      try {
        const payload = {
          id: this.id,
          itemId: this.itemId,
          shipNumber: this.form.shipNumber,
          initiatorName: this.form.initiatorName,
          initiatorPosDep: this.form.initiatorPosDep,
          initiatorUsage: this.form.initiatorUsage,
          note: this.form.note,
        }
        await this.$http.post('/shipItem', payload)
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
