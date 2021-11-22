<template>
  <div>
    <a-modal v-model="visible2" title="New Network" @ok="CreateNetwork">
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Name Network</label>
        <input class="form-control" v-model="newNetwork.name_network" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Source iD</label>
        <input class="form-control" v-model="newNetwork.source_id" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Temp Url</label>
        <input class="form-control" v-model="newNetwork.temp_url" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Status</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="newNetwork.status"
        >
          <option value="1">Active</option>
          <option value="0">Disabled</option>
        </select>
      </div>
    </a-modal>

    <a-modal v-model="visible1" title="Edit Network" @ok="EditNetwork">
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Name Network</label>
        <input class="form-control" v-model="params.name_network" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Source Id</label>
        <input class="form-control" v-model="params.source_id" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Temp Url</label>
        <input class="form-control" v-model="params.temp_url" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Status</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="params.status"
        >
          <option value="1">Active</option>
          <option value="0">Disabled</option>
        </select>
      </div>
    </a-modal>
    <div class="d-flex justify-content-between">
      <a-button class="editable-add-btn" @click="handleAdd"> Add </a-button>
      <div class="">
        Filter status :
        <a-select
          label-in-value
          :default-value="{ key: keyDefault }"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="all"> All </a-select-option>
          <a-select-option value="active"> Activated </a-select-option>
          <a-select-option value="disabled"> Disabled </a-select-option>
        </a-select>
      </div>
    </div>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template slot="operation" slot-scope="text, record">
        <a-button type="primary" @click="() => OpenModalEdit(record)">
          Edit
        </a-button>
        &nbsp;
        <a-popconfirm
          title="Are you sure？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirmDelete(record)"
          @cancel="cancel"
        >
          <a-button type="danger">Delete</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
import ApiServe from "@/store/api.serve";
import { message } from "ant-design-vue";
export default {
  data() {
    return {
      visible2: false,
      visible1: false,
      visible: false,
      dataSource: [],
      keyDefault: "active",
      params: {},
      offer: [],
      newNetwork: {
        name_network: "",
        source_id: "",
        temp_url: "",
        status: "",
      },
      columns: [
        {
          title: "id",
          dataIndex: "id",
          width: "6%",
        },
        {
          title: "name_network",
          dataIndex: "name_network",
        },
        {
          title: "source_id",
          dataIndex: "source_id",
        },
        {
          title: "temp_url",
          dataIndex: "temp_url",
        },
        {
          title: "status",
          dataIndex: "status",
        },
        {
          title: "operation",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          width: "16%",
        },
      ],
    };
  },
  created() {
    this.getNetwork();
  },
  methods: {
    handleChange(value) {
      // console.log(value);
      // { key: "lucy", label: "Lucy (101)" }
      this.keyDefault = value.key;
      this.getNetwork();
    },
    ConvertStatus(item) {
      if (item.status == "1") item.status = "Activated";
      else item.status = "Disabled";
      return item;
    },
    async confirmDelete(data) {
      await ApiServe.postApi("/api/manage/delete/network", data).then((res) => {
        if (res.data.status == 200) {
          this.showNotificationWithIcon("success", res.data.message);
          this.getNetwork();
        } else {
          this.showNotificationWithIcon("error", res.data.message);
        }
      });
    },
    cancel() {
      this.visible = false;
      message.error("Click on cancel.");
    },
    async getNetwork() {
      const res = await ApiServe.getApi(
        "/api/manage/network/" + this.keyDefault
      );
      this.dataSource = res.data.map(this.ConvertStatus);
    },
    OpenModalEdit(record) {
      if (record.status == "Active") record.status = "1";
      else record.status = "0";
      this.params = record;
      console.log(152, this.params);
      this.visible1 = true;
      this.getNetwork();
    },

    async EditNetwork() {
      await ApiServe.postApi("/api/manage/edit/network", this.params).then(
        (res) => {
          if (res.data.status == 200) {
            this.showNotificationWithIcon("success", res.data.message);
            this.getNetwork();
          } else {
            this.showNotificationWithIcon("error", res.data.message);
            this.getNetwork();
          }
        }
      );

      this.visible1 = false;
    },
    handleAdd() {
      this.visible2 = true;
    },
    async CreateNetwork() {
      await ApiServe.postApi(
        "/api/manage/create/network",
        this.newNetwork
      ).then((res) => {
        if (res.data.status == 200) {
          this.showNotificationWithIcon("success", res.data.message);
        } else {
          this.showNotificationWithIcon("error", res.data.message);
        }
      });
      this.visible2 = false;
      this.getNetwork();
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
