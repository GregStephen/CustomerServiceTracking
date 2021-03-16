using CustomerServiceTracking.DTOS;

namespace CustomerServiceTracking.Repositories
{
    public interface IGeocodingRepository
    {
        GeocodeResponse GetResponseFromGeocode(NewPropertyModel newProperty);
    }
}
