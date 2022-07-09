const queue = [];
const threshold = 5;
const transitions = [];
let deadline = 0;
let translate = task(false);

export const getTime = () => performance.now();
export const shouldYield = () => getTime() >= deadline;
export const startTransition = cb => transitions.push(cb) && translate();

export const schedule = callback => {
  queue.push({ callback });
  startTransition(flush);
};

function task(isPending) {
  const cb = () => transitions.shift()();
  if (!isPending && typeof Promise !== "undefined") {
    return () => queueMicrotask(cb);
  }
  if (typeof MessageChannel !== "undefined") {
    const { port1, port2 } = new MessageChannel();
    port1.onmessage = cb;
    return () => port2.postMessage(null);
  }
  return () => setTimeout(cb);
}

function flush() {
  deadline = getTime() + threshold;
  let job = queue[0];
  while (job && !shouldYield()) {
    const { callback } = job;
    job.callback = null;
    const next = callback();
    if (next) {
      job.callback = next;
    } else {
      queue.shift();
    }
    job = queue[0];
  }
  if (job) {
    translate = task(shouldYield());
    startTransition(flush);
  }
}
