<template>
  <div
    v-if="toPrice && fromPrice"
    class="flex flex-wrap overflow-hidden  bg-white rounded-lg"
  >
    <div
      :class="[
        isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
      ]"
      class="rounded-lg font-bold p-1 ml-1"
    >
      <span v-if="isPositive">+</span> {{ percent.toFixed(2) }} %
    </div>
    <div
      class="flex items-center"
      :class="isPositive ? 'text-green-800' : 'text-red-800'"
    >
      <ArrowDownIcon
        :class="isPositive ? 'transform rotate-180' : ''"
        class="h-4 mr-1"
      />
      <div>
        <Private>
          {{ formatCurrency(change, currency, false) }}
        </Private>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AssetPrice, AssetSymbol } from '/@common/models'
import { formatCurrency } from '/@common/utils'
import { defineComponent, onUnmounted, ref, watchEffect } from 'vue'
import { ArrowDownIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components : {ArrowDownIcon},
  props      : {
    compareFrom: {
      type: [
        String, Number,
      ],
      default   : 'previousClose',
      validator : value => {
        if (typeof value === 'number') {
          return true
        }

        return [
          'dayLow',
          'dayHigh',
          'yearHigh',
          'yearLow',
          'priceAvg50',
          'priceAvg200',
          'open',
          'previousClose',
        ].includes(value)
      },
    },
    compareTo: {
      type: [
        AssetSymbol, Number,
      ],
      required: true,
    },
  },
  setup (props) {

    let liveSubscription = null

    const currency = ref(null)

    const assetPrice = ref<AssetPrice>(null)

    const fromPrice = ref<number>(null)
    const toPrice   = ref<number>(null)

    const percent    = ref<number>(null)
    const change     = ref<number>(null)
    const isPositive = ref<boolean>(null)


    const update = (fromValue, toValue) => {
      if (fromValue === null || toValue === null) {
        return
      }

      toPrice.value   = toValue
      fromPrice.value = fromValue

      change.value     = toValue - fromValue
      isPositive.value = fromValue < toValue
      percent.value    = toValue !== 0 ? ((change.value / toValue) * 100) : 0
    }


    const init = async (compareFrom, compareTo) => {
      if (liveSubscription) {
        await liveSubscription.unsubscribe()
        liveSubscription = null
      }

      if (compareTo instanceof AssetSymbol) {
        currency.value = compareTo.currency

        liveSubscription = await AssetPrice.liveQuery(compareTo, ap => {
          assetPrice.value = ap

          update(
            typeof compareFrom === 'string' ? ap[compareFrom] : compareFrom,
            ap.price,
          )
        })
      } else {
        if (compareFrom === 'number') {
          fromPrice.value = compareFrom
        }

        update(
          compareFrom,
          compareTo,
        )
      }
    }


    watchEffect(() => {
      init(props.compareFrom, props.compareTo)
    })

    onUnmounted(async () => {
      if (liveSubscription) {
        await liveSubscription.unsubscribe()
      }
    })


    return {
      formatCurrency,
      currency,
      toPrice,
      fromPrice,
      change,
      percent,
      isPositive,
    }
  },
})
</script>
