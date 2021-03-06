<template>
  <div class="mt-6">
    <div class="bg-white shadow rounded-md overflow-hidden my-6">
      <table class="text-left w-full border-collapse">
        <thead class="border-b">
        <tr>
          <th
              class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100"
          >
            Date
          </th>
          <th
              class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100"
          >
            High
          </th>
          <th
              class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100"
          >
            Low
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(i, index) in simpleTableData"
            :key="index"
            class="hover:bg-gray-200"
        >
          <td class="py-4 px-6 border-b text-gray-700 text-lg">
            {{ i.city }}
          </td>
          <td class="py-4 px-6 border-b text-gray-500">
            {{ i.totalOrders }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {defineComponent, PropType} from "vue";
import {PriceHistoryItem} from "../hooks/api/interfaces/goplan-interfaces";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<PriceHistoryItem>,
      required: true
    }
  },
  setup() {

    return {
      data
    };
  },
});
</script>

<style scoped>

</style>