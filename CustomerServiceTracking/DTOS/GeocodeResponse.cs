using System.Collections.Generic;

namespace CustomerServiceTracking.DTOS
{
    public class GeocodeResponse
    {
        public Input input { get; set; }
        public List<Result> results { get; set; }
    }
    public class AddressComponents
    {
        public string number { get; set; }
        public string predirectional { get; set; }
        public string street { get; set; }
        public string suffix { get; set; }
        public string formatted_street { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public string country { get; set; }
        public string county { get; set; }
    }

    public class Input
    {
        public AddressComponents address_components { get; set; }
        public string formatted_address { get; set; }
    }

    public class Location
    {
        public double lat { get; set; }
        public double lng { get; set; }
    }

    public class Result
    {
        public AddressComponents address_components { get; set; }
        public string formatted_address { get; set; }
        public Location location { get; set; }
        public int accuracy { get; set; }
        public string accuracy_type { get; set; }
        public string source { get; set; }
    }
}
