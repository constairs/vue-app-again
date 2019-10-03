<template>
  <li class="task" :class="[
    task.color,
    expired ? 'expired' : '',
    task.completed ? 'completed' : ''
  ]">
    <div v-if="task.completed" class="checkmark"></div>
    <button
      type="button"
      class="del-btn"
      @click="$emit('on-delete')"
    >
      &times;
    </button>
    <h4>{{ task.title }}</h4>
    <p>{{ task.text }}</p>
    <button
      v-if="!task.completed && !expired"
      class="mark-complete-btn"
      type="button"
      @click="$emit('mark-complete')"
    >
      Complete task
    </button>
  </li>
</template>

<script>
import moment from 'moment';

export default {
  name: 'TaskItem',
  props: ['task'],
  computed: {
    expired() {
      return moment().isAfter(this.task.expires, 'date');
    },
  },
};
</script>

<style scoped lang="scss">
.task {
  padding: 6px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, .33);
  background-color: #fff;
  color: #000000;

  h4 {
    margin: 5px 0;
  }

  p {
    margin: 10px 0;
  }

  &.yellow {
    background: yellow;
  }

  &.cyan {
    background: cyan;
  }

  &.purple {
    background: purple;
    color: #fff;
  }

  &.orange {
    background: orange;
  }

   &.completed {
    background: #02c03c;
    color: #ffffff;
  }

  &.expired {
    background: red;
    color: #ffffff;
  }

  &:hover {
    .del-btn {
      visibility: visible;
      opacity: 1;
    }

    .mark-complete-btn {
      visibility: visible;
      opacity: 1;
    }
  }

  @media screen and (max-width: 992px) {
    .del-btn {
      visibility: visible!important;
      opacity: 1!important;
    }
  }
}

.del-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 100%;
  background-color: red;
  border: 1px solid #ffffff;
  color: #ffffff;
  visibility: hidden;
  opacity: 0;
  transition: all .15s;
  cursor: pointer;
  outline: none;
}

.mark-complete-btn {
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  background-color: #02c03c;
  color: #ffffff;
}

.checkmark {
  position: absolute;
  top: 6px;
  left: 10px;
  width: 14px;
  height: 14px;
  background: url('../assets/checkmark.svg');
}
</style>
