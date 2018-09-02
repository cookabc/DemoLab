<template>
  <div class="content">
    <div class="section">
      <el-button type="primary" @click="$router.push('/')">Home</el-button>
      <el-button type="primary" @click="$router.go(-1)">Back</el-button>
    </div>
    <div class="section">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="50px"></el-table-column>
        <el-table-column prop="item_no" label="Reference No." width="150px"></el-table-column>
        <el-table-column prop="item_name" label="Product Description"></el-table-column>
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
    }
  },
  async mounted() {
    await this.reloadItemData()
  },
  methods: {
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
    viewStorage(row) {
      this.$router.push({ name: 'ItemStorage', query: { itemId: row.id }})
    },
  },
};
</script>

<style scoped>
</style>
