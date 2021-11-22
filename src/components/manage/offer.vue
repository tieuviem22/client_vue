<template>
  <div>
    <a-modal v-model="visible2" title="New Offer" @ok="CreateOffer">
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Name Offer</label>
        <input class="form-control" v-model="newOffer.name_offer" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Url</label>
        <input class="form-control" v-model="newOffer.url" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Country</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="newOffer.country_id"
        >
          <option
            v-for="(item, index) in country"
            :key="index"
            :value="item.id"
          >
            {{ item.name_country }}
          </option>
        </select>
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Net Work</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="newOffer.network_id"
        >
          <option
            v-for="(item, index) in network"
            :key="index"
            :value="item.id"
          >
            {{ item.name_network }}
          </option>
        </select>
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Status</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="newOffer.status"
        >
          <option value="1">Active</option>
          <option value="0">Disabled</option>
        </select>
      </div>
    </a-modal>

    <a-modal v-model="visible1" title="Edit Offer" @ok="EditOffer">
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Name Offer</label>
        <input class="form-control" v-model="params.name_offer" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Url</label>
        <input class="form-control" v-model="params.url" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Country</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="params.country_id"
        >
          <option
            v-for="(item, index) in country"
            :key="index"
            :value="item.id"
          >
            {{ item.name_country }}
          </option>
        </select>
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Net Work</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="params.network_id"
        >
          <option
            v-for="(item, index) in network"
            :key="index"
            :value="item.id"
          >
            {{ item.name_network }}
          </option>
        </select>
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
      <!-- <template slot="id" slot-scope="text, record">
        <editable-cell
          :text="text"
          @change="onCellChange(record.id, 'id', $event)"
        />
      </template> -->
      <template slot="operation" slot-scope="text, record">
        <a-button type="primary" @click="OpenModalEdit(record)">
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
      country: [],
      network: [],
      newOffer: {
        name_offer: "",
        network_id: "",
        url: "",
        country_id: "",
        status: "-1",
      },
      columns: [
        {
          title: "id",
          dataIndex: "id",
          width: "5%",
        },
        {
          title: "name_offer",
          dataIndex: "name_offer",
        },
        {
          title: "name_network",
          dataIndex: "name_network",
        },
        {
          title: "url",
          dataIndex: "url",
        },
        {
          title: "name_country",
          dataIndex: "name_country",
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
    this.getOffer();
    this.getCountry();
    this.getNetwork();
  },
  methods: {
    handleChange(value) {
      // console.log(value);
      // { key: "lucy", label: "Lucy (101)" }
      this.keyDefault = value.key;
      this.getOffer();
    },

    async confirmDelete(data) {
      await ApiServe.postApi("/api/manage/delete/offer", data).then((res) => {
        if (res.data.status == 200) {
          this.showNotificationWithIcon("success", res.data.message);
          this.getOffer();
        } else {
          this.showNotificationWithIcon("error", res.data.message);
        }
      });
    },
    cancel() {
      this.visible = false;
      this.getOffer();
      message.error("Click on cancel.");
    },
    async getOffer() {
      const res = await ApiServe.getApi("/api/manage/offer/" + this.keyDefault);
      if (res.status == 200) this.dataSource = res.data.map(this.ConvertStatus);
      else {
        this.showNotificationWithIcon("error", "get offer failed");
      }
    },
    ConvertStatus(item) {
      if (item.status == "1") item.status = "Activated";
      else item.status = "Disabled";
      return item;
    },
    async getNetwork() {
      const res = await ApiServe.getApi("/api/manage/network/active");
      this.network = res.data;
    },
    async getCountry() {
      const res = await ApiServe.getApi("/api/select/country");
      this.country = res.data;
    },
    OpenModalEdit(record) {
      if (record.status == "Active") record.status = "1";
      else record.status = "0";
      this.params = record;
      this.visible1 = true;
      this.getOffer();
    },

    async EditOffer() {
      await ApiServe.postApi("/api/manage/edit/offer", this.params).then(
        (res) => {
          if (res.data.status == 200) {
            this.showNotificationWithIcon("success", res.data.message);
            this.getOffer();
          } else {
            this.showNotificationWithIcon("error", res.data.message);
            this.getOffer();
          }
        }
      );

      this.visible1 = false;
    },
    handleAdd() {
      this.visible2 = true;
    },
    async CreateOffer() {
      await ApiServe.postApi("/api/manage/create/offer", this.newOffer).then(
        (res) => {
          if (res.data.status == 200) {
            this.showNotificationWithIcon("success", res.data.message);
          } else {
            this.showNotificationWithIcon("error", res.data.message);
          }
        }
      );
      this.visible2 = false;
      this.getOffer();
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
