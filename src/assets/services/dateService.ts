export function toISOString(date:Date) {
    return date.toISOString();
}
  
  export function getStringLocalDateTime(offsetInDays: number = 0) {
    const MIN_TO_MS = 60 * 1_000;
    const DAY_TO_MS = 24 * 60 * 60 * 1_000;
    let tzoffset = new Date().getTimezoneOffset(); //offset in milliseconds
    let localISOTime = new Date(
      Date.now() + offsetInDays * DAY_TO_MS - tzoffset * MIN_TO_MS
    )
      .toISOString()
      .slice(0, 16);
    // alert(localISOTime)
    return localISOTime;
  }