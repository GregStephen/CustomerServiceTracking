using CustomerServiceTracking.DataModels;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using CustomerServiceTracking.DTOS;

namespace CustomerServiceTracking.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        string _connectionString;
        private ISystemRepository _systemRepo;

        public CustomerRepository(IConfiguration configuration, ISystemRepository systemRepo)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
            _systemRepo = systemRepo;
        }

        public IEnumerable<Property> GetPropertiesByBusinessId(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Property] 
                            WHERE [BusinessId] = @businessId";
                var parameters = new { businessId };
                var properties =  db.Query<Property>(sql, parameters);
                foreach (var property in properties)
                {
                    property.Systems = _systemRepo.GetPropertySystemsByPropertyId(property.Id).ToList();
                    property.Contacts = GetPropertyContactsByPropertyId(property.Id).ToList();
                }
                return properties;
            }
        }

        public IEnumerable<Contact> GetPropertyContactsByPropertyId(Guid propertyId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Contact]
                            WHERE [PropertyId] = @propertyId
                            ORDER BY [Primary] DESC";
                var parameters = new { propertyId };
                return db.Query<Contact>(sql, parameters);
            }
        }
        public IEnumerable<Property> GetActivePropertiesByBusinessId(Guid businessId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Property]
                            WHERE [BusinessId] = @businessId AND Enabled = 1";
                var parameters = new { businessId };
                var properties = db.Query<Property>(sql, parameters);
                foreach (var property in properties)
                {
                    property.Systems = _systemRepo.GetPropertySystemsByPropertyId(property.Id).ToList();
                    property.Contacts = GetPropertyContactsByPropertyId(property.Id).ToList();
                }
                return properties;
            }
        }

        public Property GetPropertyByPropertyId(Guid propertyId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Property]
                            WHERE [Id] = @propertyId";
                var parameters = new { propertyId };
                var property = db.QueryFirstOrDefault<Property>(sql, parameters);
                property.Systems = _systemRepo.GetPropertySystemsByPropertyId(property.Id).ToList();
                property.Contacts = GetPropertyContactsByPropertyId(property.Id).ToList();
                return property;
            }
        }

        public PropertySystem GetPropertySystemByPropertySystemId(Guid propertySystemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [PropertySystem]
                            WHERE [Id] = @propertySystemId";
                var parameters = new { propertySystemId };
                var propertySystem =  db.QueryFirstOrDefault<PropertySystem>(sql, parameters);
                propertySystem.SystemInfo = _systemRepo.GetSystemInfoBySystemId(propertySystem.SystemId);
                return propertySystem;
            }
        }

        public bool AddNewPropertyToDatabase(NewPropertyDTO newPropertyDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Property]
                            (
                            [DisplayName],
                            [Enabled],
                            [City],
                            [State],
                            [AddressLine1],
                            [AddressLine2],
                            [ZipCode],
                            [Latitude],
                            [Longitude],
                            [BusinessId]
                            )
                            OUTPUT INSERTED.Id
                            VALUES
                            (
                            @displayName,
                            1,
                            @city,
                            @state,
                            @addressLine1,
                            @addressLine2,
                            @zipCode,
                            @latitude,
                            @longitude,
                            @businessId
                            )";

                // try catch and delete the property if contact fails
                var propertyId = db.QueryFirst<Guid>(sql, newPropertyDTO.Property);
                var contact = newPropertyDTO.Contact;
                contact.PropertyId = propertyId;
                return AddNewContactToDatabase(contact);
            }
        }

        public bool AddNewContactToDatabase(NewContactDTO newContactDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                if (newContactDTO.Primary)
                {
                    var currentPrimaryId = GetPrimaryContactId(newContactDTO.PropertyId);
                    if (currentPrimaryId != default)
                    {
                        RemoveContactPrimary(currentPrimaryId);
                    }
                }
                var sql = @"INSERT INTO [Contact]
                            (
                                [FirstName],
                                [LastName],
                                [Primary],
                                [Email],
                                [HomePhone],
                                [CellPhone], 
                                [WorkPhone],
                                [PropertyId]
                            )
                            VALUES
                            (
                                @firstName,
                                @lastName,
                                @primary,
                                @email,
                                @homePhone,
                                @cellPhone,
                                @workPhone,
                                @propertyId
                            )";
                return db.Execute(sql, newContactDTO) == 1;
            }
        }

        public Guid GetPrimaryContactId(Guid PropertyId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT [Id]
                            FROM [Contact]
                            WHERE [Primary] = 1 AND [PropertyId] = @PropertyId";
                var parameters = new { PropertyId };
                return db.QueryFirstOrDefault<Guid>(sql, parameters);
            }
        }

        public bool RemoveContactPrimary(Guid contactId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Contact]
                            SET [Primary] = 0
                            WHERE [Id] = @contactId";
                var parameters = new { contactId };
                return (db.Execute(sql, parameters) == 1);
            }
        }

        private DateTime GetTheDateTheTankWillBeDepleted(PropertySystem system, NewReportDTO report)
        {
            // How many inches of water are in the tank once the report is done
            int totalInchesInSystem = report.AmountRemaining + report.InchesAdded;

            // gets the exact system being checked
            BusinessSystem systemToDoMath = _systemRepo.GetSystemInfoBySystemId(system.SystemId);

            // 0.03 is the amount per oz that a single nozzle shoots out in a second at 200 psi
            var ozPerNozzlePerSprayDuration = system.SprayDuration * 0.03;

            //converts that to gallons
            var gallonsPerSprayDurationPerNozzle = ozPerNozzlePerSprayDuration / 128;

            // calculates how many gallons are used in a single day
            var dailyUsageInGallons = gallonsPerSprayDurationPerNozzle * system.SprayCycles * system.Nozzles;

            // calculates how many gallons are in a single inch of this specific tank
            var volumePerInchOfHeight = (float)systemToDoMath.Gallons / (float)systemToDoMath.Inches;

            // calculates the total amount of gallons in the tank once the report is done
            var totalGallonsInTank = totalInchesInSystem * volumePerInchOfHeight;

            // calculates the days remaining until all the gallons of water in the tank are gone, rounded down
            int daysUntilDepleted = (int)(totalGallonsInTank / dailyUsageInGallons);

            // Adds the days remaining until the tank is depleted to the day of the report, returns new Datetime
            DateTime dayUntilDepleted = report.ServiceDate.AddDays(daysUntilDepleted);
            return dayUntilDepleted;
        }

        private double GetHowManyInchesWouldBeLeft(Guid systemId, ReportToSendDTO mostRecentReport)
        {
            // gets old system data by systemId
            PropertySystem oldSystem = GetPropertySystemByPropertySystemId(systemId);
            // gets the exact system being checked
            BusinessSystem systemToDoMath = _systemRepo.GetSystemInfoBySystemId(oldSystem.SystemId);

            var totalInchesInSystem = mostRecentReport.SolutionAdded + mostRecentReport.AmountRemaining;
            // 0.03 is the amount per oz that a single nozzle shoots out in a second at 200 psi
            var ozPerNozzlePerSprayDuration = oldSystem.SprayDuration * 0.03;

            //converts that to gallons
            var gallonsPerSprayDurationPerNozzle = ozPerNozzlePerSprayDuration / 128;

            // calculates how many gallons are used in a single day
            var dailyUsageInGallons = gallonsPerSprayDurationPerNozzle * oldSystem.SprayCycles * oldSystem.Nozzles;

            // calculates how many gallons are in a single inch of this specific tank
            var volumePerInchOfHeight = (float)systemToDoMath.Gallons / (float)systemToDoMath.Inches;

            var daysElapsed = DateTime.Today - mostRecentReport.ServiceDate;

            var totalGallonsUsed = daysElapsed.Days * dailyUsageInGallons;

            var totalInchesUsed = totalGallonsUsed / volumePerInchOfHeight;
            var inchesRemaining = totalInchesInSystem - totalInchesUsed;

            return inchesRemaining;
        }

        public Guid AddNewSystemToProperty(NewPropertySystemDTO newPropertySystemDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                newPropertySystemDTO.System.DayTankDepleted = GetTheDateTheTankWillBeDepleted(newPropertySystemDTO.System, newPropertySystemDTO.Report);
                var sql = @"INSERT INTO [PropertySystem]
                            (
                            [PropertyId],
                            [Enabled],
                            [InstallDate],
                            [Notes],
                            [Nozzles],
                            [SerialNumber],
                            [Sold],
                            [SprayCycles],
                            [SprayDuration],
                            [SystemId],
                            [DayTankDepleted],
                            [DisplayName]
                            )
                            OUTPUT INSERTED.Id
                            VALUES
                            (
                            @propertyId,
                            1,
                            @installDate,
                            @notes,
                            @nozzles,
                            @serialNumber,
                            @sold,
                            @sprayCycles,
                            @sprayDuration,
                            @systemId,
                            @dayTankDepleted,
                            @displayName
                            )";
                return db.QueryFirst<Guid>(sql, newPropertySystemDTO.System);
            }
        }

        public bool UpdatePropertyAddress(Property updatedProperty)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Property]
                            SET
                            [City] = @city,
                            [State] = @state,
                            [AddressLine1] = @addressLine1,
                            [AddressLine2] = @addressLine2,
                            [ZipCode] = @zipCode,
                            [Latitude] = @latitude,
                            [Longitude] = @longitude
                            WHERE [Id] = @id";
                return (db.Execute(sql, updatedProperty) == 1);
            }
        }
        public bool UpdatePropertyName(Property updatedProperty)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Property]
                            SET [DisplayName] = @displayName
                            WHERE [Id] = @id";
                return (db.Execute(sql, updatedProperty) == 1);
            }
        }
        public bool UpdateContact(Contact updatedContact)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                if (updatedContact.Primary)
                {
                    var currentPrimaryId = GetPrimaryContactId(updatedContact.PropertyId);
                    if (currentPrimaryId != updatedContact.Id)
                    {
                        RemoveContactPrimary(currentPrimaryId);
                    }
                }
                var sql = @"UPDATE [Contact]
                            SET 
                                [FirstName] = @firstName,
                                [LastName] = @lastName,
                                [Email] = @email,
                                [HomePhone] = @homePhone,
                                [CellPhone] = @cellPhone,
                                [WorkPhone] = @workPhone,
                                [Primary] = @primary
                            WHERE [Id] = @id";
                return (db.Execute(sql, updatedContact) == 1);
            }
        }

        public async Task<bool> UpdatePropertyEnabledOrDisabled(Property updatedProperty)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var id = updatedProperty.Id;
                var enabled = !updatedProperty.Enabled;
                var sql = @"UPDATE [Property]
                            SET
                                [Enabled] = @enabled
                            WHERE [Id] = @id";
                var parameters = new { id, enabled };
                await MassUpdatePropertySystemEnabled(id, enabled);
                return (db.Execute(sql, parameters) == 1);
            }
        }

        public async Task<bool> MassUpdatePropertySystemEnabled(Guid propertyId, bool enabled)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [PropertySystem]
                            SET [Enabled] = @enabled
                            WHERE [PropertyId] = @propertyId";
                var parameters = new { propertyId, enabled };
                return await db.ExecuteAsync(sql, parameters) == 1;
            }
        }
        public bool UpdatePropertySystemEnabledOrDisabled(PropertySystem updatedPropertySystem)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var id = updatedPropertySystem.Id;
                var enabled = !updatedPropertySystem.Enabled;
                var sql = @"UPDATE [PropertySysten]
                            SET
                                [Enabled] = @enabled
                            WHERE [Id] = @id";
                var parameters = new { id, enabled };
                return (db.Execute(sql, parameters) == 1);
            }
        }

        public bool UpdatePropertySystem(PropertySystem updatedPropertySystem, ReportToSendDTO mostRecentReport)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var inchesRemaining = GetHowManyInchesWouldBeLeft(updatedPropertySystem.Id, mostRecentReport);
                var newReport = new NewReportDTO()
                {
                    InchesAdded = 0,
                    AmountRemaining = (int)inchesRemaining,
                    SolutionAdded = 0,
                    SystemId = updatedPropertySystem.Id
                };
                var dateTankWillBeDepleted = GetTheDateTheTankWillBeDepleted(updatedPropertySystem, newReport);
                updatedPropertySystem.DayTankDepleted = dateTankWillBeDepleted;
                var sql = @"UPDATE [PropertySystem]
                            SET [DisplayName] = @displayName,
                                [InstallDate] = @installDate,
                                [Nozzles] = @nozzles,
                                [SerialNumber] = @serialNumber,
                                [Sold] = @sold,
                                [SprayCycles] = @sprayCycles,
                                [SprayDuration] = @sprayDuration,
                                [SystemId] = @systemId,
                                [Notes] = @notes,
                            WHERE [Id] = @id";
                return (db.Execute(sql, updatedPropertySystem) == 1);
            }
        }

        public bool UpdatePropertySystemName(PropertySystem updatedPropertySystem)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [PropertySystem]
                            SET [DisplayName] = @displayName
                            WHERE [Id] = @id";
                return (db.Execute(sql, updatedPropertySystem) == 1);
            }
        }

        public bool DeleteContact(Guid contactId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE [Contact]
                        WHERE Id = @contactId";
                var parameters = new { contactId };
                return db.Execute(sql, parameters) == 1;
            }
        }
        public bool UpdatePropertySystemDayTankDepleted(NewReportDTO newReport)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var system = GetPropertySystemByPropertySystemId(newReport.SystemId);
                var dateTankWillBeDepleted = GetTheDateTheTankWillBeDepleted(system, newReport);
                var sql = @"UPDATE [PropertySystem]
                            SET
                                [DayTankDepleted] = @dateTankWillBeDepleted
                            WHERE [Id] = @systemId";
                var parameters = new { newReport.SystemId, dateTankWillBeDepleted };
                return (db.Execute(sql, parameters) == 1);
            }
        }

        public bool DeletePropertySystem(Guid propertySystemId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE [PropertySystem]
                            WHERE Id = @propertySystemId";
                var parameters = new { propertySystemId };
                return db.Execute(sql, parameters) == 1;
            }
        }
    }
}
