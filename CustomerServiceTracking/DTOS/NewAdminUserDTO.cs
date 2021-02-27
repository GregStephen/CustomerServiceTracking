namespace CustomerServiceTracking.DTOS
{
    public class NewAdminUserDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FirebaseUid { get; set; }
        public bool Admin { get; set; }
    }
}
