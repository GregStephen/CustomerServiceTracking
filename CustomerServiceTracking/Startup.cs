using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using CustomerServiceTracking.Repositories;
using CustomerServiceTracking.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace CustomerServiceTracking
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            var authSettings = Configuration.GetSection("AuthenticationSettings");
            var connectionString = Configuration.GetValue<string>("ConnectionString");

            services.AddControllers();

            services.AddScoped<IBusinessRepository, BusinessRepository>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<IJobRepository, JobRepository>();
            services.AddScoped<IJobTypesRepository, JobTypesRepository>();
            services.AddScoped<IReportRepository, ReportRepository>();
            services.AddScoped<ISystemRepository, SystemRepository>();
            services.AddScoped<IUnregisteredEmployeeRepository, UnregisteredEmployeeRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IGeocodingRepository, GeocodingRepository>();
            services.AddScoped<IChangeLogRepository, ChangeLogRepository>();
            services.AddScoped<IUsernameService, UsernameService>();
            services.AddHttpContextAccessor();
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                // These three subnets encapsulate the applicable Azure subnets. At the moment, it's not possible to narrow it down further.
                options.KnownNetworks.Add(new IPNetwork(IPAddress.Parse("::ffff:10.0.0.0"), 104));
                options.KnownNetworks.Add(new IPNetwork(IPAddress.Parse("::ffff:192.168.0.0"), 112));
                options.KnownNetworks.Add(new IPNetwork(IPAddress.Parse("::ffff:172.16.0.0"), 108));
            });

            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                   .AddJwtBearer(options =>
                   {
                       options.IncludeErrorDetails = true;
                       options.Authority = authSettings["Authority"];
                       options.TokenValidationParameters = new TokenValidationParameters
                       {
                           ValidateIssuer = true,
                           ValidIssuer = authSettings["Issuer"],
                           ValidateAudience = true,
                           ValidAudience = authSettings["Audience"],
                           ValidateLifetime = true
                       };
                   });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseForwardedHeaders();

            app.UseCors("MyPolicy");

            app.UseAuthentication();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
