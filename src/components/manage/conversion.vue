<template>
  <div>
    <div>
      <div class="d-flex justify-content-between">
        <div class="mb-3">
          Select time :
          <a-select
            label-in-value
            :default-value="{ key: 'all' }"
            style="width: 120px"
            @change="handleChange"
          >
            <a-select-option value="all"> All </a-select-option>
            <a-select-option value="today"> Today </a-select-option>
            <a-select-option value="yesterday"> Yesterday </a-select-option>
            <a-select-option value="last7day"> Last 7 days </a-select-option>
            <a-select-option value="thismonth"> This month</a-select-option>
            <a-select-option value="lastmonth"> Last month</a-select-option>
          </a-select>
        </div>
        <div>Total payout : &nbsp;{{ total }}</div>
      </div>
    </div>
    <a-table bordered :data-source="dataSource" :columns="columns"> </a-table>
  </div>
</template>
<script>
import ApiServe from "@/store/api.serve";
export default {
  data() {
    return {
      keyDefault: "all",
      dataSource: [],
      total: 0,
      columns: [
        {
          title: "id",
          dataIndex: "conversion_id",
          width: "20%",
        },
        {
          title: "name_offer",
          dataIndex: "name_offer",
        },
        {
          title: "click_id",
          dataIndex: "click_id",
        },
        {
          title: "payout",
          dataIndex: "payout",
        },
        {
          title: "time",
          dataIndex: "time",
        },
      ],
    };
  },
  created() {
    this.getConversion();
  },
  methods: {
    handleChange(value) {
      // console.log(value);
      // { key: "lucy", label: "Lucy (101)" }
      this.keyDefault = value.key;
      this.getConversion();
    },
    async getConversion() {
      this.total = 0;
      const res = await ApiServe.getApi(
        "/api/manage/conversion/" + this.keyDefault
      );
      this.dataSource = res.data;
      this.dataSource.forEach((element) => {
        this.total += element.payout;
      });
    },
  },
};
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
