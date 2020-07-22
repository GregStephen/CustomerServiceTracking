--CREATE DATABASE [CustomerServiceTracking]

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'User')
	BEGIN
	CREATE TABLE [User]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Admin] BIT not null,
		[FirebaseUid] NVARCHAR (255) not null,
		[FirstName] NVARCHAR(255) not null,
		[LastName] NVARCHAR(255) not null
	)
	END
ELSE
	PRINT 'User table already exists'
	

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'UserBusiness')
	BEGIN
	CREATE TABLE [UserBusiness]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[BusinessId] UNIQUEIDENTIFIER not null,
		[UserId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'UserBusiness table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Business')
	BEGIN
	CREATE TABLE [Business]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[AddressId] UNIQUEIDENTIFIER not null,
		[BusinessName] NVARCHAR(255) not null
	)
	END
ELSE
	PRINT 'Business table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Report')
	BEGIN
	CREATE TABLE [Report]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[AmountRemaining] INT not null,
		[CustomerId] UNIQUEIDENTIFIER not null,
		[InchesAdded] INT not null,
		[JobTypeId] UNIQUEIDENTIFIER not null,
		[Notes] NVARCHAR(255) not null,
		[ServiceDate] DATETIME not null,
		[SolutionAdded] INT not null,
		[SystemId] UNIQUEIDENTIFIER not null,
		[TechnicianId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'Report table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'CustomerSystem')
	BEGIN
	CREATE TABLE [CustomerSystem]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[CustomerId] UNIQUEIDENTIFIER not null,
		[InstallDate] DATETIME not null,
		[Notes] NVARCHAR(255) null,
		[Nozzles] INT not null,	
		[SerialNumber] NVARCHAR(255) not null,
		[Sold] BIT not null,
		[SprayCycles] INT not null,
		[SprayDuration] INT not null,
		[SystemId] UNIQUEIDENTIFIER not null,
	)
	END
ELSE
	PRINT 'CustomerSystem table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Customer')
	BEGIN
	CREATE TABLE [Customer]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[FirstName] NVARCHAR(255) not null,
		[HomePhone] NVARCHAR(10) null,
		[LastName] NVARCHAR(255) not null,
		[OfficePhone] NVARCHAR(10) null,
		[AddressId] UNIQUEIDENTIFIER not null,
	)
	END
ELSE
	PRINT 'Customer table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Address')
	BEGIN
	CREATE TABLE [Address]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[City] NVARCHAR(255) not null,
		[State] NVARCHAR(10) not null,
		[AddressLine1] NVARCHAR(255) not null,
		[AddressLine2] NVARCHAR(255) null,
		[ZipCode] NVARCHAR(255) not null,
	)
	END
ELSE
	PRINT 'Address table already exists'


IF not exists (SELECT * FROM sys.tables WHERE [name] = 'WidgetParent')
	BEGIN
	CREATE TABLE [WidgetParent]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Type] NVARCHAR(255) not null,
		[BusinessId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'WidgetParent table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'WidgetChild')
	BEGIN
	CREATE TABLE [WidgetChild]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Name] NVARCHAR(255) not null,
		[WidgetParentId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'WidgetChild table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'CustomerSystemWidget')
	BEGIN
	CREATE TABLE [CustomerSystemWidget]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[CustomerSystemId] UNIQUEIDENTIFIER not null,
		[WidgetChildId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'CustomerSystemWidget table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'System')
	BEGIN
	CREATE TABLE [System]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Gallons] INT not null,
		[Inches] INT not null,
		[Type] NVARCHAR(255) not null,
	)
	END
ELSE
	PRINT 'System table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Job')
	BEGIN
	CREATE TABLE [Job]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[CustomerId] UNIQUEIDENTIFIER not null,
		[DateAssigned] DATETIME not null,
		[TechnicianId] UNIQUEIDENTIFIER not null,
		[JobTypeId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'Job table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'JobType')
	BEGIN
	CREATE TABLE [JobType]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Type] NVARCHAR(255) not null
	)
	END
