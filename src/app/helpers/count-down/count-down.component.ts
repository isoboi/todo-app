import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
@Component({
  selector: 'app-count-down',
  standalone: true,
  imports: [],
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.scss'
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input() targetDate: Date
  public timeLeft: string;
  public isRed = false;
  private intervalId: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startCountdown(): void {
    this.updateTimeLeft();
    this.intervalId = setInterval(() => this.updateTimeLeft(), 1000);
  }

  private updateTimeLeft(): void {
    const now = moment();
    const targetDate = moment(this.targetDate)
    const duration = moment.duration(targetDate.diff(now));

    if (duration.asSeconds() <= 0) {
      this.timeLeft = 'Countdown Finished';
      this.isRed = false;
      clearInterval(this.intervalId);
    } else {
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      this.timeLeft = [
        days ? `${days}d` : '',
        hours ? `${hours}h` : '',
        minutes ? `${minutes}m` : '',
        seconds ? `${seconds}s` : ''
      ].filter(Boolean).join(' ');

      if (days === 0 && hours === 0) {
        this.isRed = true;
      }
    }
  }
}
