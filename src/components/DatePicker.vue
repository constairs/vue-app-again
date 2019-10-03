<script>
import _ from 'lodash';
import moment from 'moment';
import ArrowButton from '@/components/ArrowButton';

export default {
  name: 'DatePicker',
  data() {
    return {
      currentMonthMoment: moment(),
      active: false,
    };
  },
  props: ['withLabel', 'value'],
  computed: {
    selected() {
      return this.value ? moment(this.value).format('DD.MM.YYYY') : moment().format('DD.MM.YYYY');
    },
    weeks() {
      return _.range(-1, 5);
    },
    dates() {
      return _.range(-1, 5).map(weekIndex => _.range(1, 8).map((dayOfWeek) => {
        const date = moment().date(1).add(7 * weekIndex, 'days').day(dayOfWeek);
        return date;
      }));
    },
    daysLabels() {
      return (['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    },
  },
  methods: {
    changeActiveState(e) {
      e.stopPropagation();
      this.active = !this.active;
    },
    changeActiveDate(date) {
      this.currentMonthMoment = date;
      this.$emit('set-date', date);
    },
    setCurrentMonth(adding) {
      this.currentMonthMoment = moment(this.currentMonthMoment).add(adding, 'month');
    },
  },
  components: {
    ArrowButton,
  },
  render() {
    return (
      <div class={`picker-wrap ${this.withLabel ? 'withLabel' : ''}`}>
        {this.withLabel && <label onClick={this.changeActiveState}>{ this.withLabel }</label>}
        <div
          class="select-value"
          onClick={this.changeActiveState}
        >
          { this.selected }
        </div>
        <div
          class={`picker-overlay ${this.active ? 'display' : ''}`}
          onClick={this.changeActiveState}
        />
        <div class={`picker  ${this.active ? 'display' : ''}`}>
          <div class="picker-month">
            <ArrowButton
              arrColor="#ffffff"
              onClick={() => this.setCurrentMonth(-1)}
              size="18px"
            />
            { this.currentMonthMoment.format('MMMM YYYY') }
            <ArrowButton
              right
              arrColor="#ffffff" onClick={() => this.setCurrentMonth(1)}
              size="18px"
            />
          </div>
          <ul class="days">
            {this.daysLabels.map(day => (
              <li key={day}>
                {day}
              </li>
            ))}
          </ul>
          <div class="dates-list">
            {_.range(-1, 5).map(weekIndex => (
              <div class="dates-row" key={weekIndex}>
                {_.range(1, 8).map((dayOfWeek) => {
                  const date = moment(this.currentMonthMoment)
                    .date(1)
                    .add(7 * weekIndex, 'days')
                    .day(dayOfWeek);
                  const isCurrentMonth = date.month() - this.currentMonthMoment.month() === 0;

                  return (
                    <div
                      class={`date-item ${moment(date).isSame(this.value, 'date') ? 'active' : ''}`}
                      key={dayOfWeek}
                      style={isCurrentMonth ? {} : { opacity: 0.4 }}
                      onClick={() => this.changeActiveDate(date)}
                    >
                      {date.date()}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
</script>

<style scoped lang="scss">
.picker{
  position: absolute;
  top: 45px;
  margin-top: 4px;
  background-color: lighten(#001f24, 12%);
  border: 1px solid #82DDF0;
  color: #ffffff;
  width: 100%;
  max-width: 250px;
  max-height: 250px;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 40px;
  display: none;
  z-index: 2;

  &.display {
    display: block;
  }

  &-wrap {
    position: relative;
    margin-bottom: 20px;

    &.withLabel .picker {
      top: 62px;
    }
  }

  &-overlay {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    z-index: 1;

    &.display {
      display: block;
    }
  }

  &-month {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &-items {
    padding-left: 0;
    margin: 0;
    list-style-type: none;
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
  background-color: #001f24;
  color: #fff;
}

.days {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #82DDF0;
  padding-bottom: 5px;
  margin-bottom: 6px;

  li {
    font-size: 14px;
  }
}

.dates-list {
  display: grid;
  grid-template-columns: repeat(1fr, 7);
  grid-template-rows: repeat(1fr, 4);
  grid-gap: 6px;
}

.dates-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-item {
  text-align: center;
  cursor: pointer;
  width: 24px;
  height: 24px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background-color: #82DDF0;
    color: #ffffff;
    font-weight: bold;
    border-radius: 100%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
  }
}
</style>
