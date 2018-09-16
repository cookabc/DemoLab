<template>
  <div class="content">
    <div class="section">
      <el-button type="primary" @click="$router.push('/')">Home</el-button>
      <el-button type="primary" @click="$router.go(-1)">Back</el-button>
    </div>
    <div class="section">
      <div class="title">Product Info:</div>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="item_no" label="Reference No." width="150px"></el-table-column>
        <el-table-column prop="item_name" label="Product Description"></el-table-column>
        <el-table-column prop="program_belong" label="Item"></el-table-column>
        <el-table-column prop="store_temperature" label="Storage Temperature"></el-table-column>
      </el-table>
      <div class="buttons tip">
        <span class="text">Add New Storage:</span>
        <el-button type="primary" size="small" @click="showSaveItem = true">Input</el-button>
      </div>
    </div>
    <div class="section">
      <div class="title">Product Storage Info:</div>
      <el-table :data="storageTableData" border stripe style="width: 100%">
        <!-- <el-table-column prop="item_id" label="Item ID" width="80px"></el-table-column> -->
        <el-table-column prop="store_position" label="Postion"></el-table-column>
        <el-table-column prop="store_number" label="Number"></el-table-column>
        <el-table-column label="Expired Date">
          <template slot-scope="scope">
            {{ dateFormatter(scope.row.expired_date) }}
          </template>
        </el-table-column>
        <el-table-column prop="note" label="Note"></el-table-column>
        <el-table-column label="Action" width="260px">
          <template slot-scope="scope">
            <div class="buttons">
              <el-button type="primary" size="small" @click="shipItem(scope.row)">Output</el-button>
              <el-button type="primary" size="small" @click="updateItem(scope.row)">Update</el-button>
              <el-button type="primary" size="small" :disabled="scope.row.store_number > 0" @click="deleteStorageConfirm(scope.row)">Delete</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <save-item :visible.sync="showSaveItem" :itemId="$route.query.itemId ? $route.query.itemId.toString() : ''"
                 @success="itemSaved">
      </save-item>
      <update-item v-if="selectedRow" :visible.sync="showUpdateItem"  :rowData="selectedRow" @resetRow="resetRow" @success="itemUpdated">
      </update-item>
      <ship-item :visible.sync="showShipItem" :itemId="$route.query.itemId ? $route.query.itemId.toString() : ''"
                 :id="selectedRow ? selectedRow.id.toString() : ''" @success="itemShipped">
      </ship-item>
    </div>
  </div>
</template>

<script>
import SaveItem from '@/components/CreateItemStorage'
import UpdateItem from '@/components/UpdateItemStorage'
import ShipItem from '@/components/ShipCargoItem'

const dateFormat = require('dateformat');

export default {
  components: {
    SaveItem,
    UpdateItem,
    ShipItem,
  },
  data() {
    return {
      tableData: [],
      storageTableData: [],
      showSaveItem: false,
      showUpdateItem: false,
      showShipItem: false,
      selectedRow: null,
    }
  },
  async mounted() {
    await Promise.all([this.reloadItemData(), this.reloadStorageData()])
  },
  methods: {
    dateFormatter(timestamp) {
      const date = new Date(parseInt(timestamp))
      return dateFormat(date, 'yyyy-mm-dd')
    },
    async reloadItemData() {
      try {
        const params = {
          id: this.$route.query.itemId || '',
        }
        const response = await this.$http.get('/getItem', { params })
        this.tableData = response.data.data
      } catch (error) {
        console.warn(error)
      }
    },
    async reloadStorageData() {
      try {
        const params = {
          itemId: this.$route.query.itemId,
        }
        const response = await this.$http.get('/getItemStorage', { params })
        this.storageTableData = response.data.data.sort((a,b) => a.expired_date > b.expired_date)
      } catch (error) {
        console.warn(error)
      }
    },
    resetRow() {
      this.selectedRow = null
    },
    itemSaved() {
      this.showSaveItem = false
      this.$notify({
        title: 'Success',
        message: 'Create success',
        type: 'success',
      })
      this.reloadStorageData()
    },
    updateItem(row) {
      this.selectedRow = row
      this.showUpdateItem = true
    },
    itemUpdated() {
      this.showUpdateItem = false
      this.$notify({
        title: 'Success',
        message: 'Update success',
        type: 'success',
      })
      this.reloadStorageData()
    },
    shipItem(row) {
      this.selectedRow = row
      this.showShipItem = true
    },
    itemShipped() {
      this.showShipItem = false
      this.$notify({
        title: 'Success',
        message: 'Output Success',
        type: 'success',
      })
      this.reloadStorageData()
    },
   deleteStorageConfirm(row) {
      this.$confirm('此操作将永久删除该库存记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteStorage(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async deleteStorage(row) {
      try {
        const payload = {
          id: row.id,
        }
        await this.$http.post('/deleteItemStorage', payload)
        await this.reloadStorageData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (error) {
        console.warn(error)
      }
    },
  },
};
</script>

<style scoped>
.title {
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}
.buttons {
  display: flex;
  align-items: center;
}
.tip {
  margin-top: 20px;
}
.text {
  margin-right: 20px;
}
</style>
