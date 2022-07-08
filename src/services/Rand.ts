export interface IRand {
  int: number;
  float: number;
  range(start: number, end: number): number;
}

export class Rand {
  private m = 0x80000000;
  private a = 1103515245;
  private c = 12345;
  private state = 0;

  constructor(seed: number) {
    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
  }

  public int() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }

  public float() {
    return this.int() / (this.m - 1);
  }

  public range(start: number, end: number) {
    var rangeSize = end - start;
    var randomUnder1 = this.int() / this.m;
    return start + Math.floor(randomUnder1 * rangeSize);
  }
}
