using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.Helpers;
using CustomerServiceTracking.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Services
{
    public class UsernameService : IUsernameService
    {
        readonly IUserRepository _userRepo;
        public UsernameService(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }
        public List<ChangeLog> ApplyUserNamesToChangeLog(List<ChangeLog> Logs)
        {
            var allIds = Logs.Select(x => x.Username).Distinct().ToList();
            var users = _userRepo.GetShallowUsers(allIds);
            foreach (var log in Logs)
            {
                log.Username = users.FirstOrDefault(x => x.Id.ToString() == log.Username).GetUserName();
            }
            return Logs;
        }
    }
}
