<template>
  <div class="content">
    <div class="section">
      <el-button type="primary" @click="$router.push('/')">Home</el-button>
      <el-button type="primary" @click="$router.go(-1)">Back</el-button>
    </div>
    <div class="section">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="50px"></el-table-column>
        <el-table-column prop="suite_no" label="Suite No." width="100px"></el-table-column>
        <el-table-column prop="suite_name" label="Suite Name"></el-table-column>
        <el-table-column prop="program_belong" label="Item"></el-table-column>
        <el-table-column label="Action">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="viewDetails(scope.row)">Details</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Action">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="createSuiteComponent(scope.row)">Create Component</el-button>
          </template>
        </el-table-column>
      </el-table>
      <create-component :visible.sync="showCreateComponentView" :suiteId="selectedRow ? selectedRow.id.toString() : ''" @success="componentCreated"></create-component>
    </div>
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
      showCreateComponentView: false,
      selectedRow: null,
    }
  },
  computed: {
    totalSuites() {
      return this.tableData ? this.tableData.length : 0
    },
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
    createSuite() {
      this.showCreateSuiteView = true
    },
    suiteCreated() {
      this.showCreateSuiteView = false
      this.$notify({
        title: 'Success',
        message: 'Create success',
        type: 'success',
      })
      this.reloadData()
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
    viewDetails(row) {
      this.$router.push({ name: 'SuiteStorage', query: { suiteId: row.id }})
    },
  },
};
</script>

<style scoped>
</style>
