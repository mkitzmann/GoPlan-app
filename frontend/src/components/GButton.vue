<template>
  <button
    type="button"
    class="px-6 py-3 bg-blue-600 rounded-lg text-white font-medium tracking-wide hover:bg-blue-500 ml-3"
    :class="classes"
    :style="style"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  name  : 'MyButton',
  props : {
    label: {
      type     : String,
      required : true,
    },
    primary: {
      type    : Boolean,
      default : false,
    },
    size: {
      type: String,
      validator (value) {
        return [
          'small', 'medium', 'large'
        ].indexOf(value) !== -1
      },
      default: 'medium'
    },
    backgroundColor: {
      type: String,
    },
  },

  emits: [
    'click'
  ],

  setup (props, { emit }) {
    props = reactive(props)
    return {
      classes: computed(() => ({
        'storybook-button--primary'                     : props.primary,
        'storybook-button--secondary'                   : !props.primary,
        [`storybook-button--${props.size || 'medium'}`] : true,
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
      })),
      onClick () {
        emit('click')
      }
    }
  },
}
</script>