ELSE
	PRINT 'JobType table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'BusinessCustomer')
	BEGIN
	CREATE TABLE [BusinessCustomer]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[BusinessId] UNIQUEIDENTIFIER not null,
		[CustomerId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'Business Customer table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'BusinessSystem')
	BEGIN
	CREATE TABLE [BusinessSystem]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[BusinessId] UNIQUEIDENTIFIER not null,
		[SystemId] UNIQUEIDENTIFIER not null,
	)
	END
ELSE
	PRINT 'BusinessSystem table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'UnregisteredEmployee')
	BEGIN
	CREATE TABLE [UnregisteredEmployee]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[BusinessId] UNIQUEIDENTIFIER not null,
		[Email] NVARCHAR(255) not null,
		[FirstName] NVARCHAR(255) not null,
		[LastName] NVARCHAR(255) not null
	)
	END
ELSE
	PRINT 'UnregisteredEmployee table already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Customer_Address')
	BEGIN
	ALTER TABLE [Customer]
	ADD CONSTRAINT FK_Customer_Address
		FOREIGN KEY (AddressId) 
		REFERENCES [Address] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Customer_Address already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Business_Address')
	BEGIN
	ALTER TABLE [Business]
	ADD CONSTRAINT FK_Business_Address
		FOREIGN KEY (AddressId) 
		REFERENCES [Address] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Business_Address already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Job_Customer')
	BEGIN
	ALTER TABLE [Job]
	ADD CONSTRAINT FK_Job_Customer
		FOREIGN KEY (CustomerId) 
		REFERENCES [Customer] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Job_Customer already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Job_User')
	BEGIN
	ALTER TABLE [Job]
	ADD CONSTRAINT FK_Job_User
		FOREIGN KEY (TechnicianId) 
		REFERENCES [User] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Job_User already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Job_JobType')
	BEGIN
	ALTER TABLE [Job]
	ADD CONSTRAINT FK_Job_JobType
		FOREIGN KEY (JobTypeId) 
		REFERENCES [JobType] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Job_JobType already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_BusinessSystem_Business')
	BEGIN
	ALTER TABLE [BusinessSystem]
	ADD CONSTRAINT FK_BusinessSystem_Business
		FOREIGN KEY (BusinessId) 
		REFERENCES [Business] (Id)
	END
ELSE
	PRINT 'Foreign key FK_BusinessSystem_Business already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_BusinessSystem_System')
	BEGIN
	ALTER TABLE [BusinessSystem]
	ADD CONSTRAINT FK_BusinessSystem_System
		FOREIGN KEY (SystemId) 
		REFERENCES [System] (Id)
	END
ELSE
	PRINT 'Foreign key FK_BusinessSystem_System already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_BusinessCustomer_Business')
	BEGIN
	ALTER TABLE [BusinessCustomer]
	ADD CONSTRAINT FK_BusinessCustomer_Business
		FOREIGN KEY (BusinessId) 
		REFERENCES [Business] (Id)
	END
ELSE
	PRINT 'Foreign key FK_BusinessCustomer_Business already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_BusinessCustomer_Customer')
	BEGIN
	ALTER TABLE [BusinessCustomer]
	ADD CONSTRAINT FK_BusinessCustomer_Customer
		FOREIGN KEY (CustomerId) 
		REFERENCES [Customer] (Id)
	END
ELSE
	PRINT 'Foreign key FK_BusinessCustomer_Business already exists'


IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_CustomerSystemWidget_CustomerSystem')
	BEGIN
	ALTER TABLE [CustomerSystemWidget]
	ADD CONSTRAINT FK_CustomerSystemWidget_CustomerSystem
		FOREIGN KEY (CustomerSystemId) 
		REFERENCES [CustomerSystem] (Id)
	END
