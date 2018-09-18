<template>
  <div class="content">
    <div class="section button-flex">
      <div>
        <el-button type="primary" @click="$router.push('/')">Home</el-button>
        <el-button type="primary" @click="$router.go(-1)">Back</el-button>
      </div>
      <div>
        <el-button type="primary" @click="toCSV(csvData, headerEnum)">Export Storage</el-button>
        <el-button type="primary" @click="toCSV(csvSafeStockData, headerSafeStockEnum)">Export Safe Stock</el-button>
      </div>
    </div>
    <div class="section">
      <el-table :data="tableData" border stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="ID" width="50px"></el-table-column> -->
        <el-table-column prop="item_no" label="Reference No." width="150px"></el-table-column>
        <el-table-column prop="item_name" label="Product Description"></el-table-column>
        <el-table-column prop="program_belong" label="Item"></el-table-column>
        <el-table-column prop="store_temperature" label="Storage Temperature"></el-table-column>
        <el-table-column prop="safe_number" label="Safety Storage"
                         :filters="[{text: 'Has safety storage', value: 0}]" :filter-method="filterHandler"></el-table-column>
        <el-table-column label="Storage" width='100px'>
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="viewStorage(scope.row)">Details</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Action" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="showUpdate(scope.row)">Update</el-button>
            <el-button type="primary" size="small" @click="deleteItemConfirm(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <update-item v-if="selectedRow" :visible.sync="showUpdateItem" :rowData="selectedRow" @resetRow="resetRow" @success="itemUpdated"></update-item>
  </div>
</template>

<script>
import UpdateItem from '@/components/UpdateCargoItem'

const dateFormat = require('dateformat')

export default {
  components: {
    UpdateItem,
  },
  data() {
    return {
      tableData: [],
      selectedRow: null,
      showUpdateItem: false,
      csvData: [],
      headerEnum: [
        {item_no: 'Reference No.'},
        {item_name: 'Product Descriptioin'},
        {program_belong: 'Item'},
        {store_temperature: 'Storage Temperature'},
        {store_position: 'Position'},
        {store_number: 'Number'},
        {expired_date: 'Expired Date'},
        {note: 'Note'},
      ],
      headerSafeStockEnum: [
        {item_no: 'Reference No.'},
        {item_name: 'Product Descriptioin'},
        {safe_number: 'Safe Stock Number'},
        {effective: 'effective'},
        {expired: 'expired'},
      ],
    }
  },
  computed: {
    csvSafeStockData() {
      const safeStockList = []
      this.tableData.forEach(i => {
        const targetList = this.csvData.filter(j => j.item_id === i.id)
        const availableCount = targetList.filter(k => {
          return !k.expired_date || k.expired_date >= (new Date()).getTime()
        }).reduce((a ,b) => a + b.store_number, 0)
        const expiredCount = targetList.filter(k =>  {
          return k.expired_date && k.expired_date < (new Date()).getTime()
        }).reduce((a ,b) => a + b.store_number, 0)
        safeStockList.push({
          item_no: i.item_no,
          item_name: i.item_name,
          safe_number: i.safe_number,
          effective: availableCount,
          expired: expiredCount,
        })
      })
      return safeStockList
    },
  },
  async mounted() {
    await Promise.all([this.reloadItemData(), this.getItemAndStorage()])
  },
  methods: {
    dateFormatter(timestamp) {
      const date = new Date(parseInt(timestamp))
      return dateFormat(date, 'yyyy-mm-dd')
    },
    async reloadItemData() {
      try {
        const params = {
          itemNo: this.$route.query.itemNo || '',
          itemName:  this.$route.query.itemName || '',
          programBelong:  this.$route.query.programBelong || '',
          storeTemperature:  this.$route.query.storeTemperature || '',
        }
        const response = await this.$http.get('/getItem', { params })
        this.tableData = response.data.data
      } catch (error) {
        console.warn(error)
      }
    },
    resetRow() {
      this.selectedRow = null
    },
    showUpdate(row) {
      this.selectedRow = row
      this.showUpdateItem = true
    },
    async itemUpdated() {
      this.showUpdateItem = false
      this.$notify({
        title: 'Success',
        message: 'Update success',
        type: 'success',
      })
      await this.reloadItemData()
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] > value;
    },
    viewStorage(row) {
      this.$router.push({ name: 'ItemStorage', query: { itemId: row.id }})
    },
    deleteItemConfirm(row) {
      this.$confirm('此操作将永久删除该库存记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteItem(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async deleteItem(row) {
      try {
        const payload = {
          id: row.id,
        }
        await this.$http.post('/deleteItem', payload)
        await this.reloadItemData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (error) {
        console.warn(error)
      }
    },
    async getItemAndStorage() {
      try {
        const response = await this.$http.get('/getItemAndStorage')
        this.csvData = response.data.data
      } catch (error) {
        console.warn(error)
      }
    },
    toCSV(data, headerEnum) {
      const headerKey = headerEnum.map(i => Object.keys(i)[0])
      const headerValue = headerEnum.map(i => Object.values(i)[0])
      const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
      let csv = data.map(row => headerKey.map(fieldName => {
        if (fieldName === 'expired_date') {
          return JSON.stringify(this.dateFormatter(row[fieldName]), replacer)
        } else {
          return JSON.stringify(row[fieldName], replacer)
        }
      }).join(','))
      csv.unshift(headerValue.join(','))
      csv = csv.join('\r\n')
      console.log(csv)
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
