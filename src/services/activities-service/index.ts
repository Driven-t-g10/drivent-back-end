import activitiesRepositoy from '@/repositories/activities-repository';

async function getDates() {
  return activitiesRepositoy.getDates();
}

async function getPlaces() {
  return activitiesRepositoy.getPlaces();
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

async function getScheduleUsers(scheduleId: number) {
  const result = await activitiesRepositoy.getScheduleUsers(scheduleId);
  if (result === null) {
    return [];
  }
  return result.UserActivity;
}

const activitiesService = { getDates, getPlaces, getActivitiesByPlaceAndDate, getScheduleUsers };
export default activitiesService;