ELSE
	PRINT 'Foreign key FK_CustomerSystemWidget_CustomerSystem already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_CustomerSystemWidget_WidgetChild')
	BEGIN
	ALTER TABLE [CustomerSystemWidget]
	ADD CONSTRAINT FK_CustomerSystemWidget_WidgetChild
		FOREIGN KEY (WidgetChildId) 
		REFERENCES [WidgetChild] (Id)
	END
ELSE
	PRINT 'Foreign key FK_CustomerSystemWidget_WidgetChild already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_WidgetChild_WidgetParent')
	BEGIN
	ALTER TABLE [WidgetChild]
	ADD CONSTRAINT FK_WidgetChild_WidgetParent
		FOREIGN KEY (WidgetParentId)
		REFERENCES [WidgetParent] (Id)
	END
ELSE
	PRINT 'Foreign key FK_WidgetChild_WidgetParent already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_WidgetParent_Business')
	BEGIN
	ALTER TABLE [WidgetParent]
	ADD CONSTRAINT FK_WidgetParent_Business
		FOREIGN KEY (BusinessId)
		REFERENCES [Business] (Id)
	END
ELSE
	PRINT 'Foreign key FK_WidgetParent_Business already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_CustomerSystem_Customer')
	BEGIN
	ALTER TABLE [CustomerSystem]
	ADD CONSTRAINT FK_CustomerSystem_Customer
		FOREIGN KEY (CustomerId) 
		REFERENCES [Customer] (Id)
	END
ELSE
	PRINT 'Foreign key FK_CustomerSystem_Customer already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_CustomerSystem_System')
	BEGIN
	ALTER TABLE [CustomerSystem]
	ADD CONSTRAINT FK_CustomerSystem_System
		FOREIGN KEY (SystemId) 
		REFERENCES [System] (Id)
	END
ELSE
	PRINT 'Foreign key FK_CustomerSystem_System already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Report_Customer')
	BEGIN
	ALTER TABLE [Report]
	ADD CONSTRAINT FK_Report_Customer
		FOREIGN KEY (CustomerId) 
		REFERENCES [Customer] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Report_Customer already exists'

	IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Report_User')
	BEGIN
	ALTER TABLE [Report]
	ADD CONSTRAINT FK_Report_User
		FOREIGN KEY (TechnicianId) 
		REFERENCES [User] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Report_User already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Report_CustomerSystem')
	BEGIN
	ALTER TABLE [Report]
	ADD CONSTRAINT FK_Report_CustomerSystem
		FOREIGN KEY (SystemId) 
		REFERENCES [CustomerSystem] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Report_CustomerSystem already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Report_JobType')
	BEGIN
	ALTER TABLE [Report]
	ADD CONSTRAINT FK_Report_JobType
		FOREIGN KEY (JobTypeId) 
		REFERENCES [JobType] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Report_JobType already exists'
	
IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_UserBusiness_User')
	BEGIN
	ALTER TABLE [UserBusiness]
	ADD CONSTRAINT FK_UserBusiness_User
		FOREIGN KEY (UserId) 
		REFERENCES [User] (Id)
	END
ELSE
	PRINT 'Foreign key FK_UserBusiness_User already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_UserBusiness_Business')
	BEGIN
	ALTER TABLE [UserBusiness]
	ADD CONSTRAINT FK_UserBusiness_Business
		FOREIGN KEY (BusinessId) 
		REFERENCES [Business] (Id)
	END
ELSE
	PRINT 'Foreign key FK_UserBusiness_Business already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_UnregisteredEmployee_Business')
	BEGIN
	ALTER TABLE [UnregisteredEmployee]
	ADD CONSTRAINT FK_UnregisteredEmployee_Business
		FOREIGN KEY (BusinessId) 
		REFERENCES [Business] (Id)
	END
ELSE
	PRINT 'Foreign key FK_UnregisteredEmployee_Business already exists'