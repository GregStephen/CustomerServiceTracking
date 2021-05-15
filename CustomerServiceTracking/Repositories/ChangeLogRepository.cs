using CustomerServiceTracking.DataModels;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;


namespace CustomerServiceTracking.Repositories
{
    public class ChangeLogRepository : IChangeLogRepository
    {
        string _connectionString;

        public ChangeLogRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public bool InsertChangeLog(ChangeLogType Entity, string EntityId, string Username, object Changes)
        {
            var newCL = new ChangeLog()
            {
                Entity = Entity,
                EntityId = EntityId,
                Username = Username,
                Timestamp = DateTime.UtcNow,
                Delta = JsonConvert.SerializeObject(Changes)
            };
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [ChangeLog]
                            (
                                [Entity],
                                [EntityId],
                                [Username],
                                [Timestamp],
                                [Delta]
                            )
                            VALUES
                            (
                                @Entity,
                                @EntityId,
                                @Username,
                                @Timestamp,
                                @Delta
                            )";
                return db.Execute(sql, newCL) == 1;
            }
        }

        public IEnumerable<ChangeLog> GetChangeLog(Guid entityId, ChangeLogType entityType)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [ChangeLog] 
                            WHERE [EntityId] = @entityId
                            AND [Entity] = @entityType
                            ORDER BY [Timestamp] DESC";
                var parameters = new { entityId, entityType };
                return db.Query<ChangeLog>(sql, parameters);
            }
        }
    }
}
