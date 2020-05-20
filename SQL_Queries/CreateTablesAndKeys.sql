--CREATE DATABASE [CustomerServiceTracking]

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'User')
	BEGIN
	CREATE TABLE [User]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[FirstName] NVARCHAR(255) not null,
		[LastName] NVARCHAR(255) not null,
		[Admin] BIT not null,
		[FirebaseUid] NVARCHAR (255) not null
	)
	END
ELSE
	PRINT 'User table already exists'
	

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'UserBusiness')
	BEGIN
	CREATE TABLE [UserBusiness]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[UserId] UNIQUEIDENTIFIER not null,
		[BusinessId] UNIQUEIDENTIFIER not null,
	)
	END
ELSE
	PRINT 'UserBusiness table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Business')
	BEGIN
	CREATE TABLE [Business]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[BusinessName] NVARCHAR(255) not null,
	)
	END
ELSE
	PRINT 'Business table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Report')
	BEGIN
	CREATE TABLE [Report]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[CustomerId] UNIQUEIDENTIFIER not null,
		[TechnicianId] UNIQUEIDENTIFIER not null,
		[DateServiced] DATETIME not null,
		[AmountRemaining] INT not null,
		[InchesAdded] INT not null,
		[SolutionAdded] INT not null,
		[Notes] NVARCHAR(255) not null,
		[SystemId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'Report table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'CustomerSystem')
	BEGIN
	CREATE TABLE [CustomerSystem]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[ForeverWarrantyId] UNIQUEIDENTIFIER not null,
		[InstallDate] DATETIME not null,
		[SystemTypeId] UNIQUEIDENTIFIER not null,
		[Nozzles] INT not null,
		[SprayDuration] INT not null,
		[SprayCycles] INT not null,
		[Sold] BIT not null,
		[CustomerId] UNIQUEIDENTIFIER not null,
		[SerialNumber] NVARCHAR(255) not null
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
		[LastName] NVARCHAR(255) not null,
		[AddressId] UNIQUEIDENTIFIER not null,
		[OfficePhone] NVARCHAR(10) null,
		[HomePhone] NVARCHAR(10) null
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
		[State] NVARCHAR(2) not null,
		[ZipCode] NVARCHAR(255) not null,
		[AddressLine1] NVARCHAR(255) not null,
		[AddressLine2] NVARCHAR(255) null
	)
	END
ELSE
	PRINT 'Address table already exists'

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

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'SystemType')
	BEGIN
	CREATE TABLE [SystemType]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Type] NVARCHAR(255) not null,
		[Gallons] INT not null,
		[Inches] INT not null,
	)
	END
ELSE
	PRINT 'SystemType table already exists'




IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Customer_Address')
	BEGIN
	ALTER TABLE [Customer]
	ADD CONSTRAINT FK_Customer_Address
		FOREIGN KEY (AddressId) 
		REFERENCES [Address] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Customer_Address already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_CustomerSystem_ForeverWarranty')
	BEGIN
	ALTER TABLE [CustomerSystem]
	ADD CONSTRAINT FK_CustomerSystem_ForeverWarranty
		FOREIGN KEY (ForeverWarrantyId) 
		REFERENCES [ForeverWarranty] (Id)
	END
ELSE
	PRINT 'Foreign key FK_CustomerSystem_ForeverWarranty already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_CustomerSystem_SystemType')
	BEGIN
	ALTER TABLE [CustomerSystem]
	ADD CONSTRAINT FK_CustomerSystem_SystemType
		FOREIGN KEY (SystemTypeId)
		REFERENCES [SystemType] (Id)
	END
ELSE
	PRINT 'Foreign key FK_CustomerSystem_ForeverWarranty already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_CustomerSystem_Customer')
	BEGIN
	ALTER TABLE [CustomerSystem]
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
	ADD CONSTRAINT FK_Report_CustomerSystem
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