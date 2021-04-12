using CustomerServiceTracking.DataModels;
using CustomerServiceTracking.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerServiceTracking.Repositories
{
    public interface ICustomerRepository
    {
        IEnumerable<Property> GetPropertiesByBusinessId(Guid businessId);

        IEnumerable<Contact> GetPropertyContactsByPropertyId(Guid propertyId);

        IEnumerable<Property> GetActivePropertiesByBusinessId(Guid businessId);

        Property GetPropertyByPropertyId(Guid propertyId);

        PropertySystem GetPropertySystemByPropertySystemId(Guid propertySystemId);

        bool AddNewPropertyToDatabase(NewPropertyDTO newPropertyDTO);

        bool AddNewContactToDatabase(NewContactDTO newContactDTO);

        Guid AddNewSystemToProperty(NewPropertySystemDTO newPropertySystemDTO);

        bool UpdatePropertyAddress(Property updatedProperty);

        bool UpdatePropertyName(Property updatedProperty);

        bool UpdatePropertySystemName(PropertySystem updatedPropertySystem);

        bool UpdateContact(Contact updatedContact);

        Task<bool> UpdatePropertyEnabledOrDisabled(Property updatedProperty);

        bool UpdatePropertySystemEnabledOrDisabled(PropertySystem updatedPropertySystem);

        bool UpdatePropertySystem(PropertySystem updatedPropertySystem, ReportToSendDTO mostRecentReport);

        bool UpdatePropertySystemDayTankDepleted(NewReportDTO newReport);

        bool DeleteContact(Guid contactId);

        bool DeletePropertySystem(Guid propertySystemId);
    }
}
