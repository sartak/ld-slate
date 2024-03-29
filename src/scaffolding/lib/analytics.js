import {name as project} from '../../../package.json';

const debug = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export function devAnalytics(event, value) {
  const options = {event_category: project};

  if (value !== undefined) {
    options.value = value;
  }

  try {
    window.gtag(
      'event',
      event,
      options,
    );
  } catch (e) {
    // don't worry about it
  }
}

export default function analytics(...args) {
  if (debug) {
    return;
  }

  return devAnalytics(...args);
}
