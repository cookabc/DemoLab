<template>
  <div class="content">
    <div class="section">
      <el-button type="primary" @click="$router.push('/')">Home</el-button>
      <el-button type="primary" @click="$router.go(-1)">Back</el-button>
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
        <el-table-column label="Action" width='340px'>
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="showUpdate(scope.row)">Update</el-button>
            <el-button type="primary" size="small" @click="deleteSuiteConfirm(scope.row)">Delete</el-button>
            <el-button type="primary" size="small" @click="createSuiteComponent(scope.row)">Create Component</el-button>
          </template>
        </el-table-column>
      </el-table>
      <update-suite v-if="selectedRow" :visible.sync="showUpdateSuite" :rowData="selectedRow" @resetRow="resetRow" @success="suiteUpdated"></update-suite>
      <create-component :visible.sync="showCreateComponentView" :suiteId="selectedRow ? selectedRow.id.toString() : ''" @success="componentCreated"></create-component>
    </div>
  </div>
</template>

<script>
import UpdateSuite from '@/components/UpdateCargoSuite'
import CreateComponent from '@/components/CreateSuiteComponent'

export default {
  components: {
    UpdateSuite,
    CreateComponent,
  },
  data() {
    return {
      tableData: [],
      selectedRow: null,
      showUpdateSuite: false,
      showCreateComponentView: false,
    }
  },
  async mounted() {
    this.reloadData()
  },
  methods: {
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
  },
};
</script>

<style scoped>
</style>
