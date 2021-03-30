--CREATE DATABASE [CustomerServiceTracking]

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Business')
	BEGIN
	CREATE TABLE [Business]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[BusinessName] NVARCHAR(255) not null,
		[City] NVARCHAR(255) not null,
		[State] VARCHAR(2) not null,
		[AddressLine1] NVARCHAR(255) not null,
		[AddressLine2] NVARCHAR(255) null,
		[ZipCode] VARCHAR(12) not null,
		[Latitude] NVARCHAR(12) not null,
		[Longitude] NVARCHAR(12) not null,
	)
	END
ELSE
	PRINT 'Business table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'User')
	BEGIN
	CREATE TABLE [User]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Admin] BIT not null,
		[FirebaseUid] NVARCHAR (255) null,
		[FirstName] NVARCHAR(255) not null,
		[LastName] NVARCHAR(255) not null,
		[BusinessId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'User table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Property')
	BEGIN
	CREATE TABLE [Property]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[DisplayName] NVARCHAR(255) not null,
		[Enabled] BIT not null,
		[BusinessId] UNIQUEIDENTIFIER not null,
		[City] NVARCHAR(255) not null,
		[State] VARCHAR(2) not null,
		[AddressLine1] NVARCHAR(255) not null,
		[AddressLine2] NVARCHAR(255) null,
		[ZipCode] VARCHAR(12) not null,
		[Latitude] NVARCHAR(12) not null,
		[Longitude] NVARCHAR(12) not null,
	)
	END
ELSE
	PRINT 'Property table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Contact')
	BEGIN
	CREATE TABLE [Contact]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[FirstName] NVARCHAR(255) not null,
		[LastName] NVARCHAR(255) not null,
		[Primary] BIT not null,
		[PropertyId] UNIQUEIDENTIFIER not null,
		[Email] NVARCHAR(255) null,
		[HomePhone] NVARCHAR(10) null,
		[CellPhone] NVARCHAR(10) null,
		[WorkPhone] NVARCHAR(10) null,
	)
	END
ELSE
	PRINT 'Contact table already exists'
	
IF not exists (SELECT * FROM sys.tables WHERE [name] = 'System')
	BEGIN
	CREATE TABLE [System]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Gallons] INT not null,
		[Inches] INT not null,
		[Type] NVARCHAR(255) not null,
		[BusinessId] UNIQUEIDENTIFIER not null
	)
	END
ELSE
	PRINT 'System table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'PropertySystem')
	BEGIN
	CREATE TABLE [PropertySystem]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[DisplayName] NVARCHAR(255) not null,
		[PropertyId] UNIQUEIDENTIFIER not null,
		[Enabled] BIT not null,
		[InstallDate] DATETIME not null,
		[Notes] NVARCHAR(255) null,
		[Nozzles] INT not null,	
		[SerialNumber] NVARCHAR(255) not null,
		[Sold] BIT not null,
		[SprayCycles] INT not null,
		[SprayDuration] INT not null,
		[SystemId] UNIQUEIDENTIFIER not null,
		[DayTankDepleted] DATETIME not null,
	)
	END
ELSE
	PRINT 'PropertySystem table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Report')
	BEGIN
	CREATE TABLE [Report]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[AmountRemaining] INT not null,
		[PropertyId] UNIQUEIDENTIFIER not null,
		[InchesAdded] INT not null,
		[JobTypeId] UNIQUEIDENTIFIER not null,
		[Notes] NVARCHAR(255) null,
		[ServiceDate] DATETIME not null,
		[SolutionAdded] INT not null,
		[SystemId] UNIQUEIDENTIFIER not null,
		[TechnicianId] UNIQUEIDENTIFIER not null,
		[TimeSubmitted] DATETIME not null
	)
	END
ELSE
	PRINT 'Report table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Job')
	BEGIN
	CREATE TABLE [Job]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[BusinessId] UNIQUEIDENTIFIER not null,
		[PropertySystemId] UNIQUEIDENTIFIER not null,
		[DateAssigned] DATETIME not null,
		[TechnicianId] UNIQUEIDENTIFIER not null,
		[JobTypeId] UNIQUEIDENTIFIER not null,
		[Note] NVARCHAR(255) null,
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





IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_User_Business')
	BEGIN
	ALTER TABLE [User]
	ADD CONSTRAINT FK_User_Business
		FOREIGN KEY (BusinessId) 
		REFERENCES [Business] (Id)
	END
ELSE
	PRINT 'Foreign key FK_User_Business already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Property_Business')
	BEGIN
	ALTER TABLE [Property]
	ADD CONSTRAINT FK_Property_Business
		FOREIGN KEY (BusinessId)
		REFERENCES [Business] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Property_Business already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Job_PropertySystem')
	BEGIN
	ALTER TABLE [Job]
	ADD CONSTRAINT FK_Job_PropertySystem
		FOREIGN KEY (PropertySystemId) 
		REFERENCES [PropertySystem] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Job_PropertySystem already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Job_User')
	BEGIN
	ALTER TABLE [Job]
	ADD CONSTRAINT FK_Job_User
		FOREIGN KEY (TechnicianId) 
		REFERENCES [User] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Job_User already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Job_Business')
	BEGIN
	ALTER TABLE [Job]
	ADD CONSTRAINT FK_Job_Business
		FOREIGN KEY (BusinessId) 
		REFERENCES [Business] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Job_Business already exists'
IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Job_JobType')
	BEGIN
	ALTER TABLE [Job]
	ADD CONSTRAINT FK_Job_JobType
		FOREIGN KEY (JobTypeId) 
		REFERENCES [JobType] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Job_JobType already exists'



IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_System_Business')
	BEGIN
	ALTER TABLE [System]
	ADD CONSTRAINT FK_System_Business
		FOREIGN KEY (BusinessId) 
		REFERENCES [Business] (Id)
	END
ELSE
	PRINT 'Foreign key FK_System_Business already exists'


IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Contact_Property')
	BEGIN
	ALTER TABLE [Contact]
	ADD CONSTRAINT FK_Contact_Property
		FOREIGN KEY (PropertyId) 
		REFERENCES [Property] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Contact_Property already exists'



IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_PropertySystem_Property')
	BEGIN
	ALTER TABLE [PropertySystem]
	ADD CONSTRAINT FK_PropertySystem_Property
		FOREIGN KEY (PropertyId) 
		REFERENCES [Property] (Id)
	END
ELSE
	PRINT 'Foreign key FK_PropertySystem_Property already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_PropertySystem_System')
	BEGIN
	ALTER TABLE [PropertySystem]
	ADD CONSTRAINT FK_PropertySystem_System
		FOREIGN KEY (SystemId) 
		REFERENCES [System] (Id)
	END
ELSE
	PRINT 'Foreign key FK_PropertySystem_System already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Report_Property')
	BEGIN
	ALTER TABLE [Report]
	ADD CONSTRAINT FK_Report_Property
		FOREIGN KEY (PropertyId) 
		REFERENCES [Property] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Report_Property already exists'

	IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Report_User')
	BEGIN
	ALTER TABLE [Report]
	ADD CONSTRAINT FK_Report_User
		FOREIGN KEY (TechnicianId) 
		REFERENCES [User] (Id)
	END
ELSE
	PRINT 'Foreign key FK_Report_User already exists'

IF not exists (SELECT * FROM sys.foreign_keys WHERE [name] = 'FK_Report_PropertySystem')
	BEGIN
	ALTER TABLE [Report]
	ADD CONSTRAINT FK_Report_PropertySystem
		FOREIGN KEY (SystemId) 
		REFERENCES [PropertySystem] (Id)
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
	