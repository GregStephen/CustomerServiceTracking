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
		[ForeverWarrantyId] UNIQUEIDENTIFIER not null,
		[InstallDate] DATETIME not null,
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
		[AddressLine1] NVARCHAR(255) not null,
		[AddressLine2] NVARCHAR(255) null,
		[City] NVARCHAR(255) not null,
		[FirstName] NVARCHAR(255) not null,
		[HomePhone] NVARCHAR(10) null,
		[LastName] NVARCHAR(255) not null,
		[OfficePhone] NVARCHAR(10) null,
		[State] NVARCHAR(2) not null,
		[ZipCode] NVARCHAR(255) not null,
	)
	END
ELSE
	PRINT 'Customer table already exists'


IF not exists (SELECT * FROM sys.tables WHERE [name] = 'ForeverWarranty')
	BEGIN
	CREATE TABLE [ForeverWarranty]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Type] NVARCHAR(255) not null,
	)
	END
ELSE
	PRINT 'ForeverWarranty table already exists'

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
		[TechnicianId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'Job table already exists'

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


IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_CustomerSystem_ForeverWarranty')
	BEGIN
	ALTER TABLE [CustomerSystem]
	ADD CONSTRAINT FK_CustomerSystem_ForeverWarranty
		FOREIGN KEY (ForeverWarrantyId) 
		REFERENCES [ForeverWarranty] (Id)
	END
ELSE
	PRINT 'Foreign key FK_CustomerSystem_ForeverWarranty already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_CustomerSystem_System')
	BEGIN
	ALTER TABLE [CustomerSystem]
	ADD CONSTRAINT FK_CustomerSystem_System
		FOREIGN KEY (SystemId)
		REFERENCES [System] (Id)
	END
ELSE
	PRINT 'Foreign key FK_CustomerSystem_System already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_CustomerSystem_Customer')
	BEGIN
	ALTER TABLE [CUstomerSystem]
	ADD CONSTRAINT FK_CustomerSystem_Customer
		FOREIGN KEY (CustomerId) 
		REFERENCES [Customer] (Id)
	END
ELSE
	PRINT 'Foreign key FK_CustomerSystem_Customer already exists'

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
	ADD CONSTRAINT FK_Report_System
		FOREIGN KEY (SystemId) 
		REFERENCES [CustomerSystem] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Report_CustomerSystem already exists'

	
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