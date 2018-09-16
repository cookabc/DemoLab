<template>
  <div class="content">
    <div class="section button-flex">
      <div>
        <el-button type="primary" @click="$router.push('/')">Home</el-button>
        <el-button type="primary" @click="$router.go(-1)">Back</el-button>
      </div>
      <div>
        <el-button type="primary" @click="toCSV(tableData, headerEnum)">Export Records</el-button>
      </div>
    </div>
    <div class="section">
      <el-table :data="tableData" border stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="ID" width="50px"></el-table-column> -->
        <el-table-column label="Date">
          <template slot-scope="scope">
            {{ dateFormatter(scope.row.create_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="initiator_name" label="User Name"></el-table-column>
        <!-- <el-table-column prop="initiator_pos_dep" label="Position"></el-table-column> -->
        <el-table-column prop="initiator_usage" label="Usage"></el-table-column>
        <el-table-column prop="item_no" label="Reference No."></el-table-column>
        <el-table-column prop="item_name" label="Product Description"></el-table-column>
        <el-table-column prop="ship_number" label="Ship Number"></el-table-column>
        <el-table-column prop="note" label="Note"></el-table-column>
        <el-table-column label="Action" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="showUpdate(scope.row)">Update</el-button>
            <el-button type="primary" size="small" :disabled="scope.row.store_number > 0" @click="deleteRecordConfirm(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <update-record v-if="selectedRow" :visible.sync="showUpdateRecord" :rowData="selectedRow" @resetRow="resetRow" @success="recordUpdated"></update-record>
  </div>
</template>

<script>
import UpdateRecord from '@/components/UpdateShipRecord'

const dateFormat = require('dateformat')

export default {
  components: {
    UpdateRecord,
  },
  data() {
    return {
      tableData: [],
      selectedRow: null,
      showUpdateRecord: false,
      headerEnum: [
        {create_date: 'Date'},
        {initiator_name: 'User Name'},
        {initiator_pos_dep: 'User Position'},
        {initiator_usage: 'User Purpose'},
        {item_no: 'Reference No.'},
        {item_name: 'Product Descriptioin'},
        {store_temperature: 'Storage Temperature'},
        {item_position: 'Positioin'},
        {ship_number: 'Number'},
        {item_expired_date: 'Expired Date'},
        {note: 'Note'},
      ],
    }
  },
  async mounted() {
    await this.reloadRecordData()
  },
  methods: {
    dateFormatter(timestamp) {
      const date = new Date(parseInt(timestamp))
      return dateFormat(date, 'yyyy-mm-dd')
    },
    async reloadRecordData() {
      try {
        const response = await this.$http.get('/getShipRecord')
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
      this.showUpdateRecord = true
    },
    async recordUpdated() {
      this.showUpdateRecord = false
      this.$notify({
        title: 'Success',
        message: 'Update success',
        type: 'success',
      })
      await this.reloadRecordData()
    },
    deleteRecordConfirm(row) {
      this.$confirm('此操作将永久删除该出库记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRecord(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async deleteRecord(row) {
      try {
        const payload = {
          id: row.id,
        }
        await this.$http.post('/deleteShipRecord', payload)
        await this.reloadRecordData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (error) {
        console.warn(error)
      }
    },
    toCSV(data, headerEnum) {
      const headerKey = headerEnum.map(i => Object.keys(i)[0])
      const headerValue = headerEnum.map(i => Object.values(i)[0])
      const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
      let csv = data.map(row => headerKey.map(fieldName => {
        if (fieldName === 'create_date' || fieldName === 'item_expired_date') {
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
