class Timer {
  constructor() {
    this.startBtn = null;
    this.stopBtn = null;
    this.resetBtn = null;
    this.editBtn = null;
    this.isEdit = true;
    this.confirmBtn = null;
    this.alarmBtn = null;
    this.hours = null;
    this.minutes = null;
    this.seconds = null;
    this.inputs = null;
    this.newHours = 0;
    this.newMinutes = 0;
    this.newSeconds = 0;
    this.indexInterval = null;
    this.audio = null;
    this.UiSelectors = {
      hours: '[data-hours]',
      minutes: '[data-minutes]',
      seconds: '[data-seconds]',
      inputs: '[data-inputs]',
      start: '[data-start-btn]',
      stop: '[data-stop-btn]',
      edit: '[data-edit-btn]',
      confirm: '[data-confirm-btn]',
      reset: '[data-reset-btn]',
      alarm: '[data-alarm]',
      audio: '[data-audio]'
    }
  }
  initialize() {
    this.seconds = document.querySelector(this.UiSelectors.seconds)
    this.hours = document.querySelector(this.UiSelectors.hours)
    this.minutes = document.querySelector(this.UiSelectors.minutes)
    this.seconds.value = 0;
    this.hours.value = 0;
    this.minutes.value = 0;
    this.startBtn = document.querySelector(this.UiSelectors.start);
    this.resetBtn = document.querySelector(this.UiSelectors.reset)
    this.stopBtn = document.querySelector(this.UiSelectors.stop)
    this.editBtn = document.querySelector(this.UiSelectors.edit)
    this.confirmBtn = document.querySelector(this.UiSelectors.confirm)
    this.inputs = document.querySelectorAll(this.UiSelectors.inputs)
    this.alarmBtn = document.querySelector(this.UiSelectors.alarm)
    this.audio = document.querySelector(this.UiSelectors.audio)
    this.eventListeners();
  }
  eventListeners() {
    this.editBtn.addEventListener('click', (e) => {
      this.isEdit = true;
      this.startBtn.setAttribute('disabled', true)
      const btn1 = e.target.parentNode;
      this.stopTimer();
      this.stopBtn.classList.add('hide')
      this.startBtn.classList.remove('hide')
      this.showButton(btn1, this.confirmBtn)
      this.inputs.forEach(input => input.removeAttribute('disabled'))
    })
    this.confirmBtn.addEventListener('click', (e) => {
      this.isEdit = false;
      this.startBtn.removeAttribute('disabled')
      const btn1 = e.target.parentNode;
      this.showButton(btn1, this.editBtn)
      this.inputs.forEach(input => {
        input.setAttribute('disabled', true)
        this.setTimer(input);
      })
    })
    this.startBtn.addEventListener('click', (e) => {
      if (!this.isEdit) {
        const btn1 = e.target.parentNode;
        if (this.hours.value > 0 || this.minutes.value > 0 || this.seconds.value > 0) {
          this.startTimer()
          this.showButton(btn1, this.stopBtn);
        } else alert('Set your Time.')
      }
    })
    this.stopBtn.addEventListener('click', (e) => {
      const btn1 = e.target.parentNode;
      this.stopTimer();
      this.showButton(btn1, this.startBtn)
    })
    this.resetBtn.addEventListener('click', () => this.resetTimer())
    this.alarmBtn.addEventListener('click', () => {
      this.audio.pause()
      this.alarmBtn.classList.add('hide')
    })
  }
  setTimer(input) {
    if (document.querySelector('[data-hours]') === input) {
      this.hours.value = input.value;
    } else if (document.querySelector('[data-minute]') === input) {
      this.minutes.value = input.value;
    } else if (document.querySelector('[data-seconds]') === input) {
      this.seconds.value = input.value;
    }
  }
  showButton(btn1, btn2) {
    btn1.classList.toggle('hide');
    btn2.classList.toggle('hide');
  }
  startTimer() {
    this.indexInterval = setInterval(() => this.startCounter(), 1000);
  }
  stopTimer() {
    clearInterval(this.indexInterval);
  }
  resetTimer() {
    clearInterval(this.indexInterval)
    this.indexInterval = null;
    this.seconds.value = 0;
    this.minutes.value = 0;
    this.hours.value = 0;
    this.startBtn.classList.remove('hide');
    this.stopBtn.classList.add('hide');
  }
  startCounter() {
    if (this.seconds.value <= "0" && this.minutes.value > "0" && this.hours.value === '0') {
      this.seconds.value = "60";
      this.minutes.value--;
    } else if (this.minutes.value <= "0" && this.hours.value > "0") {
      this.minutes.value = "59";
      this.seconds.value = '60';
      this.hours.value--;
    }
    if (this.hours.value === "0" && this.minutes.value === '0' && this.seconds.value === '1') {
      clearInterval(this.indexInterval)
      this.showButton(this.startBtn, this.stopBtn)
      this.alarmBtn.classList.remove('hide')
      this.audio.play()
    }
    this.seconds.value--
  }
}