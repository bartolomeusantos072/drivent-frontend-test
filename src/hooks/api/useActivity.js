import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export function useActivityLocation() {
  const token = useToken();
  
  const {
    data: activityLocation,
    loading: activityLocationLoading,
    error: activityLocationError,
    act: getActivityLocation
  } = useAsync(() => activityApi.getActivitiesLocations(token));

  return {
    activityLocation,
    activityLocationLoading,
    activityLocationError,
    getActivityLocation
  };
};

export function useActivity() {
  const token = useToken();
  
  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
    act: getActivity
  } = useAsync(() => activityApi.getActivities(token));

  return {
    activity,
    activityLoading,
    activityError,
    getActivity
  };
};
