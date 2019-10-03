<template>
  <div class="hello">
    <TasksList
      :sortBy="sortBy"
      :tasks="tasks"
      :filters="filters"
      @on-delete="deleteTask"
      @change-filter="changeFilter"
      @mark-complete="markComplete"
    />
    <Form @on-task="onTask" />
  </div>
</template>

<script>
import Form from '@/components/Form';
import TasksList from '@/components/TasksList';
import _ from 'lodash';

export default {
  name: 'Main',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      tasks: [
        {
          id: '1',
          title: 'Ah shit',
          text: 'here we go again',
          completed: false,
          color: 'purple',
          priority: 'standart',
        },
        {
          id: '2',
          title: 'Work again?',
          text: 'Done',
          completed: true,
          color: 'cyan',
          priority: 'standart',
        },
        {
          id: '3',
          title: 'You must find job',
          text: 'meh...',
          completed: false,
          color: 'white',
          priority: 'standart',
        },
      ],
      sortBy: '',
      filters: {
        colorFilter: '',
        priorityFilter: '',
        titleFilter: '',
      },
    };
  },
  components: {
    Form,
    TasksList,
  },
  methods: {
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    markComplete(taskId) {
      this.tasks = this.tasks.map((task) => {
        if (task.id === taskId) return ({ ...task, completed: true });
        return task;
      });
    },
    onTask({
      taskTitle,
      taskText,
      taskColor,
      taskPriority,
      taskExpires,
    }) {
      this.tasks = this.tasks.concat({
        title: taskTitle,
        text: taskText,
        color: taskColor,
        priority: taskPriority,
        completed: false,
        expires: taskExpires || '',
        id: _.random(10 ** 10),
      });
    },
    changeFilter(value) {
      this.filters = { ...this.filters, ...value };
    },
  },
};
</script>

<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.img {
  max-width: 500px;
  margin: 0 auto;
}

.img img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
}
</style>
