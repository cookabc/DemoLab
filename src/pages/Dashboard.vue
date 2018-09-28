<template>
  <div class="content">
    <div class="section">
      <div class="title">Output Records</div>
      <el-button type="primary" @click="$router.push({ name: 'ShipRecords' })">Display</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="section">
          <div class="title">Create Product</div>
          <el-button type="primary" @click="showCreateItem = true">Create</el-button>
          <create-item :visible.sync="showCreateItem" @success="itemCreated"></create-item>
        </div>
        <div class="section">
          <div class="title">Search Product</div>
          <el-form :model="itemForm" ref="itemForm" label-position="left" label-width="180px" @submit.native.prevent>
            <el-form-item label="Reference No." prop="itemNo">
              <el-input v-model="itemForm.itemNo" clearable>
                <!-- <el-button slot="append" icon="el-icon-search" @click="reloadItemData"></el-button> -->
              </el-input>
            </el-form-item>
            <el-form-item label="Product Description" prop="itemName">
              <el-input v-model="itemForm.itemName" clearable></el-input>
            </el-form-item>
            <el-form-item label="Item" prop="programBelong">
              <el-input v-model="itemForm.programBelong" clearable></el-input>
            </el-form-item>
            <el-form-item label="Storage Temperature" prop="storeTemperature">
              <el-input v-model="itemForm.storeTemperature" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="reloadItemData">Search</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="section">
          <div class="title">Create Combo Kit</div>
          <el-button type="primary" @click="showCreateSuite = true">Create</el-button>
          <create-suite :visible.sync="showCreateSuite" @success="suiteCreated"></create-suite>
        </div>
        <div class="section">
          <div class="title">Search Combo Kit</div>
          <el-form :model="suiteForm" ref="suiteForm" label-position="left" label-width="180px"  @submit.native.prevent>
            <el-form-item label="Reference No." prop="suiteNo">
              <el-input v-model="suiteForm.suiteNo" clearable>
                <!-- <el-button slot="append" icon="el-icon-search" @click="reloadSuiteData"></el-button> -->
              </el-input>
            </el-form-item>
            <el-form-item label="Combo Kit Description" prop="itemName">
              <el-input v-model="suiteForm.suiteName" clearable></el-input>
            </el-form-item>
            <el-form-item label="Item" prop="programBelong">
              <el-input v-model="suiteForm.programBelong" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="reloadSuiteData">Search</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CreateItem from '@/components/CreateCargoItem'
import CreateSuite from '@/components/CreateCargoSuite'

export default {
  components: {
    CreateItem,
    CreateSuite,
  },
  data() {
    return {
      itemForm: {
        itemNo: '',
        itemName: '',
        programBelong: '',
        storeTemperature: '',
      },
      suiteForm: {
        suiteNo: '',
        suiteName: '',
        programBelong: '',
      },
      showCreateItem: false,
      showCreateSuite: false,
    }
  },
  methods: {
    itemCreated() {
      this.showCreateItem = false
      this.$notify({
        title: 'Success',
        message: 'Create success',
        type: 'success',
      })
    },
    async reloadItemData() {
      // const valid = await this.$refs['itemForm'].validate()
      // if(!valid) {
      //   return
      // }
      const query = {
        itemNo: this.itemForm.itemNo,
        itemName: this.itemForm.itemName,
        programBelong: this.itemForm.programBelong,
        storeTemperature: this.itemForm.storeTemperature,
      }
      this.$router.push({ name: 'CargoItem', query })
    },
    suiteCreated() {
      this.showCreateSuite = false
      this.$notify({
        title: 'Success',
        message: 'Create success',
        type: 'success',
      })
    },
    async reloadSuiteData() {
      // const valid = await this.$refs['suiteForm'].validate()
      // if(!valid) {
      //   return
      // }
      const query = {
        suiteNo: this.suiteForm.suiteNo,
        suiteName: this.suiteForm.suiteName,
        programBelong: this.suiteForm.programBelong,
      }
      this.$router.push({ name: 'CargoSuite', query })
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #efefef;
  font-size: 18px;
  font-weight: bold;
}
.el-button, .el-button--primary {
  background-color: red;
  border-color: red;
}
</style>
