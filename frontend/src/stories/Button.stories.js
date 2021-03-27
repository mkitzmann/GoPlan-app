import GButton from '../components/GButton.vue'

export default {
  title     : 'Example/GButton',
  component : GButton,
  argTypes  : {
    backgroundColor : { control: 'color' },
    size            : { control: { type    : 'select',
      options : [
        'small', 'medium', 'large'
      ] } },
    onClick: {},
  },
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { GButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup () {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<g-button v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = {
  primary : true,
  label   : 'GButton',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'GButton',
}

export const Large = Template.bind({})
Large.args = {
  size  : 'large',
  label : 'GButton',
}

export const Small = Template.bind({})
Small.args = {
  size  : 'small',
  label : 'GButton',
}
