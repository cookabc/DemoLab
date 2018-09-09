<template>
  <div class="content">
    <div class="section">
      <el-button type="primary" @click="$router.push('/')">Home</el-button>
      <el-button type="primary" @click="$router.go(-1)">Back</el-button>
    </div>
    <div class="section">
      <el-table :data="tableData" border stripe style="width: 100%">
        <!-- <el-table-column prop="id" label="ID" width="50px"></el-table-column> -->
        <el-table-column prop="item_no" label="Reference No." width="150px"></el-table-column>
        <el-table-column prop="item_name" label="Product Description"></el-table-column>
        <el-table-column prop="program_belong" label="Item"></el-table-column>
        <el-table-column prop="store_temperature" label="Storage Temperature"></el-table-column>
        <el-table-column label="Action" width="230px">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="showUpdate(scope.row)">Update</el-button>
            <el-button type="primary" size="small" @click="viewStorage(scope.row)">View Storage</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <update-item v-if="selectedRow" :visible.sync="showUpdateItem" :rowData="selectedRow" @resetRow="resetRow" @success="itemUpdated"></update-item>
  </div>
</template>

<script>
import UpdateItem from '@/components/UpdateCargoItem'

export default {
  components: {
    UpdateItem,
  },
  data() {
    return {
      tableData: [],
      itemForm: {
        itemNo: '',
        itemName: '',
        programBelong: '',
        storeTemperature: '',
      },
      selectedRow: null,
      showUpdateItem: false,
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
    viewStorage(row) {
      this.$router.push({ name: 'ItemStorage', query: { itemId: row.id }})
    },
    toCSV(data) {
      const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
      const header = Object.keys(data[0]).slice(1)
      let csv = data.map(row => header.filter(i => i !== 'id').map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      csv.unshift(header.join(','))
      csv = csv.join('\r\n')
      console.log(csv)
    }
  },
};
</script>

<style scoped>
</style>
