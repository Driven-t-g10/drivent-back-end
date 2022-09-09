import { notFoundError } from '@/errors';
import activitiesRepositoy from '@/repositories/activities-repository';
import { Activity, Schedule } from '@prisma/client';
import dayjs from 'dayjs';

async function getDates() {
  return activitiesRepositoy.getDates();
}

async function getPlaces() {
  return activitiesRepositoy.getPlaces();
}

async function setUserActivity(userId: number, activityId: number) {
  activityExists(activityId);
  const vacancy = await hasVacancy(activityId);
  const timeConflict = await hasTimeConflict(userId, activityId);

  if (!vacancy || timeConflict) {
    throw new Error('No vacancy or time conflict');
  }

  return activitiesRepositoy.setUserActivity(userId, activityId);
}

async function getActivitiesByPlaceAndDate(place: string, date: string) {
  const result = await activitiesRepositoy.getActivitiesByPlaceAndDate(place, date);
  const activities = result.map((activity) => {
    if (activity.Schedule.length > 0) {
      return activity;
    }
  });
  return activities;
}

async function activityExists(activityId: number) {
  const activity = await activitiesRepositoy.getActivityById(activityId);
  if (!activity) {
    notFoundError();
  }
}

async function hasVacancy(activityId: number) {
  const chosenActivity = await activitiesRepositoy.getActivityById(activityId);
  const usersActivities = await activitiesRepositoy.getUsersActivitiesByActivityId(activityId);

  if (usersActivities.length >= chosenActivity.vacancy) {
    return false;
  }

  return true;
}

async function hasTimeConflict(userId: number, activityId: number) {
  const chosenActivitySchedule = await activitiesRepositoy.getScheduleByActivityId(activityId);
  const userActivities = await activitiesRepositoy.getActivitiesByUserId(userId);

  for (const userActivity of userActivities) {
    const userActivitySchedule = await activitiesRepositoy.getScheduleByActivityId(userActivity.id);

    if (activityHasScheduleConflict(userActivitySchedule, chosenActivitySchedule)) {
      return true;
    }
  }
  return false;
}

async function activityHasScheduleConflict(userActivitySchedule: Schedule, chosenActivitySchedule: Schedule) {
  const userActivityInterval = getInterval(userActivitySchedule);
  const chosenActivityInterval = getInterval(chosenActivitySchedule);

  const startScheduleConflict = compareIntervals(userActivityInterval.start, chosenActivityInterval);
  const endScheduleConflict = compareIntervals(userActivityInterval.end, chosenActivityInterval);

  return startScheduleConflict || endScheduleConflict;
}

function getInterval(schedule: Schedule) {
  const date = dayjs(schedule.date);
  const start = date.millisecond();
  const end = date.millisecond() + parseInt(schedule.time) * 60 * 1000;
  return { start, end };
}

function compareIntervals(userActivityInterval: number, chosenActivityInterval: { start: number; end: number }) {
  return userActivityInterval >= chosenActivityInterval.start && userActivityInterval <= chosenActivityInterval.end;
}

const activitiesService = { getDates, getPlaces, getActivitiesByPlaceAndDate };
export default activitiesService;
