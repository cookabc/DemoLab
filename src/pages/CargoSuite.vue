<template>
  <div class="content">
    <div class="section button-flex">
      <div>
        <el-button type="primary" @click="$router.push('/')">Home</el-button>
        <el-button type="primary" @click="$router.go(-1)">Back</el-button>
      </div>
      <div>
        <el-button type="primary" @click="toCSV(storageData, headerEnum)">Export Storage</el-button>
        <el-button type="primary" @click="toCSV(storageData, headerSafeStockEnum)">Export Safe Stock</el-button>
      </div>
    </div>
    <div class="section">
      <el-table :data="tableData" border stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="ID" width="50px"></el-table-column> -->
        <el-table-column prop="suite_no" label="Reference No." width="120px"></el-table-column>
        <el-table-column prop="suite_name" label="Combo Kit Description"></el-table-column>
        <el-table-column prop="program_belong" label="Item" width='100px'></el-table-column>
        <el-table-column prop="safe_number" label="Safety Storage" width='140px'
                         :filters="[{text: 'Has safety storage', value: 0}]" :filter-method="filterHandler"></el-table-column>
        <el-table-column label="Storage" width='100px'>
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="viewDetails(scope.row)">Details</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Action" width='190px'>
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="showUpdate(scope.row)">Update</el-button>
            <el-button type="primary" size="small" @click="deleteSuiteConfirm(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <update-suite v-if="selectedRow" :visible.sync="showUpdateSuite" :rowData="selectedRow" @resetRow="resetRow" @success="suiteUpdated"></update-suite>
    </div>
  </div>
</template>

<script>
import UpdateSuite from '@/components/UpdateCargoSuite'

const dateFormat = require('dateformat')

export default {
  components: {
    UpdateSuite,
  },
  data() {
    return {
      tableData: [],
      storageData: [],
      selectedRow: null,
      showUpdateSuite: false,
      headerEnum: [
        {reference_no: 'Reference No.'},
        {reference_name: 'Product Descriptioin'},
        {item_number: 'Number per Kit'},
        {store_temperature: 'Storage Temperature'},
        {store_position: 'Positioin'},
        {store_number: 'Number'},
        {expired_date: 'Expired Date'},
        {note: 'Note'},
        {effective: 'Effective'},
        {expired: 'Expired'},
      ],
      headerSafeStockEnum: [
        {reference_no: 'Reference No.'},
        {reference_name: 'Product Descriptioin'},
        {safe_stock: 'Safe Stock Number'},
        {effective: 'Effective'},
        {expired: 'Expired'},
      ],
    }
  },
  async mounted() {
    await Promise.all([this.reloadData(), this.getSuiteAndStorage()])
  },
  methods: {
    dateFormatter(timestamp) {
      if (!timestamp) { return null }
      const date = new Date(parseInt(timestamp))
      return dateFormat(date, 'yyyy-mm-dd')
    },
    async reloadData() {
      try {
        const params = {
          suiteNo: this.$route.query.suiteNo || '',
          suiteName: this.$route.query.suiteName || '',
          programBelong: this.$route.query.programBelong || '',
        }
        const response = await this.$http.get('/getSuite', { params })
        this.tableData = response.data.data
      } catch (error) {
        console.warn(error)
      }
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] > value;
    },
    viewDetails(row) {
      this.$router.push({ name: 'SuiteStorage', query: { suiteId: row.id }})
    },
    resetRow() {
      this.selectedRow = null
    },
    showUpdate(row) {
      this.selectedRow = row
      this.showUpdateSuite = true
    },
    async suiteUpdated() {
      this.showUpdateSuite = false
      this.$notify({
        title: 'Success',
        message: 'Update success',
        type: 'success',
      })
      await this.reloadData()
    },
    deleteSuiteConfirm(row) {
      this.$confirm('此操作将永久删除该库存记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteSuite(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async deleteSuite(row) {
      try {
        const payload = {
          id: row.id,
        }
        await this.$http.post('/deleteSuite', payload)
        await this.reloadData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (error) {
        console.warn(error)
      }
    },
    async getSuiteAndStorage() {
      try {
        const response = await this.$http.get('/getSuiteAndStorage')
        const data = []
        response.data.data.map(i => {
          data[i.id] ? data[i.id].push(i) : data[i.id] = [i]
        })
        const jsonData = data.filter(i => i !== undefined).map(i => {
          const tmp = {
            reference_no: i[0].suite_no,
            reference_name: i[0].suite_name,
            safe_stock: i[0].safe_suite,
          }
          if (i.length > 1) {
            const arr = i.map(j => {
              return {
                item_id: j.item_id,
                reference_no: j.item_no,
                reference_name: j.item_name,
                item_number: j.item_number,
                store_temperature: j.store_temperature,
                store_position: j.store_position,
                store_number: j.store_number,
                expired_date: j.expired_date,
                note: j.note,
                safe_stock: j.safe_item,
                effective: (!j.expired_date || j.expired_date >= (new Date()).getTime()) && j.store_number ? j.store_number : 0,
                expired: j.expired_date && j.expired_date < (new Date()).getTime() ? j.store_number : 0,
              }
            })
            const countEffectiveArr = arr.map(i => {
              const count = arr.filter(j => j.item_id === i.item_id)
                .filter(k => !k.expired_date || k.expired_date >= (new Date()).getTime())
                .map(l => l.store_number || 0)
                .reduce((a, b) => a + b, 0)
              return parseInt(count / i.item_number)
            })
            const countExpiredArr = arr.map(i => {
              const count = arr.filter(j => j.item_id === i.item_id)
                .filter(k => k.expired_date && k.expired_date < (new Date()).getTime())
                .map(l => l.store_number || 0)
                .reduce((a, b) => a + b, 0)
              return parseInt(count / i.item_number)
            })
            const effectiveCount = Math.min(...countEffectiveArr)
            const expiredCount = Math.min(...countExpiredArr)
            tmp.effective = effectiveCount
            tmp.expired = expiredCount
            arr.unshift(tmp)
            return arr
          } else {
            tmp.effective = 0
            tmp.expired = 0
            return [tmp]
          }
        })
        this.storageData = jsonData
      } catch (error) {
        console.warn(error)
      }
    },
    cleanData(data, headerEnum) {
      const headerKey = headerEnum.map(i => Object.keys(i)[0])
      const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
      return data.map(row => headerKey.map(fieldName => {
        if (fieldName === 'expired_date' && row[fieldName]) {
          return JSON.stringify(this.dateFormatter(row[fieldName]), replacer)
        } else {
          return JSON.stringify(row[fieldName], replacer)
        }
      }).join(',')).join('\r\n')
    },
    toCSV(data, headerEnum) {
      const headerValue = headerEnum.map(i => Object.values(i)[0])
      let csv = data.map(i => this.cleanData(i, headerEnum))
      csv.unshift(headerValue.join(','))
      csv = csv.join('\r\n')
      window.open("data:text/csv;charset=utf-8," + csv)
    }
  },
};
</script>

<style scoped>
.button-flex {
  display: flex;
  justify-content: space-between;
}
</style>
