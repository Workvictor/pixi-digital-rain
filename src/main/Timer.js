export class Timer {
  constructor({ timeout = 1000, onTick = () => false }) {
    let id = undefined;

    const repeatRun = (shouldRepeat = false) => shouldRepeat ? run() : clear(id);

    const clear = timeoutId => timeoutId instanceof Number && window.clearTimeout(timeoutId);

    const ticker = () => onTick instanceof Function && repeatRun(Boolean(onTick()));

    const run = () => {
      clear(id);
      id = setTimeout(ticker, timeout);
    };

    run();
  }
}
