import activitiesRepositoy from '@/repositories/activities-repository';

async function getDates() {
  const dates = await activitiesRepositoy.getDates();
  let datesArr = dates.map((date) => date.date);
  datesArr = datesArr.filter((i, pos) => datesArr.indexOf(i) === pos);
  const result = datesArr.map((date) => {
    return { date };
  });
  return result;
}

async function getPlaces() {
  const places = await activitiesRepositoy.getPlaces();
  let placesArr = places.map((place) => place.place);
  placesArr = placesArr.filter((i, pos) => placesArr.indexOf(i) === pos);
  const result = placesArr.map((place) => {
    return { place };
  });
  return result;
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
