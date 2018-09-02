<template>
  <div class="content">
    <div class="section">
      <el-button type="primary" @click="$router.push('/')">Home</el-button>
      <el-button type="primary" @click="$router.go(-1)">Back</el-button>
    </div>
    <div class="section">
      <el-date-picker
        v-model="comparedDate"
        type="date"
        placeholder="选择日期"
        value-format="timestamp">
      </el-date-picker>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="suite_no" label="Suite No."></el-table-column>
        <el-table-column prop="suite_name" label="Suite Name"></el-table-column>
        <el-table-column prop="program_belong" label="Item"></el-table-column>
        <el-table-column label="Valid Suite Count">
          <template slot-scope="scope">
            {{ validSuiteCount }}
          </template>
        </el-table-column>
        <el-table-column label="Expired Suite Count">
          <template slot-scope="scope">
            {{ expiredSuiteCount }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="section">
      <el-table :data="suiteTableData" border stripe style="width: 100%">
        <el-table-column prop="item_no" label="Reference No."></el-table-column>
        <el-table-column prop="item_name" label="Product Description"></el-table-column>
        <el-table-column prop="item_number" label="Item Number"></el-table-column>
        <el-table-column prop="program_belong" label="Item"></el-table-column>
        <el-table-column prop="store_temperature" label="Storage Temperature"></el-table-column>
        <el-table-column label="Action">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="viewStorage(scope.row)">View Storage</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      suiteTableData: [],
      storagetableData: [],
      comparedDate: new Date().getTime(),
    }
  },
  computed: {
    validSuiteCount() {
      if (!this.suiteTableData.length) {
        return 0
      }
      const countObj = this.suiteTableData.map(i => {
        const availableCount = this.storagetableData
        .filter(j => j.item_id === i.item_id)
        .filter(k => k.expired_date >= this.comparedDate)
        .map(l => l.store_number || 0)
        .reduce((a, b) => a + b, 0)
        // console.log({
        //   item_id: i.item_id,
        //   should_count: i.item_number,
        //   actual_count: availableCount,
        //   final_count: parseInt(availableCount / i.item_number),
        // })
        return parseInt(availableCount / i.item_number)
      })
      return Math.min(...countObj)
    },
    expiredSuiteCount() {
      if (!this.suiteTableData.length) {
        return 0
      }
      const countObj = this.suiteTableData.map(i => {
        const availableCount = this.storagetableData
        .filter(j => j.item_id === i.item_id)
        .filter(k => k.expired_date < this.comparedDate)
        .map(l => l.store_number || 0)
        .reduce((a, b) => a + b, 0)
        // console.log({
        //   item_id: i.item_id,
        //   should_count: i.item_number,
        //   actual_count: availableCount,
        //   final_count: parseInt(availableCount / i.item_number),
        // })
        return parseInt(availableCount / i.item_number)
      })
      return Math.min(...countObj)
    },
  },
  async mounted() {
    await Promise.all([this.reloadData(), this.reloadSuiteData(), this.reloadStorageData()])
  },
  methods: {
    async reloadData() {
      try {
        const params = {
          id: this.$route.query.suiteId || '',
        }
        const response = await this.$http.get('/getSuite', { params })
        this.tableData = response.data.data
      } catch (error) {
        console.warn(error)
      }
    },
    async reloadSuiteData() {
      try {
        const params = {
          suiteId: this.$route.query.suiteId,
        }
        const response = await this.$http.get('/getSuiteComponentItemCount', { params })
        this.storagetableData = response.data.data
      } catch (error) {
        console.warn(error)
      }
    },
    async reloadStorageData() {
      try {
        const params = {
          suiteId: this.$route.query.suiteId,
        }
        const response = await this.$http.get('/getSuiteComponent', { params })
        this.suiteTableData = response.data.data
      } catch (error) {
        console.warn(error)
      }
    },
    viewStorage(row) {
      this.$router.push({ name: 'ItemStorage', query: { itemId: row.item_id }})
    },
  },
};
</script>

<style scoped>
</style>
