DECLARE @user1Admin UNIQUEIDENTIFIER
DECLARE @user2 UNIQUEIDENTIFIER
DECLARE @businessAddress UNIQUEIDENTIFIER
DECLARE @customerAddress UNIQUEIDENTIFIER
DECLARE @customer UNIQUEIDENTIFIER
DECLARE @customerSystem UNIQUEIDENTIFIER
DECLARE @business UNIQUEIDENTIFIER
DECLARE @system UNIQUEIDENTIFIER
DECLARE @jobTypeInstall UNIQUEIDENTIFIER
DECLARE @jobTypeService UNIQUEIDENTIFIER
DECLARE @jobTypeRepair UNIQUEIDENTIFIER

/* Creates an admin user and a personal user*/
INSERT INTO [User]
(
    [FirstName],
    [LastName],
    [FirebaseUid],
    [Admin]
)
VALUES
(
	'Ben',
	'Blooper',
	'Fyq955AUwHRecZThPWfuslrIlUq2',
	1
),
(
	'John',
	'Worker',
	'aKyHTatDy7WJSL30tXy3whavr8p1',
	0
)

SELECT @user1Admin = [Id]
FROM [User]
WHERE FirstName = 'Ben'

SELECT @user2 = [Id]
FROM [User]
WHERE FirstName = 'John'

/* Creates an address for the business
	and an address for the customer */
INSERT INTO [Address]
(
    [AddressLine1],
    [City],
    [State],
    [ZipCode]
)
VALUES
(
	'123 Fake Street',
	'Nashville',
	'TN',
	'37013'
),
(
	'321 Easy Street',
	'Nashville',
	'TN',
	'32189'
)

SELECT @businessAddress = [Id]
FROM [Address]
WHERE [AddressLine1] = '123 Fake Street'

SELECT @customerAddress = [Id]
FROM [Address]
WHERE [AddressLine1] = '321 Easy Street'

/* Creates the business */
INSERT INTO [Business]
(
    [BusinessName],
    [AddressId]
)
VALUES
(
	'Bloopers Business',
	@businessAddress
)

SELECT @business = [Id]
FROM [Business]
WHERE BusinessName = 'Bloopers Business'

/* Links the admin user and personal user to the business */
INSERT INTO [UserBusiness]
(
	[UserId],
	[BusinessId]
)
VALUES
(
	@user1Admin,
	@business
),
(
	@user2,
	@business
)

/* Creates a new System */
INSERT INTO [System]
(
    [Type],
    [Gallons],
    [Inches]
)
VALUES
(
	'Bloopers System',
	30,
	20
)

SELECT @system = [Id]
FROM [System]
WHERE [Type] = 'Bloopers System'

/* Connects the system to the business */
INSERT INTO [BusinessSystem]
(
	[SystemId],
	[BusinessId]
)
VALUES
(
	@system,
	@business
)

/* Creates a new Customer */
INSERT INTO [Customer]
(
    [FirstName],
    [LastName],
    [HomePhone],
    [OfficePhone],
    [AddressId]
)

VALUES
(
	'Frank',
	'Customer',
	'6150950598',
	'1234567890',
	@customerAddress
)

SELECT @customer = [Id]
FROM [Customer]
WHERE FirstName = 'Frank'

/* Links the business with the customer */
INSERT INTO [BusinessCustomer]
(
    [BusinessId],
    [CustomerId]
)
VALUES
(
    @business,
    @customer
)

/* Creates a new system for the customer */
INSERT INTO [CustomerSystem]
(
	[CustomerId],
	[InstallDate],
	[Notes],
	[Nozzles],
	[SerialNumber],
	[Sold],
	[SprayCycles],
	[SprayDuration],
	[SystemId]
)
VALUES
(
	@customer,
	'2020-07-07 00:00:00.000',
	'Around back near the gate',
	10,
	'1239129123',
	0,
	4,
	30,
	@system
)

SELECT @customerSystem = [Id]
FROM [CustomerSystem]
WHERE [SerialNumber] = '1239129123'

/* Creates an unregistered Employee */
INSERT INTO [UnregisteredEmployee]
(
    [FirstName],
    [LastName],
    [BusinessId],
    [Email]
)
VALUES
(
	'Jean',
	'DeHean',
	@business,
	'Jean@deHean.com'
)

/* Creates new Job Types */
INSERT INTO [JobType]
(
    [Type]
)
VALUES
(
	'Install'
),
(
	'Service'
),
(
	'Repair'
)


SELECT @jobTypeInstall = [Id]
FROM [JobType]
WHERE [Type] = 'Install'

SELECT @jobTypeService = [Id]
FROM [JobType]
WHERE [Type] = 'Service'

SELECT @jobTypeRepair = [Id]
FROM [JobType]
WHERE [Type] = 'Repair'

INSERT INTO [Report]
(
    [AmountRemaining],
    [CustomerId],
    [InchesAdded],
	[JobTypeId],
    [Notes],
	[ServiceDate],
	[SolutionAdded],
	[SystemId],
	[TechnicianId]
)
VALUES
(
	0,
	@customer,
	20,
	@jobTypeInstall,
	'All lines look good',
	'2020-07-07 00:00:00.000',
	5,
	@customerSystem,
	@user2
)


SELECT * FROM [User], [UserBusiness], [Report], [Customer]