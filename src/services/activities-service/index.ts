import activitiesRepositoy from '@/repositories/activities-repository';

async function getDates() {
  return activitiesRepositoy.getDates();
}

async function getPlaces() {
  return activitiesRepositoy.getPlaces();
}

const activitiesService = { getDates, getPlaces };
export default activitiesService;
