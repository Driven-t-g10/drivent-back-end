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

const activitiesService = { getDates, getPlaces, getActivitiesByPlaceAndDate };
export default activitiesService;
