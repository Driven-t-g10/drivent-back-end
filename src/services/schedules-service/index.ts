import { Activity, Schedule } from '@prisma/client';
import { conflictError, notFoundError } from '@/errors';
import userRepository from '@/repositories/user-repository';
import scheduleRepository from '@/repositories/schedule-repository';
import activitiesRepositoy from '@/repositories/activities-repository';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import locale from 'dayjs/locale/pt-br';

dayjs.extend(isLeapYear);
dayjs.locale(locale);

async function setUserSchedule(userId: number, scheduleId: number) {
  const chosenSchedule = await scheduleRepository.getById(scheduleId);
  if (!chosenSchedule) {
    throw notFoundError();
  }

  const chosenActivity = await activityExists(scheduleId);
  const vacancy = await hasVacancy(scheduleId, chosenActivity);
  const timeConflict = await hasTimeConflict(userId, chosenSchedule);

  if (!vacancy) {
    throw conflictError('Has no vacancy');
  }

  if (timeConflict) {
    throw conflictError('Has time conflict');
  }

  return scheduleRepository.setUserSchedule(userId, scheduleId);
}

async function activityExists(scheduleId: number) {
  const activity = await activitiesRepositoy.getActivityByScheduleId(scheduleId);
  if (!activity) {
    notFoundError();
  }

  return activity;
}

async function hasVacancy(scheduleId: number, chosenActivity: Activity) {
  const scheduleUsers = await userRepository.findByScheduleId(scheduleId);

  if (scheduleUsers.length >= chosenActivity.vacancy) {
    return false;
  }

  return true;
}

async function hasTimeConflict(userId: number, chosenSchedule: Schedule) {
  const userSchedules = await scheduleRepository.getByUserId(userId);

  for (const userSchedule of userSchedules) {
    if (activityHasScheduleConflict(userSchedule, chosenSchedule)) {
      return true;
    }
  }

  return false;
}

function activityHasScheduleConflict(userSchedule: Schedule, chosenSchedule: Schedule) {
  const userScheduleInterval = getInterval(userSchedule);
  const chosenScheduleInterval = getInterval(chosenSchedule);

  const startScheduleConflict = compareIntervals(userScheduleInterval.start, chosenScheduleInterval);
  const endScheduleConflict = compareIntervals(userScheduleInterval.end, chosenScheduleInterval);

  return startScheduleConflict || endScheduleConflict;
}

function getInterval(schedule: Schedule) {
  const start = convertToMilliseconds(schedule, schedule.startTime);
  const end = convertToMilliseconds(schedule, schedule.endTime);

  return { start, end };
}

function convertToMilliseconds(schedule: Schedule, time: string) {
  const [, date] = schedule.date.split(',');
  const [day, month] = date.split('/');
  const [hour, minute] = time.split(':');

  const scheduleDate = new Date();
  scheduleDate.setMonth(parseInt(month) - 1);
  scheduleDate.setDate(parseInt(day));
  scheduleDate.setHours(parseInt(hour));
  scheduleDate.setMinutes(parseInt(minute));

  return scheduleDate.getMilliseconds();
}

function compareIntervals(userScheduleInterval: number, chosenScheduleInterval: { start: number; end: number }) {
  return userScheduleInterval >= chosenScheduleInterval.start && userScheduleInterval <= chosenScheduleInterval.end;
}

const schedulesService = { setUserSchedule };

export default schedulesService;
