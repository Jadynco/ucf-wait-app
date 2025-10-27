export function isRestaurantOpen(hours, daysOpen){
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour*60 + currentMinute;
  if(daysOpen){
    if(daysOpen === 'Mon-Fri' && (currentDay === 0 || currentDay === 6)) return false;
  }
  if(!hours || hours.toLowerCase().includes('closed')) return false;
  const match = hours.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/);
  if(!match) return true;
  const [, sh, sm, sp, eh, em, ep] = match;
  let open = parseInt(sh)*60 + parseInt(sm);
  let close = parseInt(eh)*60 + parseInt(em);
  if(sp === 'PM' && parseInt(sh)!==12) open += 12*60;
  if(sp === 'AM' && parseInt(sh)===12) open = parseInt(sm);
  if(ep === 'PM' && parseInt(eh)!==12) close += 12*60;
  if(ep === 'AM' && parseInt(eh)===12) close = parseInt(em);
  if(close < open) return currentTime >= open || currentTime < close;
  return currentTime >= open && currentTime < close;
}