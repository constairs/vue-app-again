<template>
  <div class="select" :class="[active ? 'active' : '', withLabel ? 'withLabel' : '']">
    <label @click="active = !acitve" v-if="withLabel">{{ withLabel }}</label>
    <input class="select-value" v-if="withInput" />
    <div class="select-value" @click="active = !active" v-else>{{ selected.label }}</div>
    <button
      type="button"
      class="reset-btn"
      v-if="withResetBtn && value"
      @click="$emit('reset-selection')"
    >
      &times;
    </button>
    <div
      class="options-overlay"
      :class={display:active}
      @click.stop="active = false"
    ></div>
    <ul class="options">
      <li
        v-for="option in options"
        :key="option.value"
      >
        <button
          @click="onClickSelect(option.value)"
          :class="[selected.value === option.value ? 'selected' : '']"
          type="button"
        >
          {{ option.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data() {
    return {
      inputText: '',
      active: false,
    };
  },
  props: ['options', 'withInput', 'value', 'defaultValue', 'withLabel', 'withResetBtn'],
  computed: {
    selected() {
      return this.options.find(option => option.value === this.value) || { label: '', title: '' };
    },
  },
  methods: {
    onClickSelect(value) {
      this.active = false;
      this.$emit('change-select', value);
    },
  },
};
</script>

<style scoped lang="scss">
.select {
  width: 100%;
  position: relative;
  margin-bottom: 20px;

  &::after {
    content: '\25bc';
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -8px;
  }

  &.active {
    .options {
      display: block;
    }

    &::after {
      content: '\25b2';
    }
  }

  &.withLabel {
    &::after {
    margin-top: 0;
    }

    .options {
      top: 62px;
    }
  }

  label {
    font-size: 12px;
    text-align: left;
    margin-bottom: 4px;
    display: block;
  }

  .options-overlay {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    z-index: 1;
  }

  .options-overlay.display {
    display: block;
  }

  .options {
    display: none;
    position: absolute;
    top: 45px;
    left: 0;
    max-height: 250px;
    width: 100%;
    margin: 0;
    margin-top: 4px;
    margin-bottom: 20px;
    overflow: auto;
    list-style-type: none;
    padding-left: 0;
    border: 1px solid #82DDF0;
    border-radius: 4px;
    z-index: 2;

    button {
      width: 100%;
      height: 40px;
      border: none;
      background-color: lighten(#001f24, 12%);
      color: #ffffff;
      text-align: left;
      padding: 0;
      padding-left: 10px;
      font-size: 16px;
      outline: none;

      &:hover {
        background-color: #9de4f3!important;
        color: #000000;
      }

      &.selected {
        background-color: #82DDF0;
        font-weight: bold;
      }
    }
  }
}

.select-value {
  height: 45px;
  width: 100%;
  text-align: left;
  border: 1px solid #82DDF0;
  line-height: 45px;
  padding-left: 10px;
  border-radius: 4px;
  color: #ffffff;
  background-color: #001f24;
}

.reset-btn {
  position: absolute;
  top: 50%;
  right: 35px;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  border-radius: 100%;
  background: red;
  color: #ffffff;
}
</style>
