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
                            WHERE [PropertyId] = @propertyId";
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
                return db.Execute(sql, newPropertyDTO) == 1;
            }
        }

        public bool AddNewContactToDatabase(NewContactDTO newContactDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Property]
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
        public Guid AddNewSystemToProperty(NewPropertySystemDTO newPropertySystemDTO)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [PropertySystem]
                            (
                            [PropertyId],
                            [Enable],
                            [InstallDate],
                            [Notes],
                            [Nozzles],
                            [SerialNumber],
                            [Sold],
                            [SprayCycles],
                            [SprayDuration],
                            [SystemId],
                            [DayTankDepleted]
                            )
                            OUTPUT INSERTED.Id
                            VALUES
                            (
                            @customerId,
                            1,
                            @installDate,
                            @notes,
                            @nozzles,
                            @serialNumber,
                            @sold,
                            @sprayCycles,
                            @sprayDuration,
                            @systemId,
                            @dayTankDepleted
                            )";
                return db.QueryFirst<Guid>(sql, newPropertySystemDTO);
            }
        }

        public bool UpdateProperty(Property updatedProperty)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Property]
                            [DisplayName] = @displayName,
                            [City] = @city,
                            [State] = @state,
                            [AddressLine1] = @addressLine1,
                            [AddressLine2] = @addressLine2,
                            [ZipCode] = @zipCode,
                            [Latitude] = @latitude,
                            [Longitude] = @longitude,
                            WHERE [Id] = @id";
                return (db.Execute(sql, updatedProperty) == 1);
            }
        }
        public bool UpdateContact(Contact updatedContact)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Contact]
                            SET 
                                [FirstName] = @firstName,
                                [LastName] = @lastName,
                                [Email] = @email,
                                [HomePhone] = @homePhone,
                                [CellPhone] = @cellPhone,
                                [WorkPhone] = @workPhone
                            WHERE [Id] = @id";
                return (db.Execute(sql, updatedContact) == 1);
            }
        }

        public bool UpdatePropertyEnabledOrDisabled(Property updatedProperty)
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
                return (db.Execute(sql, parameters) == 1);
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

        public bool UpdatePropertySystem(PropertySystem updatedPropertySystem)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [PropertySystem]
                            SET 
                                [InstallDate] = @installDate,
                                [Nozzles] = @nozzles,
                                [SerialNumber] = @serialNumber,
                                [Sold] = @sold,
                                [SprayCycles] = @sprayCycles,
                                [SprayDuration] = @sprayDuration,
                                [SystemId] = @systemId,
                                [Notes] = @notes,
                                [DayTankDepleted] = @dayTankDepleted
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
        public bool UpdatePropertySystemDayTankDepleted(Guid systemId, DateTime dateTankWillBeEmptied)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [PropertySystem]
                            SET
                                [DayTankDepleted] = @dateTankWillBeEmptied
                            WHERE [Id] = @systemId";
                var parameters = new { systemId, dateTankWillBeEmptied };
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
