<template>
  <div class="filter">
    <div>
    <label for="titleFilter">Filter by title:</label>
    <input
      id="titleFilter"
      type="text"
      :value="filters.titleFilter"
      @input="changeTitleFilter"
    />
    </div>
    <Select
      :withLabel='"Filter by color:"'
      :withResetBtn="true"
      :options="colorOptions"
      :value="filters.colorFilter"
      @change-select="changeColorFilter"
      @reset-selection="changeColorFilter('')"
    />
    <Select
      :withLabel='"Filter by priority:"'
      :withResetBtn="true"
      :options="priorityOptions"
      :value="filters.priorityFilter"
      @change-select="changePriorityFilter"
      @reset-selection="changePriorityFilter('')"
    />
  </div>
</template>

<script>
import Select from '@/components/Select';

export default {
  name: 'TaskFilter',
  props: ['filters'],
  data() {
    return {
      colorOptions: [
        { label: 'White', value: 'white' },
        { label: 'Green', value: 'green' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Cyan', value: 'cyan' },
        { label: 'Purple', value: 'purple' },
        { label: 'Orange', value: 'orange' },
      ],
      priorityOptions: [
        { value: 'standart', label: 'Standart' },
        { value: 'low', label: 'Low priority' },
        { value: 'high', label: 'Important' },
        { value: 'veryHigh', label: 'Very important' },
      ],
    };
  },
  methods: {
    changeColorFilter(filterValue) {
      this.$emit('change-filter', {
        colorFilter: filterValue,
      });
    },
    changePriorityFilter(filterValue) {
      this.$emit('change-filter', {
        priorityFilter: filterValue,
      });
    },
    changeTitleFilter({ target: { value } }) {
      this.$emit('change-filter', {
        titleFilter: value,
      });
    },
  },
  components: {
    Select,
  },
};
</script>

<style scoped lang="scss">
.filter {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
}
</style>
