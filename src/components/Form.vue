<template>
  <form @submit="onSubmit">
    <h3>Add task</h3>

    <label for="title-input">Enter title*:</label>
    <input
      id="title-input"
      v-model="taskTitle"
      placeholder="Task title"
    />

    <label for="text-input">Enter text:</label>
    <textarea
      id="text-input"
      v-model="taskText"
      placeholder="What you want to do?"
    ></textarea>

    <label>Select color:</label>
    <ColorPicker
      @change-color="changeColor"
      v-model="taskColor"
    />

    <Select
      :withLabel='"Select task priority:"'
      :options="priorityOptions"
      :value="priority"
      @change-select="changePriority"
    />

    <DatePicker
      :value="expires"
      :withLabel="'Task expired:'"
      @set-date="changeExpiresDate"
    />

    <p class="error-message" v-show="error">{{ error }}</p>

    <button>Add task</button>
  </form>
</template>

<script>
import ColorPicker from '@/components/ColorPicker';
import Select from '@/components/Select';
import DatePicker from '@/components/DatePicker';
import moment from 'moment';

export default {
  name: 'Form',
  data() {
    return {
      taskTitle: '',
      taskText: '',
      taskColor: 'white',
      priority: 'standart',
      expires: moment(),
      priorityOptions: [
        { value: 'standart', label: 'Standart' },
        { value: 'low', label: 'Low priority' },
        { value: 'high', label: 'Important' },
        { value: 'veryHigh', label: 'Very important' },
      ],
      error: '',
    };
  },
  components: {
    ColorPicker,
    Select,
    DatePicker,
  },
  methods: {
    changeColor(color) {
      this.taskColor = color;
    },
    changePriority(priorityValue) {
      this.priority = priorityValue;
    },
    changeExpiresDate(date) {
      this.expires = date;
    },
    onSubmit(e) {
      e.preventDefault();
      if (this.taskTitle === '') {
        this.error = 'Title must be filled';
        return;
      }

      this.$emit('on-task', {
        taskTitle: this.taskTitle,
        taskText: this.taskText,
        taskColor: this.taskColor,
        tasPriority: this.priority,
        taskExpires: this.expires,
      });
      this.error = '';
      this.taskTitle = '';
      this.taskText = '';
      this.taskColor = 'white';
      this.priority = 'standart';
      this.expires = '';
    },
  },
};
</script>

<style scoped lang="scss">
form {
  box-shadow: 0 0 14px 3px rgba(0, 0, 0, .33);
  border-radius: 4px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #152d32;
  color: #f0f0f0;
}

h3 {
  font-size: 24px;
}

label {
  display: block;
  margin-bottom: 4px;
  text-align: left;
  font-size: 12px;
}

input {
  margin-bottom: 20px;
}

textarea {
  margin-bottom: 20px;
}

button {
  width: 100%;
  border-radius: 4px;
  color: #ffffff;
  font-size: 18px;
  background-color: #82DDF0;
  border: none;
  padding: 0;
  height: 45px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.error-message {
  color: red;
}
</style>
