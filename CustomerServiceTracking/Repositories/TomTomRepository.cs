using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public class TomTomRepository
    {
        string _baseUrl;
        string _key;

        public TomTomRepository(IConfiguration configuration)
        {
            _baseUrl = configuration.GetValue<string>("TomTomConnectionString");
            _key = configuration.GetValue<string>("Key");
        }

    }

}
