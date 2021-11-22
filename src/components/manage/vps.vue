<template>
  <div>
    <a-modal v-model="visible2" title="New Vps" @ok="CreateVps">
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Name Vps</label>
        <input class="form-control" v-model="newVps.vps_name" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Ip Address</label>
        <input class="form-control" v-model="newVps.ip_address" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Proxy</label>
        <input class="form-control" v-model="newVps.proxy" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Offer</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="newVps.offer_id"
        >
          <option v-for="(item, index) in offer" :key="index" :value="item.id">
            {{ item.name_offer }}
          </option>
        </select>
      </div>
    </a-modal>

    <a-modal v-model="visible1" title="Edit Offer" @ok="EditVps">
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Name Vps</label>
        <input class="form-control" v-model="params.vps_name" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Ip Address</label>
        <input class="form-control" v-model="params.ip_address" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Proxy</label>
        <input class="form-control" v-model="params.proxy" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Offer</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="params.offer_id"
        >
          <option v-for="(item, index) in offer" :key="index" :value="item.id">
            {{ item.name_offer }}
          </option>
        </select>
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
      offer: [],
      newVps: {
        vps_name: "",
        ip_address: "",
        proxy: "",
        offer_id: "",
      },
      columns: [
        {
          title: "id",
          dataIndex: "id",
          width: "5%",
        },
        {
          title: "vps_name",
          dataIndex: "vps_name",
        },
        {
          title: "ip_address",
          dataIndex: "ip_address",
        },
        {
          title: "proxy",
          dataIndex: "proxy",
        },
        {
          title: "name_offer",
          dataIndex: "name_offer",
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
    this.getVps();
    this.getOffer();
  },
  methods: {
    async confirmDelete(data) {
      await ApiServe.postApi("/api/manage/delete/vps", data).then((res) => {
        if (res.data.status == 200) {
          this.showNotificationWithIcon("success", res.data.message);
          this.getVps();
        } else {
          this.showNotificationWithIcon("error", res.data.message);
        }
      });
    },
    cancel() {
      this.visible = false;
      message.error("Click on cancel.");
    },
    async getVps() {
      const res = await ApiServe.getApi("/api/manage/vps");
      this.dataSource = res.data;
    },
    async getOffer() {
      const res = await ApiServe.getApi("/api/manage/offer/active");
      this.offer = res.data;
    },
    OpenModalEdit(record) {
      this.params = record;
      this.visible1 = true;
    },

    async EditVps() {
      await ApiServe.postApi("/api/manage/edit/vps", this.params).then(
        (res) => {
          if (res.data.status == 200) {
            this.showNotificationWithIcon("success", res.data.message);
            this.getVps();
          } else {
            this.showNotificationWithIcon("error", res.data.message);
          }
        }
      );

      this.visible1 = false;
    },
    handleAdd() {
      this.visible2 = true;
    },
    async CreateVps() {
      await ApiServe.postApi("/api/manage/create/vps", this.newVps).then(
        (res) => {
          if (res.data.status == 200) {
            this.showNotificationWithIcon("success", res.data.message);
          } else {
            this.showNotificationWithIcon("error", res.data.message);
          }
        }
      );
      this.visible2 = false;
      this.getVps();
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
