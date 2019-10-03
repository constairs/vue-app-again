<template>
  <ul>
    <li v-for="color in colors" :key="color">
      <button
        type="button"
        :class="[value === color ? 'active' : '']"
        :style="{ background: color }"
        :value="value"
        @click="$emit('change-color', color)"
      />
    </li>
  </ul>
</template>

<script>

export default {
  name: 'ColorPicker',
  data() {
    return {
      colors: Array.of('white', 'yellow', 'cyan', 'purple', 'orange'),
    };
  },
  props: ['value'],
};
</script>

<style scoped lang="scss">
  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 280px;
    margin: 0 auto;
    margin-bottom: 20px;

    li {
      font-size: 16px;

      button {
        border-radius: 100%;
        width: 30px;
        height: 30px;
        border: 2px solid #cccccc;
        transition: all .2s;
        outline: none;

        &:hover {
          border-color: #999999;
        }

        &.active {
          border-color: #000000;
        }
      }
    }
  }
</style>
