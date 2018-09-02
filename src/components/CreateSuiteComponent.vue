<template>
  <el-dialog title="Create Suite Component" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form :model="itemForm" ref="itemForm" label-position="left" label-width="160px" @submit.native.prevent>
      <el-form-item label="Reference No." prop="itemNo" required>
        <el-input v-model="itemForm.itemNo" clearable>
          <el-button slot="append" icon="el-icon-search" @click="reloadItemData"></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="table">
      <el-table v-if="itemtTableData.length" :data="itemtTableData" border stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="ID" width="50px"></el-table-column> -->
        <el-table-column prop="item_no" label="Reference No." width="100px"></el-table-column>
        <el-table-column prop="item_name" label="Product Description"></el-table-column>
        <!-- <el-table-column prop="program_belong" label="Item"></el-table-column>
        <el-table-column prop="store_temperature" label="Storage Temperature"></el-table-column> -->
        <el-table-column label="Action" width="100px">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="selectItemId(scope.row)">Select</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form :model="form" ref="form" label-position="left" label-width="160px" @submit.native.prevent>
      <!-- <el-form-item label="Item ID" prop="itemId">
        <el-input v-model="form.itemId" clearable></el-input>
      </el-form-item> -->
      <el-form-item label="Product Description" prop="itemName">
        <el-input v-model="form.itemName" disabled clearable></el-input>
      </el-form-item>
      <el-form-item label="Item" prop="programBelong">
        <el-input v-model="form.programBelong" disabled clearable></el-input>
      </el-form-item>
      <el-form-item label="Temperature" prop="storeTemperature">
        <el-input v-model="form.storeTemperature" disabled clearable></el-input>
      </el-form-item>
      <el-form-item label="Item Number" prop="itemNumber">
        <el-input v-model="form.itemNumber" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createSuiteComponent">Create Suite Component</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    suiteId: String,
  },
  data() {
    return {
      itemForm: {
        itemNo: '',
      },
      itemtTableData: [],
      form: {
        itemId: '',
        itemName: '',
        programBelong: '',
        storeTemperature: '',
        itemNumber: '',
      },
    }
  },
  methods: {
    async reloadItemData() {
      const valid = await this.$refs['itemForm'].validate()
      if(!valid) {
        return
      }
      try {
        const params = {
          itemNo: this.itemForm.itemNo || '',
        }
        const response = await this.$http.get('/getItem', { params })
        this.itemtTableData = response.data.data
      } catch (error) {
        console.warn(error)
      }
    },
    selectItemId(row) {
      this.form.itemId = row.id
      this.form.itemName = row.item_name
      this.form.programBelong = row.program_belong
      this.form.storeTemperature = row.store_temperature
    },
    async createSuiteComponent() {
      try {
        const payload = {
          suiteId: this.suiteId,
          itemId: this.form.itemId,
          itemNumber: this.form.itemNumber,
        }
        await this.$http.post('/createSuiteComponent', payload)
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
.table {
  padding: 10px 0 30px 0;
}
</style>
