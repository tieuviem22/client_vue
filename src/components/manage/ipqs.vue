<template>
  <div>
    <a-modal v-model="visible2" title="New Ipqs" @ok="CreateIpqs">
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Api Key</label>
        <input class="form-control" v-model="newIpqs.api_key" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Error Status</label>
        <input class="form-control" v-model="newIpqs.error_status" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Date</label>
        <input type="date" class="form-control" v-model="newIpqs.date" />
      </div>
    </a-modal>

    <a-modal v-model="visible1" title="Edit Ipqs" @ok="EditIpqs">
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Api Key</label>
        <input class="form-control" v-model="params.api_key" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Error Status</label>
        <input class="form-control" v-model="params.error_status" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Date</label>
        <input type="date" class="form-control" v-model="params.date" />
      </div>
    </a-modal>
    <a-button class="editable-add-btn" @click="handleAdd"> Add </a-button>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <!-- <template slot="id" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.id, 'id', $event)"
        />
      </template> -->
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
      params: {},
      newIpqs: {
        api_key: "",
        error_status: "",
        date: "",
      },
      columns: [
        {
          title: "id",
          dataIndex: "id",
          width: "6%",
        },
        {
          title: "api_key",
          dataIndex: "api_key",
        },
        {
          title: "error_status",
          dataIndex: "error_status",
        },
        {
          title: "date",
          dataIndex: "date",
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
    this.getIpqs();
  },
  methods: {
    async confirmDelete(data) {
      await ApiServe.postApi("/api/manage/delete/ipqs", data).then((res) => {
        if (res.data.status == 200) {
          this.showNotificationWithIcon("success", res.data.message);
          this.getIpqs();
        } else {
          this.showNotificationWithIcon("error", res.data.message);
        }
      });
    },
    cancel() {
      this.visible = false;
      message.error("Click on cancel.");
    },
    async getIpqs() {
      const res = await ApiServe.getApi("/api/manage/ipqs");
      this.dataSource = res.data;
    },
    OpenModalEdit(record) {
      this.params = record;
      this.visible1 = true;
    },

    async EditIpqs() {
      await ApiServe.postApi("/api/manage/edit/ipqs", this.params).then(
        (res) => {
          if (res.data.status == 200) {
            this.showNotificationWithIcon("success", res.data.message);
            this.getIpqs();
          } else {
            this.showNotificationWithIcon("error", res.data.message);
            this.getIpqs();
          }
        }
      );

      this.visible1 = false;
    },
    handleAdd() {
      this.visible2 = true;
    },
    async CreateIpqs() {
      await ApiServe.postApi("/api/manage/create/ipqs", this.newIpqs).then(
        (res) => {
          if (res.data.status == 200) {
            this.showNotificationWithIcon("success", res.data.message);
          } else {
            this.showNotificationWithIcon("error", res.data.message);
          }
        }
      );
      this.visible2 = false;
      this.getIpqs();
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
