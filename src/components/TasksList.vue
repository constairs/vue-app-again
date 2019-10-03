<template>
  <div class="tasks-list-wrap">
    <TaskFilter
      :filters="filters"
      @change-filter="$emit('change-filter', $event)"
    />
    <ul class="tasks-list">
      <TaskItem
        v-for="task in filteredTasks"
        :task="task"
        :key="task.id"
        @on-delete="$emit('on-delete', task.id)"
        @mark-complete="$emit('mark-complete', task.id)"
      />
    </ul>
  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem';
import TaskFilter from '@/components/TaskFilter';
import utils from '@/utils';

export default {
  name: 'TasksList',
  props: ['tasks', 'sortBy', 'filters'],
  computed: {
    filteredTasks() {
      const filteredTasks = this.tasks.filter(({
        color,
        priority,
        title,
      }) => {
        const { titleFilter, colorFilter, priorityFilter } = this.filters;

        if (colorFilter) {
          return (color === colorFilter);
        } else if (priorityFilter) {
          return (priority === priorityFilter);
        } else if (titleFilter) {
          return (title.match(utils.regExp(titleFilter)));
        } else if (colorFilter && priorityFilter) {
          return (priority === priorityFilter && color === colorFilter);
        }
        return true;
      });
      return filteredTasks;
    },
  },
  components: {
    TaskItem,
    TaskFilter,
  },
};
</script>

<style scoped lang="scss">
.tasks-list {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(5, 1fr);
  list-style-type: none;
  margin-bottom: 40px;
  padding-left: 0;

  &-wrap {
    padding: 0 20px;
  }

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 565px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
