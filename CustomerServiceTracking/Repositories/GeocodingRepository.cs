using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CustomerServiceTracking.DTOS;
using Microsoft.Extensions.Configuration;
using RestSharp;
using RestSharp.Authenticators;

namespace CustomerServiceTracking.Repositories
{
    public class GeocodingRepository : IGeocodingRepository
    {
        string _baseUrl;
        readonly IRestClient _client;
        string _key;
        public GeocodingRepository(IConfiguration configuration)
        {
            _baseUrl = configuration.GetValue<string>("GeocodingConnectionString");
            _key = configuration.GetValue<string>("Key");
            _client = new RestClient(_baseUrl);
        }

        public GeocodeResponse GetResponseFromGeocode(NewPropertyModel newProperty)
        {
            var request = new RestRequest();
            if (!string.IsNullOrWhiteSpace(newProperty.AddressLine1))
            {
                request.AddParameter("street", newProperty.AddressLine1, ParameterType.QueryString);
            }
            if (!string.IsNullOrWhiteSpace(newProperty.City))
            {
                request.AddParameter("city", newProperty.City, ParameterType.QueryString);
            }
            if (!string.IsNullOrWhiteSpace(newProperty.State))
            {
                request.AddParameter("state", newProperty.State, ParameterType.QueryString);
            }
            if (!string.IsNullOrWhiteSpace(newProperty.ZipCode))
            {
                request.AddParameter("postal_code", newProperty.ZipCode, ParameterType.QueryString);
            }
            request.AddParameter("api_key", _key);
            var response = _client.Get<GeocodeResponse>(request);
            return response.Data;
        }
    }
}
