import { useMemo } from 'react';
import { useRouteMatch } from 'react-router';

export default function useHeaders() {
  const routeMatch = useRouteMatch([
    '/property/:propertyId',
    '/property/:propertyId/system/:systemId'

  ]);
  const headers = useMemo(() => {
    const headers = {};
    if (routeMatch?.params?.propertyId) {
      headers.Property = routeMatch.params.propertyId;
    }
    if (routeMatch?.params?.systemId) {
      headers.System = routeMatch.params.systemId;
    }
    return headers;
  }, [routeMatch])

  return headers;
}