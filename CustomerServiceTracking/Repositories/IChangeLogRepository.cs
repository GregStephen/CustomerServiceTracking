using CustomerServiceTracking.DataModels;
using System;
using System.Collections.Generic;

namespace CustomerServiceTracking.Repositories
{
    public interface IChangeLogRepository
    {
        bool InsertChangeLog(ChangeLogType Entity, string EntityId, string Username, object Changes);
        IEnumerable<ChangeLog> GetChangeLog(Guid entityId, ChangeLogType entityType);
    }
}
