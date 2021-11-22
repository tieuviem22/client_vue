<template>
  <div>
    <a-modal v-model="visible2" title="New Country" @ok="CreateCountry">
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Name Country</label>
        <input class="form-control" v-model="newCountry.name_country" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Iso Code</label>
        <input class="form-control" v-model="newCountry.iso_code" />
      </div>
    </a-modal>

    <a-modal v-model="visible1" title="Edit Country" @ok="EditCountry">
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Name Country</label>
        <input class="form-control" v-model="params.name_country" />
      </div>
      <div class="">
        <label for="exampleInputEmail1" class="form-label">Iso Code</label>
        <input class="form-control" v-model="params.iso_code" />
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
      newCountry: {
        name_country: "",
        iso_code: "",
      },
      columns: [
        {
          title: "id",
          dataIndex: "id",
          width: "10%",
        },
        {
          title: "name_country",
          dataIndex: "name_country",
        },
        {
          title: "iso_code",
          dataIndex: "iso_code",
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
    this.getCountry();
  },
  methods: {
    async confirmDelete(data) {
      await ApiServe.postApi("/api/manage/delete/country", data).then((res) => {
        if (res.data.status == 200) {
          this.showNotificationWithIcon("success", res.data.message);
          this.getCountry();
        } else {
          this.showNotificationWithIcon("error", res.data.message);
        }
      });
    },
    cancel() {
      this.visible = false;
      message.error("Click on cancel.");
    },
    async getCountry() {
      const res = await ApiServe.getApi("/api/manage/country");
      this.dataSource = res.data;
    },
    OpenModalEdit(record) {
      this.params = record;
      this.visible1 = true;
    },

    async EditCountry() {
      await ApiServe.postApi("/api/manage/edit/country", this.params).then(
        (res) => {
          if (res.data.status == 200) {
            this.showNotificationWithIcon("success", res.data.message);
            this.getCountry();
          } else {
            this.showNotificationWithIcon("error", res.data.message);
            this.getCountry();
          }
        }
      );

      this.visible1 = false;
    },
    handleAdd() {
      this.visible2 = true;
    },
    async CreateCountry() {
      await ApiServe.postApi(
        "/api/manage/create/country",
        this.newCountry
      ).then((res) => {
        if (res.data.status == 200) {
          this.showNotificationWithIcon("success", res.data.message);
        } else {
          this.showNotificationWithIcon("error", res.data.message);
        }
      });
      this.visible2 = false;
      this.getCountry();
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
