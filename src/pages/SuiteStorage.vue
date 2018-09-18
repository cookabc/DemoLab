<template>
  <div class="content">
    <div class="section">
      <el-button type="primary" @click="$router.push('/')">Home</el-button>
      <el-button type="primary" @click="$router.go(-1)">Back</el-button>
    </div>
    <div class="section">
      <div class="actions">
        <div class="select">
          <span class="text">Choose Expire Date:</span>
          <el-date-picker
            v-model="comparedDate"
            type="date"
            placeholder="选择日期"
            value-format="timestamp">
          </el-date-picker>
        </div>
        <div>
        <el-button type="primary" @click="createSuiteComponent(scope.row)">Create Component</el-button>
        </div>
      </div>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="suite_no" label="Reference No." width='120px'></el-table-column>
        <el-table-column prop="suite_name" label="Combo Kit Description"></el-table-column>
        <el-table-column prop="program_belong" label="Item" width='80px'></el-table-column>
        <el-table-column label="Valid" width='80px'>
          <template slot-scope="scope">
            {{ validSuiteCount }}
          </template>
        </el-table-column>
        <el-table-column label="Expired" width='80px'>
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
        <el-table-column label="Storage" width='100px'>
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="viewStorage(scope.row)">Details</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Action" width="90px">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="deleteComponentConfirm(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <create-component :visible.sync="showCreateComponentView" :suiteId="$route.query.suiteId.toString() || ''"
                      @success="componentCreated">
    </create-component>
  </div>
</template>

<script>
import CreateComponent from '@/components/CreateSuiteComponent'

export default {
  components: {
    CreateComponent,
  },
  data() {
    return {
      tableData: [],
      suiteTableData: [],
      storagetableData: [],
      comparedDate: new Date().getTime(),
      showCreateComponentView: false,
      selectedRow: null,
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
    await Promise.all([this.reloadData(), this.reloadComponentData(), this.reloadStorageData()])
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
    async reloadComponentData() {
      try {
        const params = {
          suiteId: this.$route.query.suiteId || '',
        }
        const response = await this.$http.get('/getSuiteComponent', { params })
        this.suiteTableData = response.data.data
      } catch (error) {
        console.warn(error)
      }
    },
    async reloadStorageData() {
      try {
        const params = {
          suiteId: this.$route.query.suiteId || '',
        }
        const response = await this.$http.get('/getSuiteComponentStorage', { params })
        this.storagetableData = response.data.data
      } catch (error) {
        console.warn(error)
      }
    },
    viewStorage(row) {
      this.$router.push({ name: 'ItemStorage', query: { itemId: row.item_id }})
    },
    createSuiteComponent(row) {
      this.selectedRow = row
      this.showCreateComponentView = true
    },
    componentCreated() {
      this.showCreateComponentView = false
      this.$notify({
        title: 'Success',
        message: 'Create success',
        type: 'success',
      })
    },
    deleteComponentConfirm(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteComponent(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async deleteComponent(row) {
      try {
        const payload = {
          suite_id: row.suite_id,
          item_id: row.item_id,
        }
        await this.$http.post('/deleteSuiteComponent', payload)
        await this.reloadComponentData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (error) {
        console.warn(error)
      }
    },
  },
}
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
}
.select {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.text {
  margin-right: 20px;
}
</style>
