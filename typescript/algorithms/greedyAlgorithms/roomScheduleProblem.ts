const roomScheduleOptions = [
  {lesson: 'art', start: '9:00 AM', end: '10:00 AM'},
  {lesson: 'english', start: '9:30 AM', end: '10:30 AM'},
  {lesson: 'math', start: '10:00 AM', end: '11:00 AM'},
  {lesson: 'computer science', start: '10:30 AM', end: '11:30 AM'},
  {lesson: 'music', start: '11:00 AM', end: '12:00 PM'},
]

const parseTimeToNumber = (time: string) => {
  const [timePart, modifier] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }
  return (hours * 60) + minutes;
}

export const getOptimalRoomSchedule = (sortedLessons: {lesson: string, start: string, end: string}[]) => {
  const optimalSchedule: {lesson: string, start: string, end: string}[] = [];

  let lastEndTime = 0;

  for(let i = 0; i < sortedLessons.length; i++) {
    const lesson = sortedLessons[i];
    const lessonStartTime = parseTimeToNumber(lesson.start);
    const lessonEndTime = parseTimeToNumber(lesson.end);

    if(optimalSchedule.length === 1) {
      if(lessonEndTime <= lastEndTime) {
        optimalSchedule[0] = lesson;
        lastEndTime = lessonEndTime;
        continue;
      }
    }

    if(lessonStartTime >= lastEndTime) {
      optimalSchedule.push(lesson);
      lastEndTime = lessonEndTime;
    }
  }

  return optimalSchedule;
}


// console.log(getOptimalRoomSchedule(roomScheduleOptions));